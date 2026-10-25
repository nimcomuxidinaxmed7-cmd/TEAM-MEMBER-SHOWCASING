
const slides = document.getElementById("slides");
let cards = document.querySelectorAll(".profile-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");

let currentSlide = 0;
let cardsToShow = 3;

function checkScreenSize() {
    if (window.innerWidth <= 600) {
        cardsToShow = 1;
    } else if (window.innerWidth <= 900) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }

    showSlide();
    makeDots();
}

function makeDots() {
    dots.innerHTML = "";

    let totalSlides = cards.length - cardsToShow + 1;

    if (totalSlides < 1) {
        totalSlides = 1;
    }

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");

        dot.addEventListener("click", function() {
            currentSlide = i;
            showSlide();
        });

        dots.appendChild(dot);
    }
}

function showSlide() {
    let totalSlides = cards.length - cardsToShow;

    if (totalSlides < 0) {
        totalSlides = 0;
    }

    if (currentSlide > totalSlides) {
        currentSlide = totalSlides;
    }

    if (currentSlide < 0) {
        currentSlide = 0;
    }

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(slides).gap) || 0;
    const move = currentSlide * (cardWidth + gap);

    slides.style.transform = "translateX(-" + move + "px)";

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides;

    const allDots = dots.querySelectorAll("button");

    for (let i = 0; i < allDots.length; i++) {
        allDots[i].classList.remove("active");
    }

    if (allDots[currentSlide]) {
        allDots[currentSlide].classList.add("active");
    }
}

nextBtn.addEventListener("click", function() {
    currentSlide++;
    showSlide();
});

prevBtn.addEventListener("click", function() {
    currentSlide--;
    showSlide();
});

window.addEventListener("resize", checkScreenSize);

checkScreenSize();

// TEAM_SHOWCASE_API_CONNECTION
(async function loadTeamDataFromAPI() {
    const apiURL = "https://team-member-showcasing.onrender.com/teamMembers";

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const members = await response.json();
        if (!Array.isArray(members)) {
            throw new Error("API response is not a list.");
        }

        const allCards = document.querySelectorAll("#slides .profile-card");

        // Keep the existing card design and images; display only API records.
        allCards.forEach((card, index) => {
            card.hidden = index >= members.length;
        });

        cards = document.querySelectorAll(
            "#slides .profile-card:not([hidden])"
        );

        members.slice(0, cards.length).forEach((member, index) => {
            const card = cards[index];
            const name = card.querySelector(".member-name");
            const role = card.querySelector(".member-role");
            const bio = card.querySelector(".member-bio");
            const skills = card.querySelector(".skills-container");

            if (name && member.name) name.textContent = member.name;
            if (role && member.role) role.textContent = member.role;
            if (bio && member.description) {
                bio.textContent = member.description;
            }

            if (skills && Array.isArray(member.skills)) {
                skills.replaceChildren();

                member.skills.forEach(skill => {
                    const tag = document.createElement("span");
                    tag.className = "skill-tag";
                    tag.textContent = skill;
                    skills.appendChild(tag);
                });
            }
        });

        checkScreenSize();
        console.log(`Loaded ${members.length} team members from Render.`);
    } catch (error) {
        console.error("Team API connection failed:", error);
    }
})();
