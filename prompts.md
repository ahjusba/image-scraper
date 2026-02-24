# Prompts

1. Please make a .MD file called "prompts", which saves all the prompts I use in this project. Keep the prompts in sequence and numbered, but without any explanation. Update the file on every prompt.

2. Initialize a Next.js project using App Router, Tailwind and Typescript.

3. Let's clean the project to it's bare minumum: retain the strictly essential items and remove everything else (including styling, images, svgs, code).

4. Let's create our first page which is also the landing page. The page should present to the user a web interface where they can enter a URL (allow pasting using a button and also give a warning text if the pasted text is not an URL) and press submit. For now, let's only build the frontend and leave the actual submission logic for later. Keep the page unstyled.

5. The Type "React.FormEvent" seems to be depreciated. More information: "FormEvent doesn't actually exist. You probably meant to use ChangeEvent, InputEvent, SubmitEvent, or just SyntheticEvent instead depending on the event type." Let's use up-to-date types and practices.

6. Starting with React v19.2.10 FormEvent and FormEventHandler are deprecated and should be replaced with SubmitEvent and SubmitEventHandler. The older event types will still work but trigger a deprecation message.

7. Please create stylings for the page. Create mobile-first UI with elements centered horizontally while starting vertically from the top of the page. I would like the background to be dark with animated floating colorful dots effect. The texts should be salmon colored. Notice that we are using Tailwind v4 syntax.

8. I get an error on the AnimatedBackground: A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
