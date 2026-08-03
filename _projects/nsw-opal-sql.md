---
name: NSW Opal Card Tap-On/Tap-Off Analysis
order: 4
redirect_from:
  - /projects/02-nsw-opal-sql/
  - /projects/03-nsw-opal-sql/
  - /projects/03-nsw-opal-card/
tools: [PostgreSQL, SQL, Tableau]
image: https://public.tableau.com/static/images/NS/NSW_Opal_Card_Tap_Analysis/NSWOpalCardTap-OnTap-OffAnalysis/4_3.png
description: Analysed 398,019 rows of real Transport for NSW Opal card data using PostgreSQL and Tableau, comparing travel behaviour between a standard November week and the Christmas/New Year period.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/03-nsw-opal-card
---

# NSW Opal Card Tap-On/Tap-Off Analysis

Transport planners rely on aggregate ridership figures to guide service levels, but aggregate numbers can mask very different underlying shifts. A 50% drop in total weekday volume and an 80% collapse in the 8:15am morning peak look like the same story at different scales, but they imply very different planning responses, one is a general decline, the other is a structural disappearance of the commuter peak itself.

**Key Result:** Total weekday travel volume fell by 50% during the Christmas/New Year period, with morning peak demand (8:15am) dropping even more sharply at 80%. Ferry usage increased and Circular Quay became one of the busiest locations in the network, indicating a shift from commuter travel to leisure-focused travel behaviour.

## Overview

An exploratory analysis of real Transport for NSW Opal card tap-on/tap-off data across two contrasting one-week periods: a standard November week (Nov 21-27, 2016) and the Christmas/New Year period (Dec 26, 2016 - Jan 1, 2017). The project uses PostgreSQL for data loading, cleaning, and analysis, with Tableau used to visualise travel behaviour, location demand, and service disruption patterns.

The dataset includes 398,019 rows across train, bus, ferry, and light rail records.

## Project Preview

### Service Disruptions Dashboard

![Service Disruptions](https://public.tableau.com/static/images/NS/NSW_Opal_Card_Tap_Analysis/NSWOpalCardTap-OnTap-OffAnalysis/4_3.png)

## Analytical Questions

1. How did travel behaviour shift during the Christmas/New Year period?
2. Which transport modes and locations showed the strongest demand changes?
3. What disruption patterns appeared in the service alerts data?

## Key Findings

**Holiday travel behaviour changed demand patterns**  
Morning peak demand (8:15am) fell 80% in December, while ferry travel increased, suggesting a shift away from regular commuter travel during the holiday period. Total weekday volume dropped 50%, while weekend travel remained comparatively stable.

**Circular Quay showed clear holiday-period uplift**  
Circular Quay was the only top location where December tap volume exceeded November, reaching 490,482 taps and rising from 10th to 4th busiest location, consistent with increased ferry activity during the holiday period. Sydney CBD (postcode 2000) and Town Hall Station remained the highest-volume locations across both periods.

**Disruption impact varied by alert type**  
Trip and delay alerts were the most frequent disruption types. Incident alerts had the longest average duration in December, suggesting that lower-frequency events can still create significant operational impact.

## Data & Methodology

### Data Sources
- Transport for NSW Opal card tap-on/tap-off dataset
- Transport for NSW service alerts dataset
- November 21–27, 2016 travel period
- December 26, 2016 – January 1, 2017 travel period

### Dataset Scope
- 398,019 transport transactions
- Four transport modes: train, bus, ferry, and light rail
- Two contrasting one-week travel periods
- Service disruption and delay records

## Skills Demonstrated

- SQL data cleaning and transformation
- PostgreSQL querying, aggregation, and multi-table joins
- Common Table Expressions (CTEs)
- Window functions and analytical queries
- Tableau dashboard development
- Transport demand and disruption analysis
- Data storytelling and insight communication

## Limitations

The analysis compares two one-week periods, so findings are illustrative rather than statistically representative of broader seasonal trends. Tap-on and tap-off records are separate rows, so origin-destination analysis was not possible. Approximately 13% of rows (22,425 records) had missing tap direction values; these were retained for volume analysis but excluded from directional analysis to avoid skewing results.

## Live Dashboard

<a href="https://public.tableau.com/views/NSW_Opal_Card_Tap_Analysis/NSWOpalCardTap-OnTap-OffAnalysis" target="_blank" rel="noopener noreferrer">View on Tableau Public</a>

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/03-nsw-opal-card" target="_blank" rel="noopener noreferrer">View full project files on GitHub →</a>