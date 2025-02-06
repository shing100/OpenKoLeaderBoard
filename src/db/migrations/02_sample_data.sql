-- Sample data for models table
INSERT INTO models (name, kmmlu, gsm8k, gsm8k_ko, ifeval, haerae, kobest, mmlu, mmlu_pro, bbh, csatqa, gpqa, arc_c, average) VALUES
('GPT-4-Korean', 95.2, 92.8, 91.5, 94.3, 93.7, 92.9, 96.1, 94.8, 93.2, 95.4, 94.7, 93.8, 94.03),
('KULLM-v2', 88.5, 85.2, 87.3, 86.9, 87.4, 86.8, 88.2, 87.5, 86.1, 87.8, 86.9, 85.7, 87.03),
('KoAlpaca-13B', 82.7, 79.8, 81.4, 80.9, 81.5, 80.7, 82.1, 81.3, 80.2, 81.7, 80.9, 79.8, 81.08)
ON CONFLICT (name) DO NOTHING;

-- Sample data for logickor table
INSERT INTO logickor (name, math_singleton, math_multiturn, grammar_singleton, grammar_multiturn, 
comprehension_singleton, comprehension_multiturn, writing_singleton, writing_multiturn, 
reasoning_singleton, reasoning_multiturn, coding_singleton, coding_multiturn, average) VALUES
('GPT-4-Korean', 94.5, 93.8, 95.2, 94.7, 95.8, 95.1, 94.9, 94.2, 95.5, 94.8, 93.7, 93.1, 94.61),
('KULLM-v2', 87.2, 86.5, 88.4, 87.9, 88.7, 88.1, 87.8, 87.2, 88.3, 87.7, 86.5, 85.9, 87.52),
('KoAlpaca-13B', 81.5, 80.8, 82.7, 82.1, 83.1, 82.4, 82.2, 81.5, 82.6, 82.1, 80.8, 80.2, 81.83)
ON CONFLICT (name) DO NOTHING;

-- Sample data for rag table
INSERT INTO rag (service, generator, parser, semantic, lexical, web, rerank, fusion, 
finance, public, medical, law, commerce, total) VALUES
('KoRAG-1', 'GPT-4', 'Unstructured', 'ko-sbert-v1', 'BM25', 'Serper', 'CE-Rank', 'RRF', 58, 57, 59, 58, 57, 289),
('LangChain-Ko', 'Claude-2', 'PyPDF', 'OpenAI-Ada-002-Ko', 'TF-IDF', 'SerpAPI', 'Cross-Encoder', 'Reciprocal', 55, 54, 56, 55, 54, 274),
('KoVector', 'PaLM-2', 'PDFMiner', 'KoSimCSE', 'Elastic', 'Bing', 'Cohere-Rerank', 'Weighted', 52, 51, 53, 52, 51, 259)
ON CONFLICT (service) DO NOTHING;
