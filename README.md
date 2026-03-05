# Image Scraper

A Next.js web application that scrapes all images from a given URL and lets you save them to a mock AWS S3 bucket.

# Author notes

1. Most importantly: the project is deployed to Vercel using a mock data persistance. **This means, that once the session becomes "cold", any data "downloaded" will disappear without errors or warnings.** This is working as intended, since this project should mainly be run in local environment.

2. The prompts used to build this project are tracked in [prompts.md](./prompts.md). I did manual enhancements on the fly and trimmed the overly verbose code that Claude Sonnet 4.6 tends to generate, while trying to maintain a logical commit history throughout.

3. I could've given one massive prompt and hoped for the best, but I find that working in small increments is the most effective way to use agentic AI in coding. My approach was to treat it the same way I would a fully manual project, but replacing the act of writing code by hand with AI assistance.

4. A few known limitations worth mentioning: the submitted URL and scraped image grid are not retained when navigating to the downloads page and back. Furthermore, the user can't really delete any of the "downloaded" images. TypeScript is also used somewhat loosely here, but since the user doesn't submit any sensitive forms, I didn't feel strict runtime type validation was necessary. Finally, the AWS integration is a mock-up rather than a real or stubbed-out SDK call.

## Features

- Paste or type any URL and scrape all `<img>` elements from the page
- View scraped images in a responsive grid
- Save individual images to an in-memory mock S3 bucket
- Browse saved images on the `/downloads` page

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Cheerio](https://cheerio.js.org) for HTML parsing

## Requirements

- Node.js 18+
- npm

## Getting started

**1. Install dependencies**

```bash
npm install
```

**2. Start the development server**

```bash
npm run dev
```

**3. (Optional) TLS configuration**

If your network uses a TLS-intercepting proxy such as **ZScaler**, or if the target site uses a self-signed certificate, Node.js will reject the connection with an `unable to get local issuer certificate` error (when fetching the HTML from an outside URL).

To bypass this in development, create a `.env` file in the project root and add:

```dotenv
# ONLY USE IN DEVELOPMENT
NODE_TLS_REJECT_UNAUTHORIZED=0
```

> ⚠️ Never set this in production — it disables TLS certificate verification entirely.

**4. Open the app**

Navigate to [http://localhost:3000](http://localhost:3000).

## Usage

1. Enter or paste a URL into the input field on the home page
2. Click **Submit** — the app fetches the page and extracts all images
3. Browse the image grid; click **Visit** to open the original image URL in a new tab
4. Click **Download** to save an image to the mock S3 bucket
5. Navigate to [/downloads](http://localhost:3000/downloads) to see all saved images

> **Note:** The S3 bucket is held in memory via `globalThis`. Saved images persist across requests within a single server process but are cleared on server restart.

## Project structure

```
app/
  page.tsx              # Home page (scraper UI)
  layout.tsx            # Shared layout with nav and animated background
  downloads/
    page.tsx            # Downloads page
  api/
    scrape/route.ts     # POST /api/scrape — scrapes images from a URL
    upload/route.ts     # POST /api/upload — saves an image to mock S3
    images/route.ts     # GET  /api/images — lists saved images
  components/
    AnimatedBackground.tsx
    ImageCard.tsx
    ImageGrid.tsx
lib/
  scraper.ts            # HTML fetching and image extraction logic
  aws.ts                # Mock S3 upload/download
  types.ts              # Shared TypeScript types
```

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
