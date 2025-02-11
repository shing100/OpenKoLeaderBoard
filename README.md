# Korean LLM Leaderboard

A comprehensive dashboard for comparing and analyzing Korean-focused Large Language Models across various benchmarks.

## Features

### Core Features
- **Main Leaderboard**: Compare models across standard benchmarks (KMMLU, GSM8K, etc.)
- **LogicKor**: Evaluate models on logical reasoning tasks
- **RAG Evaluation**: Assess RAG components including embedding models and document parsers

### User Experience
- **Multilingual Support**: Full Korean and English language support with automatic detection
- **Dark/Light Mode**: Automatic theme detection with manual override
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data updates for benchmark scores

### Products
- **Document Parser**: Extract structured data from various document formats
- **Chat Interface**: Interactive chat with Korean-optimized AI models
- **Embedding Demo**: Test and visualize text embeddings

## Benchmarks

### Main Benchmarks
- **KMMLU** (Korean Massive Multitask Language Understanding)
  - Comprehensive evaluation of Korean language understanding
  - Multiple domains including science, humanities, and professional knowledge

- **GSM8K & GSM8K-KO** (Grade School Math)
  - Mathematical reasoning in both English and Korean
  - Step-by-step problem solving evaluation

- **IFEval** (Instruction Following)
  - Assessment of model's ability to follow Korean instructions
  - Complex multi-step instruction handling

- **HAERAE** (Korean Language Understanding)
  - Deep evaluation of Korean linguistic capabilities
  - Cultural and contextual understanding assessment

- **KoBEST** (Korean Benchmark of Evaluation for Standardized Tasks)
  - Standardized evaluation across multiple tasks
  - Comparison with human performance baselines

### LogicKor Categories
- **Mathematics**: Advanced mathematical problem solving
- **Grammar**: Korean grammar and language structure
- **Comprehension**: Reading and understanding complex texts
- **Writing**: Text generation and creative writing
- **Reasoning**: Logical deduction and critical thinking
- **Coding**: Code understanding and generation

### RAG Evaluation
- **Semantic Search**
  - Vector similarity search performance
  - Cross-lingual retrieval capabilities

- **Document Parsing**
  - Multi-format document handling (PDF, DOCX, etc.)
  - Table and structure extraction accuracy

- **Reranking**
  - Result relevance optimization
  - Context-aware result ordering

- **Domain Performance**
  - Finance: Financial document understanding
  - Public: Government document processing
  - Medical: Healthcare information extraction
  - Law: Legal document analysis
  - Commerce: Business document handling

## Technical Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/korean-llm-leaderboard.git

# Navigate to project directory
cd korean-llm-leaderboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (Required for Chat)
VITE_OPENAI_API_KEY=your_openai_api_key
```

### API Keys Setup

1. **Supabase Configuration**
   - Go to [Supabase Dashboard](https://app.supabase.io)
   - Select your project
   - Navigate to Project Settings > API
   - Copy the URL and anon key

2. **OpenAI Configuration**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key and keep it secure

⚠️ **Security Notes**:
- Never commit your API keys to version control
- Use environment variables for sensitive data
- Regularly rotate your API keys
- Monitor API usage and set appropriate limits

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run types:check

# Generate Supabase types
npm run types:supabase
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Route components
├── lib/            # Utility functions and API clients
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── i18n/           # Internationalization files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors and maintainers
- Built with React, Vite, and Tailwind CSS
- Powered by Supabase and OpenAI