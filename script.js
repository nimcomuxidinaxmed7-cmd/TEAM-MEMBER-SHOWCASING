const API_URL = "https://team-member-showcasing.onrender.com/teamMembers";

const slides = document.getElementById("slides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");

let cards = [];
let currentSlide = 0;
let cardsToShow = 3;

function createTeamCard(member) {
    const card = document.createElement("article");
    card.className = "profile-card";

    const banner = document.createElement("div");
    banner.className = "card-banner";

    const content = document.createElement("div");
    content.className = "profile-content";

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "avatar-wrapper";

    const image = document.createElement("img");
    image.src = member.image || "https://placehold.co/300x300";
    image.alt = `${member.name || "Team member"} profile`;
    image.loading = "lazy";
    avatarWrapper.appendChild(image);

    const name = document.createElement("h2");
    name.className = "member-name";
    name.textContent = member.name || "Team member";

    const role = document.createElement("p");
    role.className = "member-role";
    role.textContent = member.role || "Team member";

    const description = document.createElement("p");
    description.className = "member-bio";
    description.textContent = member.description || "";

    content.append(avatarWrapper, name, role, description);

    if (Array.isArray(member.skills) && member.skills.length > 0) {
        const skills = document.createElement("div");
        skills.className = "skills-container";

        member.skills.forEach(skill => {
            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = skill;
            skills.appendChild(tag);
        });

        content.appendChild(skills);
    }

    const divider = document.createElement("div");
    divider.className = "card-divider";

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const socialLinks = document.createElement("div");
    socialLinks.className = "social-links";

    const socialProfiles = [
        {
            url: member.linkedin,
            label: "LinkedIn",
            icon: "fa-brands fa-linkedin-in"
        },
        {
            url: member.github,
            label: "GitHub",
            icon: "fa-brands fa-github"
        }
    ];

    socialProfiles.forEach(profile => {
        if (profile.url) {
            const link = document.createElement("a");
            link.className = "social-icon";
            link.href = profile.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label", profile.label);

            const icon = document.createElement("i");
            icon.className = profile.icon;

            link.appendChild(icon);
            socialLinks.appendChild(link);
        }
    });

    footer.appendChild(socialLinks);
    content.append(divider, footer);
    card.append(banner, content);

    return card;
}

function makeDots() {
    dots.innerHTML = "";

    const totalSlides = Math.max(1, cards.length - cardsToShow + 1);

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

        dot.addEventListener("click", () => {
            currentSlide = i;
            showSlide();
        });

        dots.appendChild(dot);
    }
}

function showSlide() {
    if (cards.length === 0) {
        slides.style.transform = "translateX(0)";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        dots.innerHTML = "";
        return;
    }

    const totalSlides = Math.max(0, cards.length - cardsToShow);
    currentSlide = Math.max(0, Math.min(currentSlide, totalSlides));

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(slides).gap) || 0;
    const move = currentSlide * (cardWidth + gap);

    slides.style.transform = `translateX(-${move}px)`;

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides;

    const allDots = dots.querySelectorAll("button");

    allDots.forEach(dot => dot.classList.remove("active"));

    if (allDots[currentSlide]) {
        allDots[currentSlide].classList.add("active");
    }
}

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
    showSlide();
}

async function loadTeamMembers() {
    slides.innerHTML = "<p>Loading team members...</p>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const members = await response.json();

        if (!Array.isArray(members)) {
            throw new Error("The API returned an unexpected response.");
        }

        slides.innerHTML = "";

        if (members.length === 0) {
            slides.textContent = "No team members found.";
            cards = [];
            showSlide();
            return;
        }

        members.forEach(member => {
            slides.appendChild(createTeamCard(member));
        });

        cards = Array.from(slides.querySelectorAll(".profile-card"));
        currentSlide = 0;
        checkScreenSize();
    } catch (error) {
        console.error("Unable to load team members:", error);
        slides.innerHTML = "";

        const message = document.createElement("p");
        message.textContent =
            "We couldn't load the team members. Please refresh the page and try again.";

        slides.appendChild(message);
        cards = [];
        showSlide();
    }
}

nextBtn.addEventListener("click", () => {
    currentSlide++;
    showSlide();
});

prevBtn.addEventListener("click", () => {
    currentSlide--;
    showSlide();
});

window.addEventListener("resize", checkScreenSize);

loadTeamMembers();
