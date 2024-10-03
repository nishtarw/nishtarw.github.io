document.getElementById('drawButton').addEventListener('click', () => {
    const input = document.getElementById('starsInput').value;
    const errorMsg = document.getElementById('errorMsg');
    const starMessage = document.getElementById('starMessage');
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    errorMsg.style.display = 'none'; 
    starMessage.style.display = 'none'; 

    const numberOfStars = parseInt(input);

    if (numberOfStars <= 0 || isNaN(numberOfStars)) {
        errorMsg.textContent = '* Invalid Input';
        errorMsg.style.display = 'block'; 
        return;
    }

    const stars = []; 

    // Draw stars
    for (let i = 0; i < numberOfStars; i++) {
        const x = Math.random() * (canvas.width - 30) + 15; 
        const y = Math.random() * (canvas.height - 30) + 15; 

        drawStar(ctx, x, y, 6, 8, 4); 
        stars.push({ x, y }); 
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let starClicked = false; 

        stars.forEach((star, index) => {
            const dx = mouseX - star.x;
            const dy = mouseY - star.y;
            if (dx * dx + dy * dy <= 100) { 
                starMessage.textContent = `You clicked on star number ${index + 1}`;
                starMessage.style.color = 'black'; // Set the message color to black
                starMessage.style.display = 'block'; 
                starMessage.style.top = `${event.clientY}px`; 
                starMessage.style.left = `${event.clientX + 10}px`; 

                starClicked = true; 
            }
        });

        if (!starClicked) {
            starMessage.style.display = 'none'; 
        }
    });
});

// Change the function declaration to an arrow function
const drawStar = (ctx, x, y, spikes, outerRadius, innerRadius) => {
    let rot = (Math.PI / 2) * 3; 
    let step = Math.PI / spikes; 

    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius); 

    for (let i = 0; i < spikes; i++) {
        // Draw outer point
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;

        // Draw inner point
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
    }

    ctx.lineTo(x, y - outerRadius); 
    ctx.closePath();
    ctx.fillStyle = 'yellow'; 
    ctx.fill();
};
