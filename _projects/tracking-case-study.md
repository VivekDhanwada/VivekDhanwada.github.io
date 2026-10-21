---
name: "Website Tracking and QA: Case Study"
order: 11
tools: [GA4, GTM, JavaScript, Looker Studio, BigQuery, Playwright]
image: /assets/images/projects/tracking-case-study-cover.png
description: Tracking built on this site with Google Tag Manager and GA4, covering an event specification, a QA log with a deliberate break and fix, and an audit of overlapping events. Portfolio scale, not client work.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/12-tracking-implementation-qa
---

# Website Tracking and QA: Case Study

## Overview

A website tracking implementation and QA project on this portfolio site. It covers a baseline audit, a measurement plan, an event specification, a build in Google Tag Manager and GA4, QA with a deliberate failure, and an audit of overlapping events.

**Business Question:** How can a team tell that tracking still works after a site release, and catch it when it silently breaks?

**Key Finding:** Deliberately renaming one dataLayer key dropped a parameter from an event with no error message in the console, GTM or GA4, and the GTM tag still reported Succeeded. It was caught only by checking variable values in Tag Assistant and parameters in DebugView.

Portfolio scale, not client work: traffic is low, counts include my own test clicks, testing was on desktop only, mainly in Safari, and consent management is not implemented.

## What I Built

- **Baseline audit and measurement plan.** An audit of the GA4 property (7 automatic events, no custom events) and a written plan with four KPIs.
- **Five custom events.** `resume_download`, `project_click`, `contact_click`, `outbound_click` and `scroll_depth`, pushed to a dataLayer by one JavaScript file, built with GenAI (Claude), and sent to GA4 through Google Tag Manager.
- **Manual QA.** Every event checked in Tag Assistant, GA4 DebugView and the browser developer tools console, with each test and its result logged.
- **Automated tests.** Playwright tests repeat the post-release check in code. Each test loads the live site, clicks a link, and checks the dataLayer push against the event specification and the outgoing GA4 request against the push. They run in Chromium and WebKit (the engine Safari uses), and the request is intercepted so no test data is recorded. After a release, one command (`npx playwright test`) runs all 18 tests in under a minute.
- **Measurement setup.** Key events for resume opens and contact clicks, an internal traffic flag, an Engaged visitors audience and a daily BigQuery export. A SQL check on the first day of exported data found the one `contact_click` missing `link_location` from the deliberate break.
- **Looker Studio report.** A two-page report built around the measurement plan: visitor behaviour on page 1, outreach attribution and a tracking health table on page 2.

## Key Findings

**A tag can succeed while a parameter is missing.**
After the key rename, the GTM tag still reported Succeeded and GA4 received the event, but without `link_location`. Tag Assistant showed the variable as undefined and DebugView showed the parameter missing.

```
Before: { event: 'contact_click', contact_method: 'linkedin', link_location: 'footer' }
After:  { event: 'contact_click', contact_method: 'linkedin', link_loc: 'footer' }

GTM tag status: Succeeded
Tag Assistant: DLV - link_location = undefined
DebugView: link_location absent from the event
```

**Automatic and custom events overlapped.**
GA4 Enhanced Measurement counted clicks, file downloads and scrolls alongside the custom events, so the same interactions were measured twice under different event names. I switched the three automatic events off once the custom ones passed QA.

**An event name can overstate what it measures.**
`resume_download` counts opens of the resume in a new tab, not confirmed saves, so the definition says so.

## Recommendations

1. **Test every release, not just the build.** With GTM Preview connected, trigger one of each event, then check that every variable has a value and every parameter arrives in DebugView. Log the date and versions. An automated Playwright suite repeats these checks on every event in under a minute.
2. **Audit overlapping events before adding new ones.** Check what Enhanced Measurement already collects so the same interaction is not measured twice, and switch off the overlap once the custom event passes QA.
3. **Document every event and KPI before building reports on them.** A name like `resume_download` implies a saved file, but it counts opens. A written specification of each event's trigger, parameters and role, plus a definition for each KPI, keeps reports from being misread.

## Tech Stack

- Google Analytics 4
- Google Tag Manager
- JavaScript
- Looker Studio
- BigQuery (GA4 export, SQL check)
- Playwright (automated tests)

## Live Report

![Portfolio tracking report, page 1](/assets/images/projects/tracking-report-page-1.png)

<a href="https://datastudio.google.com/reporting/bccb2e6a-e81c-4219-b3cd-f641908a9696" target="_blank" rel="noopener noreferrer">View Tracking Report →</a>

## Source Code & Files

Includes the measurement plan, event specification, QA log, audit and automated tests.

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/12-tracking-implementation-qa" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>