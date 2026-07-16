---
name: Spotify Snowflake Pipeline
tools: [Python, AWS Lambda, AWS S3, Snowpipe, Snowflake, SQL]
image: https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png
description: Built a fully automated ELT pipeline extracting playlist data from the Spotify API through AWS Lambda, staging it in S3, and auto-ingesting it into Snowflake via Snowpipe, verified end-to-end with zero manual intervention.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/08-spotify-snowflake-pipeline
---

# Spotify Snowflake Pipeline

## Overview

A serverless ELT pipeline extracting playlist data from the Spotify API, transforming it through AWS Lambda, and auto-ingesting it into Snowflake via Snowpipe. A personal project built to deepen practical experience with cloud data engineering, centered on AWS (Lambda, S3, IAM) with Snowflake as the destination warehouse.

**Key Result:** Built a fully automated Extract-Transform-Load pipeline using AWS Lambda, S3, and Snowflake Snowpipe. New playlist data flows into query-ready Snowflake tables with zero manual intervention, verified end-to-end by triggering a live run and confirming row counts increased purely through automated ingestion.

## Pipeline Architecture

![Pipeline Architecture](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png)

## Key Decisions

1. **Storage Integration over static credentials.** IAM role-based trust with Snowflake avoids long-lived AWS secrets and scopes access to a single S3 path.
2. **SQS as the Snowpipe notification layer.** Decouples file arrival from ingestion timing, since Snowpipe polls its queue rather than being directly invoked.
3. **Deduplication via views, not at ingestion.** Snowpipe only supports `COPY INTO`, not `MERGE`, so duplicate handling is solved with self-correcting views rather than complicating the ingestion layer.

## Key Findings

**Pipeline verification confirmed full automation**  
Triggering the Extract Lambda manually caused row counts to increase automatically across all three tables (albums, artists, songs) with no manual `COPY INTO` required, confirming the Load layer works exactly as designed.

**Raw ingestion revealed real duplicate accumulation**  
The artist table contained 3 rows despite only 1 unique artist across the entire playlist, expected given Snowpipe's append-only ingestion model. Solved permanently via deduplicated views.

## Verification

![Pipeline Verification](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/verification.png)

## Tech Stack

- Python (`spotipy`, `boto3`, `pandas`)
- SQL
- AWS Lambda
- AWS S3
- AWS IAM
- Snowpipe
- Snowflake

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/08-spotify-snowflake-pipeline" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>