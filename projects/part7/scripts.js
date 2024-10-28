document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    hamburger.addEventListener('click', () => {
        navContainer.classList.toggle('active'); 
    });

    fetchArtists();
});

const fetchArtists = async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const artists = await response.json();
        displayArtists(artists);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

const displayArtists = (artists) => {
    const container = document.getElementById('artists-container');
    container.innerHTML = '';

    artists.forEach((artist) => {
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist-card');

        artistDiv.innerHTML = `
            <h2>${artist.name}</h2>
            <img src="${artist.image}" alt="${artist.name}" class="artist-image">
            <div class="artist-info">
                <p><strong>Genre:</strong> ${artist.genre}</p>
                <p><strong>Country:</strong> ${artist.country}</p>
            </div>
            <div class="artist-bio-container" style="display: none;">
                <h3 class="current-section" style="display: none;"></h3>
                <p class="artist-bio" style="display: none;">${artist.biography}</p>
                <p class="artist-discography" style="display: none;">${artist.discography}</p>
                <p class="artist-events" style="display: none;">${artist.upcomingEvents}</p>
                <div class="nav-arrows" style="display: none;">
                    <button onclick="navigate(this, -1)">← Previous</button>
                    <button onclick="navigate(this, 1)">Next →</button>
                </div>
            </div>
            <button onclick="toggleInfo(event)">Toggle Info</button>
        `;
        container.appendChild(artistDiv);
    });
};

const toggleInfo = (event) => {
    const button = event.target;
    const bioContainer = button.previousElementSibling;

    if (bioContainer.style.display === 'none' || bioContainer.style.display === '') {
        const allBioContainers = document.querySelectorAll('.artist-bio-container');
        allBioContainers.forEach(container => {
            if (container !== bioContainer) {
                container.style.display = 'none';
                container.querySelector('.nav-arrows').style.display = 'none';
                container.querySelector('.current-section').style.display = 'none';
                container.querySelectorAll('p').forEach(p => p.style.display = 'none');
            }
        });

        bioContainer.style.display = 'block';
        bioContainer.querySelector('.nav-arrows').style.display = 'flex';  
        showSection(bioContainer, 'artist-bio');
    } else {
        bioContainer.style.display = 'none';
        bioContainer.querySelector('.nav-arrows').style.display = 'none';  
    }
};

const showSection = (bioContainer, section) => {
    const sections = ['artist-bio', 'artist-discography', 'artist-events'];

    sections.forEach(sec => {
        const sectionElement = bioContainer.querySelector(`.${sec}`);
        const currentSectionTitle = bioContainer.querySelector('.current-section');

        if (sec === section) {
            sectionElement.style.display = 'block';
            currentSectionTitle.style.display = 'block';
            currentSectionTitle.textContent = sec.replace('artist-', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        } else {
            sectionElement.style.display = 'none';
        }
    });
};

const navigate = (button, direction) => {
    const card = button.closest('.artist-card');
    const bioContainer = card.querySelector('.artist-bio-container');

    const sections = ['artist-bio', 'artist-discography', 'artist-events'];
    let currentIndex = sections.findIndex(section => 
        bioContainer.querySelector(`.${section}`).style.display !== 'none'
    );

    currentIndex = (currentIndex + direction + sections.length) % sections.length;
    showSection(bioContainer, sections[currentIndex]);
    bioContainer.style.display = 'block';
};

const openModal = () => {
    document.getElementById("reviewModal").style.display = "block";
};

const closeModal = () => {
    document.getElementById("reviewModal").style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById("reviewModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.querySelector('.faq-answer');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

//contact

// Function to send email
const sendEmail = async (json) => {
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        });
        return response;
    } catch (error) {
        console.log(error);
        document.getElementById("result").innerHTML = "Sorry, your email couldn't be sent.";
    }
};

// Handle form submission
document.getElementById("contact-form").onsubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    const result = document.getElementById("result");
    result.innerHTML = "Sending..."; // Show sending message

    const httpResult = await sendEmail(json);

    if (httpResult && httpResult.status === 200) {
        result.innerHTML = "Email successfully sent!";
    } else {
        result.innerHTML = "Sorry, your email wasn't sent.";
    }
};
