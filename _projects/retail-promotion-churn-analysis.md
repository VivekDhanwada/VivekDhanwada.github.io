---
name: Retail Promotion and Churn Analysis
order: 1
tools: [Python, BigQuery, dbt, GitHub Actions, Power BI]
image: https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/07-retail-promotion-churn-analysis/PowerBI/promotion-effectiveness.png
description: End-to-end retail analytics pipeline ingesting 2.6M transactions into BigQuery, transforming with dbt, and delivering a Power BI dashboard with a concrete budget reallocation recommendation based on promotion effectiveness and churn analysis.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/07-retail-promotion-churn-analysis
---
# Retail Promotion and Churn Analysis
## Overview
An end-to-end retail analytics project using Dunnhumby "The Complete Journey" dataset. The project ingests 8 source tables into BigQuery via a Python pipeline, transforms them through dbt staging, intermediate, and marts layers with automated data quality testing and GitHub Actions CI, and delivers an interactive Power BI dashboard with a concrete budget reallocation recommendation.
**Business Question:** How should a retailer reallocate promotional spend to maximise repeat purchasing and long-term customer value?
**Key Finding:** Coupon-redeemed transactions average $54 per basket, more than double the non-promoted baseline of $25, though this may reflect self-selection by high-value customers rather than a causal promotion effect. Mass-market display and mailer promotions average $7-9. 7.25% of customers churned, with near-identical promotional coverage between churned and active customers, suggesting promotion exposure alone does not explain churn.
## Analytical Questions
1. Which promotion types and campaign strategies generate the highest basket value?
2. Do promotions accelerate repeat purchasing beyond a customer's baseline frequency?
3. Which customer segments churn regardless of promotional activity?
4. Where should the retailer reallocate promotional budget?
## Key Findings
**Coupon promotions significantly outperform mass-market alternatives**
Coupon-redeemed transactions average $54 per basket vs $25 non-promoted, $9 mailer, and $7 display. TypeA and TypeC campaigns consistently outperform TypeB. Whether this reflects coupon effectiveness or self-selection by high-value customers requires controlled experimentation to confirm.
**Promotion exposure does not explain churn**
7.25% churn rate concentrated in 65+ and 19-24 age groups. Churned and active customers received near-identical promotional coverage (22.50% vs 22.27%), suggesting churn is driven by factors other than promotion volume.
**Statistical note**
Chi-square test (n=2,482 promoted, n=18 non-promoted) found a statistically significant difference in repeat purchase rate between promoted and non-promoted customers (p=0.0011), though the small non-promoted sample limits interpretability.
## Recommendation
Shift promotional budget away from mass-market display and mailer campaigns toward targeted coupon campaigns, prioritising TypeA and TypeC. Preventatively target 65+ and 19-24 customer segments before churn occurs rather than continuing spend on already-churned customers.
## Dashboard Preview
### Promotion Effectiveness
![Promotion Effectiveness](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/07-retail-promotion-churn-analysis/PowerBI/promotion-effectiveness.png)
### Churn Analysis
![Churn Analysis](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/07-retail-promotion-churn-analysis/PowerBI/churn-analysis.png)
## Tech Stack
- Python
- Google BigQuery
- SQL
- dbt Core
- GitHub Actions
- Power BI, Power Query and DAX
## Live Dashboard
<a href="https://app.powerbi.com/view?r=eyJrIjoiZTc3ZDgzNjctZTk3Mi00MWY4LTg0ZDEtYzMxNGIzZTJjZjZhIiwidCI6IjgzMzEwYTYxLWIyNzktNGNiMS1hNGIzLWVlMGEyNTI5ODVmZCJ9&embedImagePlaceholder=true&pageName=5f973117ebb3c400dbc3" target="_blank" rel="noopener noreferrer">View Interactive Dashboard →</a>
## Source Code & Files
<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/07-retail-promotion-churn-analysis" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>