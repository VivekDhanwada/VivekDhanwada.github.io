---
name: Tracking Implementation and QA Case Study
order: 11
tools: [GA4, Google Tag Manager, JavaScript, Looker Studio]
image: /assets/images/projects/tracking-case-study-cover.png
description: A small tracking setup on this site, covering an event spec, GTM and GA4 configuration, a QA log with a deliberate break and fix, and an audit of overlapping events. Portfolio scale, not client work.
---

# Tracking Implementation and QA Case Study

<div markdown="1" style="text-align: justify;">

## Overview

This is a portfolio implementation on this site, not client work. It runs from a baseline audit and a written spec, through a build in Google Tag Manager and GA4, to QA with a deliberate failure and an audit of overlapping events.

**Business Question:** How can a team tell that tracking still works after a site release, and catch it when it silently breaks?

**Key Finding:** Deliberately renaming one dataLayer key dropped a parameter from an event with no error in the console, GTM or GA4, and the GTM tag still reported Succeeded. It was caught only by checking variable values in Tag Assistant and parameters in DebugView.

## Baseline and plan

On 19 October 2026, before any change, the GA4 property collected 7 automatic events (page_view, session_start, first_visit, user_engagement, scroll, click, file_download) and no custom events, key events or audiences. Resume opens, project clicks and contact clicks could not be told apart. The plan: add five custom events from a written spec, mark `resume_download` and `contact_click` as key events, and switch off the three overlapping automatic events once the custom ones pass QA.

**Objective (plan v1.0):** help a hiring manager or recruiter who visits this portfolio find my work, open my resume and contact me, and measure whether they do.

- **Resume interest:** resume opens per 100 engaged sessions. Informs whether the resume button is placed and labelled well.
- **Contact intent:** contact clicks by channel. Informs which channel to put first.
- **Project engagement:** clicks to each project and how far pages are read. Informs which projects to feature.
- **Outreach attribution:** sessions and key events by source, medium and campaign, and the share in Unassigned. Informs which channel brings engaged visitors and whether the UTM standard is followed.

**Tracking health:** each custom event has a 7-day count and a last-seen date, next to the Unassigned share. It is an operating check, not a KPI.

## Event specification

Events are pushed to `window.dataLayer` by `assets/js/tracking.js` and sent to GA4 by Google Tag Manager. Names are snake_case, one event fires per click, and when a link could match two events the order of precedence is `resume_download`, `project_click`, `contact_click`, `outbound_click`.

| Event | Trigger | Parameters | Role |
|---|---|---|---|
| `resume_download` | Click on a link to `/resume.pdf` on this site | `file_name`, `link_location` | Intended key event |
| `project_click` | Click on a project card on the landing or projects page | `project_name`, `project_slug`, `link_location` | Engagement |
| `contact_click` | Click on a mailto link, the LinkedIn profile or the GitHub profile root | `contact_method`, `link_location` | Intended key event |
| `outbound_click` | Click on any other link to a different hostname | `link_domain`, `link_url`, `link_location` | Engagement |
| `scroll_depth` | Scroll passes 25, 50, 75 or 100 percent, once per threshold per page load | `depth_percent` | Engagement |

`link_location` is one of `landing_button`, `landing_card`, `projects_index`, `navbar`, `footer`, `page_body`.

- `resume_download` counts opens of `resume.pdf` in a new tab, not confirmed saves. `contact_click` is deliberately narrow, so project browsing does not inflate the key event.
- `link_url` has the query string removed and is not a custom dimension, because `link_domain` answers where visitors go.

## Build

The theme sent GA4 data through a direct gtag script. I replaced it with Google Tag Manager so tags can be changed and tested without editing the site: the direct tag is off in `_config.yml`, the snippet loads in production builds only, and the same measurement ID keeps the history. `tracking.js` is one plain file with a delegated click listener, a scroll listener and a console debug flag. GTM holds 8 Data Layer Variables with no default value, so a missing key shows as undefined, plus 5 triggers and 5 GA4 event tags. Seven custom dimensions are registered.

Versions: container v2 (19 Oct, Google tag only), then v3 (19 Oct, variables, triggers and tags); `tracking.js` v1 live 19 Oct, v2 deliberate break and v3 fix 20 Oct; three automatic events switched off 20 Oct.

**TODO: add one line each for key events, internal traffic filter, audience, BigQuery export and the Looker Studio link once done. Delete any that are not done. If Looker Studio is not built, also remove it from the tools and delete the Tracking health line.**

## QA log

Tested on the live site with Tag Assistant, GA4 DebugView and the console debug flag, in Chrome and Safari on desktop. Phone not tested.

- `page_view` and same-tab links: one event per load after the GTM swap. Footer icons leave in the same tab, the push is logged before unload, and GA4 receipt is confirmed in DebugView. Pass.
- `resume_download`: Resume button gives `file_name` and `link_location` landing_button. Pass in Chrome and Safari.
- `project_click`: landing card and projects page card give name, slug and location. Pass in Chrome and Safari.
- `contact_click`: LinkedIn, email and GitHub in button, footer and navbar. Pass in Chrome. Footer GitHub also Pass in Safari.
- `outbound_click` and `scroll_depth`: a source code link fires one `outbound_click` and no `contact_click`. Scrolling three pages fires 25, 50, 75 and 100 once each. Pass.

### Deliberate break and fix

On 20 October 2026 I renamed the key `link_location` to `link_loc` for `contact_click` in `tracking.js` (v2) and pushed it.

- **What happened:** the event still fired and GA4 received it without `link_location`. Nothing errored and the tag reported Succeeded.
- **How it was found:** in Tag Assistant `DLV - link_location` read undefined while `DLV - contact_method` read linkedin, and DebugView was missing the parameter.
- **Fix:** restored the key (v3). Tag Assistant then showed footer and DebugView listed the parameter again.

A Succeeded status does not prove every parameter was sent.

## Audit of overlapping events

GA4 Enhanced Measurement was sending click, file_download and scroll alongside the custom `outbound_click`, `resume_download` and `scroll_depth`, so each interaction was counted twice. After the custom events passed QA I switched off Outbound clicks, File downloads and Scrolls. In DebugView, the same interactions then produced only the custom events.

## Recommendations

1. **Test after every release.** With GTM Preview connected, click one of each event and scroll a page, confirm every variable has a value and every parameter reaches DebugView, then log the date and versions.
2. **Audit overlapping events before adding new ones.** Check what Enhanced Measurement already collects and switch off the overlap once the replacement is tested.
3. **Agree a UTM and naming standard before campaigns launch.** Lowercase source, medium and campaign (purpose and month, for example recruiter-outreach-2026-10), tag every outbound link, never tag internal links, and keep a list of tagged links.

## Limits

- Portfolio scale: traffic is low, counts are small, and my own test clicks are in the data from 19 October 2026. A zero-event day is not a reliable alert here.
- Chrome and Safari on desktop only. Middle-click and context-menu opens are not captured, and a page that fits one viewport pushes no `scroll_depth`.
- Not implemented: consent management, server-side tagging, media pixels, Adobe Analytics and the GTM noscript fallback. GA4 sets first-party `_ga` cookies, there is no banner or Consent Mode, and I have not assessed legal requirements for any audience.
- This project does not query GA4 data in BigQuery. Warehouse and SQL work is in the separate Retail Promotion and Churn Analysis project.

</div>