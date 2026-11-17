# purrfect match

a quiz that matches you with a real cat from "I am alive", a shelter in Astana.

try it: https://purrfectmatch.online
the shelter: https://instagram.com/i_am_alive_shelter

i went to the shelter, brought some food and cleaning stuff and took photos of the cats that are ready for a home. you answer 18 questions and it finds the cat that is most like you and tells you why. works in english and russian, has a day and a night mode.

## run it

there is no build step, just serve the folder:

    python3 -m http.server 8000

## what's inside

- `data.js` the cats and the questions
- `engine.js` the matching
- `app.js` screens and text
- `room.js` the room and the animations
- `cats/` my photos

font is Monocraft.
