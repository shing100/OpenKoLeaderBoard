import { useState, useCallback, useRef, useEffect } from "react";
import { streamChat, MODEL_NAME } from "@/lib/openai.ts";
import { supabase } from "@/lib/supabase.ts";
import { nanoid } from "nanoid";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export function useChat(initialSessionId?: string) {
  const [sessionId] = useState(() => initialSessionId || nanoid());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load messages when component mounts or sessionId changes
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data) {
          setMessages(
            data.map((msg) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
            })),
          );
        }
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };

    loadMessages();
  }, [sessionId]);

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        setIsLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        // Create messages
        const userMessage: Message = {
          id: nanoid(),
          role: "user",
          content,
        };
        const assistantMessage: Message = {
          id: nanoid(),
          role: "assistant",
          content: "",
        };

        // Add messages to UI
        setMessages((prev) => [...prev, userMessage, assistantMessage]);

        // Save user message to database
        await supabase.from("chat_messages").insert([
          {
            id: userMessage.id,
            session_id: sessionId,
            role: userMessage.role,
            content: userMessage.content,
          },
        ]);

        // Stream the response
        const messageHistory = [...messages, userMessage].map(
          ({ role, content }) => ({ role, content }),
        );
        const stream = streamChat(messageHistory);

        let finalContent = "";
        for await (const chunk of stream) {
          if (abortControllerRef.current?.signal.aborted) break;

          finalContent = chunk.content;
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = chunk.content;
            }
            return newMessages;
          });

          if (chunk.done) {
            // Save assistant message to database with model name
            await supabase.from("chat_messages").insert([
              {
                id: assistantMessage.id,
                session_id: sessionId,
                role: "assistant",
                content: finalContent,
                model: MODEL_NAME,
              },
            ]);
            break;
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to send message");
        console.error("Error in sendMessage:", err);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, sessionId],
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    sessionId,
  };
}
