import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Copy, Check, Plus, Sparkles } from "lucide-react";
import { MessageActions } from "@/components/chat/message-actions";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/useChat.ts";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const EXAMPLE_QUERIES = [
  "AI 기술 동향",
  "프롬프트 엔지니어링",
  "RAG 아키텍처",
  "LLM 파인튜닝",
];

const ChatProduct = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionParam = searchParams.get("session");
  const { messages, isLoading, error, sendMessage, sessionId } =
    useChat(sessionParam);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setInput("");
    await sendMessage(userInput);
  };

  const handleExampleClick = async (query: string) => {
    if (isLoading) return;
    await sendMessage(query + "에 대해 설명해줘");
  };

  const handleNewChat = () => {
    navigate("/products/chat");
    window.location.reload();
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const PreBlock = ({ children }: { children: any }) => {
    const code = children?.props?.children;
    const language = children?.props?.className?.replace("language-", "") || "";

    return (
      <div className="relative">
        <div className="absolute right-2 top-2 flex items-center gap-2">
          {language && (
            <span className="text-xs text-white/40">{language}</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/5 hover:bg-white/10"
            onClick={() => handleCopyCode(code)}
          >
            {copiedCode === code ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-white/80" />
            )}
          </Button>
        </div>
        <pre className="mt-4 mb-6 overflow-x-auto bg-[#1E1E1E]">
          <code className="block bg-transparent p-4 text-[13.6px] leading-relaxed text-white/90 font-mono">
            {code}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] -mx-6 -mt-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-3 bg-background">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="font-medium">IXI Chat</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNewChat}
            className="hover:bg-primary/5 gap-2"
          >
            <Plus className="h-4 w-4" />새 대화
          </Button>
        </div>

        {/* Chat Area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto scrollbar-hide px-4 md:px-6 py-6 bg-muted/5"
        >
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="h-[calc(90vh-10rem)] flex flex-col items-center justify-center space-y-12">
                <div className="space-y-6 text-center max-w-3xl">
                  <div className="inline-block p-4 bg-primary/10">
                    <div className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
                      IXI에게 물어보세요
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      한국어에 특화된 AI 어시스턴트입니다
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full max-w-xl px-4">
                  {EXAMPLE_QUERIES.map((query, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="justify-start font-normal text-sm h-10 px-4"
                      onClick={() => handleExampleClick(query)}
                      disabled={isLoading}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "user" ? (
                      <div className="px-4 py-2.5 bg-primary text-primary-foreground max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-2xl">
                        {message.content}
                      </div>
                    ) : (
                      <div className="space-y-2 max-w-2xl md:max-w-3xl lg:max-w-4xl">
                        <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-normal [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-border/50 [&_th]:bg-muted/50 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-border/50 [&_td]:p-2 [&_td]:align-top [&_code]:bg-[#2C2C2C] [&_code]:text-white/90 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13.6px] [&_code]:font-mono [&_code]:before:content-none [&_code]:after:content-none [&_.katex]:text-lg [&_.katex-display]:my-4">
                          {message.content ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkMath]}
                              rehypePlugins={[rehypeRaw, rehypeKatex]}
                              components={{
                                pre: PreBlock,
                                code: ({
                                  node,
                                  className,
                                  children,
                                  ...props
                                }) => {
                                  const match = /language-(\w+)/.exec(
                                    className || "",
                                  );
                                  const isLatex = match && match[1] === "latex";
                                  if (isLatex) {
                                    return (
                                      <span className="latex">{children}</span>
                                    );
                                  }
                                  return (
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  );
                                },
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            isLoading &&
                            index === messages.length - 1 && (
                              <div className="flex items-center gap-1.5 h-6">
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                              </div>
                            )
                          )}
                        </div>
                        {message.content && !isLoading && (
                          <MessageActions content={message.content} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4 md:p-6 bg-background">
          <form onSubmit={handleSubmit} className="flex max-w-4xl mx-auto">
            <div className="relative flex-1 flex items-center bg-muted/50 rounded-full border border-input/20 focus-within:border-primary/30 transition-colors">
              <Input
                placeholder="IXI에게 무엇이든 물어보세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-0 focus-visible:ring-0 h-12 text-base px-4"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 h-8 w-8 rounded-full absolute right-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatProduct;
