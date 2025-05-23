const searchBtn = document.querySelector(".search-btn");
const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

async function fetchRecipes(query) {
  recipeContainer.innerHTML = "<h2>fetching recipes ...</h2>";
  const data =
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
`);
  recipeContainer.innerHTML = "";
  const response = await data.json();
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `;

    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // adding event listner to button
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
  });
  //   console.log(response);
}

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
  <h2 class="recipeName" >${meal.strMeal}</h2>
  <h3>Ingredients:</h3>
  <ul class="ingredientsList" >${fetchIngredients(meal)}</ul>

  <div class="recipeInstructions" >
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  </div>

  `;

  recipeDetailsContent.parentElement.style.display = "block";
};

const fetchIngredients = (meal) => {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  //   console.log("Button Clicked");
  fetchRecipes(searchInput);
});
