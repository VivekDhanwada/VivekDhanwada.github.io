---
name: NSW Opal Card Tap-On/Tap-Off Analysis
tools: [PostgreSQL, SQL, Tableau, Transport Analysis]
image: https://public.tableau.com/static/images/NS/NSW_Opal_Card_Tap_Analysis/NSWOpalCardTap-OnTap-OffAnalysis/4_3.png
description: Analysed 398K rows of real NSW Transport Opal card data using PostgreSQL and Tableau, comparing travel behaviour between a standard November week and the Christmas/New Year period.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/03-nsw-opal-card
---

## Overview

An exploratory analysis of real NSW Transport Opal card tap-on/tap-off data across two contrasting one-week periods: a standard November week (Nov 21-27, 2016) and the Christmas/New Year period (Dec 26, 2016 - Jan 1, 2017). The project uses PostgreSQL for data loading, cleaning, and analysis, with Tableau used to visualise travel behaviour, location demand, and service disruption patterns.

The dataset includes 398,019 rows across train, bus, ferry, and light rail records.

## Analytical Questions

1. How did travel behaviour shift during the Christmas/New Year period?
2. Which transport modes and locations showed the strongest demand changes?
3. What disruption patterns appeared in the service alerts data?

## Key Findings

**Holiday travel behaviour changed demand patterns**  
Morning peak demand fell sharply in December, while ferry travel increased, suggesting a shift from commuter travel to holiday-period leisure travel. Weekday travel dropped 50%, while weekend travel remained comparatively stable.

**Circular Quay showed clear holiday-period uplift**  
Circular Quay was the only top location where December tap volume exceeded November, reaching 490,482 taps and rising from 10th to 4th busiest location, consistent with increased ferry activity during the holiday period. Sydney CBD (postcode 2000) and Town Hall Station remained the highest-volume locations across both periods.

**Disruption impact varied by alert type**  
Trip and delay alerts were the most frequent disruption types. Incident alerts had the longest average duration in December, suggesting that lower-frequency events can still create significant operational impact.

## Skills Demonstrated

- SQL data cleaning and transformation
- PostgreSQL querying and aggregation
- CTEs, joins, window functions, and date/time extraction
- Tableau dashboard development
- Transport demand and disruption analysis

## Limitations

The analysis compares two one-week periods, so findings are illustrative rather than statistically representative of broader seasonal trends. Tap-on and tap-off records are separate rows, so origin-destination analysis was not possible.

## Live Dashboard

<a href="https://public.tableau.com/views/NSW_Opal_Card_Tap_Analysis/NSWOpalCardTap-OnTap-OffAnalysis" target="_blank" rel="noopener noreferrer">View on Tableau Public</a>
