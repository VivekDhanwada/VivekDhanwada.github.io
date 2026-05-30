---
name: Spain at Euro 2024 — A Tactical Analysis
tools: [Python, API, pandas, Matplotlib, Tableau, Sports Analytics]
image: https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/spain-euro-2024/screenshots/shot-analysis.png
description: Analysed Spain's UEFA Euro 2024 campaign using StatsBomb open event data accessed via raw API calls, examining attacking threat, defensive pressing, and passing network structure across all seven matches and benchmarked against all 24 tournament teams.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/spain-euro-2024
---

# Spain at Euro 2024 — A Tactical Analysis

## Overview

A Python and Tableau analysis of Spain's UEFA Euro 2024 campaign using StatsBomb open event data. The project answers three tactical questions across attacking threat, defensive pressing, and passing network structure — benchmarked against all 24 teams in the tournament.

## Analytical Questions

1. Where did Spain's shots originate, and which players arrived in goal-scoring positions?
2. How high did Spain press, and where did they win the ball back?
3. How distributed was Spain's passing network, and what does it reveal about Spain's positional structure?

## Key Findings

**Spain ranked #1 in goals, pressures, and recoveries at Euro 2024**
14 goals from 10 different scorers across every position. The centre forward (Morata) scored once. Spain scored above their xG (14 goals from 10.57 xG), indicating clinical finishing.

**Pressing was coordinated, not positional**
1,126 pressures ranked #1 in the tournament. 76% occurred in the middle and attacking thirds — evidence of a structured team press rather than a rigid high or low block.

**Build-up was driven by defenders and midfielders**
4,335 passes ranked #2 behind England. Laporte, Rodri, and Fabián Ruiz combined for 1,337 passes. The passing network identified 35 strong combinations, with forwards operating as receivers rather than distributors.

## Dashboard Preview

![Shot Analysis](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/spain-euro-2024/screenshots/shot-analysis.png)
![Press Analysis](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/spain-euro-2024/screenshots/press-analysis.png)
![Pass Analysis](https://raw.githubusercontent.com/VivekDhanwada/data-analytics-portfolio/main/spain-euro-2024/screenshots/pass-analysis.png)

## Tech Stack

- Python, pandas, Matplotlib
- StatsBomb Open Data API
- Tableau

## Live Dashboard

<a href="https://public.tableau.com/views/spain-euro-2024-tactical-analysis/spain-euro-2024-tactical-analysis" target="_blank" rel="noopener noreferrer">View Interactive Dashboard on Tableau Public →</a>

## Project Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/spain-euro-2024" target="_blank" rel="noopener noreferrer">View full project files on GitHub →</a>