const images = [
    { src: 'images/birthday.jpg', title: 'Party', description: 'Time to celebrate your birthday!' },
    { src: 'images/clown.jpg', title: 'Clown', description: 'A funny clown with tricks!' },
    { src: 'images/rain.jpg', title: 'Rain', description: 'Oh no! It is raining.' },
    { src: 'images/read.jpg', title: 'Book', description: 'Reading is so fun.' },
    { src: 'images/shovel.jpg', title: 'Gardening', description: 'I love gardening!' },
    { src: 'images/work.jpg', title: 'Work', description: 'Working on homework!' },
];

const imageContainer = document.getElementById('image-container');
const messageContainer = document.getElementById('message-container');

images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.title;
    
    img.addEventListener('click', () => {
        messageContainer.innerHTML = `
            <h2>${image.title}</h2>
            <p>${image.description}</p>
        `;
    });

    imageCard.appendChild(img);
    imageContainer.appendChild(imageCard);
});
