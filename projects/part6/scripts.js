document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    hamburger.addEventListener('click', function() {
        navContainer.classList.toggle('active'); 
    });
});

function toggleInfo(element) {
    const bioContainer = element.querySelector('.artist-grid');
    const arrows = bioContainer.querySelector('.nav-arrows');

    // Show or hide the bioContainer and arrows
    if (bioContainer.style.display === 'none' || bioContainer.style.display === '') {
        bioContainer.style.display = 'block';
        arrows.style.display = 'flex';  // Show arrows
    } else {
        bioContainer.style.display = 'none';
        arrows.style.display = 'none';  // Hide arrows
    }
}

function navigate(button, direction) {
    const card = button.closest('.artist-card');
    const bioContainer = card.querySelector('.artist-bio-container');
    const sections = ['artist-bio', 'artist-discography', 'artist-events'];

    // Get the current section index
    let currentIndex = sections.findIndex(section => 
        bioContainer.querySelector(`.${section}`).style.display !== 'none'
    );

    // Calculate the new index
    currentIndex = (currentIndex + direction + sections.length) % sections.length;

    // Hide all sections
    sections.forEach(section => {
        bioContainer.querySelector(`.${section}`).style.display = 'none';
    });

    // Show the current section
    bioContainer.querySelector(`.${sections[currentIndex]}`).style.display = 'block';

    // Ensure bioContainer remains visible
    bioContainer.style.display = 'block';
}

// Prevent event propagation for arrow buttons
document.querySelectorAll('.nav-arrows button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click on the button from closing the bio container
    });
});

function openModal() {
    document.getElementById("reviewModal").style.display = "block";
}

function closeModal() {
    document.getElementById("reviewModal").style.display = "none";
}

// Close the modal when clicking anywhere outside of it
window.onclick = function(event) {
    const modal = document.getElementById("reviewModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// JavaScript for toggling FAQ answers
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.querySelector('.faq-answer');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

//json 
// Select the container where the artist profiles will be displayed
const container = document.getElementById('artist-profiles');

// Fetch the JSON data from the specified location
fetch('projects/part6/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Loop through the array of artist profiles
        data.forEach(artist => {
            // Create a card for each artist
            const card = document.createElement('div');
            card.className = 'artist-card';

            // Create elements for artist information
            const img = document.createElement('img');
            img.src = artist.image;
            img.alt = artist.name;
            img.className = 'artist-image';

            const name = document.createElement('h2');
            name.textContent = artist.name;

            const genre = document.createElement('p');
            genre.textContent = `Genre: ${artist.genre}`;

            const country = document.createElement('p');
            country.textContent = `Country: ${artist.country}`;

            const biography = document.createElement('p');
            biography.textContent = artist.biography;

            const discography = document.createElement('p');
            discography.innerHTML = `<strong>Discography:</strong> ${artist.discography.join(', ')}`;

            const upcomingEvents = document.createElement('p');
            upcomingEvents.innerHTML = `<strong>Upcoming Events:</strong> ${artist.upcomingEvents}`;

            // Append the elements to the card
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(genre);
            card.appendChild(country);
            card.appendChild(biography);
            card.appendChild(discography);
            card.appendChild(upcomingEvents);

            // Append the card to the container
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
