---
name: Big Data & Algorithms
order: 10
tools: [Python, mrjob, MongoDB]
image: /assets/images/projects/big-data-algorithms-cover.svg
description: Two coursework projects implementing distributed processing and spatial search algorithms from scratch, a MapReduce pipeline analysing coffee sales data and an R-Tree nearest neighbour search achieving over 600x speedup versus brute-force.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/10-big-data-algorithms
---

# Big Data & Algorithms

## Overview

Two applied Big Data assignments implementing core algorithms from first principles, without relying on pre-built libraries for the core logic: a MapReduce pipeline analysing coffee sales transactions, and an R-Tree spatial index with nearest neighbour search.

**Note:** This page consolidates coursework from a single Big Data unit across two separate assignments, presented to showcase algorithmic implementation from scratch.

## Key Findings

**Custom MapReduce pipeline analysed coffee sales patterns**
Implemented Mapper/Reducer jobs with a multi-stage reduce pattern for cross-key sorting, identifying top and bottom-performing coffee types and customer spending trends.

**R-Tree indexing delivered over 600x speedup on nearest neighbour search**
Built an R-Tree from scratch with Best-First Search (MINDIST pruning), reducing search time from ~3.80s (brute-force) to ~0.005s while returning identical, correct results.

**Group project, individually-owned contribution**
Task 1 (Nearest Neighbour Search: R-Tree construction, Best-First Search, Divide-and-Conquer) was my individual contribution; Task 2 (Skyline Search) was completed by a teammate and is not represented here.

## Tech Stack

- Python (pure implementation for core algorithms)
- mrjob (MapReduce simulation)
- Pandas, PyMongo

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/10-big-data-algorithms" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>