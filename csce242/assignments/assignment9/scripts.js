class Bird {
    constructor(name, img, size, lifespan, food, habitat, interestingFact) {
        this.name = name;
        this.img = img;
        this.size = size;
        this.lifespan = lifespan;
        this.food = food;
        this.habitat = habitat;
        this.interestingFact = interestingFact;
    }

   
    getSection() {
        return `
            <h3>${this.name}</h3>
            <img src="${this.img}" alt="${this.name}">
        `;
    }

    getExpandedSection() {
        return `
            <div style="display: flex; align-items: center;">
                <div style="margin-right: 20px;">
                    <h2>${this.name}</h2>
                    <p><strong>Size:</strong> ${this.size}</p>
                    <p><strong>Lifespan:</strong> ${this.lifespan}</p>
                    <p><strong>Food:</strong> ${this.food}</p>
                    <p><strong>Habitat:</strong> ${this.habitat}</p>
                    <p><strong>Interesting Fact:</strong> ${this.interestingFact}</p>
                </div>
                <img src="${this.img}" alt="${this.name}" style="width: 200px; height: auto;">
            </div>
        `;
    }
    
}


const birds = [
    new Bird("Hummingbird", "images/hummingbird.jpg", "3-5 inches", "3-5 years", "Nectar (Sugar water)", "Trees", "Tiny little colorful birds, that bring joy to everyone :)"),
    new Bird("Blue Jay", "images/bluejay.jpg", "9-12 inches", "7 years", "nuts, seeds", "Forests", " Blue Jays are related to Crows!"),
    new Bird("Cardinal", "images/cardinal.jpg", "7-9 inches", "3 years", "seeds, fruits", "Woodlands", "Cardinals get their red feathers from food"),
    new Bird("Robin", "images/Robin.jpg", "9-11 inches", "2 years", "Insects, fruit", "Gardens, parks", "Robins are known to be very territorial.")
];

function displayBirds() {
    const birdGrid = document.getElementById('bird-grid');
    birds.forEach(bird => {
        const birdCard = document.createElement('div');
        birdCard.className = 'bird-card';
        birdCard.innerHTML = bird.getSection(); 
        birdCard.addEventListener('click', () => showModal(bird)); 
        birdGrid.appendChild(birdCard);
    });
}

function showModal(bird) {
    const modal = document.getElementById('birdModal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = bird.getExpandedSection(); 
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('birdModal').style.display = 'none';
}


displayBirds();
