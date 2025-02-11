import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Copy, Check } from "lucide-react";
import { MessageActions } from "@/components/chat/message-actions";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const EXAMPLE_QUERIES = [
  "한국의 인공지능 발전 현황을 알려줘",
  "프롬프트 엔지니어링이란?",
  "RAG 아키텍처를 마크다운으로 설명해줘",
  "LLM 파인튜닝 방법을 표로 정리해서 보여줘",
];

const ChatProduct = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

      if (isAtBottom) {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
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
    await sendMessage(query);
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
        <pre className="mt-4 mb-6 overflow-x-auto rounded-lg bg-[#1E1E1E] shadow-lg">
          <code className="block bg-transparent p-4 text-[13.6px] leading-relaxed text-white/90 font-mono">
            {code}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <Layout>
      <div className="fixed inset-0 pt-[4rem]">
        <Card className="flex flex-col h-full bg-background border-none shadow-lg rounded-none">
          {/* Chat Messages */}
          <div ref={containerRef} className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <div className="h-[calc(100vh-16rem)] flex flex-col items-center justify-center space-y-12">
                  <div className="space-y-6 text-center max-w-2xl">
                    <div className="inline-block p-4 bg-primary/10 rounded-2xl">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 text-transparent bg-clip-text">
                        ixi에게 물어보세요
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        한국어에 특화된 AI 어시스턴트입니다
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                    {EXAMPLE_QUERIES.map((query, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="justify-start font-normal text-base h-12"
                        onClick={() => handleExampleClick(query)}
                        disabled={isLoading}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "user" ? (
                        <div className="rounded-2xl px-4 py-2.5 bg-[#2C2C2C] text-white max-w-[85%] md:max-w-[90%] lg:max-w-[95%]">
                          {message.content}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-normal max-w-[85%] md:max-w-[90%] lg:max-w-[95%] [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-border/50 [&_th]:bg-muted/50 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-border/50 [&_td]:p-2 [&_td]:align-top [&_code]:bg-[#2C2C2C] [&_code]:text-white/90 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13.6px] [&_code]:font-mono [&_code]:before:content-none [&_code]:after:content-none">
                            {message.content ? (
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                  pre: PreBlock,
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
          <div className="border-t p-4 md:p-6 bg-muted/5">
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 max-w-4xl mx-auto"
            >
              <Input
                placeholder="ixi에게 무엇이든 물어보세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-background border-primary/20 focus-visible:ring-primary h-12 text-base"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 h-12 w-12 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatProduct;
