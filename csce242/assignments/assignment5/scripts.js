// Counter functionality
let count = 0;
const countDisplay = document.getElementById('countDisplay');

countDisplay.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
});

// Image refresh functionality
const randomImage = document.getElementById('randomImage');

randomImage.addEventListener('click', () => {
    location.reload();
});

// Slider functionality
const slider = document.getElementById('sliderInput');
const square = document.getElementById('square');
const sliderContainer = document.getElementById('slider'); // Get the slider container

slider.addEventListener('input', () => {
    const value = slider.value;
    const sliderWidth = sliderContainer.offsetWidth; // Get the width of the slider container
    const squareWidth = square.offsetWidth; // Get the width of the pink square
    const maxPosition = sliderWidth - squareWidth; // Calculate the maximum position the square can go to
    const newPosition = (value / slider.max) * maxPosition; // Calculate the new position based on slider value
    square.style.left = newPosition + 'px'; // Move the pink square to the new position
});

