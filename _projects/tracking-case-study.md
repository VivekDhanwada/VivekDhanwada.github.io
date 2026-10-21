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

A website tracking implementation and QA project on this portfolio site. It covers a measurement plan, an event specification, GTM and GA4 implementation, manual and automated QA, built around a deliberate failure.

**Business Question:** How can a team trust its tracking data after a site release, and catch it when it silently breaks?

**Key Finding:** Deliberately renaming one dataLayer key dropped a parameter from an event with no error message in the console, GTM or GA4, and the GTM tag still reported Succeeded. It was found by checking variable values in Tag Assistant and parameters in DebugView. Automated tests catch the same break in under a minute.

**Scope:** Portfolio scale, not client work. Traffic is low, counts include my own test clicks, testing was on desktop only, mainly in Safari, and consent management is not implemented.

## What I Built

- **Baseline audit and measurement plan.** An audit of the GA4 property (7 automatic events, no custom events) and a written plan with four KPIs.
- **Five custom events.** `resume_download`, `project_click`, `contact_click`, `outbound_click` and `scroll_depth`, pushed to a dataLayer by one JavaScript file, built with GenAI (Claude), and sent to GA4 through Google Tag Manager.
- **Manual QA.** Every event checked in Tag Assistant, GA4 DebugView and the browser developer tools console, with each test and its result logged.
- **Automated tests.** Playwright tests, written with GenAI (Claude) from my event specification, run the post-release check automatically. Each test loads the live site, clicks a link or scrolls the page, and checks the dataLayer push against the specification and the outgoing GA4 request against the push. They run in Chromium and WebKit (the engine Safari uses), with requests intercepted so no test data is recorded, and one command (`npx playwright test`) runs all tests in under a minute. With the deliberate break applied to a copy of the script, the `contact_click` tests fail in each browser and the rest pass.
- **Measurement setup.** Key events for resume opens and contact clicks, an internal traffic flag, an Engaged visitors audience and a daily BigQuery export. A SQL check on the first day of exported data found the one `contact_click` missing `link_location` from the deliberate break.
- **Looker Studio report.** A two-page report built around the measurement plan: visitor behaviour on page 1, outreach attribution and a tracking health table on page 2.

## Key Findings

**A tag can succeed while a parameter is missing.**
After the key rename, the GTM tag still reported Succeeded and GA4 received the event, but without `link_location`. Tag Assistant showed the variable as undefined and DebugView showed the parameter missing. A SQL check on the exported data counted the same missing parameter.

```
Before: { event: 'contact_click', contact_method: 'linkedin', link_location: 'footer' }
After:  { event: 'contact_click', contact_method: 'linkedin', link_loc: 'footer' }

GTM tag status: Succeeded
Tag Assistant: DLV - link_location = undefined
DebugView: link_location absent from the event
```

**Automatic and custom events overlapped.**
GA4 Enhanced Measurement counted clicks, file downloads and scrolls alongside the custom events, so the same interactions were measured twice under different event names. I switched the three automatic events off once the custom ones passed QA.

**An event name can claim more than it measures.**
`resume_download` sounds like a saved file, but it fires when the resume opens in a new tab, and a browser cannot confirm a save. Reporting it as downloads would overstate interest. Renaming it would split the event history, so I defined it, and labelled it in the report, as resume opens.

## Recommendations

1. **Test after every release, not just the build.** Verify every event in GA4 DebugView and GTM Preview to make sure nothing broke in the release. Automated Playwright tests run the equivalent checks on every event in under a minute, but adding or changing an event still needs manual testing.
2. **Audit overlapping events before adding new ones.** Check what Enhanced Measurement already collects so the same interaction is not measured twice, and switch off the overlap once the custom event passes QA.
3. **Document every event and KPI before building reports on them.** A written specification of each event's trigger, parameters and role, plus a definition for each KPI, keeps reports from being misread.

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