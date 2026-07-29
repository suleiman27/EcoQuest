const API="http://localhost:5000/api/destinations";


const table=document.getElementById("destinationTable");



async function loadDestinations(){


const res=await fetch(API);

const destinations=await res.json();


table.innerHTML="";


let featured=0;
let countries=[];



destinations.forEach((d,index)=>{


if(d.featured)
featured++;


if(!countries.includes(d.country))
countries.push(d.country);



table.innerHTML += `

<tr>

<td>${index+1}</td>


<td>

<img src="${d.image || 'images/default.jpg'}"
width="70">

</td>



<td>${d.name}</td>


<td>${d.country}</td>


<td>${d.description}</td>


<td>

${d.featured ? "⭐ Yes":"No"}

</td>


<td>


<button onclick="editDestination(${d.id})">

<i class="fa fa-edit"></i>

</button>


<button onclick="deleteDestination(${d.id})">

<i class="fa fa-trash"></i>

</button>



</td>



</tr>


`;



});



document.getElementById("totalDestinations").innerHTML=
destinations.length;


document.getElementById("featuredCount").innerHTML=
featured;


document.getElementById("countryCount").innerHTML=
countries.length;



}



loadDestinations();





// ADD DESTINATION


document.getElementById("destinationForm")
.addEventListener("submit",async e=>{


e.preventDefault();



const data={


name:
destinationName.value,


country:
destinationCountry.value,


image:
destinationImage.value,


description:
destinationDescription.value,


featured:
destinationFeatured.checked



};



await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)


});



location.reload();



});







async function deleteDestination(id){


if(confirm("Delete destination?")){


await fetch(`${API}/${id}`,{

method:"DELETE"

});


loadDestinations();


}


}






let editDestination=async(id)=>{


const res=await fetch(API);

const data=await res.json();


const d=data.find(x=>x.id===id);



destinationName.value=d.name;

destinationCountry.value=d.country;

destinationImage.value=d.image;

destinationDescription.value=d.description;

destinationFeatured.checked=d.featured;



document.getElementById("destinationId").value=id;


document.getElementById("destinationModal")
.style.display="flex";



};




