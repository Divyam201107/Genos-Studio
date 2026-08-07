# Divyam Jain — Genos Studio Website

A personal-brand website for Divyam Jain (web design, SEO & content), built to run entirely on GitHub Pages with zero build tools. Every file lives in one flat folder — no subfolders — so it uploads in a single drag-and-drop.

## File Structure (all flat, no subfolders)

```
index.html                     ← Homepage
services.html                  ← Services page (pricing included)
process.html                   ← Process page (4-step breakdown + FAQ)
about.html                     ← About page (personal story, values, portfolio)
blog.html                      ← Blog index — renders automatically from posts-data.js
contact.html                   ← Contact page (form, no budget field)

posts-data.js                  ← ⭐ THE ONLY FILE YOU EDIT TO ADD A NEW POST
_template.html                 ← Copy this to start writing a new post
seo-techniques.html
hero-section-cro.html
content-calendar.html
technical-seo-checklist.html
pagespeed-guide.html
internal-linking.html
blog-post-structure.html
case-study-legal.html

style.css                      ← Shared styles for every page
main.js                        ← Shared scripts (3D background, cursor, nav, blog auto-loader)
logo.png
sitemap.xml
robots.txt
```

---

## ⭐ How to Add a New Blog Post (2 Steps)

You never need to touch `blog.html` or `index.html` again.

### Step 1 — Write the post

1. Copy `_template.html`
2. Rename the copy to your post's filename, e.g. `how-i-fixed-a-slow-site.html`
3. Open it and fill in the marked sections (title, meta tags, hero, content). The template has inline instructions at each step.
4. Use these built-in content blocks anywhere in your writing:
   - `<h2 id="unique-id" data-num="01 —">Section Title</h2>` — numbered heading
   - `<div class="callout"><p><strong>Note:</strong> text</p></div>` — purple highlight box
   - `<div class="pull-quote">A big bold quote.</div>` — large standout quote
   - `<div class="stat-row"><div class="stat-box"><span class="stat-val">3×</span><span class="stat-label">Label</span></div></div>` — stat highlight row
   - The first paragraph automatically gets a big drop-cap letter

### Step 2 — Register it in posts-data.js

Open `posts-data.js` and add ONE entry to the `BLOG_POSTS` array:

```js
{
  file:  "how-i-fixed-a-slow-site.html",
  title: "How I Fixed a Slow Site in One Afternoon",
  cat:   "Web Design",
  date:  "2025-07-15",
  read:  "6 min read",
  desc:  "A 140-155 character summary for SEO and the blog card excerpt."
},
```

Save both files, upload to GitHub, done. Your new post automatically appears on:
- The full blog index (`blog.html`)
- The homepage's "From the Blog" preview (always shows the 3 most recent)
- The "Related Posts" section at the bottom of every other post

No manual HTML card-copying, ever.

---

## Deploying to GitHub Pages

### First time setup
1. Create a public GitHub repository
2. Select ALL files in this folder and drag them into **Add file → Upload files** (they'll all land at the repo root — that's correct, no subfolders needed)
3. Go to **Settings → Pages** → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save
4. Site goes live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Every time after that (updating anything)
1. Open the file on GitHub, click the pencil ✏️ icon to edit directly in the browser
   — or —
   Drag the updated file into **Add file → Upload files** to overwrite it
2. Commit changes
3. Live in under a minute

---

## Editing SEO on Any Page

Every page has three lines near the top of `<head>`:

```html
<title>Page Title Here</title>
<meta name="description" content="140-155 character summary">
<meta name="keywords" content="keyword one, keyword two">
```

Edit these directly on GitHub (pencil ✏️ icon → find the lines → replace → commit).

**Rules of thumb:**
- Title: under 60 characters, most important keyword first
- Description: 140–155 characters, written like ad copy
- Keywords: think like your customer — what would they type into Google?

---

## Updating Your Info

Search and replace as needed:
- `hello@genosstudio.com` → your real email, if it changes
- Social links (`href="#"` in the footer) → your real Twitter/LinkedIn/Instagram
- Pricing in `services.html` → your actual rates

---

## Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks, no build step
- Three.js r128 (via CDN) — the 3D wireframe background
- Google Fonts: Syne (display), Space Mono (utility), Inter (body)
- Works by simply opening any `.html` file in a browser, or hosting as static files

---

© 2025 Divyam Jain
