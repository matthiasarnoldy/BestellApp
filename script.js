let viewportWidth = window.innerWidth;
let saveLocal = {
    "basket": {
        "name": [],
        "price": [],
        "amount": [],
    }
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
    for (let indexBasket = 0; indexBasket < saveLocal.basket.name.length; indexBasket++) {
        basketContentsDesktop.innerHTML += getBasketTemplate(indexBasket);
        basketContentsMobile.innerHTML += getBasketTemplate(indexBasket);
        basketTrashToMinus(indexBasket);
    }
    calculateSubtotal();
}

function addToBasket(indexDish, indexAllDishes) {
    let indexOfDish = saveLocal.basket.name.indexOf(allDishes[indexAllDishes].dishes[indexDish].name);
    changeButtonBasket(indexDish, indexAllDishes, indexOfDish);
    if (indexOfDish !== -1) {
        saveLocal.basket.amount[indexOfDish]++;
    } else {
        saveLocal.basket.name.unshift(allDishes[indexAllDishes].dishes[indexDish].name);
        saveLocal.basket.price.unshift(allDishes[indexAllDishes].dishes[indexDish].price);
        saveLocal.basket.amount.unshift(allDishes[indexAllDishes].dishes[indexDish].amount);
    }
    renderBasket();
}

function removeFromBasket(indexBasket) {
    saveLocal.basket.name.splice(indexBasket, 1);
    saveLocal.basket.price.splice(indexBasket, 1);
    saveLocal.basket.amount.splice(indexBasket, 1);
    renderBasket();
}

function subtractionBasket(indexBasket) {
    saveLocal.basket.amount[indexBasket]--;
    renderBasket();
}

function additionBasket(indexBasket) {
    saveLocal.basket.amount[indexBasket]++;
    renderBasket();
}

function basketTrashToMinus(indexBasket) {
    let basketTrash = document.getElementById(`mealNumberTrash${indexBasket}`);
    let basketMinus = document.getElementById(`mealNumberMinus${indexBasket}`);
    if (saveLocal.basket.amount[indexBasket] > 1) {
        basketTrash.style.display = "none";
        basketMinus.style.display = "block";
    } else if (saveLocal.basket.amount[indexBasket] <= 1) {
        basketTrash.style.display = "block";
        basketMinus.style.display = "none";
    }
}

function changeButtonBasket(indexDish, indexAllDishes, indexOfDish) {
    let mealBasket = document.getElementById(`mealBasket${indexAllDishes},${indexDish}`);
    let mealBasketButton = document.getElementById(`mealBasketButton${indexAllDishes},${indexDish}`);
    let mealBasketCountUp = document.getElementById(`mealBasketountUp${indexAllDishes},${indexDish}`);
    mealBasket.classList.add('mealAdded');
    if (saveLocal.basket.amount[indexOfDish] === undefined) {
        mealBasketButton.innerHTML = 'Added 1';
    } else {
        mealBasketButton.innerHTML = 'Added ' + (saveLocal.basket.amount[indexOfDish] + 1);
    }
    mealBasketCountUp.innerHTML = getCountUpTemplate();
}

function calculateSubtotal() {
    let subtotalMobile = document.getElementById('subtotalMobile');
    let subtotalDesktop = document.getElementById('subtotalDesktop');
    subtotalMobile.innerHTML = '';
    subtotalDesktop.innerHTML = '';
    let subtotalSum = 0;
    for (let indexSubtotal = 0; indexSubtotal < saveLocal.basket.price.length; indexSubtotal++) {
        subtotalSum += saveLocal.basket.price[indexSubtotal] * saveLocal.basket.amount[indexSubtotal];
    }
    subtotalMobile.innerHTML = `${(subtotalSum).toFixed(2)}€`;
    subtotalDesktop.innerHTML = `${(subtotalSum).toFixed(2)}€`;
    calculateTotal(subtotalSum);
}

function calculateTotal(subtotalSum) {
    let totalMobile = document.getElementById('totalMobile');
    let totalDesktop = document.getElementById('totalDesktop');
    let buyNowMobile = document.getElementById('buyNowMobile');
    let buyNowDesktop = document.getElementById('buyNowDesktop');
    let totalSum = subtotalSum + 5.00;
    totalMobile.innerHTML = `${(totalSum).toFixed(2)}€`;
    totalDesktop.innerHTML = `${(totalSum).toFixed(2)}€`;
    buyNowMobile.innerHTML = `Bestellen (${(totalSum).toFixed(2)}€)`;
    buyNowDesktop.innerHTML = `Bestellen (${(totalSum).toFixed(2)}€)`;
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