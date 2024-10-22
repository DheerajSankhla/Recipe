const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const recipeBox = document.querySelector('.recipe-container')
const recipeDeatailContent = document.querySelector('.recipe-detail')


// function get to recipe
const searchImage = async (query) => {
    recipeBox.innerHTML="<h1> Searching Recipe........"
    try{
        const url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

        const response = await url.json()
       
        console.log("full api data",response)
        console.log("meals data",response.meals)

        // clearl box
         recipeBox.innerHTML=''

         // check the recipe in the api
         if(response.meals){
            response.meals.forEach(element => {
                const recipeDiv = document.createElement('div')
                recipeDiv.classList.add('recipe')

               recipeDiv.innerHTML=

               `
               <img src="${element.strMealThumb}" alt="${"${element.strMeal}"}">
                <h3>${element.strMeal}</h3>
                <p><span> ${element.strArea}</span> Dish</p>
                <p>Belongs to <span>${element.strCategory}</span> category</p>
               `
               const button = document.createElement('button')
               button.textContent="View Recipe"
               recipeDiv.appendChild(button)
               recipeBox.appendChild(recipeDiv)

               button.addEventListener('click',()=>{
                openrecipePopPup(element)
               })
                
            });
         }else{
            // if recipe not found
            recipeBox.innerHTML= `<p> search meal ${query} not found search the another recipe  </p>`
         }
    }
    catch(error){
           console.log("fetch api error ",error)
           recipeBox.innerHTML=`<p>There was an error fetching the recipes. Please try again later.</p>`
    }

}
// details about the recipe
const fetchIntregates =(element)=>{
let  IngreantList =""
for(let i=1 ; i<=20 ; i++){
    let ingredent = element[`strIngredient${i}`];
    if(ingredent){
        let measure = element[`strMeasure${i}`];
        IngreantList += `<li> ${measure} : ${ingredent}</li>`
    }
    else{
     break;
    }
  
}
return IngreantList
}



const openrecipePopPup = (element)=>{
    recipeDeatailContent.innerHTML =`        
 <button class="recipe-close-btn">
                <i class="fa-solid fa-xmark"></i>
            </button>
 <h4> ${element.strMeal}</h4>
 <ul>${fetchIntregates(element)}<ul>
 <div>
       <h3> Instruction : </h3>
       <p> ${element.strInstructions} 
 </div>
`
recipeDeatailContent.style.display ="block"

const closebtn = document.querySelector('.recipe-close-btn')
if (closebtn) {
    closebtn.addEventListener('click', () => {
        console.log("Close button clicked");
        recipeDeatailContent.style.display = "none";  // Close the popup
       
    });
} else {
    console.error("Close button not found");
}
}


searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim()
    searchImage(searchValue)
    console.log("clicked")
})

