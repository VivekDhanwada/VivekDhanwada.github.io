---
name: Machine Learning Techniques
order: 9
tools: [Python, scikit-learn, XGBoost]
image: /assets/images/projects/ml-techniques-cover.svg
description: Three coursework projects spanning neural network classification, ensemble regression in a class-wide Kaggle competition (3rd place), and unsupervised customer segmentation, covering model selection, hyperparameter tuning, and statistical validation.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/09-machine-learning-techniques
---

# Machine Learning Techniques

## Overview

Three applied ML projects completed as coursework: a neural network classifying medieval manuscript scribes, an ensemble regression model predicting used car prices in a class-wide Kaggle competition, and an unsupervised clustering analysis segmenting supermarket customers. Together they span neural networks, regression, and clustering, with cross-validation and statistical comparison running through all three.

**Note:** This page consolidates coursework from two units rather than standing as a single end-to-end project, presented to showcase breadth across ML techniques.

## Key Findings

**Neural network architecture tuning improved accuracy significantly**
A second hidden layer lifted mean cross-validated accuracy from 77.4% to 88.7% (t=-28.88, p<0.000001), classifying manuscript scribes from the Avila dataset.

**Ensemble regression placed 3rd in a class-wide Kaggle competition**
Compared Random Forest, XGBoost, and Gradient Boosting with GridSearchCV tuning; team placed 3rd out of all class teams on the held-out competition leaderboard.

**Customer segmentation identified 3 actionable clusters**
K-means++ and Agglomerative Clustering, validated via Elbow Method and Silhouette Analysis, segmented 4,000 supermarket customers into 3 profiles with tailored marketing recommendations.

## Tech Stack

- Python
- scikit-learn (MLPClassifier, RandomForestRegressor, GradientBoostingRegressor, KMeans, AgglomerativeClustering, GridSearchCV)
- XGBoost
- pandas, NumPy, SciPy

## Source Code & Files

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/09-machine-learning-techniques" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>