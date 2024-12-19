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
          leaderboard_desc:
            "Compare and analyze performance metrics across different models",
          submit_model: "Submit Model",

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
          leaderboard_desc: "다양한 모델의 성능 지표를 비교하고 분석하세요",
          submit_model: "모델 제출",

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
