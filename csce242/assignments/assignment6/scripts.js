// Toggle the visibility of the exercise list on smaller screens
document.querySelector("#toggle-nav").onclick = () => {
    const navItems = document.getElementById("nav-items");
    navItems.classList.toggle("hidden-small");
    const toggleIcon = document.getElementById("toggle-nav");
    
    // Change the arrow direction based on visibility
    toggleIcon.textContent = navItems.classList.contains("hidden-small") ? "▼" : "▲";
    
    // Hide exercises when toggling
    const exercises = document.querySelectorAll('.exercise');
    exercises.forEach(exercise => {
        exercise.style.display = 'none'; // Hide exercises
    });
};

// Show the selected exercise
function showExercise(exerciseId) {
    const exercises = document.querySelectorAll('.exercise');
    exercises.forEach(exercise => {
        exercise.style.display = 'none'; // Hide all exercises
    });
    document.getElementById(exerciseId).style.display = 'block'; // Show selected exercise
}

// Update the background color of the exercise div based on slider input
document.getElementById('sliderInput').addEventListener('input', function() {
    const value = this.value;
    const exerciseDiv = document.getElementById('color-slider');

    // Update the exercise div's background color
    exerciseDiv.style.backgroundColor = `rgb(${value}, 0, 0)`; // Change the div's color

    // Update color message
    const colorMessage = document.getElementById('colorMessage');
    if (value < 85) {
        colorMessage.textContent = "Black";
    } else if (value < 170) {
        colorMessage.textContent = "Dark Red";
    } else {
        colorMessage.textContent = "Red";
    }
});

// Show the appropriate image based on the button clicked
function showImage(size) {
    const image = document.getElementById('chosenImage');
    switch(size) {
        case 'small':
            image.src = "https://picsum.photos/100/100";
            break;
        case 'medium':
            image.src = "https://picsum.photos/300/200";
            break;
        case 'large':
            image.src = "https://picsum.photos/600/400";
            break;
    }
    image.style.display = "block";
}
