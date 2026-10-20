
const slides = document.getElementById("slides");
const cards = document.querySelectorAll(".profile-card");
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
