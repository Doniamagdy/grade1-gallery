
const filterButtons = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".photo-card")];

// FILTER PHOTOS
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.filter;

        cards.forEach(card => {
            card.hidden =
                category !== "alle" &&
                card.dataset.category !== category;
        });
    });
});

// INSTAGRAM HEART BUTTONS
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {

        const liked = button.classList.toggle("liked");

        button.textContent = liked ? "♥" : "♡";

        button.setAttribute(
            "aria-pressed",
            String(liked)
        );
    });
});

// PHOTO SLIDESHOW
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

const visibleCards = () =>
    cards.filter(card => !card.hidden);

let currentIndex = 0;

function showPhoto(index) {

    const photos = visibleCards();

    currentIndex =
        (index + photos.length) % photos.length;

    const selectedPhoto = photos[currentIndex];

    lightboxImage.src =
        selectedPhoto.querySelector("img").src;

    lightboxImage.alt =
        selectedPhoto.querySelector("img").alt;
}

function openPhoto(card) {

    currentIndex = visibleCards().indexOf(card);

    showPhoto(currentIndex);

    lightbox.hidden = false;

    document.body.style.overflow = "hidden";
}

function closePhoto() {

    lightbox.hidden = true;

    document.body.style.overflow = "";
}

// OPEN PHOTOS
cards.forEach(card => {

    card.querySelector(".photo-open")
        .addEventListener("click", () => {
            openPhoto(card);
        });

});

// CLOSE PHOTO
lightbox.querySelector(".close")
    .addEventListener("click", closePhoto);

// NEXT PHOTO
lightbox.querySelector(".next")
    .addEventListener("click", () => {
        showPhoto(currentIndex + 1);
    });

// PREVIOUS PHOTO
lightbox.querySelector(".previous")
    .addEventListener("click", () => {
        showPhoto(currentIndex - 1);
    });

// CLOSE BY CLICKING OUTSIDE
lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closePhoto();
    }

});

// KEYBOARD CONTROLS
document.addEventListener("keydown", event => {

    if (lightbox.hidden) return;

    if (event.key === "Escape") {
        closePhoto();
    }

    if (event.key === "ArrowRight") {
        showPhoto(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showPhoto(currentIndex - 1);
    }

});

// MOBILE NAVBAR
const menuToggle =
    document.querySelector(".menu-toggle");

const navbar =
    document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("open");

    menuToggle.textContent = isOpen ? "×" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

// CLOSE MENU AFTER CLICKING A LINK
navbar.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});
