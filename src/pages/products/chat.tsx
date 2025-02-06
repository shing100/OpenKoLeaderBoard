import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, Bot, User } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EXAMPLE_QUERIES = [
  "한국의 인공지능 발전 현황을 알려줘",
  "프롬프트 엔지니어링이란?",
  "RAG 아키텍처 설명해줘",
  "LLM 파인튜닝 방법 추천해줘",
];

const ChatProduct = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a simulated response. The actual AI integration will be implemented later.",
        },
      ]);
    }, 1000);
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] px-0">
        <Card className="flex flex-col h-full bg-background border-none shadow-lg rounded-none">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
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
                        IXI와 대화하기
                      </h2>
                      <p className="text-lg text-muted-foreground">
                        한국어에 특화된 AI 어시스턴트입니다
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl px-4">
                    {EXAMPLE_QUERIES.map((query, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="justify-start font-normal text-base h-12"
                        onClick={() => handleExampleClick(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex gap-4 max-w-[80%]">
                        {message.role === "assistant" && (
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=ixi" />
                            <AvatarFallback className="bg-primary/10">
                              <Bot className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`flex-1 ${message.role === "user" ? "order-first" : ""}`}
                        >
                          <div
                            className={`font-medium mb-1 ${message.role === "user" ? "text-right" : ""}`}
                          >
                            {message.role === "user" ? "You" : "IXI"}
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-2.5 ${message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"}`}
                          >
                            {message.content}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                            <AvatarFallback className="bg-primary/5">
                              <User className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-6 bg-muted/5">
            <form
              onSubmit={handleSubmit}
              className="flex gap-3 max-w-7xl mx-auto"
            >
              <Input
                placeholder="IXI에게 무엇이든 물어보세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-background border-primary/20 focus-visible:ring-primary h-12 text-base"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/90 h-12 w-12"
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
