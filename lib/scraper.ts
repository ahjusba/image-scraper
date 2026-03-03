export interface ScrapedImage {
  url: string;
  filename: string;
}

/**
 * Extracts image URLs from the given HTML string, resolved against the base URL.
 * Placeholder implementation — will be replaced with real HTML parsing logic.
 */
export function scrapeImages(html: string, baseUrl: string): ScrapedImage[] {
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
