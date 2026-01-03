function getMealsoverviewTemplate(indexMeals) {
    return `
        <section id="${meals[indexMeals].name}" class="meals">
            <header class="mealsHeader">
                <img src="${meals[indexMeals].mainImg}" alt="${meals[indexMeals].alt}" class="mealsHeaderImg">
                <div class="mealsHeadline">
                    <img src="${meals[indexMeals].appetizersSvg}" alt="${meals[indexMeals].alt}" class="mealsIcon">
                    <h2>${meals[indexMeals].name}</h2>
                </div>
            </header>
            <article id="mealList${indexMeals}" class="mealList"></article>
        </section>
    `;
}

function getMealTemplate(indexMeal, indexMeals) {
    return `
        <section class="meal">
            <img src="${meals[indexMeals].meals[indexMeal].source}" alt="${meals[indexMeals].meals[indexMeal].name}" class="mealImg">
            <div class="mealInfo">
                <div class="mealNamePrice">
                    <h3 class="mealName">${meals[indexMeals].meals[indexMeal].name}</h3>
                    <h3 class="mealPrice">${(meals[indexMeals].meals[indexMeal].price).toFixed(2)}€</h3>
                </div>
                <p class="mealDescription">${meals[indexMeals].meals[indexMeal].description}</p>
                <div class="mealBasket"> <!-- if meal added to basket, add class: mealAdded -->
                    <button class="mealBasketButton">Add to basket</button> <!-- if meal added to basket, innerHTML = added 1 -->
                    <button class="mealBasketCountUp">
                        <svg class="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 
                            288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 
                            512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 
                            352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    `;
}