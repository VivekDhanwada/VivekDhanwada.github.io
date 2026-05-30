---
name: NEM Emissions & Bidding Analysis
tools: [Python, pandas, Matplotlib, Time Series Analysis]
image: /assets/images/projects/nem-emissions-bidding.png
description: Analysed 1.6M+ rows of Australian National Electricity Market data using Python, uncovering regional emissions trends, generator bidding behaviour, and market structure changes between 2019 and 2025.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/01-nem-emissions-bidding
---


# NEM Emissions & Bidding Analysis

## Overview

A Python-based analysis of emissions intensity and generator bidding behaviour in the Australian National Electricity Market (NEM).

Using more than 1.6 million rows of dispatch and emissions data, the project examines how Australia's electricity market evolved between 2019 and 2025, focusing on regional decarbonisation trends, fossil-fuel bidding behaviour, and differences in market structure across NEM regions.

This analysis was completed as part of a Macquarie University capstone project and received a Distinction.

**Key Result:** NSW reduced carbon intensity by 21.7% between 2019 and 2025, while fossil fuel generator bid-price volatility increased substantially, with the interquartile range widening from $85/MWh to $210/MWh.

## Analytical Questions

1. How did carbon intensity change across NEM regions between 2019 and 2025?
2. How did fossil fuel generator bidding behaviour shift over the same period?
3. What regional and intra-daily emissions patterns were visible in the data?

## Key Findings

**NSW showed the strongest carbon intensity improvement**  
NSW achieved a 21.7% reduction in carbon intensity between 2019 and 2025, compared with a national average decline of 7.7%.

**Fossil generator bidding became more volatile**  
Fossil generators shifted from baseload providers toward more strategic peak-pricing behaviour. The fossil bid price interquartile range widened from $85/MWh to $210/MWh.

**Regional emissions patterns varied significantly**  
Time series and intra-daily trend charts showed clear differences in emissions profiles across NEM regions, highlighting the importance of region-level analysis.

## Project Preview

### Regional Emissions Comparison

![Regional Emissions Comparison](/assets/images/projects/nem-emissions-bidding.png)

## Data & Methodology

### Data Sources
- CSIRO NEM Emissions API
- NEM generator bidding datasets (2019 and 2025)
- Five NEM regions: NSW, VIC, QLD, SA and TAS

### Dataset Size
- Over 1.6 million rows of dispatch and emissions data
- Five-minute interval observations across multiple years
- Generator bidding and emissions records analysed across regions and technologies

## Skills Demonstrated

- Data collection and preparation
- Python data cleaning and transformation
- Time series analysis using 5-minute interval market data
- Regional comparison and trend analysis
- Market behaviour and bidding analysis
- Matplotlib data visualisation
- Translating technical findings into business insights

## Contribution Note

This was a group capstone project completed at Macquarie University. The Python code included in the linked repository is the cleaned, shareable version of the project code. The report PDF is an excerpt of the collaborative group report with the cover page removed. Full group authorship is acknowledged.

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/01-nem-emissions-bidding" target="_blank" rel="noopener noreferrer">View full project files on GitHub →</a>
