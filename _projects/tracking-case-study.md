---
name: "Website Tracking and QA: Case Study"
order: 11
tools: [GA4, Google Tag Manager, JavaScript, Looker Studio]
image: /assets/images/projects/tracking-case-study-cover.png
description: Tracking built on this site with Google Tag Manager and GA4, covering an event specification, a QA log with a deliberate break and fix, and an audit of overlapping events. Portfolio scale, not client work.
github_url: https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/12-tracking-implementation-qa
---

## Overview

A tracking implementation and QA project on this portfolio site. It covers a baseline audit, a measurement plan, an event specification, a build in Google Tag Manager and GA4, QA with a deliberate failure, and an audit of overlapping events.

**Business Question:** How can a team tell that tracking still works after a site release, and catch it when it silently breaks?

**Key Finding:** Deliberately renaming one dataLayer key dropped a parameter from an event with no error message in the console, GTM or GA4, and the GTM tag still reported Succeeded. It was caught only by checking variable values in Tag Assistant and parameters in DebugView.

Portfolio scale, not client work: traffic is low, counts include my own test clicks, testing was on desktop only, mainly in Chrome, and consent management is not implemented.

## What I Built

- A baseline audit of the GA4 property (7 automatic events, no custom events) and a written measurement plan with four KPIs.
- Five custom events (`resume_download`, `project_click`, `contact_click`, `outbound_click`, `scroll_depth`) pushed to a dataLayer by one JavaScript file and sent to GA4 through Google Tag Manager.
- QA of every event in Tag Assistant and GA4 DebugView on desktop, mainly in Chrome with some events also checked in Safari, with results logged.
- Key events for resume opens and contact clicks, an internal traffic flag, an Engaged visitors audience and a daily BigQuery export.
- A two-page Looker Studio report with a tracking health table.

## Key Findings

**A tag can succeed while a parameter is missing**
After the key rename, the GTM tag still reported Succeeded and GA4 received the event, but without `link_location`. Tag Assistant showed the variable as undefined and DebugView showed the parameter missing.

![GA4 DebugView on a contact_click: link_location is missing from the parameters](/assets/images/projects/tracking-break-debugview.png)

**Automatic and custom events overlapped**
GA4 Enhanced Measurement counted clicks, file downloads and scrolls alongside the custom events, so the same interactions were measured twice under different event names. I switched the three automatic events off once the custom ones passed QA.

**An event name can overstate what it measures**
`resume_download` counts opens of the resume in a new tab, not confirmed saves, so the definition says so.

## Recommendations

1. **Test after every release.** Click one of each event with GTM Preview connected, confirm every variable has a value and every parameter reaches DebugView, then log the date and versions.
2. **Audit overlapping events before adding new ones.** Check what Enhanced Measurement already collects and switch off the overlap once the replacement is tested.
3. **Agree a UTM and naming standard before campaigns launch.** Lowercase source, medium and campaign (purpose and month), tag every link shared to the site and never tag links within it.

## Tech Stack

- Google Analytics 4
- Google Tag Manager
- JavaScript
- Looker Studio
- BigQuery (export only)

## Live Report

![Portfolio tracking report, page 1](/assets/images/projects/tracking-report-page-1.png)

<a href="https://datastudio.google.com/reporting/bccb2e6a-e81c-4219-b3cd-f641908a9696" target="_blank" rel="noopener noreferrer">View Tracking Report →</a>

## Source Code & Files

Includes the measurement plan, event specification, QA log and audit.

<a href="https://github.com/VivekDhanwada/data-analytics-portfolio/tree/main/12-tracking-implementation-qa" target="_blank" rel="noopener noreferrer">View Full Project Files on GitHub →</a>