// ======================================================
// ECOQUEST SAFARIS
// MAIN JAVASCRIPT
// Part 1 of 3
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // CONFIG
    // ======================================================

    const API_BASE = "http://localhost:5000/api";

    // ======================================================
    // AUTH CHECK
    // ======================================================

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // ======================================================
    // HERO SLIDESHOW
    // ======================================================

    const slides = document.querySelectorAll(".hero-slideshow .slide");

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.classList.toggle("active", i === index);

        });

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }

    if (slides.length > 0) {

        showSlide(0);

        setInterval(nextSlide, 5000);

    }

    // ======================================================
    // MOBILE NAVIGATION
    // ======================================================

    const navToggle = document.getElementById("nav-toggle");

    const navLinks = document.getElementById("nav-links");

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const expanded =
                navToggle.getAttribute("aria-expanded") === "true";

            navToggle.setAttribute(
                "aria-expanded",
                !expanded
            );

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                navToggle.setAttribute(
                    "aria-expanded",
                    false
                );

            });

        });

    }

   // ======================================================
// MEGA MENU DESTINATIONS
// ======================================================

const destinationPopup = document.getElementById("destinationPopup");

const destinationData = {

    mara:{

        title:"🦁 Masai Mara National Reserve",

        image:"images/Maasai Mara.jpeg",

        description:"Kenya's most iconic safari destination, famous for the Big Five, endless savannahs and the spectacular Great Wildebeest Migration."

    },

    amboseli:{

        title:"🐘 Amboseli National Park",

        image:"images/Amboseli.jpeg",

        description:"Renowned for giant elephant herds with breathtaking views of Mount Kilimanjaro, Africa's highest mountain."

    },

    tsavo:{

        title:"🌋 Tsavo National Parks",

        image:"images/Tsavo East.jpeg",

        description:"Kenya's largest protected ecosystem, famous for red elephants, lava fields, lions and dramatic landscapes."

    },

    samburu:{

        title:"🦒 Samburu National Reserve",

        image:"images/samburu.jpg",

        description:"A unique northern wilderness where you can spot the Samburu Special Five found nowhere else."

    },

    diani:{

        title:"🏖 Diani Beach",

        image:"images/diani.jpeg",

        description:"Relax on award-winning white sandy beaches, crystal-clear waters and luxurious beach resorts."

    },

    nairobi:{

        title:"🦏 Nairobi National Park",

        image:"images/nnp.jpeg",

        description:"The world's only national park bordering a capital city, offering lions, rhinos and giraffes."

    },

    lakeNakuru:{

        title:"🦩 Lake Nakuru National Park",

        image:"images/Lake Nakuru.jpeg",

        description:"Home to flamingos, endangered rhinos and spectacular Rift Valley scenery."

    }

};

// Update right panel when hovering
document.querySelectorAll(".mega-links button").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        const place = destinationData[button.dataset.destination];

        if(!place) return;

        destinationPopup.innerHTML = `

            <img src="${place.image}" alt="${place.title}">

            <h3>${place.title}</h3>

            <p>${place.description}</p>

        `;

    });

});

// Reset when leaving the entire mega menu
const megaMenu = document.querySelector(".mega-menu");

if(megaMenu){

    megaMenu.addEventListener("mouseleave",()=>{

        destinationPopup.innerHTML = `

            <h3>🌍 EcoQuest Destinations</h3>

            <p>

                Hover over any destination on the left to discover
                Kenya's most breathtaking safari locations.

            </p>

        `;

    });

}
    // ======================================================
    // DARK MODE
    // ======================================================

    const darkBtn =
        document.getElementById("dark-mode-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (darkBtn) {

            darkBtn.textContent = "☀️";

        }

    }

    if (darkBtn) {

        darkBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const dark =
                document.body.classList.contains("dark");

            darkBtn.textContent =
                dark ? "☀️" : "🌙";

            localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );

        });

    }

    // ======================================================
    // SCROLL REVEAL
    // ======================================================

    const reveals =
        document.querySelectorAll(
            ".fade-in,.fade-in-up"
        );

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },{

            threshold:.15

        });

    reveals.forEach(item=>observer.observe(item));

    // ======================================================
    // FOOTER YEAR
    // ======================================================

    const year =
        document.getElementById("year");

    if(year){

        year.textContent =
            new Date().getFullYear();

    }

        // ======================================================
    // BOOKING FORM
    // ======================================================

    const citizenship =
        document.getElementById("citizenship");

    const idNumber =
        document.getElementById("idNumber");

    const passportNumber =
        document.getElementById("passportNumber");

    if (citizenship) {

        citizenship.addEventListener("change", () => {

            idNumber.style.display = "none";
            passportNumber.style.display = "none";

            if (citizenship.value === "citizen") {

                idNumber.style.display = "block";

            }

            if (citizenship.value === "non-citizen") {

                passportNumber.style.display = "block";

            }

        });

    }

    const bookingForm =
        document.getElementById("booking-form");

    if (bookingForm) {

        bookingForm.addEventListener("submit", async e => {

            e.preventDefault();

            const formData =
                new FormData(bookingForm);

            const data =
                Object.fromEntries(formData.entries());

            try {

                const response =
                    await fetch(`${API_BASE}/bookings`, {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify(data)

                    });

                const result =
                    await response.json();

                if (
                    response.ok &&
                    (result.success || !result.error)
                ) {

                    alert(
                        "Your safari booking has been received. We will contact you shortly."
                    );

                    bookingForm.reset();

                    idNumber.style.display = "none";
                    passportNumber.style.display = "none";

                } else {

                    alert(
                        result.message ||
                        "Booking could not be completed."
                    );

                }

            } catch (err) {

                console.error(err);

                alert(
                    "Server unavailable. Please try again later."
                );

            }

        });

    }

    // ======================================================
    // CONTACT FORM
    // ======================================================

    const contactForm =
        document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", async e => {

            e.preventDefault();

            const data = Object.fromEntries(

                new FormData(contactForm).entries()

            );

            try {

                const response =
                    await fetch(`${API_BASE}/contact`, {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify(data)

                    });

                const result =
                    await response.json();

                if (
                    response.ok &&
                    (result.success || !result.error)
                ) {

                    alert(
                        "Thank you! Your message has been sent."
                    );

                    contactForm.reset();

                } else {

                    alert(
                        result.message ||
                        "Unable to send your message."
                    );

                }

            } catch (err) {

                console.error(err);

                alert(
                    "Unable to connect to the server."
                );

            }

        });

    }

    // ======================================================
    // MESSAGE BOX AUTO EXPAND
    // ======================================================

    const messageBox =
        document.getElementById("messageBox");

    if (messageBox) {

        messageBox.addEventListener("focus", () => {

            messageBox.classList.add("expanded");

        });

        messageBox.addEventListener("blur", () => {

            if (!messageBox.value.trim()) {

                messageBox.classList.remove("expanded");

            }

        });

    }

    // ======================================================
    // SMOOTH SCROLL
    // ======================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });

    // ======================================================
    // BUTTON RIPPLE EFFECT
    // ======================================================

    document
        .querySelectorAll(".btn, button")
        .forEach(button => {

            button.addEventListener("mouseenter", () => {

                button.style.transform =
                    "translateY(-2px)";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform =
                    "translateY(0)";

            });

        });

    // ======================================================
    // PAGE LOADER
    // ======================================================

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });

        // ======================================================
    // GALLERY LIGHTBOX
    // ======================================================

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    if (galleryItems.length > 0) {

        const lightbox = document.createElement("div");

        lightbox.id = "lightbox";

        lightbox.innerHTML = `

            <span class="lightbox-close">&times;</span>

            <img class="lightbox-image">

            <button class="lightbox-prev">&#10094;</button>

            <button class="lightbox-next">&#10095;</button>

        `;

        document.body.appendChild(lightbox);

        Object.assign(lightbox.style, {

            position: "fixed",

            inset: "0",

            background: "rgba(0,0,0,.92)",

            display: "none",

            justifyContent: "center",

            alignItems: "center",

            zIndex: "99999"

        });

        const image =
            lightbox.querySelector(".lightbox-image");

        const closeBtn =
            lightbox.querySelector(".lightbox-close");

        const prevBtn =
            lightbox.querySelector(".lightbox-prev");

        const nextBtn =
            lightbox.querySelector(".lightbox-next");

        Object.assign(image.style, {

            maxWidth: "90%",

            maxHeight: "90%",

            borderRadius: "12px",

            boxShadow: "0 10px 35px rgba(0,0,0,.5)"

        });

        [closeBtn, prevBtn, nextBtn].forEach(btn => {

            Object.assign(btn.style, {

                position: "absolute",

                color: "#fff",

                background: "rgba(0,0,0,.35)",

                border: "none",

                cursor: "pointer",

                fontSize: "32px",

                padding: "12px 18px",

                borderRadius: "50%"

            });

        });

        closeBtn.style.top = "25px";
        closeBtn.style.right = "35px";

        prevBtn.style.left = "30px";
        prevBtn.style.top = "50%";
        prevBtn.style.transform = "translateY(-50%)";

        nextBtn.style.right = "30px";
        nextBtn.style.top = "50%";
        nextBtn.style.transform = "translateY(-50%)";

        let currentIndex = 0;

        function openLightbox(index) {

            currentIndex = index;

            image.src = galleryItems[index].src;

            lightbox.style.display = "flex";

            document.body.style.overflow = "hidden";

        }

        function closeLightbox() {

            lightbox.style.display = "none";

            document.body.style.overflow = "";

        }

        function nextImage() {

            currentIndex++;

            if (currentIndex >= galleryItems.length) {

                currentIndex = 0;

            }

            image.src = galleryItems[currentIndex].src;

        }

        function previousImage() {

            currentIndex--;

            if (currentIndex < 0) {

                currentIndex = galleryItems.length - 1;

            }

            image.src = galleryItems[currentIndex].src;

        }

        galleryItems.forEach((item, index) => {

            item.style.cursor = "pointer";

            item.addEventListener("click", () => {

                openLightbox(index);

            });

        });

        nextBtn.addEventListener("click", nextImage);

        prevBtn.addEventListener("click", previousImage);

        closeBtn.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", e => {

            if (e.target === lightbox) {

                closeLightbox();

            }

        });

        document.addEventListener("keydown", e => {

            if (lightbox.style.display !== "flex") return;

            switch (e.key) {

                case "Escape":

                    closeLightbox();

                    break;

                case "ArrowRight":

                    nextImage();

                    break;

                case "ArrowLeft":

                    previousImage();

                    break;

            }

        });

    }

    // ======================================================
    // IMAGE HOVER EFFECT
    // ======================================================

    document.querySelectorAll("img").forEach(img => {

        img.setAttribute("loading", "lazy");

    });

    // ======================================================
    // BACK TO TOP BUTTON (AUTO CREATE)
    // ======================================================

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "back-to-top";

    document.body.appendChild(topButton);

    Object.assign(topButton.style, {

        position: "fixed",

        right: "20px",

        bottom: "110px",

        width: "50px",

        height: "50px",

        borderRadius: "50%",

        border: "none",

        background: "#1d6b52",

        color: "#fff",

        fontSize: "22px",

        cursor: "pointer",

        display: "none",

        zIndex: "9999",

        boxShadow: "0 8px 20px rgba(0,0,0,.2)"

    });

    window.addEventListener("scroll", () => {

        topButton.style.display =
            window.scrollY > 400 ? "block" : "none";

    });

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    // ======================================================
    // SIMPLE COUNTER ANIMATION
    // ======================================================

    document.querySelectorAll("[data-count]").forEach(counter => {

        const target = Number(counter.dataset.count);

        let current = 0;

        const step = Math.ceil(target / 60);

        const timer = setInterval(() => {

            current += step;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current;

        }, 20);

    });

        // ======================================================
    // REVIEWS MODULE
    // ======================================================

    const REVIEWS_API = `${API_BASE}/reviews`;

    const reviewsContainer =
        document.getElementById("reviewsContainer");

    const averageRating =
        document.getElementById("averageRating");

    const reviewCount =
        document.getElementById("reviewCount");

    // ======================================================
    // DISPLAY REVIEWS
    // ======================================================

    function displayReviews(reviews = []) {

        if (!reviewsContainer) return;

        reviewsContainer.innerHTML = "";

        if (reviews.length === 0) {

            reviewsContainer.innerHTML = `

                <div class="review-card">

                    <p>No reviews yet.</p>

                </div>

            `;

            return;

        }

        reviews.forEach(review => {

            const initials =
                review.name
                    ? review.name.charAt(0).toUpperCase()
                    : "?";

            const stars =
                "⭐".repeat(review.rating || 5);

            const country =
                review.country || "Traveller";

            const card =
                document.createElement("div");

            card.className = "review-card";

            card.innerHTML = `

                <div class="review-header">

                    <div class="review-avatar">

                        ${initials}

                    </div>

                    <div class="review-user">

                        <h3>${review.name}</h3>

                        <span>${country}</span>

                    </div>

                </div>

                <div class="review-stars">

                    ${stars}

                </div>

                <p class="review-text">

                    ${review.comment}

                </p>

            `;

            reviewsContainer.appendChild(card);

        });

    }

    // ======================================================
    // UPDATE REVIEW SUMMARY
    // ======================================================

    function updateSummary(reviews = []) {

        if (!averageRating || !reviewCount) return;

        reviewCount.textContent = reviews.length;

        if (reviews.length === 0) {

            averageRating.textContent = "0.0";

            return;

        }

        const total = reviews.reduce((sum, review) => {

            return sum + Number(review.rating || 0);

        }, 0);

        const average =
            total / reviews.length;

        averageRating.textContent =
            average.toFixed(1);

    }

        // ======================================================
    // LOAD REVIEWS
    // ======================================================

    async function loadReviews() {

        if (!reviewsContainer) return;

        try {

            const response = await fetch(REVIEWS_API);

            if (!response.ok) {

                throw new Error("Unable to fetch reviews.");

            }

            const reviews = await response.json();

            const approvedReviews = Array.isArray(reviews)
                ? reviews
                : [];

            displayReviews(approvedReviews.slice(0, 3));

            updateSummary(approvedReviews);

        } catch (error) {

            console.error("Review Error:", error);

            reviewsContainer.innerHTML = `

                <div class="review-card">

                    <p>Unable to load reviews at the moment.</p>

                </div>

            `;

        }

    }

    // ======================================================
    // REVIEW FORM SUBMISSION
    // ======================================================

    const reviewForm =
        document.getElementById("reviewForm");

    const reviewMessage =
        document.getElementById("reviewMessage");

    if (reviewForm) {

        reviewForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const name =
                document.getElementById("reviewName").value.trim();

            const country =
                document.getElementById("reviewCountry").value.trim();

            const comment =
                document.getElementById("reviewText").value.trim();

            const rating =
                Number(
                    document.querySelector(
                        'input[name="rating"]:checked'
                    ).value
                );

            try {

                const response = await fetch(REVIEWS_API, {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        name,

                        country,

                        rating,

                        comment

                    })

                });

                const result = await response.json();

                if (response.ok && (result.success || !result.error)) {

                    reviewMessage.style.color = "#0d6b46";

                    reviewMessage.textContent =
                        "✅ Thank you! Your review has been submitted and is awaiting approval.";

                    reviewForm.reset();

                    await loadReviews();

                } else {

                    reviewMessage.style.color = "crimson";

                    reviewMessage.textContent =
                        result.message ||
                        "Unable to submit your review.";

                }

            } catch (error) {

                console.error(error);

                reviewMessage.style.color = "crimson";

                reviewMessage.textContent =
                    "Server unavailable. Please try again later.";

            }

        });

    }

    // ======================================================
    // INITIAL REVIEW LOAD
    // ======================================================

    loadReviews();

        // ======================================================
    // FINAL INITIALIZATION
    // ======================================================

    console.log("======================================");
    console.log(" EcoQuest Safaris Loaded Successfully ");
    console.log("======================================");

    // Ensure destination popup is hidden initially
    if (popup) {
        popup.style.display = "none";
    }

    // Ensure footer year is always current
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // ======================================================
    // END OF APPLICATION
    // ======================================================

});