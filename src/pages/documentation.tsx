import { Layout } from "@/components/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const Documentation = () => {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-card">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">API REFERENCE</h4>
                <nav className="space-y-1">
                  <a
                    href="#introduction"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    소개
                  </a>
                  <a
                    href="#authentication"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    인증
                  </a>
                  <a
                    href="#making-requests"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    API 사용법
                  </a>
                </nav>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">ENDPOINTS</h4>
                <nav className="space-y-1">
                  <a
                    href="#embeddings"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    임베딩
                  </a>
                  <a
                    href="#chat"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    챗봇
                  </a>
                  <a
                    href="#document-parser"
                    className="block px-2 py-1 text-sm hover:bg-muted rounded-md"
                  >
                    문서 파서
                  </a>
                </nav>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <ScrollArea className="h-full">
            <div className="max-w-4xl mx-auto p-8 space-y-12">
              {/* Introduction */}
              <section id="introduction" className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight">
                  Korean LLM API
                </h1>
                <p className="text-lg text-muted-foreground">
                  한국어에 특화된 LLM 서비스를 위한 API를 제공합니다. HTTP
                  요청을 통해 직접 호출하거나, 공식 Python/Node.js SDK를 사용할
                  수 있습니다.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">설치하기</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Python SDK 설치:
                    </p>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>pip install korean-llm-api</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            "pip install korean-llm-api",
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Authentication */}
              <section id="authentication" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">인증</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">API 키</h3>
                  <p className="text-muted-foreground">
                    모든 API 요청에는 API 키가 필요합니다. 대시보드에서 API 키를
                    확인할 수 있습니다. API 키는 외부에 노출되지 않도록
                    주의해주세요.
                  </p>

                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "Authorization: Bearer YOUR_API_KEY",
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Embeddings API */}
              <section id="embeddings" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  임베딩 API
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    텍스트를 고차원 벡터로 변환하여 의미 검색과 유사도 비교를
                    수행할 수 있습니다.
                  </p>

                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`POST https://api.koreanllm.ai/v1/embeddings
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "input": "임베딩할 텍스트",
  "model": "korean-embedding-v1"  // 선택사항
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() =>
                        navigator.clipboard.writeText("embedding example")
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <h3 className="text-xl font-semibold mt-8">응답</h3>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`{
  "data": [{
    "embedding": [0.0023063174, -0.009358071, ...],  // 1024차원 벡터
    "index": 0,
    "object": "embedding"
  }],
  "model": "korean-embedding-v1",
  "object": "list",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Chat API */}
              <section id="chat" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">챗봇 API</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    한국어에 최적화된 대화형 AI 모델을 통해 자연스러운 대화를
                    수행할 수 있습니다.
                  </p>

                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`POST https://api.koreanllm.ai/v1/chat/completions
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "model": "korean-chat-v1",
  "messages": [
    {"role": "system", "content": "당신은 도움이 되는 AI 어시스턴트입니다."},
    {"role": "user", "content": "한국의 AI 발전 현황을 알려주세요."}
  ],
  "temperature": 0.7
}`}</code>
                    </pre>
                  </div>

                  <h3 className="text-xl font-semibold mt-8">응답</h3>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "korean-chat-v1",
  "usage": {
    "prompt_tokens": 56,
    "completion_tokens": 31,
    "total_tokens": 87
  },
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "한국의 AI 산업은 빠르게 성장하고 있습니다..."
    },
    "finish_reason": "stop",
    "index": 0
  }]
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Document Parser API */}
              <section id="document-parser" className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  문서 파서 API
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    PDF, DOCX 등 다양한 문서 형식에서 구조화된 데이터를
                    추출합니다.
                  </p>

                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`POST https://api.koreanllm.ai/v1/documents/parse
Content-Type: multipart/form-data
Authorization: Bearer YOUR_API_KEY

# 멀티파트 폼 데이터로 파일 전송
-F "file=@document.pdf"
-F "options={\"extract_tables\": true}"`}</code>
                    </pre>
                  </div>

                  <h3 className="text-xl font-semibold mt-8">응답</h3>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`{
  "document_id": "doc_123",
  "content": {
    "text": "추출된 텍스트 내용...",
    "tables": [{
      "headers": ["항목", "금액"],
      "rows": [["품목 A", "10,000"], ["품목 B", "20,000"]]
    }],
    "metadata": {
      "page_count": 5,
      "title": "문서 제목"
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
