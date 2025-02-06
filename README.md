# Korean LLM Leaderboard

A comprehensive dashboard for comparing and analyzing Korean-focused Large Language Models across various benchmarks.

## Features

- **Main Leaderboard**: Compare models across standard benchmarks (KMMLU, GSM8K, etc.)
- **LogicKor**: Evaluate models on logical reasoning tasks
- **RAG Evaluation**: Assess RAG components including embedding models and document parsers
- **Multilingual Support**: Full Korean and English language support
- **Dark/Light Mode**: Automatic theme detection with manual override
- **Responsive Design**: Works on desktop and mobile devices

## Benchmarks

### Main Benchmarks
- KMMLU (Korean Massive Multitask Language Understanding)
- GSM8K & GSM8K-KO (Grade School Math)
- IFEval (Instruction Following)
- HAERAE (Korean Language Understanding)
- KoBEST (Korean Benchmark of Evaluation for Standardized Tasks)
- And more...

### LogicKor Categories
- Mathematics
- Grammar
- Comprehension
- Writing
- Reasoning
- Coding

### RAG Evaluation
- Semantic Search
- Document Parsing
- Reranking
- Domain-specific performance (Finance, Public, Medical, Law, Commerce)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
