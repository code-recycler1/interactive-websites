# JavaScript jQuery animation - Exercises

## Exercise 1

Create a page with a checkbox and a div containing text (e.g., “terms and conditions”).

- If the checkbox is selected, the terms and conditions are hidden via a slide animation sliding them upward.
- If the checkbox is not selected, the terms and conditions are visible. Test different speeds.

## Exercise 2

Create an animation function with a callback function. As soon as the animation has finished, an alert is shown (or text in a div) with the text “Animation ready”.

- Extension: make the animation last a long time (e.g., 6000ms). Also add a button to the page that can interrupt the animation. Experiment with different jQuery possibilities, such as `.finish()`, `.stop()` and `.dequeue()`. How do they work and what are the differences and similarities?
  Look up the online information for these functions.

## Exercise 3

Create a page where a block (div) is shown on the page. The block can be controlled with the arrow keys on the keyboard. Tips:

- Use the event handler `$(document).on(‘keydown’, function()...);` to detect the pressing of an arrow key.
- The key codes are:
  - 37: left arrow
  - 38: up arrow
  - 39: right arrow
  - 40: down arrow
  - You can check these with if statements or in a switch.
- To move the div around the page, you can use `.animate()`, or directly adjust the top and left values via `.css()`. Test both and also test different speeds.
- Ensure that the animation is stopped when the arrow keys are released.
- Extension: ensure that the block cannot disappear off the page with the arrow keys. So once one of the browser edges is hit, the block is not moved further.
  Or: ensure that the block can only be moved within a div on the page, for example a ‘playing field’ of 600x400px.
- Use an image (`<img>`) instead of a div to control, for example, a picture of a character.

## Exercise 4

Create a simple photo gallery with HTML and CSS: a large photo and a strip of small photos below it. Tips:

- When clicking on a small photo, the large photo fades out and is then replaced by the small photo.
- Adjust the src attribute of the large photo after fading out, replace it with the source of the clicked small photo.
- Define the dimensions in CSS, for example always 400 pixels wide for the large photo, and always 100 pixels wide for the small photo. If you want to work responsively, use percentages.
- It works best if all photos in the collection have the same dimensions.
- Extend the gallery with a tooltip functionality. Or show a descriptive text for each photo in a div when it is loaded. The text comes from the title attribute of the thumbnail images.

Extension: build in a forward/backward technique. The visitor should be able to browse through the photos using the arrow keys. Tips:

- Capture the key presses for the document.
- You can keep an array of photos and an index position of the photo currently shown as the large photo. When an arrow key is pressed, the previous/next photo from the array is loaded.
