# Image Scraper

A Next.js web application that scrapes all images from a given URL and lets you save them to a mock AWS S3 bucket.

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
