const searchBtn=document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe_Container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseButton = document.querySelector(".recipe-close-button");
const searchBox=document.querySelector(".searchBox");



//function to get recipe
const fetchRecipes = async (searchInput)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes.....</h2>";
    try{ const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const response= await data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meal=> {
        const recipeDiv = document.createElement("div");//creating a new div using Js
        recipeDiv.classList.add("recipe");//craete a class of newly created div named  recipe 
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>"${meal.strMeal}"</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p> <span>${meal.strCategory}</span></p>
        `//access img name and recipe from API

        const button = document.createElement('button');//create a button using js
        button.textContent="View Recipe";
        button.classList.add("viewBtn");
        recipeDiv.appendChild(button);//append the button in div otherwise it doesn't show.

        //adding eventlistener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
            //console.log(meal);
        });

        recipeContainer.appendChild(recipeDiv);//this will access and print all meal image. in a loop and show in the screen
    });
}
catch(error){
    recipeContainer.innerHTML = `
        <h2>Recipe Not found🥲</h2>
        <img src="recipe_not_found.jpeg">
    `;
}
} 


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div  class="recipeInstructions">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display="block";
}
//function to fetch ingredients
const fetchIngredients = (meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
    
}
recipeCloseButton.addEventListener("click", ()=>{
    recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();/*this will stop auto submit and reload page */
    const searchInput = searchBox.value.trim();//this will extract search item without whitespace
    if(!searchInput){
       recipeContainer.innerHTML="<h2>Type the meal in the searchbox</h2>";
       return; 
    }
   
    fetchRecipes(searchInput);
});

