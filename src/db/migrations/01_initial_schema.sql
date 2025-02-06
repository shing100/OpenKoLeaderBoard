-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create models table
CREATE TABLE IF NOT EXISTS models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    rank INTEGER,
    kmmlu DECIMAL(5,2) NOT NULL CHECK (kmmlu >= 0 AND kmmlu <= 100),
    gsm8k DECIMAL(5,2) NOT NULL CHECK (gsm8k >= 0 AND gsm8k <= 100),
    gsm8k_ko DECIMAL(5,2) NOT NULL CHECK (gsm8k_ko >= 0 AND gsm8k_ko <= 100),
    ifeval DECIMAL(5,2) NOT NULL CHECK (ifeval >= 0 AND ifeval <= 100),
    haerae DECIMAL(5,2) NOT NULL CHECK (haerae >= 0 AND haerae <= 100),
    kobest DECIMAL(5,2) NOT NULL CHECK (kobest >= 0 AND kobest <= 100),
    mmlu DECIMAL(5,2) NOT NULL CHECK (mmlu >= 0 AND mmlu <= 100),
    mmlu_pro DECIMAL(5,2) NOT NULL CHECK (mmlu_pro >= 0 AND mmlu_pro <= 100),
    bbh DECIMAL(5,2) NOT NULL CHECK (bbh >= 0 AND bbh <= 100),
    csatqa DECIMAL(5,2) NOT NULL CHECK (csatqa >= 0 AND csatqa <= 100),
    gpqa DECIMAL(5,2) NOT NULL CHECK (gpqa >= 0 AND gpqa <= 100),
    arc_c DECIMAL(5,2) NOT NULL CHECK (arc_c >= 0 AND arc_c <= 100),
    average DECIMAL(5,2) NOT NULL,
    CONSTRAINT unique_model_name UNIQUE (name)
);

-- Create logickor table
CREATE TABLE IF NOT EXISTS logickor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    rank INTEGER,
    math_singleton DECIMAL(5,2) NOT NULL CHECK (math_singleton >= 0 AND math_singleton <= 100),
    math_multiturn DECIMAL(5,2) NOT NULL CHECK (math_multiturn >= 0 AND math_multiturn <= 100),
    grammar_singleton DECIMAL(5,2) NOT NULL CHECK (grammar_singleton >= 0 AND grammar_singleton <= 100),
    grammar_multiturn DECIMAL(5,2) NOT NULL CHECK (grammar_multiturn >= 0 AND grammar_multiturn <= 100),
    comprehension_singleton DECIMAL(5,2) NOT NULL CHECK (comprehension_singleton >= 0 AND comprehension_singleton <= 100),
    comprehension_multiturn DECIMAL(5,2) NOT NULL CHECK (comprehension_multiturn >= 0 AND comprehension_multiturn <= 100),
    writing_singleton DECIMAL(5,2) NOT NULL CHECK (writing_singleton >= 0 AND writing_singleton <= 100),
    writing_multiturn DECIMAL(5,2) NOT NULL CHECK (writing_multiturn >= 0 AND writing_multiturn <= 100),
    reasoning_singleton DECIMAL(5,2) NOT NULL CHECK (reasoning_singleton >= 0 AND reasoning_singleton <= 100),
    reasoning_multiturn DECIMAL(5,2) NOT NULL CHECK (reasoning_multiturn >= 0 AND reasoning_multiturn <= 100),
    coding_singleton DECIMAL(5,2) NOT NULL CHECK (coding_singleton >= 0 AND coding_singleton <= 100),
    coding_multiturn DECIMAL(5,2) NOT NULL CHECK (coding_multiturn >= 0 AND coding_multiturn <= 100),
    average DECIMAL(5,2) NOT NULL,
    CONSTRAINT unique_logickor_name UNIQUE (name)
);

-- Create rag table
CREATE TABLE IF NOT EXISTS rag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    rank INTEGER,
    service VARCHAR(255) NOT NULL,
    generator VARCHAR(255) NOT NULL,
    parser VARCHAR(255) NOT NULL,
    semantic VARCHAR(255) NOT NULL,
    lexical VARCHAR(255),
    web VARCHAR(255),
    rerank VARCHAR(255),
    fusion VARCHAR(255),
    finance INTEGER NOT NULL CHECK (finance >= 0 AND finance <= 60),
    public INTEGER NOT NULL CHECK (public >= 0 AND public <= 60),
    medical INTEGER NOT NULL CHECK (medical >= 0 AND medical <= 60),
    law INTEGER NOT NULL CHECK (law >= 0 AND law <= 60),
    commerce INTEGER NOT NULL CHECK (commerce >= 0 AND commerce <= 60),
    total INTEGER NOT NULL CHECK (total >= 0 AND total <= 300),
    CONSTRAINT unique_rag_service UNIQUE (service)
);

-- Create function to update ranks
CREATE OR REPLACE FUNCTION update_model_ranks()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE models
    SET rank = ranks.rank
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY average DESC) as rank
        FROM models
    ) ranks
    WHERE models.id = ranks.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_logickor_ranks()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE logickor
    SET rank = ranks.rank
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY average DESC) as rank
        FROM logickor
    ) ranks
    WHERE logickor.id = ranks.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_rag_ranks()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE rag
    SET rank = ranks.rank
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY total DESC) as rank
        FROM rag
    ) ranks
    WHERE rag.id = ranks.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for rank updates
CREATE TRIGGER update_model_ranks_trigger
AFTER INSERT OR UPDATE OR DELETE ON models
FOR EACH STATEMENT
EXECUTE FUNCTION update_model_ranks();

CREATE TRIGGER update_logickor_ranks_trigger
AFTER INSERT OR UPDATE OR DELETE ON logickor
FOR EACH STATEMENT
EXECUTE FUNCTION update_logickor_ranks();

CREATE TRIGGER update_rag_ranks_trigger
AFTER INSERT OR UPDATE OR DELETE ON rag
FOR EACH STATEMENT
EXECUTE FUNCTION update_rag_ranks();

-- Create indexes for better performance
CREATE INDEX idx_models_average ON models(average DESC);
CREATE INDEX idx_logickor_average ON logickor(average DESC);
CREATE INDEX idx_rag_total ON rag(total DESC);
