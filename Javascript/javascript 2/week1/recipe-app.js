document.addEventListener("DOMContentLoaded", function () {
  const recipe = {
    id: 1,
    title: "Gløgg",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: undefined },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    Instructions: "Mix everything, heat it, and you are good to go!",
  };

  // Display a recipe on page load
  displayRecipe(recipe);

  // Function to add a single ingredient
  window.addIngredient = function () {
    const ingredientName = document.getElementById("ingredientName").value;
    const ingredientAmount = document.getElementById("ingredientAmount").value;

    if (ingredientName.trim() === "" || ingredientAmount.trim() === "") {
      alert(`Please add both an ingredient and an amount`);
    } else {
      displayAddedIngredient(ingredientName, ingredientAmount);
    }
    // Clear the input fields
    clearIngredientForm();
  };

  // Function to handle form submission and display the new recipe
  window.handleFormSubmission = function () {
    const newRecipeContainer = document.getElementById("newRecipeContainer");

    const title = document.getElementById("recipeTitle").value;
    const instructions = document.getElementById("instructions").value;

    // Get the list of added ingredients
    const ingredientsList = getIngredientsList();

    if (ingredientsList.length < 5) {
      alert(`Please add at least 5 ingredients.`);
      return;
    }

    const newRecipe = {
      title,
      ingredients: ingredientsList,
      Instructions: instructions,
    };

    // Display the new recipe
    displayRecipe(newRecipe);

    // Clear the form
    clearForm();
  };

  function displayRecipe(recipe) {
    const recipeContainer = document.getElementById("recipeContainer");

    const titleElement = document.createElement("h1");
    titleElement.innerText = recipe.title;

    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.innerText = `${ingredient.NAME}: ${
        ingredient.AMOUNT || "N/A"
      }`;
      ingredientsList.appendChild(ingredientItem);
    });

    const instructionsElement = document.createElement("p");
    instructionsElement.innerText = recipe.Instructions;

    recipeContainer.innerHTML = ""; // Clear previous content
    recipeContainer.appendChild(titleElement);
    recipeContainer.appendChild(ingredientsList);
    recipeContainer.appendChild(instructionsElement);
  }

  function displayAddedIngredient(name, amount) {
    const ingredientList = document.getElementById("ingredientList");

    const ingredientItem = document.createElement("div");
    ingredientItem.innerText = `${name}: ${amount || "N/A"}`;

    ingredientList.appendChild(ingredientItem);
  }

  function getIngredientsList() {
    const ingredientList = document.getElementById("ingredientList");
    const ingredients = [];

    // Extract added ingredients from the displayed list
    ingredientList.childNodes.forEach((ingredient) => {
      const [name, amount] = ingredient.innerText
        .split(": ")
        .map((item) => item.trim());
      ingredients.push({ NAME: name, AMOUNT: amount });
    });

    return ingredients;
  }

  function clearForm() {
    document.getElementById("recipeTitle").value = "";
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientAmount").value = "";
    document.getElementById("instructions").value = "";
    document.getElementById("ingredientList").innerHTML = ""; // Clear added ingredients
  }

  function clearIngredientForm() {
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientAmount").value = "";
  }
});
