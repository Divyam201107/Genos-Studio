/* ═══════════════════════════════════════════════════════
   BLOG POST DIRECTORY
   ═══════════════════════════════════════════════════════

   HOW TO ADD A NEW POST — 2 STEPS, NO CODE EDITING NEEDED:

   1. Copy _template.html, rename it to your post's filename
      (e.g. "my-new-post.html"), write your content inside it.

   2. Add ONE entry to the BLOG_POSTS array below, following the
      exact same pattern as the examples. Save. Push to GitHub.

   That's it. Your new post will automatically appear on:
     - blog.html (the full blog index)
     - index.html (the "From the Blog" homepage preview)
     - the "Related Posts" section of every other post

   No need to touch blog.html or index.html ever again.
   ═══════════════════════════════════════════════════════ */

const BLOG_POSTS = [
  {
    file:  "seo-techniques.html",
    title: "10 On-Page SEO Techniques That Tripled My Clients' Traffic in 90 Days",
    cat:   "SEO",
    date:  "2025-06-12",
    read:  "8 min read",
    desc:  "The exact on-page SEO tactics I used across 12 client sites to triple organic traffic in 90 days. No theory — just ranked by impact."
  },
  {
    file:  "hero-section-cro.html",
    title: "Why Your Hero Section Is Silently Killing Your Conversion Rate",
    cat:   "Web Design",
    date:  "2025-05-28",
    read:  "6 min read",
    desc:  "The four hero section mistakes I see on almost every homepage — and the exact fixes that move conversion rates."
  },
  {
    file:  "content-calendar.html",
    title: "How to Build a Content Calendar Google Actually Rewards",
    cat:   "Content",
    date:  "2025-05-14",
    read:  "7 min read",
    desc:  "A step-by-step guide to building a content calendar that drives real SEO results — topic clusters, cadence, keyword mapping."
  },
  {
    file:  "technical-seo-checklist.html",
    title: "The 2025 Technical SEO Checklist Every Site Owner Needs",
    cat:   "SEO",
    date:  "2025-04-29",
    read:  "10 min read",
    desc:  "A complete technical SEO checklist for 2025 — crawlability, Core Web Vitals, schema, indexing, and mobile, all in one place."
  },
  {
    file:  "pagespeed-guide.html",
    title: "How to Get a 90+ PageSpeed Score Without Breaking Your Design",
    cat:   "Web Design",
    date:  "2025-04-08",
    read:  "9 min read",
    desc:  "Step-by-step guide to achieving 90+ on Google PageSpeed Insights without sacrificing your design."
  },
  {
    file:  "internal-linking.html",
    title: "Internal Linking: The Most Underrated SEO Tactic You're Ignoring",
    cat:   "SEO",
    date:  "2025-03-22",
    read:  "6 min read",
    desc:  "Internal linking is one of the fastest ways to improve rankings without new content or backlinks. Here's how to do it right."
  },
  {
    file:  "blog-post-structure.html",
    title: "The Anatomy of a Blog Post That Actually Ranks (With Template)",
    cat:   "Content",
    date:  "2025-03-05",
    read:  "8 min read",
    desc:  "The exact structure I use for every blog post that ranks on Google — with a copy-paste template at the end."
  },
  {
    file:  "case-study-legal.html",
    title: "Case Study: 340% Traffic Increase for a Legal Firm in 5 Months",
    cat:   "Case Study",
    date:  "2025-02-18",
    read:  "5 min read",
    desc:  "How I took a Mumbai legal firm from 800 to 3,500 monthly organic visitors in 5 months. Full strategy breakdown."
  },
];
