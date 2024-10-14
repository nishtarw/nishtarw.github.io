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
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the fetched data
            displayArtists(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

const displayArtists = (artists) => {
    const artistGrid = document.querySelector('.artist-grid');
    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <h3>${artist.name}</h3>
            <p>Discography: ${artist.discography.join(', ')}</p>
            <p>Upcoming Events: ${artist.upcoming_events.join(', ')}</p>
        `;
        artistGrid.appendChild(artistCard);
    });
};
