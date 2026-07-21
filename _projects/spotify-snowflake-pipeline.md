---
name: Spotify Snowflake Pipeline
order: 1
redirect_from:
  - /projects/01-spotify-snowflake-pipeline/
  - /projects/08-spotify-snowflake-pipeline/
tools: [Python, AWS Lambda, AWS S3, Snowpipe, Snowflake, SQL]
image: https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png
description: A fully automated pipeline that pulls listening data from the Spotify API and loads it into Snowflake with zero manual work, running unattended via a daily scheduled trigger.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/08-spotify-snowflake-pipeline
---

# Spotify Snowflake Pipeline

## Overview

A serverless data pipeline that extracts listening data from the Spotify API, transforms it, and loads it into Snowflake on a daily automated schedule. AWS handles orchestration end to end; Snowflake is the destination warehouse, kept continuously in sync with no manual steps.

**Key Result:** The pipeline runs automatically every day via a scheduled trigger, with no manual intervention from extract through to load. It operated unattended for several consecutive days, correctly ingesting new data on every run.

## Pipeline Architecture

![Pipeline Architecture](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png)

## Key Decisions

1. **Secure by design.** AWS and Snowflake are connected using role-based access rather than stored passwords or keys, so no long-lived credentials sit in the system.
2. **Scalable by design.** The storage integration and SQS-based ingestion pattern extend to new data sources without rework, adding a new feed is a matter of wiring up one more pipe against the same integration and queue.
3. **Data quality handled at the right layer.** Snowflake's automated ingestion tool only appends, it can't update existing records, so repeated runs naturally produce duplicates. Rather than complicating ingestion to prevent this, self-correcting views resolve it at query time, so every read reflects clean, deduplicated data.

## Key Findings

**Automation held up under real conditions**  
The scheduled pipeline ran unattended for several consecutive days, with new data landing correctly in Snowflake on every run, no manual steps involved.

**A real data-quality issue surfaced and was resolved**  
The automated ingestion process was producing duplicate records, a direct consequence of how the ingestion tool works. This was resolved permanently with database views that filter duplicates automatically, so any query against the data returns clean results without manual cleanup.

## Tech Stack

- Python
- SQL
- AWS Lambda
- AWS S3
- AWS IAM
- Snowpipe
- Snowflake

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/08-spotify-snowflake-pipeline" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>