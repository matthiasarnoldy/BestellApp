function init() {
    renderMealsoverview();
}

function renderMealsoverview() {
    let mealsOverview = document.getElementById('mealsOverview');
    mealsOverview.innerHTML = '';

    for (let indexMeals = 0; indexMeals < meals.length; indexMeals++) {
        mealsOverview.innerHTML += getMealsoverviewTemplate(indexMeals);
        renderMeal(indexMeals);
    }
}

function renderMeal(indexMeals) {
    let mealList = document.getElementById(`mealList${indexMeals}`);
    mealList.innerHTML = '';

    for (let indexMeal = 0; indexMeal < meals[indexMeals].meals.length; indexMeal++) {
        mealList.innerHTML += getMealTemplate(indexMeal, indexMeals);
    }
}