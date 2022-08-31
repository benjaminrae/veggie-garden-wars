# Veggie Garden Wars

A Battleship style game

[Live Site](https://veggie-garden-wars.netlify.app/)

![Veggie Garden Wars Screenshot](/src/assets/screenshots/veggie-garden-wars-screenshot.png)

## About the project

---

This project was an extra part of the ISDI Coders precourse. The objective was to create a Battleship style game. I used CSS grid for the game grid but flexbox for the rest. First, the user has to select if it is a single or two-player game. Then the players place their veggies on the grid. Players then take it in turns to fire one shot at a time. The user is given feedback to know if their shot was a hit or a miss. In the end, the winner is the player that destroys all of their opponent's veggies first. Player can see a board comparison at then end, see the high scores and play again.

The computer chooses IDs in the grid to attack at random, but once it has a hit, the ID is stored. The computer then tries to fire at the horizontally and vertically adjacent cells to the last successful hit. If there are no more adjacent cells, it goes back to firing at random IDs.

### Built with

**Front End**

-   React
-   CSS
-   Javascript
-   Hosted on Netlify

### What I learned from this project

This project allowed me to explore React a little but more and show different screens based on booleans stored in state. Using sounds in React was not as simple as in vanilla JS. "audioFile".play() created an error. I solved this problem by using [use-sound](https://github.com/joshwcomeau/use-sound).

### Next steps

-   Add custom player names
-   Work on responsiveness of the page
-   Create a small backend for high scores
-   Consider online multiplayer
    -   Requires login
    -   Could be done with websockets
