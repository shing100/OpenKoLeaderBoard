import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navigation
          llm_benchmark: "Korean LLM Leaderboard",
          models: "Models",
          benchmarks: "Benchmarks",
          resources: "Resources",

          // Models Menu
          leaderboard: "Leaderboard",
          products: "Products",
          leaderboard_desc:
            "Compare and analyze performance metrics across different models",
          submit_model: "Submit Model",
          logickor_title: "LogicKor",
          logickor_desc:
            "Comprehensive evaluation of Korean language models across logical reasoning tasks",
          rag_nav_title: "RAG Evaluation",
          rag_nav_desc:
            "Evaluation of embedding models, document parsers, and rerankers",

          // Benchmarks Menu
          text_generation: "Text Generation",
          text_generation_desc:
            "Natural language generation and completion tasks",
          code_generation: "Code Generation",
          code_generation_desc: "Code completion and generation capabilities",
          vision: "Vision",
          vision_desc: "Image understanding and generation tasks",

          // Resources Menu
          documentation: "Documentation",
          documentation_desc: "Guides and API documentation",
          blog: "Blog",
          blog_desc: "Latest updates and insights",
          community: "Community",
          community_desc: "Join our Discord community",

          // Auth
          sign_in: "Sign in",
          logout: "Logout",

          // Search
          search_models: "Search models...",

          // Footer
          privacy_policy: "Privacy Policy",
          terms_of_service: "Terms of Service",

          // RAG
          rag_title: "RAG Evaluation Leaderboard",
          rag_desc:
            "Comprehensive evaluation of RAG components including embedding models, document parsers, and rerankers across different domains.",
          rag_service: "Service",
          rag_service_tooltip: "RAG Service Name",
          rag_generator: "Generator",
          rag_generator_tooltip: "LLM Model Used",
          rag_parser: "Parser",
          rag_parser_tooltip: "Document Parser",
          rag_semantic: "Semantic",
          rag_semantic_tooltip: "Semantic Embedding Model",
          rag_lexical: "Lexical",
          rag_lexical_tooltip: "Lexical Search Configuration",
          rag_web: "Web",
          rag_web_tooltip: "Web Search Configuration",
          rag_rerank: "Rerank",
          rag_rerank_tooltip: "Reranking Configuration",
          rag_fusion: "Fusion",
          rag_fusion_tooltip: "Fusion Configuration",
          rag_finance: "Finance",
          rag_finance_tooltip: "Finance domain score (60)",
          rag_public: "Public",
          rag_public_tooltip: "Public domain score (60)",
          rag_medical: "Medical",
          rag_medical_tooltip: "Medical domain score (60)",
          rag_law: "Law",
          rag_law_tooltip: "Law domain score (60)",
          rag_commerce: "Commerce",
          rag_commerce_tooltip: "Commerce domain score (60)",
          rag_total: "Total",
          rag_total_tooltip: "Total score (300)",
          no_results: "No results found",

          // Model Form
          model_submission: "Model Submission Form",
          model_submission_desc: "Submit your model for benchmarking",
          model_info: "Model Information",
          model_name: "Model Name",
          model_name_example: "Example: meta-llama/Llama-2-7b-hf",
          revision: "Revision commit",
          default: "Default",
          model_config: "Model Configuration",
          model_type: "Model Type",
          fine_tuned: "Fine-tuned",
          base: "Base",
          precision: "Precision",
          weights_type: "Weights Type",
          original: "Original",
          quantized: "Quantized",
          pruned: "Pruned",
          use_chat_template: "Use Chat Template",
          required_fields: "All fields marked with * are required",
          submit: "Submit",
          cancel: "Cancel",
          add_score: "Add Score",
          score_submission: "Score Submission",
          score_submission_desc: "Submit new scores for evaluation",
        },
      },
      ko: {
        translation: {
          // Navigation
          llm_benchmark: "한국어 LLM 리더보드",
          models: "모델",
          benchmarks: "벤치마크",
          resources: "리소스",

          // Models Menu
          leaderboard: "리더보드",
          products: "제품",
          leaderboard_desc: "다양한 모델의 성능 지표를 비교하고 분석하세요",
          submit_model: "모델 제출",
          logickor_title: "LogicKor",
          logickor_desc: "한국어 언어 모델의 논리적 추론 작업에 대한 종합 평가",
          rag_nav_title: "RAG 평가",
          rag_nav_desc: "임베딩 모델, 문서 파서, 리랭커의 평가",

          // Benchmarks Menu
          text_generation: "텍스트 생성",
          text_generation_desc: "자연어 생성 및 완성 작업",
          code_generation: "코드 생성",
          code_generation_desc: "코드 완성 및 생성 기능",
          vision: "비전",
          vision_desc: "이미지 이해 및 생성 작업",

          // Resources Menu
          documentation: "문서",
          documentation_desc: "가이드 및 API 문서",
          blog: "블로그",
          blog_desc: "최신 업데이트 및 인사이트",
          community: "커뮤니티",
          community_desc: "디스코드 커뮤니티에 참여하세요",

          // Auth
          sign_in: "로그인",
          logout: "로그아웃",

          // Search
          search_models: "모델 검색...",

          // Footer
          privacy_policy: "개인정보처리방침",
          terms_of_service: "이용약관",

          // RAG
          rag_title: "RAG 평가 리더보드",
          rag_desc: "임베딩 모델, 문서 파서, 리랭커의 종합적인 평가",
          rag_service: "서비스",
          rag_service_tooltip: "RAG 서비스 이름",
          rag_generator: "생성기",
          rag_generator_tooltip: "사용된 LLM 모델",
          rag_parser: "파서",
          rag_parser_tooltip: "문서 파서",
          rag_semantic: "의미적",
          rag_semantic_tooltip: "의미적 임베딩 모델",
          rag_lexical: "어휘적",
          rag_lexical_tooltip: "어휘 검색 설정",
          rag_web: "웹",
          rag_web_tooltip: "웹 검색 설정",
          rag_rerank: "재순위",
          rag_rerank_tooltip: "재순위 설정",
          rag_fusion: "퓨전",
          rag_fusion_tooltip: "퓨전 설정",
          rag_finance: "금융",
          rag_finance_tooltip: "금융 도메인 점수 (60)",
          rag_public: "공공",
          rag_public_tooltip: "공공 도메인 점수 (60)",
          rag_medical: "의료",
          rag_medical_tooltip: "의료 도메인 점수 (60)",
          rag_law: "법률",
          rag_law_tooltip: "법률 도메인 점수 (60)",
          rag_commerce: "상업",
          rag_commerce_tooltip: "상업 도메인 점수 (60)",
          rag_total: "총점",
          rag_total_tooltip: "총점 (300)",
          no_results: "결과를 찾을 수 없습니다.",

          // Model Form
          model_submission: "모델 제출 양식",
          model_submission_desc: "벤치마크를 위한 모델을 제출하세요",
          model_info: "모델 정보",
          model_name: "모델 이름",
          model_name_example: "예시: meta-llama/Llama-2-7b-hf",
          revision: "리비전 커밋",
          default: "기본값",
          model_config: "모델 설정",
          model_type: "모델 타입",
          fine_tuned: "파인튜닝됨",
          base: "기본",
          precision: "정밀도",
          weights_type: "가중치 타입",
          original: "원본",
          quantized: "양자화됨",
          pruned: "가지치기됨",
          use_chat_template: "채팅 템플릿 사용",
          required_fields: "* 표시된 필드는 필수입니다",
          submit: "제출",
          cancel: "취소",
          add_score: "점수 추가",
          score_submission: "점수 제출",
          score_submission_desc: "평가를 위한 새로운 점수를 제출하세요",
        },
      },
    },
    fallbackLng: "ko",
    detection: {
      order: ["localStorage", "navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
