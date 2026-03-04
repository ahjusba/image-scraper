export interface ScrapedImage {
  url: string;
  filename: string;
}

export class ScraperError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ScraperError";
  }
}

const fetchHtml = async (url: string): Promise<string> => {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    throw new ScraperError(`Could not reach the provided URL: ${message}`, 502);
  }

  if (response.status === 404) {
    throw new ScraperError(
      "The provided URL returned 404 Not Found. Please check the URL and try again.",
      404
    );
  }

  if (!response.ok) {
    throw new ScraperError(
      `The provided URL returned an error: ${response.status} ${response.statusText}.`,
      502
    );
  }

  try {
    const html = await response.text();
    console.log(html);
    return html;
  } catch {
    throw new ScraperError("Failed to read the page content.", 502);
  }
}

export const scrapeImages = (html: string, baseUrl: string): ScrapedImage[] =>  {
  // Suppress unused-variable warnings until real implementation
  void html;
  void baseUrl;

  // Placeholder: returns mock images so the full request pipeline can be tested
  return [
    { url: "https://picsum.photos/seed/alpha/400/300", filename: "image-1.jpg" },
    { url: "https://picsum.photos/seed/beta/400/300", filename: "image-2.jpg" },
    { url: "https://picsum.photos/seed/gamma/400/300", filename: "image-3.jpg" },
  ];
}

// have depth as placeholder for now, in case we want to implement recursive scraping in the future
export const scrapeUrl = async ( url: string): Promise<ScrapedImage[]> => {
  const html = await fetchHtml(url);
  return scrapeImages(html, url);
}
