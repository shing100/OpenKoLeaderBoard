import { Layout } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

const EXAMPLE_SENTENCES = [
  "인공지능 기술이 발전하면서 우리의 삶이 더욱 편리해지고 있습니다.",
  "AI 기술의 진보로 일상생활이 점점 더 스마트해지고 있어요.",
  "기후 변화로 인해 지구의 평균 기온이 상승하고 있습니다.",
  "전기차의 보급이 확대되면서 환경 오염이 줄어들고 있어요.",
];

const EXAMPLE_DOCUMENTS = [
  {
    title: "인공지능 기술 동향 보고서",
    content:
      "최근 인공지능 기술은 딥러닝을 중심으로 빠르게 발전하고 있으며, 특히 자연어 처리 분야에서 큰 진전을 보이고 있습니다. 대규모 언어 모델의 등장으로 텍스트 생성과 이해 능력이 크게 향상되었습니다.",
  },
  {
    title: "기후 변화 대응 정책",
    content:
      "지구 온난화로 인한 기후 변화에 대응하기 위해 각국은 탄소 중립 정책을 추진하고 있습니다. 신재생 에너지 확대와 전기차 보급이 주요 전략으로 떠오르고 있습니다.",
  },
  {
    title: "미래 모빌리티 전망",
    content:
      "자율주행 기술과 전기차의 발전으로 모빌리티 산업이 큰 변화를 맞이하고 있습니다. 특히 AI 기술을 활용한 스마트 교통 시스템이 주목받고 있습니다.",
  },
];

const Embedding = () => {
  const [inputText, setInputText] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [mode, setMode] = useState<"similarity" | "search">("similarity");

  // Simulated embedding visualization
  const getSimulatedSimilarity = (text1: string, text2: string) => {
    // This is a very simple simulation - in reality, you'd use proper embedding comparison
    const commonWords = text1
      .split(" ")
      .filter((word) => text2.includes(word)).length;
    const maxLength = Math.max(
      text1.split(" ").length,
      text2.split(" ").length,
    );
    return (commonWords / maxLength) * 100;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">임베딩 데모</h1>
          <p className="text-lg text-muted-foreground">
            텍스트의 의미를 벡터로 변환하여 유사도를 비교하고 검색하는 기술을
            체험해보세요
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Panel */}
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">텍스트 입력</h2>
              <div className="flex gap-2">
                <Button
                  variant={mode === "similarity" ? "default" : "outline"}
                  onClick={() => setMode("similarity")}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  유사도 비교
                </Button>
                <Button
                  variant={mode === "search" ? "default" : "outline"}
                  onClick={() => setMode("search")}
                >
                  <Search className="w-4 h-4 mr-2" />
                  의미 검색
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder={
                  mode === "similarity"
                    ? "비교할 텍스트를 입력하세요..."
                    : "검색할 텍스트를 입력하세요..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="h-32"
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">예시 문장:</p>
                <div className="grid grid-cols-2 gap-2">
                  {EXAMPLE_SENTENCES.map((sentence, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="justify-start h-auto whitespace-normal text-left"
                      onClick={() => setInputText(sentence)}
                    >
                      {sentence}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Right Panel */}
          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {mode === "similarity" ? "유사도 결과" : "검색 결과"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === "similarity"
                  ? "입력된 텍스트와 문서들 간의 의미적 유사도를 보여줍니다"
                  : "입력된 텍스트와 가장 관련성 높은 문서를 찾아냅니다"}
              </p>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {EXAMPLE_DOCUMENTS.map((doc, i) => {
                  const similarity = inputText
                    ? getSimulatedSimilarity(inputText, doc.content)
                    : 0;

                  return (
                    <Card
                      key={i}
                      className={`p-4 transition-all ${selectedDocument === doc.title ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setSelectedDocument(doc.title)}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{doc.title}</h3>
                          {inputText && (
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded-full ${
                                similarity > 70
                                  ? "bg-green-500/10 text-green-700"
                                  : similarity > 40
                                    ? "bg-yellow-500/10 text-yellow-700"
                                    : "bg-red-500/10 text-red-700"
                              }`}
                            >
                              {similarity.toFixed(1)}% 일치
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {doc.content}
                        </p>
                        {inputText && (
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all"
                              style={{ width: `${similarity}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Embedding;
