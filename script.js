let viewportWidth = window.innerWidth;
let saveLocal = {
    "basket": []
};

function init() {
    renderAll();
}

function renderAll() {
    renderAllDishes();
    renderBasket();
}

function renderAllDishes() {
    let mealsOverview = document.getElementById('mealsOverview');
    mealsOverview.innerHTML = '';
    for (let indexAllDishes = 0; indexAllDishes < allDishes.length; indexAllDishes++) {
        mealsOverview.innerHTML += getMealsoverviewTemplate(indexAllDishes);
        renderDishes(indexAllDishes);
    }
}

function renderDishes(indexAllDishes) {
    let mealList = document.getElementById(`mealList${indexAllDishes}`);
    mealList.innerHTML = '';
    for (let indexDish = 0; indexDish < allDishes[indexAllDishes].dishes.length; indexDish++) {
        mealList.innerHTML += getMealTemplate(indexAllDishes, indexDish);
    }
}

function renderBasket() {
    let basketContentsDesktop = document.getElementById('basketContentsDesktop');
    let basketContentsMobile = document.getElementById('basketContentsMobile');
    basketContentsDesktop.innerHTML = '';
    basketContentsMobile.innerHTML = '';
    for (let indexBasket = 0; indexBasket < saveLocal.basket.length; indexBasket++) {
        basketContentsDesktop.innerHTML += getBasketTemplate(indexBasket);
        basketContentsMobile.innerHTML += getBasketTemplate(indexBasket);
    }
}

function addToBasket(indexDish, indexAllDishes) {
    let dishInfo = [];
    dishInfo.push(allDishes[indexAllDishes].dishes[indexDish].name);
    dishInfo.push(allDishes[indexAllDishes].dishes[indexDish].price);
    allDishes[indexAllDishes].dishes[indexDish].amount++;
    dishInfo.push(allDishes[indexAllDishes].dishes[indexDish].amount);
    if (true) { // if savelocal.basket includes the dishinfo dont push just count up
        saveLocal.basket.unshift(dishInfo);
    }
    renderBasket();
}

function toggleBasket() {
    viewportWidth = window.innerWidth;
    let basketMobile = document.querySelector('.basketOverlay');
    let basketDesktop = document.querySelector('.basketSlider');
    let basketOpenedDNone = document.querySelector('.basketOpenedDNone');
    basketMobile.classList.toggle('basketOverlayOpened');
    if (viewportWidth <= 700) {
        basketDesktop.style.display = "none";
        if (basketMobile.classList.contains('basketOverlayOpened')) {
            basketOpenedDNone.style.display = "none";
        } else if (!basketMobile.classList.contains('basketOverlayOpened')) {
            basketOpenedDNone.style.display = "block";
        }
    } else {
        basketOpenedDNone.style.display = "block";
        if (basketDesktop.style.display === "none") {
            basketDesktop.style.display = "block";
        } else {
            basketDesktop.style.display = "none";
        }
    }
}