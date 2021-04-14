const BACKGROUND_1 = document.querySelector('#background-1');
const BACKGROUND_2 = document.querySelector('#background-2');

function transitionBackground(src) {
  BACKGROUND_2.src = src;
  BACKGROUND_1.style = 'transition: 0.4s ease-in-out';
  BACKGROUND_2.style = 'transition: 0.4s ease-in-out';
  BACKGROUND_1.classList.add('background-1-transition');
  BACKGROUND_2.classList.remove('background-2-transition');
  setTimeout(() => {
    BACKGROUND_1.src = src;
    BACKGROUND_2.src = '';
    BACKGROUND_1.style = 'transition: 0s ease-in-out';
    BACKGROUND_2.style = 'transition: 0s ease-in-out';
    BACKGROUND_1.classList.remove('background-1-transition');
    BACKGROUND_2.classList.add('background-2-transition');
  }, 400);
}