-- Create LogicKor table with separate singleton and multiturn metrics
CREATE TABLE logickor (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  math_singleton DECIMAL(4,2),
  math_multiturn DECIMAL(4,2),
  grammar_singleton DECIMAL(4,2),
  grammar_multiturn DECIMAL(4,2),
  comprehension_singleton DECIMAL(4,2),
  comprehension_multiturn DECIMAL(4,2),
  writing_singleton DECIMAL(4,2),
  writing_multiturn DECIMAL(4,2),
  reasoning_singleton DECIMAL(4,2),
  reasoning_multiturn DECIMAL(4,2),
  coding_singleton DECIMAL(4,2),
  coding_multiturn DECIMAL(4,2),
  average DECIMAL(4,2)
);

-- Insert data
INSERT INTO logickor (
  name,
  math_singleton, math_multiturn,
  grammar_singleton, grammar_multiturn,
  comprehension_singleton, comprehension_multiturn,
  writing_singleton, writing_multiturn,
  reasoning_singleton, reasoning_multiturn,
  coding_singleton, coding_multiturn,
  average
) VALUES
('EXAONE-3.0-7.8B-Instruct', 7.00, 6.57, 8.57, 7.43, 9.86, 10.00, 9.71, 9.71, 9.14, 7.14, 9.29, 9.14, 8.63),
('EXAONE-3.5-2.4B-Instruct', 8.43, 7.14, 6.43, 4.86, 9.71, 9.86, 9.86, 9.71, 8.57, 9.43, 9.43, 9.71, 8.60),
('EXAONE-3.5-7.8B-Instruct', 10.00, 8.29, 6.43, 8.71, 9.71, 9.57, 9.57, 9.71, 9.00, 9.43, 9.86, 10.00, 9.19),
('EXAONE-3.5-32B-Instruct', 9.29, 9.86, 8.57, 8.71, 9.86, 9.14, 9.71, 10.00, 9.00, 9.29, 10.00, 10.00, 9.45),
('250101_ixi-GEN-12B-model_stock', 8.86, 9.71, 9.00, 9.29, 9.86, 10.00, 9.29, 10.00, 8.14, 10.00, 9.29, 9.86, 9.44),
('250101_ixi-GEN-12B-RAG', 7.57, 7.57, 7.57, 9.86, 9.86, 9.00, 9.86, 9.71, 9.14, 9.14, 9.29, 9.71, 9.02),
('250202_ixi-GEN-RAG-32B-Instruct', 8.29, 6.14, 8.86, 9.00, 9.57, 10.00, 9.71, 9.43, 8.86, 10.00, 9.86, 9.71, 9.12);



create table models (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null,
  kmmlu numeric not null,
  gsm8k numeric not null,
  gsm8k_ko numeric not null,
  ifeval numeric not null,
  haerae numeric not null,
  kobest numeric not null,
  mmlu numeric not null,
  mmlu_pro numeric not null,
  bbh numeric not null,
  csatqa numeric not null,
  gpqa numeric not null,
  arc_c numeric not null,
  rank integer not null,
  average numeric generated always as (
    (kmmlu + gsm8k + gsm8k_ko + ifeval + haerae + kobest + mmlu + mmlu_pro + bbh + csatqa + gpqa + arc_c) / 12.0
  ) stored
);

-- Create indexes for better performance
create index models_rank_idx on models(rank);
create index models_name_idx on models(name);
create index models_average_idx on models(average);
create index models_type_idx on models(type);



insert into models (
  name,
  type,
  kmmlu,
  gsm8k,
  gsm8k_ko,
  ifeval,
  haerae,
  kobest,
  mmlu,
  mmlu_pro,
  bbh,
  csatqa,
  gpqa,
  arc_c,
  rank
) values 
('250202_ixi-GEN-RAG-32B-Instruct', 'ixi', 54.17, 82.18, 72.78, 73.57, 92.21, 84.65, 73.69, 48.31, 78.88, 49.73, 35.86, 60.58, 1),
('LGAI-EXAONE/EXAONE-3.5-32B-Instruct', 'exaone', 47.52, 66.26, 64.29, 81.52, 83.41, 84.29, 74.26, 47.97, 66.93, 51.34, 37.37, 59.98, 2),
('Qwen/Qwen2.5-14B-Instruct', 'qwen', 57.95, 83.17, 65.96, 80.41, 73.42, 81.34, 79.84, 52.39, 17.95, 55.61, 38.38, 60.49, 3),
('250101_ixi-GEN-12B-RAG', 'ixi', 44.75, 86.73, 63.91, 79.48, 82.58, 78.96, 62.62, 36.92, 63.26, 35.83, 28.79, 53.5, 4),
('250101_ixi-GEN-12B-linear-6', 'ixi', 44.44, 86.81, 64.59, 78.19, 82.68, 79.13, 62.53, 36.4, 62.4, 36.9, 29.29, 53.58, 5),
('250101_ixi-GEN-12B-linear', 'ixi', 44.72, 85.9, 64.06, 79.85, 81.85, 79.1, 62.53, 36.55, 60.57, 35.83, 29.29, 52.56, 6),
('250101_ixi-GEN-12B-model_stock', 'ixi', 44.73, 86.28, 63.68, 79.67, 81.3, 79.08, 62.69, 36.29, 60.76, 36.36, 29.29, 52.56, 7),
('250101_ixi-GEN-12B-della', 'ixi', 43.77, 85.9, 65.81, 79.48, 82.77, 78.26, 61.91, 36.29, 62.65, 35.29, 26.77, 52.73, 8),
('250101_ixi-GEN-12B-ties', 'ixi', 42.64, 84.91, 67.32, 80.59, 79.56, 77.64, 62.13, 35.07, 58.33, 31.55, 29.29, 52.56, 9),
('Qwen/Qwen2.5-7B-Instruct', 'qwen', 46.12, 79.38, 60.2, 71.72, 65.81, 77.03, 74.24, 44.86, 45.51, 45.99, 34.85, 52.3, 10),
('241218_ixi-R-12B-ep2', 'ixi', 43.08, 78.77, 57.7, 75.6, 82.13, 77.86, 60.82, 33.7, 63.06, 36.9, 29.8, 52.05, 11),
('241216_ixi-12B-ep3', 'ixi', 41.0, 79.38, 63.68, 78.0, 82.22, 77.21, 59.67, 32.98, 62.17, 35.83, 27.78, 50.94, 12),
('mistralai/Mistral-Nemo-Instruct-2407', 'mistral', 43.47, 74.22, 53.07, 58.41, 72.23, 76.29, 68.32, 44.2, 72.31, 36.36, 35.35, 56.06, 13),
('241216_ixi-12B-ep2', 'ixi', 42.21, 79.91, 62.55, 77.45, 79.38, 75.76, 60.05, 32.56, 63.11, 31.55, 29.29, 52.13, 14),
('241218_ixi-R-12B-ep3', 'ixi', 41.0, 79.08, 57.47, 76.71, 82.22, 77.21, 61.06, 33.87, 62.34, 35.29, 28.28, 50.09, 15),
('LGAI-EXAONE/EXAONE-3.5-7.8B-Instruct', 'exaone', 44.93, 50.87, 55.19, 78.74, 78.28, 78.43, 65.63, 40.76, 53.0, 40.64, 33.84, 56.48, 16),
('meta-llama/Llama-3.1-8B-Instruct', 'llama', 41.66, 77.79, 52.31, 73.75, 63.79, 69.85, 68.24, 40.88, 70.9, 36.9, 27.78, 51.62, 17),
('241206_ixi-GEN-RAG-12B-Instruct', 'ixi', 44.45, 80.89, 53.45, 78.37, 75.34, 78.54, 62.87, 32.55, 48.79, 35.83, 31.31, 52.3, 18),
('241216_ixi-12B-ep1', 'ixi', 41.89, 76.65, 58.15, 71.9, 79.29, 75.8, 58.47, 31.24, 62.25, 36.36, 28.79, 50.17, 19),
('241206_ixi-GEN-12B-Instruct', 'ixi', 41.87, 82.87, 61.18, 80.41, 73.69, 76.58, 61.81, 32.66, 49.69, 29.95, 29.8, 49.83, 20),
('LGAI-EXAONE/EXAONE-3.0-7.8B-Instruct', 'exaone', 44.5, 59.14, 49.05, 64.88, 77.6, 79.1, 64.26, 38.51, 53.6, 40.64, 33.84, 56.48, 21),
('241218_ixi-R-12B-ep1', 'ixi', 39.74, 75.59, 53.6, 69.69, 76.17, 74.08, 58.28, 31.91, 60.99, 36.9, 27.27, 51.54, 22),
('tiiuae/Falcon3-10B-Instruct', 'falcon', 22.78, 81.88, 27.67, 74.86, 37.4, 60.69, 73.06, 49.63, 75.99, 24.6, 40.91, 58.11, 23),
('241223_EXAONE3.5-2.4B-GKD-Instruct', 'exaone', 42.77, 53.9, 49.66, 74.31, 66.18, 74.36, 59.11, 33.77, 45.51, 37.97, 28.79, 51.11, 24),
('LGAI-EXAONE/EXAONE-3.5-2.4B-Instruct', 'exaone', 42.8, 49.96, 46.78, 75.42, 66.27, 74.35, 59.14, 33.95, 44.97, 37.43, 29.29, 50.43, 25);
