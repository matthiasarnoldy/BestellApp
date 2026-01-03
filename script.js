function init() {
    renderMealsoverview();
}

function renderMealsoverview() {
    let mealsOverview = document.getElementById('mealsOverview');
    mealsOverview.innerHTML = '';

    for (let indexMealsArray = 0; indexMealsArray < meals.length; indexMealsArray++) {
        mealsOverview.innerHTML += getMealsoverviewTemplate(indexMealsArray);
        renderMeal(indexMealsArray);
    }
}

function renderMeal(indexMealsArray) {
    let mealList = document.getElementById(`mealList${indexMealsArray}`);
    mealList.innerHTML = '';

    for (let indexMeal = 0; indexMeal < meals[indexMealsArray].meals.length; indexMeal++) {
        mealList.innerHTML += getMealTemplate(indexMeal, indexMealsArray);
    }
}

function addToBasket(indexMeal, indexMealsArray) {
    let basketContentsDesktop = document.getElementById('basketContentsDesktop');
    let basketContentsMobile = document.getElementById('basketContentsMobile');
    countUp(indexMeal, indexMealsArray);
    basketContentsDesktop.innerHTML += getMealBasketTemplate(indexMeal, indexMealsArray);
    basketContentsMobile.innerHTML += getMealBasketTemplate(indexMeal, indexMealsArray);
}

function countUp(indexMeal, indexMealsArray) {
    meals[indexMealsArray].meals[indexMeal].amount++;
}