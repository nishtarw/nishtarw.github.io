const fetchIceCreams = async () => {
    try {
        const response = await fetch('https://portiaportia.github.io/json/ice-creams.json');
        const iceCreams = await response.json();
        displayIceCreams(iceCreams);
    } catch (error) {
        console.error('Error fetching ice cream data:', error);
    }
};

const displayIceCreams = (iceCreams) => {
    const grid = document.getElementById('ice-cream-grid');

    iceCreams
        .filter(iceCream => !iceCream.image.includes('-2')) // Exclude "-2" images
        .forEach(iceCream => {
            const item = document.createElement('div');
            item.classList.add('ice-cream-item');

            const img = document.createElement('img');
            img.src = `https://portiaportia.github.io/json/images/ice-creams/${iceCream.image}`;
            img.alt = iceCream.name;

            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            overlay.textContent = iceCream.name;

            item.appendChild(img);
            item.appendChild(overlay);
            grid.appendChild(item);
        });
};

fetchIceCreams();
