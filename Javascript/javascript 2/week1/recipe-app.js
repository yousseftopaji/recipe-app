document.addEventListener("DOMContentLoaded", function () {
  (async () => {
    let recipes = [];
    const recipeGrid = document.getElementById("recipeGrid");
    let startTime = new Date();

    // Fetching the data from the API and adding it to the empty recipes array
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/yousseftopaji/yousseftopaji.github.io/main/recipe-app.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      recipes = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

    // function to create a random number (used in displaying a random recipe)
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    // display recipe randomly from the api content
    displayRecipe(recipes[getRandomNumber(0, recipes.length)]);

    // Function to add a single ingredient
    window.addIngredient = function () {
      const ingredientName = document.getElementById("ingredientName").value;
      const ingredientAmount =
        document.getElementById("ingredientAmount").value;

      if (ingredientName.trim() === "" || ingredientAmount.trim() === "") {
        alert(`Please add both an ingredient and an amount`);
      } else {
        displayAddedIngredient(ingredientName, ingredientAmount);
      }
      document.getElementById("ingredientName").value = "";
      document.getElementById("ingredientAmount").value = "";
    };

    // Function to display the new recipe
    window.handleFormSubmission = function () {
      const title = document.getElementById("recipeTitle").value;
      const instructions = document.getElementById("instructions").value;
      const ingredientsList = getIngredientsList();

      if (
        !title.trim() ||
        !instructions.trim() ||
        ingredientsList.length === 0
      ) {
        let missingField = "";
        if (!title.trim()) {
          missingField = "Title";
        } else if (!instructions.trim()) {
          missingField = "Instructions";
        } else if (ingredientsList.length === 0) {
          missingField = "Ingredients";
        }

        alert(`Please add ${missingField}`);
        return;
      }

      if (ingredientsList.length < 5) {
        alert(`Please add at least 5 ingredients.`);
        return;
      }

      let nextRecipeId = recipes.length + 1;
      const newRecipe = {
        title,
        id: nextRecipeId,
        ingredients: ingredientsList,
        Instructions: instructions,
      };

      nextRecipeId++;

      // adding the new recipe
      recipes.push(newRecipe);
      const recipeCard = createRecipeCard(newRecipe);
      recipeGrid.appendChild(recipeCard);
      displayRecipe(newRecipe);

      const ingredientList = document.getElementById("ingredientList");
      ingredientList.innerHTML = "";
      document.getElementById("recipeForm").reset();
    };

    // creating a recipe card for each recipe in the api
    recipes.forEach((recipe) => {
      const recipeCard = createRecipeCard(recipe);
      recipeGrid.appendChild(recipeCard);
    });

    // Function to create reciep card
    function createRecipeCard(recipe) {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      const title = document.createElement("div");
      title.classList.add("recipe-title");
      title.innerText = recipe.title;

      card.addEventListener("click", function () {
        displayRecipe(recipe);
      });

      card.appendChild(title);

      return card;
    }

    // Function to display a recipe in a container (that the user have pressed on of choice)
    function displayRecipe(recipe) {
      const recipeContainer = document.getElementById("recipeContainer");

      const titleElement = document.createElement("h1");
      titleElement.innerHTML = `${recipe.title} <span class="recipe-id">#${recipe.id}</span>`;

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

      recipeContainer.innerHTML = "";
      recipeContainer.appendChild(titleElement);
      recipeContainer.appendChild(ingredientsList);
      recipeContainer.appendChild(instructionsElement);
    }

    // Function to add ingredients to a new recipe and display them in the ingredients container
    function displayAddedIngredient(name, amount) {
      const ingredientList = document.getElementById("ingredientList");

      const ingredientItem = document.createElement("div");
      ingredientItem.innerText = `${name}: ${amount || "N/A"}`;

      ingredientList.appendChild(ingredientItem);
    }

    // assembling the entered data of new names and amounts and return ingredients.
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

    // Function to find a recipe by a provided search word
    window.searchRecipe = function () {
      const searchWord = document
        .getElementById("searchWord")
        .value.toLowerCase();

      if (searchWord.trim() === "") {
        recipeGrid.innerHTML = "";
        recipes.forEach((recipe) => {
          const recipeCard = createRecipeCard(recipe);
          recipeGrid.appendChild(recipeCard);
        });
      } else {
        const foundRecipes = recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchWord)
        );

        if (foundRecipes.length > 0) {
          recipeGrid.innerHTML = "";
          foundRecipes.forEach((recipe) => {
            const recipeCard = createRecipeCard(recipe);
            recipeGrid.appendChild(recipeCard);
          });
        } else {
          recipeGrid.innerHTML = "<p>The recipe is not found.</p>";
        }
      }
    };

    // Function to search for the price of an ingredient
    window.searchIngredientPrice = function () {
      const ingredientName = document
        .getElementById("ingredientPrice")
        .value.trim()
        .toLowerCase();

      if (ingredientName === "") {
        alert("Please enter an ingredient name to search for its price.");
        return;
      }

      const foundIngredients = recipes
        .flatMap((recipe) => recipe.ingredients)
        .filter((ingredient) =>
          ingredient.NAME.toLowerCase().includes(ingredientName)
        );

      displayFoundIngredients(foundIngredients);
    };

    // Function to display found ingredients in a new container
    function displayFoundIngredients(foundIngredients) {
      const resultsContainer = document.getElementById("searchResults");
      resultsContainer.innerHTML = "";

      if (foundIngredients.length > 0) {
        foundIngredients.forEach((ingredient) => {
          const resultItem = document.createElement("div");
          resultItem.innerText = `${ingredient.NAME}: ${
            ingredient.price || "N/A"
          }`;
          resultsContainer.appendChild(resultItem);
        });
      } else {
        resultsContainer.innerHTML = "<p>No matching ingredients found.</p>";
      }
    }

    // Sort the recipe array by the amount of ingredients
    window.sortRecipesByIngredients = function () {
      const sortedRecipes = [...recipes].sort(
        (recipe1, recipe2) =>
          recipe1.ingredients.length - recipe2.ingredients.length
      );

      recipes = sortedRecipes;

      // Display sorted recipes
      recipeGrid.innerHTML = "";
      sortedRecipes.forEach((recipe) => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
      });
    };

    // cooking timer function. The user determines how much time until the alert appears on the screen.
    window.startCookingTimer = function () {
      const cookingTimeInput = document.getElementById("cookingTime");
      const cookingTime = cookingTimeInput.value;
      let cookingTimer;

      if (isNaN(cookingTime) || cookingTime <= 0) {
        alert("Please enter a valid cooking time.");
        return;
      }
      document.getElementById("cookingTime").value = "";

      // Set up a new timer
      cookingTimer = setTimeout(() => {
        alert("Cooking time is up! Your dish is ready!");
        document.getElementById("cookingTime").value = "";
      }, cookingTime * 60 * 1000);
    };

    // Function that logs on the console how much time spent on the website (shows in rounds of 5 seconds and adds up)
    function logTimeSpent() {
      let currentTime = new Date();
      let timeSpentInSeconds = Math.floor((currentTime - startTime) / 1000);

      console.log(`Time spent on the page: ${timeSpentInSeconds} seconds`);
    }

    const pageTimer = setInterval(logTimeSpent, 5000);
    return pageTimer;
  })();
});
