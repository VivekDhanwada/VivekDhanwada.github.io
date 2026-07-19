---
name: Spotify Snowflake Pipeline
tools: [Python, AWS Lambda, AWS S3, Snowpipe, Snowflake, SQL]
image: https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png
description: Built a fully automated pipeline that pulls listening data from the Spotify API and loads it into Snowflake with zero manual work, verified end-to-end with a live test run.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/08-spotify-snowflake-pipeline
---

# Spotify Snowflake Pipeline

## Overview

A fully automated data pipeline that pulls listening data from the Spotify API, processes it, and loads it into Snowflake with zero manual work required. Built to gain hands-on experience with cloud data engineering, using AWS as the automation layer and Snowflake as the destination warehouse.

**Key Result:** New playlist data flows automatically from the Spotify API into query-ready Snowflake tables with no manual steps. Verified this end-to-end by triggering a live run and confirming the data updated correctly on its own.

## Pipeline Architecture

![Pipeline Architecture](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/08-spotify-snowflake-pipeline/images/architecture.png)

## Key Decisions

1. **Secure by design.** Connected AWS and Snowflake using role-based access rather than stored passwords or keys, so no sensitive credentials are sitting in the system long-term.
2. **Scalable by design.** The storage integration and SQS-based ingestion pattern extend to new data types without rework, adding a new Snowpipe for a future data feed is just one more pipe using the same integration and queue.
3. **Solved a real data-quality problem cleanly.** Snowflake's automated ingestion tool can't update existing records, only add new ones, so repeated runs would create duplicates. Fixed this by building self-correcting views that clean the data automatically every time it's queried, rather than requiring manual cleanup.

## Key Findings

**Full automation confirmed**  
The pipeline was designed to run automatically every day with no manual steps. It ran successfully unattended for several consecutive days, with new data landing correctly in Snowflake purely through the scheduled trigger. Manual runs were only used later, to speed up testing specific fixes, not to prove the automation itself.

**Caught a real data-quality issue**  
Found that the automated ingestion process was creating duplicate records, exactly as expected given how the ingestion tool works. Solved this permanently with database views that filter out duplicates automatically, so anyone querying the data always sees clean results.

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