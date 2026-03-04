# Prompts, LLM: Claude Sonnet 4.6

1. Please make a .MD file called "prompts", which saves all the prompts I use in this project. Keep the prompts in sequence and numbered, but without any explanation. Update the file on every prompt.

2. Initialize a Next.js project using App Router, Tailwind and Typescript.

3. Let's clean the project to it's bare minumum: retain the strictly essential items and remove everything else (including styling, images, svgs, code).

4. Let's create our first page which is also the landing page. The page should present to the user a web interface where they can enter a URL (allow pasting using a button and also give a warning text if the pasted text is not an URL) and press submit. For now, let's only build the frontend and leave the actual submission logic for later. Keep the page unstyled.

5. The Type "React.FormEvent" seems to be depreciated. More information: "FormEvent doesn't actually exist. You probably meant to use ChangeEvent, InputEvent, SubmitEvent, or just SyntheticEvent instead depending on the event type." Let's use up-to-date types and practices.

6. Starting with React v19.2.10 FormEvent and FormEventHandler are deprecated and should be replaced with SubmitEvent and SubmitEventHandler. The older event types will still work but trigger a deprecation message.

7. Please create stylings for the page. Create mobile-first UI with elements centered horizontally while starting vertically from the top of the page. I would like the background to be dark with animated floating colorful dots effect. The texts should be salmon colored. Notice that we are using Tailwind v4 syntax.

8. I get an error on the AnimatedBackground: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.

9. Please add the current file to your context and remember to save all prompts (including this one) to the current file.

10. Please suggest an architecture (especially concerning the image scraper) for the following application: The user submits an URL. All of the images inside the submitted URL are scraped. The images will be saved to a mock AWS storage. The images are saved for the local session and they will be visible in the "submit" page.

11. Please implement the POST handler, which is called from the "app/page.tsx" using the submitted URL. Handle 404 errors gracefully. The backend will then call the scraper (you can use a placeholder for now as we will implement the scraper later).

12. Let's create a new React component called "ImageGrid", which will render the scraped images in a grid. Each cell should be the same width / height and simply adjust the image to fit inside the cell. The image name should be visible in the cell.

13. Please replace the <img> using Next component <Image>

14. Remember to save all prompts in prompts.md. Let's now implement the scraper. We should actually fetch the html inside here since we might want to implement a deeper scrape and thus might have to visit other URLs inside the first URLs (based on depth). For now let's only consider the situation where we scrape only one URL. Currently the api/scrape handles the fetching of the HTML, so we have to move it here.

15. Please implement the actual scraping logic. It should return an array of type ScrapedImage (with data on src and filename) within a html input. Please use Lambdas instead of default JavaScript functions from now on.