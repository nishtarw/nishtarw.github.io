document.getElementById('drawButton').addEventListener('click', function() {
    const input = document.getElementById('starsInput').value;
    const errorMsg = document.getElementById('errorMsg');
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    // Clear previous stars
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    errorMsg.textContent = ''; // Clear previous error message

    const numberOfStars = parseInt(input);

    if (numberOfStars <= 0 || isNaN(numberOfStars)) {
        errorMsg.textContent = 'Please enter a valid number greater than 0.';
        return;
    }

    const stars = []; // Array to keep track of stars

    // Draw stars and store their positions
    for (let i = 0; i < numberOfStars; i++) {
        const x = Math.random() * (canvas.width - 30) + 15; // Random x position
        const y = Math.random() * (canvas.height - 30) + 15; // Random y position
        drawStar(ctx, x, y, 5, 10, 5); // Draw a star
        stars.push({ x, y }); // Store star position
    }

    // Add click event for stars
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        stars.forEach((star, index) => {
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            if (dx * dx + dy * dy <= 100) { // Check if mouse is close to a star
                alert(`You clicked on star number ${index + 1}`);
            }
        });
    });
});

// Function to draw a star
function drawStar(ctx, x, y, spikes, outerRadius, innerRadius) {
    const rot = (Math.PI / 2) * 3; // Starting rotation
    const step = Math.PI / spikes; // Step angle

    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius); // Move to top point

    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius); // Outer point
        rot += step;

        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius); // Inner point
        rot += step;
    }
    
    ctx.lineTo(x, y - outerRadius); // Close the star shape
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
}
