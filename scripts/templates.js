function getMealsoverviewTemplate(indexMealsArray) {
    return `
        <section id="${meals[indexMealsArray].name}" class="meals">
            <header class="mealsHeader">
                <img src="${meals[indexMealsArray].mainImg}" alt="${meals[indexMealsArray].alt}" class="mealsHeaderImg">
                <div class="mealsHeadline">
                    <img src="${meals[indexMealsArray].appetizersSvg}" alt="${meals[indexMealsArray].alt}" class="mealsIcon">
                    <h2>${meals[indexMealsArray].name}</h2>
                </div>
            </header>
            <article id="mealList${indexMealsArray}" class="mealList"></article>
        </section>
    `;
}

function getMealTemplate(indexMeal, indexMealsArray) {
    return `
        <section class="meal">
            <img src="${meals[indexMealsArray].meals[indexMeal].source}" alt="${meals[indexMealsArray].meals[indexMeal].name}" class="mealImg">
            <div class="mealInfo">
                <div class="mealNamePrice">
                    <h3 class="mealName">${meals[indexMealsArray].meals[indexMeal].name}</h3>
                    <h3 class="mealPrice">${(meals[indexMealsArray].meals[indexMeal].price).toFixed(2)}€</h3>
                </div>
                <p class="mealDescription">${meals[indexMealsArray].meals[indexMeal].description}</p>
                <div class="mealBasket">
                    <button onclick="addToBasket(${indexMeal}, ${indexMealsArray})" class="mealBasketButton">Add to basket</button>
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

function getMealBasketTemplate(indexMeal, indexMealsArray) {
    return `
        <div class="basketMeal">
            <h3>${meals[indexMealsArray].meals[indexMeal].name}</h3>
            <div class="numberAmount">
                <h4 class="mealNumber">
                    <span class="mealNumberTrash">
                        <svg class="basketIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 
                            160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 
                            96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 
                            69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 
                            576 489.3 556.4 490.9 531.1L512 208z"/>
                        </svg>
                    </span>
                    <span class="mealNumberMinus">
                        <svg class="basketIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 
                            320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z"/>
                        </svg>
                    </span>
                    <span class="mealNumberNumber">${meals[indexMealsArray].meals[indexMeal].amount}</span>
                    <span class="mealNumberPlus ">
                        <svg class="basketIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 
                            288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 
                            512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 
                            352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/>
                        </svg>
                    </span>
                </h4>
                <h4 class="mealAmount">${(meals[indexMealsArray].meals[indexMeal].price).toFixed(2)}€</h4>
            </div>
        </div>
    `;
}