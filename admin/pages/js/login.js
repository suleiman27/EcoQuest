// ===============================
// Clear Old Login Data
// ===============================

document.addEventListener("DOMContentLoaded",()=>{


    const emailInput = document.getElementById("email");

    const passwordInput = document.getElementById("password");


    if(emailInput){

        emailInput.value = "";

    }


    if(passwordInput){

        passwordInput.value = "";

    }



});




// ===============================
// Login
// ===============================


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;



    const message = document.getElementById("message");



    try{


        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email,

                    password

                })


            }
        );



        const data = await response.json();




        if(!response.ok){


            throw new Error(
                data.message || "Login failed"
            );


        }




        // Save JWT token

        localStorage.setItem(
            "token",
            data.token
        );



        // Save admin information if returned

        if(data.admin){

            localStorage.setItem(
                "admin",
                JSON.stringify(data.admin)
            );

        }





        // Go to dashboard

        window.location.href="dashboard.html";



    }

    catch(error){



        console.error(error);



        message.textContent =
        error.message;



    }



});