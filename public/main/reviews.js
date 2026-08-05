// ==========================================
// ECOQUEST - ALL REVIEWS PAGE JAVASCRIPT
// ==========================================


const API_URL = "https://ecoquest-1-12jk.onrender.com/api/reviews";


const reviewsContainer = 
document.getElementById("allReviews");


const averageRating =
document.getElementById("averageRating");


const reviewCount =
document.getElementById("reviewCount");




// ==========================================
// LOAD ALL REVIEWS
// ==========================================


async function loadReviews(){


    try{


        reviewsContainer.innerHTML = `

        <div class="loading">

            <i class="fa-solid fa-spinner"></i>

            Loading reviews...

        </div>

        `;



        const response = await fetch(API_URL);



        if(!response.ok){

            throw new Error(
                "Failed to fetch reviews"
            );

        }



        const reviews = await response.json();



        updateSummary(reviews);


        displayReviews(reviews);



    }


    catch(error){


        console.error(error);



        reviewsContainer.innerHTML = `

        <div class="no-reviews">

            <h3>
            Unable to load reviews
            </h3>

            <p>
            Please try again later.
            </p>

        </div>

        `;


    }


}





// ==========================================
// DISPLAY REVIEWS
// ==========================================


function displayReviews(reviews){


    reviewsContainer.innerHTML="";



    if(reviews.length === 0){


        reviewsContainer.innerHTML = `

        <div class="no-reviews">

            <h3>
            No Reviews Yet
            </h3>


            <p>
            Be the first traveller to share your experience.
            </p>


        </div>

        `;


        return;

    }





    reviews.forEach(review=>{


        let stars="";


        for(let i=0;i<review.rating;i++){

            stars += "⭐";

        }





        const initials = review.name

        .split(" ")

        .map(word=>word[0])

        .join("")

        .substring(0,2)

        .toUpperCase();






        reviewsContainer.innerHTML += `


        <div class="review-card">



            <div class="review-header">


                <div class="review-avatar">

                    ${initials}

                </div>



                <div class="review-user">


                    <h3>

                    ${review.name}

                    </h3>



                    <span>

                    EcoQuest Traveller

                    </span>


                </div>


            </div>





            <div class="review-stars">

                ${stars}

            </div>





            <p class="review-text">

                "${review.comment}"

            </p>





            <div class="review-date">

                ${formatDate(review.createdAt)}

            </div>



        </div>


        `;



    });



}







// ==========================================
// UPDATE SUMMARY
// ==========================================


function updateSummary(reviews){


    reviewCount.textContent =
    reviews.length;




    if(reviews.length === 0){


        averageRating.textContent =
        "0.0";


        return;

    }




    const total =
    reviews.reduce(

        (sum,review)=>
        sum + review.rating,

        0

    );



    averageRating.textContent =

    (total / reviews.length)
    .toFixed(1);



}








// ==========================================
// DATE FORMAT
// ==========================================


function formatDate(date){


    return new Date(date)
    .toLocaleDateString(

        "en-GB",

        {

            year:"numeric",

            month:"short",

            day:"numeric"

        }

    );


}






// ==========================================
// INITIAL LOAD
// ==========================================


document.addEventListener(

"DOMContentLoaded",

()=>{


    loadReviews();


}

);