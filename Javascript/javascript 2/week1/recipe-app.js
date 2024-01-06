document.addEventListener("DOMContentLoaded", function () {
  const recipes = [
    {
      title: "Vegetarian Chili",
      ingredients: [
        { NAME: "Black Beans", AMOUNT: "1 can, drained and rinsed" },
        { NAME: "Kidney Beans", AMOUNT: "1 can, drained and rinsed" },
        { NAME: "Tomatoes", AMOUNT: "1 can, diced" },
        { NAME: "Onion", AMOUNT: "1, chopped" },
        { NAME: "Bell Pepper", AMOUNT: "1, chopped" },
        { NAME: "Garlic", AMOUNT: "3 cloves, minced" },
        { NAME: "Chili Powder", AMOUNT: "2 tbsp" },
        { NAME: "Cumin", AMOUNT: "1 tbsp" },
        { NAME: "Vegetable Broth", AMOUNT: "2 cups" },
      ],
      Instructions:
        "Sauté onion, bell pepper, and garlic; add beans, tomatoes, spices, and broth; simmer until flavors meld.",
    },
    {
      title: "Shrimp Scampi",
      ingredients: [
        { NAME: "Shrimp", AMOUNT: "1 lb, peeled and deveined" },
        { NAME: "Linguine", AMOUNT: "8 oz" },
        { NAME: "Butter", AMOUNT: "1/2 cup" },
        { NAME: "Garlic", AMOUNT: "4 cloves, minced" },
        { NAME: "White Wine", AMOUNT: "1/2 cup" },
        { NAME: "Lemon Juice", AMOUNT: "2 tbsp" },
        { NAME: "Parsley", AMOUNT: "2 tbsp, chopped" },
      ],
      Instructions:
        "Cook linguine; sauté shrimp and garlic in butter; add white wine, lemon juice, and parsley; toss with pasta.",
    },
    {
      title: "Vegan Buddha Bowl",
      ingredients: [
        { NAME: "Quinoa", AMOUNT: "1 cup, cooked" },
        { NAME: "Chickpeas", AMOUNT: "1 can, drained and roasted" },
        { NAME: "Kale", AMOUNT: "2 cups, chopped" },
        { NAME: "Carrots", AMOUNT: "2, shredded" },
        { NAME: "Avocado", AMOUNT: "1, sliced" },
        { NAME: "Tahini Dressing", AMOUNT: "1/4 cup" },
      ],
      Instructions:
        "Assemble bowl with quinoa, chickpeas, kale, carrots, and avocado; drizzle with tahini dressing.",
    },
    {
      title: "Spaghetti Bolognese",
      ingredients: [
        { NAME: "Spaghetti", AMOUNT: "200g" },
        { NAME: "Ground Beef", AMOUNT: "300g" },
        { NAME: "Tomato Sauce", AMOUNT: "1 cup" },
        { NAME: "Onion", AMOUNT: "1, finely chopped" },
        { NAME: "Garlic", AMOUNT: "2 cloves, minced" },
        { NAME: "Olive Oil", AMOUNT: "2 tbsp" },
      ],
      Instructions:
        "Cook spaghetti; brown beef, onion, and garlic; add tomato sauce; simmer and serve.",
    },
    {
      title: "Chicken Caesar Salad",
      ingredients: [
        { NAME: "Chicken Breast", AMOUNT: "2, cooked and sliced" },
        { NAME: "Romaine Lettuce", AMOUNT: "1 head, chopped" },
        { NAME: "Croutons", AMOUNT: "1 cup" },
        { NAME: "Parmesan Cheese", AMOUNT: "1/2 cup, grated" },
        { NAME: "Caesar Dressing", AMOUNT: "1/2 cup" },
      ],
      Instructions:
        "Combine lettuce, chicken, croutons, and Parmesan; toss with Caesar dressing; serve.",
    },
    {
      title: "Chocolate Chip Cookies",
      ingredients: [
        { NAME: "All-Purpose Flour", AMOUNT: "2 cups" },
        { NAME: "Butter", AMOUNT: "1 cup, softened" },
        { NAME: "Brown Sugar", AMOUNT: "1 cup" },
        { NAME: "Eggs", AMOUNT: "2" },
        { NAME: "Vanilla Extract", AMOUNT: "1 tsp" },
        { NAME: "Chocolate Chips", AMOUNT: "2 cups" },
      ],
      Instructions:
        "Cream butter and sugar; add eggs and vanilla; mix in flour and chocolate chips; bake.",
    },
    {
      title: "Grilled Salmon",
      ingredients: [
        { NAME: "Salmon Fillets", AMOUNT: "4" },
        { NAME: "Lemon", AMOUNT: "1, sliced" },
        { NAME: "Olive Oil", AMOUNT: "2 tbsp" },
        { NAME: "Garlic Powder", AMOUNT: "1 tsp" },
        { NAME: "Dill", AMOUNT: "1 tbsp, chopped" },
        { NAME: "Salt and Pepper", AMOUNT: "To taste" },
      ],
      Instructions:
        "Marinate salmon with olive oil, garlic powder, dill, salt, and pepper; grill until cooked; garnish with lemon slices.",
    },
    {
      title: "Vegetable Stir-Fry",
      ingredients: [
        { NAME: "Broccoli", AMOUNT: "1 cup, florets" },
        { NAME: "Carrots", AMOUNT: "2, julienned" },
        { NAME: "Bell Pepper", AMOUNT: "1, sliced" },
        { NAME: "Snow Peas", AMOUNT: "1 cup" },
        { NAME: "Soy Sauce", AMOUNT: "3 tbsp" },
        { NAME: "Ginger", AMOUNT: "1 tbsp, minced" },
        { NAME: "Garlic", AMOUNT: "2 cloves, minced" },
      ],
      Instructions:
        "Stir-fry vegetables in a wok with soy sauce, ginger, and garlic until tender-crisp; serve over rice or noodles.",
    },
    {
      title: "Margherita Pizza",
      ingredients: [
        { NAME: "Pizza Dough", AMOUNT: "1 ball" },
        { NAME: "Tomatoes", AMOUNT: "2, sliced" },
        { NAME: "Fresh Mozzarella", AMOUNT: "200g, sliced" },
        { NAME: "Fresh Basil", AMOUNT: "1/2 cup, chopped" },
        { NAME: "Olive Oil", AMOUNT: "2 tbsp" },
        { NAME: "Salt", AMOUNT: "To taste" },
      ],
      Instructions:
        "Roll out pizza dough; top with sliced tomatoes, mozzarella, and basil; drizzle with olive oil; bake until crust is golden.",
    },
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // Display the first recipe
  displayRecipe(recipes[getRandomNumber(0, recipes.length)]);

  // Function to add a single ingredient
  window.addIngredient = function () {
    const ingredientName = document.getElementById("ingredientName").value;
    const ingredientAmount = document.getElementById("ingredientAmount").value;

    if (ingredientName.trim() === "" || ingredientAmount.trim() === "") {
      alert(`Please add both an ingredient and an amount`);
    } else {
      displayAddedIngredient(ingredientName, ingredientAmount);
    }
    clearIngredientForm();
  };

  // Function to display the new recipe
  window.handleFormSubmission = function () {
    const title = document.getElementById("recipeTitle").value;
    const instructions = document.getElementById("instructions").value;

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

    // adding the new recipe
    const recipeCard = createRecipeCard(newRecipe);
    recipeGrid.appendChild(recipeCard);
    displayRecipe(newRecipe);

    clearForm();
  };

  const recipeGrid = document.getElementById("recipeGrid");

  recipes.forEach((recipe) => {
    const recipeCard = createRecipeCard(recipe);
    recipeGrid.appendChild(recipeCard);
  });

  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const title = document.createElement("div");
    title.classList.add("recipe-title");
    title.innerText = recipe.title;

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredients-list");
    recipe.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${ingredient.NAME}: ${ingredient.AMOUNT}`;
      ingredientsList.appendChild(listItem);
    });

    const instructions = document.createElement("p");
    instructions.classList.add("instructions");
    instructions.innerText = `Instructions: ${recipe.Instructions}`;

    card.appendChild(title);
    card.appendChild(ingredientsList);
    card.appendChild(instructions);

    return card;
  }

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

  // Function to find a recipe by a provided search word
  window.searchRecipe = function () {
    const searchWord = document
      .getElementById("searchWord")
      .value.toLowerCase();

    const foundRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchWord)
    );

    // Display found recipes or show a message
    if (foundRecipes.length > 0) {
      recipeGrid.innerHTML = "";
      foundRecipes.forEach((recipe) => {
        const recipeCard = createRecipeCard(recipe);
        recipeGrid.appendChild(recipeCard);
      });
    } else {
      recipeGrid.innerHTML = "<p>The recipe is not found.</p>";
    }
  };

  // Sort the recipe array by the amount of ingredients
  window.sortRecipesByIngredients = function () {
    const sortedRecipes = [...recipes].sort(
      (recipe1, recipe2) =>
        recipe1.ingredients.length - recipe2.ingredients.length
    );

    // Display sorted recipes
    recipeGrid.innerHTML = "";
    sortedRecipes.forEach((recipe) => {
      const recipeCard = createRecipeCard(recipe);
      recipeGrid.appendChild(recipeCard);
    });
  };

  let cookingTimer;

  window.startCookingTimer = function () {
    const cookingTimeInput = document.getElementById("cookingTime");
    const cookingTime = parseInt(cookingTimeInput.value, 10);

    if (isNaN(cookingTime) || cookingTime <= 0) {
      alert("Please enter a valid cooking time.");
      return;
    }

    clearInterval(cookingTimer);

    // Set up a new timer
    cookingTimer = setTimeout(() => {
      alert("Cooking time is up! Your dish is ready!");
      clearInterval(); // Clear the cooking time input label
    }, cookingTime * 60 * 1000); // Convert minutes to milliseconds
  };

  let timeSpentOnPage = 0;

  function logTimeSpent() {
    timeSpentOnPage += 5;
    console.log(`Time spent on the page: ${timeSpentOnPage} seconds`);
  }
  const pageTimer = setInterval(logTimeSpent, 5000); // 5000 milliseconds = 5 seconds
  return pageTimer;

  function clearForm() {
    document.getElementById("recipeTitle").value = "";
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientAmount").value = "";
    document.getElementById("instructions").value = "";
    document.getElementById("ingredientList").innerHTML = "";
  }

  function clearIngredientForm() {
    document.getElementById("ingredientName").value = "";
    document.getElementById("ingredientAmount").value = "";
  }

  function clearInterval() {
    document.getElementById("cookingTime").value = "";
  }
});
