CREATE TABLE rag (
  id SERIAL PRIMARY KEY,
  service VARCHAR(255) NOT NULL,
  generator VARCHAR(255) NOT NULL,
  parser VARCHAR(255),
  semantic VARCHAR(255),
  lexical VARCHAR(255),
  web VARCHAR(255),
  rerank VARCHAR(255),
  fusion VARCHAR(255),
  finance INTEGER,
  public INTEGER,
  medical INTEGER,
  law INTEGER,
  commerce INTEGER,
  total INTEGER
);

INSERT INTO rag (service, generator, parser, semantic, lexical, web, rerank, fusion, finance, public, medical, law, commerce, total) VALUES
('ixi-RAG', 'GPT-4o', 'ixi AI Parser', 'N/A', 'BM25, 3 chunks, tiktoken', 'N/A', 'N/A', 'N/A', 37, 40, 36, 3, 42, 189),
('ixi-RAG', 'GPT-4o', 'Upstage Parser', 'N/A', 'BM25, 3 chunks, tiktoken', 'N/A', 'N/A', 'N/A', 35, 39, 38, 37, 37, 186),
('ixi-RAG', 'GPT-4o', 'pypdf', 'N/A', 'BM25, 3 chunks, space-split', 'N/A', 'N/A', 'N/A', 27, 27, 36, 29, 37, 156),
('ixi-RAG', 'GPT-4o', 'unstructured', 'N/A', 'BM25, 3 chunks, space-split', 'N/A', 'N/A', 'N/A', 29, 36, 39, 35, 38, 177),
('ixi-RAG', 'GPT-4o', 'ixi AI Parser', 'N/A', 'BM25, 3 chunks, space-split', 'N/A', 'N/A', 'N/A', 33, 29, 35, 26, 36, 159),
('ixi-RAG', 'GPT-4o', 'Upstage Parser', 'N/A', 'BM25, 3 chunks, space-split', 'N/A', 'N/A', 'N/A', 30, 34, 38, 31, 33, 166);