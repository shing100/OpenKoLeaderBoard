# Database Migrations

## Structure

The database schema consists of three main tables:

1. `models` - Main leaderboard for Korean language models
2. `logickor` - Logical reasoning evaluation results
3. `rag` - Retrieval-Augmented Generation component evaluation

## Running Migrations

1. Connect to your Supabase project
2. Run the migrations in order:
   ```sql
   -- First run the schema
   \i 01_initial_schema.sql
   
   -- Then optionally add sample data
   \i 02_sample_data.sql
   ```

## Tables

### models
- Stores main benchmark results for language models
- Includes scores for KMMLU, GSM8K, and other benchmarks
- Automatically calculates and updates rankings

### logickor
- Stores results for logical reasoning tasks
- Includes both singleton and multi-turn evaluation scores
- Automatically calculates and updates rankings

### rag
- Stores RAG component evaluation results
- Includes scores for different domains
- Automatically calculates and updates rankings

## Indexes

Optimized indexes are created for:
- Model rankings by average score
- LogicKor rankings by average score
- RAG rankings by total score

## Triggers

Automatic rank updates are handled by triggers on:
- INSERT
- UPDATE
- DELETE
