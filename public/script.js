// ===============================
// AUTH CHECK
// ===============================

const token = localStorage.getItem("token");


if(!token){

    window.location.href="login.html";

}

// ========================
// HERO SLIDESHOW
// ========================

const slides = document.querySelectorAll(".hero-slideshow .slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach((slide, i) => {

        slide.classList.toggle("active", i === index);

    });

}

function nextSlide() {

    currentSlide = (currentSlide + 1) % slides.length;

    showSlide(currentSlide);

}

if (slides.length > 0) {

    showSlide(currentSlide);

    setInterval(nextSlide, 5000);

}

// ========================
// MOBILE NAVIGATION
// ========================

const navToggle = document.getElementById("nav-toggle");

const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {

    navToggle.addEventListener("click", () => {

        const expanded =
            navToggle.getAttribute("aria-expanded") === "true";

        navToggle.setAttribute("aria-expanded", !expanded);

        navLinks.classList.toggle("active");

    });

}

// ========================
// DROPDOWN MENUS
// ========================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

    const menu = dropdown.querySelector(".dropdown-menu");

    if (!menu) return;

    dropdown.addEventListener("mouseenter", () => {

        menu.style.display = "block";

    });

    dropdown.addEventListener("mouseleave", () => {

        menu.style.display = "none";

    });

});

// ========================
// DARK MODE
// ========================

const darkModeBtn = document.getElementById("dark-mode-toggle");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        darkModeBtn.textContent =
            document.body.classList.contains("dark-mode")
                ? "☀️"
                : "🌙";

    });

}

const darkModeStyles = document.createElement("style");

darkModeStyles.innerHTML = `

.dark-mode{

    background:#1e2b20;

    color:#e0f0d9;

}

.dark-mode .site-header{

    background:#13301f;

}

.dark-mode .btn-primary{

    background:#4d9c2e;

    color:#fff;

}

.dark-mode .btn-outline{

    border-color:#fff;

    color:#fff;

}

.dark-mode .safari-card,

.dark-mode .choose-card,

.dark-mode .booking-form,

.dark-mode blockquote{

    background:#25412b;

    color:#e0f0d9;

}

`;

document.head.appendChild(darkModeStyles);

// ========================
// BOOKING FORM
// CITIZENSHIP TOGGLE
// ========================

const citizenship = document.getElementById("citizenship");

const idInput = document.getElementById("idNumber");

const passportInput = document.getElementById("passportNumber");

if (citizenship && idInput && passportInput) {

    citizenship.addEventListener("change", () => {

        if (citizenship.value === "citizen") {

            idInput.style.display = "block";

            passportInput.style.display = "none";

        }

        else if (citizenship.value === "non-citizen") {

            idInput.style.display = "none";

            passportInput.style.display = "block";

        }

        else {

            idInput.style.display = "none";

            passportInput.style.display = "none";

        }

    });

}

// ========================
// BOOKING FORM SUBMISSION
// ========================

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(bookingForm);

        const data = Object.fromEntries(formData.entries());

        try {

            const response = await fetch("http://localhost:5000/api/bookings", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });

            const result = await response.json();

            if (result.success) {

                alert("Safari booking submitted successfully!");

                bookingForm.reset();

            } else {

                alert(result.message || "Booking failed.");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to submit booking.");

        }

    });

}

// ========================
// FOOTER YEAR
// ========================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

// ========================
// GALLERY LIGHTBOX
// ========================

const galleryImages = document.querySelectorAll(".gallery-item");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    document.body.appendChild(lightbox);

    lightbox.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.9);
        display:flex;
        justify-content:center;
        align-items:center;
        opacity:0;
        visibility:hidden;
        transition:opacity .3s ease;
        z-index:9999;
    `;

    const lightboxImg = document.createElement("img");

    lightboxImg.style.maxWidth = "90%";

    lightboxImg.style.maxHeight = "90%";

    lightboxImg.style.borderRadius = "10px";

    lightbox.appendChild(lightboxImg);

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightboxImg.src = image.src;

            lightbox.style.visibility = "visible";

            lightbox.style.opacity = "1";

        });

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target !== lightboxImg) {

            lightbox.style.opacity = "0";

            setTimeout(() => {

                lightbox.style.visibility = "hidden";

            }, 300);

        }

    });

}

// ========================
// CONTACT FORM
// ========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = Object.fromEntries(

            new FormData(contactForm).entries()

        );

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(data)

            });

            const result = await response.json();

            if (result.success) {

                alert("Message sent successfully!");

                contactForm.reset();

            } else {

                alert(result.message || "Unable to send message.");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to send message.");

        }

    });

}

// ========================
// DESTINATION INFORMATION
// ========================

const popup = document.getElementById("destinationPopup");

if (popup) {

    const descriptions = {

        mara: {

            title: "Masai Mara National Reserve",

            text: "Kenya's premier safari destination, famous for the Great Wildebeest Migration, the Big Five, and endless golden savannahs."

        },

        amboseli: {

            title: "Amboseli National Park",

            text: "Renowned for large elephant herds and breathtaking views of Mount Kilimanjaro, Africa's highest mountain."

        },

        tsavo: {

            title: "Tsavo National Parks",

            text: "Tsavo East and Tsavo West together form Kenya's largest protected wildlife ecosystem. Tsavo East is Kenya's largest national park and is famous for its red elephants."

        },

        samburu: {

            title: "Samburu National Reserve",

            text: "Home of the unique Samburu Special Five including the Grevy's Zebra, Reticulated Giraffe and Gerenuk."

        },

        diani: {

            title: "Diani Beach",

            text: "An award-winning tropical beach with white sand, turquoise waters, coral reefs and luxury beach resorts."

        },

        nairobi: {

            title: "Nairobi National Park",

            text: "The world's only national park located next to a capital city, offering lions, rhinos, giraffes and spectacular city views."

        },

        lakeNakuru: {

    title: "Lake Nakuru",

    text: "Famous for its flamingos, rhinos, and breathtaking Rift Valley scenery, offering exceptional wildlife viewing and birdwatching experiences."
},

    };

    const buttons = document.querySelectorAll("#dest-menu button");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            const info = descriptions[button.dataset.destination];

            if (!info) return;

            popup.innerHTML = `
                <h3>${info.title}</h3>
                <p>${info.text}</p>
            `;

            popup.style.display = "block";

        });

    });

    const menu = document.getElementById("dest-menu");

    menu.addEventListener("mouseleave", () => {

        popup.style.display = "none";

    });

    popup.addEventListener("mouseleave", () => {

        popup.style.display = "none";

    });

}

const messageBox = document.getElementById("messageBox");

if (messageBox) {

    messageBox.addEventListener("focus", () => {

        messageBox.classList.add("expanded");

    });

    messageBox.addEventListener("blur", () => {

        if (messageBox.value.trim() === "") {

            messageBox.classList.remove("expanded");

        }

    });

}

const API =
"http://localhost:5000/api/reviews";



async function loadReviews(){


const response =
await fetch(API);


const reviews =
await response.json();


displayReviews(
reviews.slice(0,3)
);


updateSummary(reviews);


}

const reviewForm =
document.getElementById("reviewForm");



if(reviewForm){


reviewForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const name =
document.getElementById(
"reviewName"
).value;



const comment =
document.getElementById(
"reviewText"
).value;



const rating =
Number(
document.querySelector(
'input[name="rating"]:checked'
).value
);





const response =
await fetch(
"http://localhost:5000/api/reviews",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:JSON.stringify({

name,

rating,

comment

})


});


const data =
await response.json();



document.getElementById(
"reviewMessage"
).innerHTML =
"Thank you! Your review awaits approval.";



reviewForm.reset();


});


}

