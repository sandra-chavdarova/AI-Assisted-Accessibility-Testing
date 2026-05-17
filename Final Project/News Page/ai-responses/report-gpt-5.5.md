# AI Whole-Page Fix Report — News Page

**Date:** 17 May 2026
**Model:** gpt-5.5
**Method:** Raw HTML extracted from #page — AI asked to identify and fix all issues
**Source URL:** https://www.w3.org/WAI/demos/bad/before/news.html

---

## Fix Summary

| Severity | Count |
|---|---|
| Critical | 2 |
| Serious  | 12 |
| Moderate | 12 |
| Minor    | 2 |
| **Total** | **28** |

---

## All Fixes Applied

| # | Severity | WCAG Criterion | Level | Element | Problem | Fix Applied |
|---|---|---|---|---|---|---|
| 1 | Serious | 2.4.1 Bypass Blocks | A | p.skip#startcontent | The page had a paragraph saying 'Demo starts here' instead of a functional skip link, so keyboard and screen reader users could not bypass repeated header and navigation content. | Replaced it with a visible-on-focus skip link pointing to #main and added tabindex='-1' to the main element so the skip target can receive focus. |
| 2 | Serious | 3.1.1 Language of Page | A | html document | The provided markup did not define the page language. | Added a full document structure with <html lang='en'> so assistive technologies can use the correct pronunciation and language rules. |
| 3 | Serious | 2.4.2 Page Titled | A | head | The page had no accessible document title. | Added <title>Citylights News</title> to identify the page purpose in browser tabs, bookmarks, and screen reader context. |
| 4 | Serious | 1.3.1 Info and Relationships | A | layout tables throughout page | Tables were used for visual layout, causing assistive technologies to announce meaningless table structures and making the reading order harder to understand. | Replaced layout tables with semantic structural elements including header, nav, main, article, section, aside, figure, and footer, with CSS used for layout. |
| 5 | Moderate | 4.1.1 Parsing | A | invalid and obsolete HTML including font, acronym, align, bgcolor, background, border, hspace, language, malformed image path, and nested paragraphs | The markup contained obsolete, presentational, and invalid constructs that can interfere with consistent accessibility tree generation. | Rewrote the markup using valid HTML5, CSS for presentation, <abbr> instead of <acronym>, valid image attributes, and valid heading/paragraph structure. |
| 6 | Serious | 1.1.1 Non-text Content | A | decorative border, spacer, marker, and separator images | Many decorative images had missing alt text, which would expose file names or irrelevant image information to screen reader users. | Removed unnecessary decorative image markup from the layout and used CSS borders/backgrounds instead. |
| 7 | Moderate | 1.1.1 Non-text Content | A | img.top_logo.gif inside home link | The logo alternative text was excessively verbose for an image used as a home link, making navigation inefficient. | Changed the linked logo to have concise alt text, 'Citylights: your access to the city', and added aria-label='Citylights home' to the link to clearly describe the link destination. |
| 8 | Moderate | 1.1.1 Non-text Content | A | img.top_weather.gif | The weather graphic had no alternative text. | Marked the image decorative with alt='' and aria-hidden='true' because the weather information is provided as nearby text. |
| 9 | Critical | 4.1.2 Name, Role, Value | A | navigation image links | The navigation links used images without alt text, leaving links without accessible names. | Replaced image-based navigation with text links inside a nav landmark and list, giving each link a clear accessible name. |
| 10 | Critical | 2.1.1 Keyboard | A | navigation links with href='javascript:...' and onfocus='blur();' | The links removed focus and depended on JavaScript URLs, making keyboard navigation unreliable and hiding the user’s current focus position. | Replaced JavaScript links with standard href links and removed focus-blurring behavior. |
| 11 | Serious | 2.4.7 Focus Visible | AA | interactive controls | The original code explicitly blurred focused navigation links and did not provide a reliable visible focus indicator. | Added CSS focus styles for links, buttons, and select controls using a high-visibility outline. |
| 12 | Serious | 3.2.2 On Input | A | select onchange='location.href = this.value;' | Changing the quick menu selection immediately changed location, creating an unexpected context change without user confirmation. | Converted the quick menu to a labelled form with a separate Go button so the user controls when navigation/submission happens. |
| 13 | Serious | 1.3.1 Info and Relationships | A | quick menu select | The select control had no programmatically associated label. | Added <label for='quickmenu'>Quick menu</label> and an id on the select. |
| 14 | Serious | 1.4.3 Contrast (Minimum) | AA | headline text using white font color | Several headlines were white text on a white page background, making them unreadable for many users. | Removed the white font styling and applied dark text colors with sufficient contrast. |
| 15 | Serious | 1.3.1 Info and Relationships | A | p.class='headline' and font-sized headings | Headings were visually styled paragraphs instead of semantic heading elements, so the document outline was not available to assistive technology. | Converted the page title to h1, story titles to h2, and subsection/callout titles to h3. |
| 16 | Moderate | 2.4.6 Headings and Labels | AA | article, section, and aside regions | Content sections and callouts were not programmatically labelled. | Added aria-labelledby relationships from articles, sections, and aside content to their visible headings. |
| 17 | Serious | 1.3.2 Meaningful Sequence | A | floated multi-column article layout | The original floated layout and cleared containers could create a confusing reading order compared with the visual order. | Rebuilt the news content as semantic articles in a CSS grid so source order and reading order remain logical. |
| 18 | Serious | 1.1.1 Non-text Content | A | img.chart1.jpg | The chart image had an empty alt attribute even though it conveyed information about brain donations. | Added descriptive alternative text and a visible figure caption identifying the chart and its relationship to the article. |
| 19 | Moderate | 1.3.1 Info and Relationships | A | chart and photo callout tables | Callouts were implemented as layout tables, which obscured their role as figures and related captions. | Replaced the callout tables with semantic <figure> and <figcaption> elements. |
| 20 | Moderate | 1.1.1 Non-text Content | A | headline_middle.gif decorative icons | Decorative headline icons had missing alternative text. | Removed the decorative icons from the content and represented headings with text. |
| 21 | Moderate | 2.4.4 Link Purpose (In Context) | A | linked image of Clara F. | The portrait was wrapped in a link without clear link purpose beyond the image alternative text. | Removed the unnecessary link wrapper and kept the image as part of the quoted content with concise alt text. |
| 22 | Moderate | 1.3.1 Info and Relationships | A | blockquote attribution | The attribution for the quotation was plain bold text outside a semantic relationship. | Placed the attribution inside the blockquote footer so it is programmatically associated with the quote. |
| 23 | Moderate | 4.1.2 Name, Role, Value | A | script-generated weather/date content | The original script used document.write and document.all, producing fragile content and invalid markup. | Replaced it with progressive JavaScript that updates a valid <time> element while preserving fallback text. |
| 24 | Moderate | 1.3.1 Info and Relationships | A | status information | Traffic and weather information were embedded in layout table cells without a meaningful region or structure. | Grouped the information in a labelled status bar with clear paragraphs and strong labels. |
| 25 | Moderate | 1.4.10 Reflow | AA | fixed-width tables and pixel-based layout | The original page used fixed-width tables that could require horizontal scrolling on small screens or high zoom. | Changed the layout to responsive CSS with max-width, flexible wrapping, and grid columns that reflow. |
| 26 | Moderate | 1.4.4 Resize Text | AA | font elements and fixed pixel sizing | Deprecated font elements and rigid layout sizing could interfere with readable text resizing. | Removed font elements and used scalable CSS font sizing and responsive layout. |
| 27 | Minor | 2.4.8 Location | AAA | current News navigation item | The current page was not programmatically identified in the navigation. | Added aria-current='page' to the News navigation link. |
| 28 | Minor | 1.3.1 Info and Relationships | A | line breaks and empty paragraphs used for spacing | Empty paragraphs and repeated <br> elements were used for visual spacing rather than structure. | Removed spacing-only markup and used CSS margins and layout spacing. |
