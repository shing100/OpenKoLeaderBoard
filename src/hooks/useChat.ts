import { useState, useCallback, useRef } from "react";
import { streamChat } from "@/lib/openai";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        setIsLoading(true);
        setError(null);

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        // Add user message and prepare assistant message in one update
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content,
        };
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
        };
        setMessages((prev) => [...prev, userMessage, assistantMessage]);

        // Stream the response
        const messageHistory = [...messages, userMessage].map(
          ({ role, content }) => ({ role, content }),
        );
        const stream = streamChat(messageHistory);

        for await (const chunk of stream) {
          if (abortControllerRef.current?.signal.aborted) {
            break;
          }

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = chunk.content;
            }
            return newMessages;
          });

          if (chunk.done) break;
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to send message");
        console.error("Error in sendMessage:", err);
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages],
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}
