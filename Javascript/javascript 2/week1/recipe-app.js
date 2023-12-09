document.addEventListener("DOMContentLoaded", function () {
  const recipe = {
    name: "Spaghetti Bolognese",
    ingredients: [
      "500g spaghetti",
      "400g ground beef",
      "1 onion",
      "2 cloves garlic",
      "400g canned tomatoes",
    ],
    instructions:
      "Cook the spaghetti.\n In a pan, sauté chopped onions and garlic, add ground beef, and stir in canned tomatoes.\n Simmer until cooked.\n Serve over cooked spaghetti.",
  };
  const recipeContainer = document.getElementById("recipeContainer");
  const titleElement = document.createElement("h2");
  titleElement.textContent = recipe.name;

  const ingredientsElement = document.createElement("ul");
  recipe.ingredients.forEach((ingredient) => {
    const listItem = document.createElement("li");
    listItem.textContent = ingredient;
    ingredientsElement.appendChild(listItem);
  });
  const instructionsElement = document.createElement("p");
  instructionsElement.textContent = recipe.instructions;

  recipeContainer.appendChild(titleElement);
  recipeContainer.appendChild(ingredientsElement);
  recipeContainer.appendChild(instructionsElement);
});
