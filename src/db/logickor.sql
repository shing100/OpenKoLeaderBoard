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