let viewportWidth = window.innerWidth;
let basketVariable = [];
let saveLocal = {
    "basket": {
        "name": [],
        "price": [],
        "amount": [],
    }
};

function init() {
    getFromLocalStorage();
    renderAll();
    declareVariableBasket();
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
        basketContentsDesktop.innerHTML += getBasketTemplateDesktop(indexBasket);
        basketContentsMobile.innerHTML += getBasketTemplateMobile(indexBasket);
        basketTrashToMinus(indexBasket);
        basketTrashToMinusMobile(indexBasket);
        calculateDishPrice(indexBasket);
    }
    calculateSubtotal();
}

function addToBasket(indexDish, indexAllDishes) {
    let indexOfDish = saveLocal.basket.name.indexOf(allDishes[indexAllDishes].dishes[indexDish].name);
    if (indexOfDish !== -1) {
        saveLocal.basket.amount[indexOfDish]++;
    } else {
        saveLocal.basket.name.unshift(allDishes[indexAllDishes].dishes[indexDish].name);
        saveLocal.basket.price.unshift(allDishes[indexAllDishes].dishes[indexDish].price);
        saveLocal.basket.amount.unshift(allDishes[indexAllDishes].dishes[indexDish].amount);
    }
    saveToLocalStorage();
    renderBasket();
}

function removeFromBasket(indexBasket) {
    saveLocal.basket.name.splice(indexBasket, 1);
    saveLocal.basket.price.splice(indexBasket, 1);
    saveLocal.basket.amount.splice(indexBasket, 1);
    saveToLocalStorage();
    renderBasket();
}

function subtractionBasket(indexBasket) {
    saveLocal.basket.amount[indexBasket]--;
    saveToLocalStorage();
    renderBasket();
}

function additionBasket(indexBasket) {
    saveLocal.basket.amount[indexBasket]++;
    saveToLocalStorage();
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

function basketTrashToMinusMobile(indexBasket) {
    let basketTrashMobile = document.getElementById(`mealNumberTrashMobile${indexBasket}`);
    let basketMinusMobile = document.getElementById(`mealNumberMinusMobile${indexBasket}`);
    if (saveLocal.basket.amount[indexBasket] > 1) {
        basketTrashMobile.style.display = "none";
        basketMinusMobile.style.display = "block";
    } else if (saveLocal.basket.amount[indexBasket] <= 1) {
        basketTrashMobile.style.display = "block";
        basketMinusMobile.style.display = "none";
    }
}

function calculateDishPrice(indexBasket) {
    let mealAmount = document.getElementById(`mealAmount${indexBasket}`);
    mealAmount.innerHTML = `${(saveLocal.basket.price[indexBasket] * saveLocal.basket.amount[indexBasket]).toFixed(2).replace('\.', ',')}€`;
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

function declareVariableBasket() {
    let basketMobile = document.querySelector('.basketOverlay');
    let basketDesktop = document.querySelector('.basketSlider');
    let basketOpenedDNone = document.querySelector('.basketOpenedDNone');
    let basketOpenedFooterDNone = document.querySelector('.basketOpenedFooterDNone');
    basketVariable.unshift(basketMobile);
    basketVariable.unshift(basketDesktop);
    basketVariable.unshift(basketOpenedDNone);
    basketVariable.unshift(basketOpenedFooterDNone);
}

function toggleBasket() {
    viewportWidth = window.innerWidth;
    basketVariable[3].classList.toggle('basketOverlayOpened');
    if (viewportWidth <= 700) {
        viewportSmaller700();
    } else if (viewportWidth > 700) {
        viewportBigger700();
    }
}

function viewportValidation() {
    viewportWidth = window.innerWidth;
    if (basketVariable.length > 0) {
        if (viewportWidth <= 700) {
            viewportSmaller700();
        } else if (viewportWidth > 700) {
            viewportBigger700();
        } 
    }
}

function viewportSmaller700() {
    basketVariable[2].style.display = "none";
    if (basketVariable[3].classList.contains('basketOverlayOpened')) {
        basketVariable[1].style.display = "none";
        basketVariable[0].style.display = "none";
    } else if (!basketVariable[3].classList.contains('basketOverlayOpened')) {
        basketVariable[1].style.display = "block";
        basketVariable[0].style.display = "block";
    }
}

function viewportBigger700() {
    basketVariable[1].style.display = "block";
    if (basketVariable[2].style.display === "none") {
        basketVariable[2].style.display = "block";
    } else {
        basketVariable[2].style.display = "none";
    }
}

function openDialog() {
    let dialogRef = document.getElementById('orderConfirmed');
    let dialogSectionRef = document.getElementById('changeToError');
    if (saveLocal.basket.amount.length !== 0 && saveLocal.basket.name.length !== 0 && saveLocal.basket.price.length !== 0) {
        openDialogIf(dialogRef, dialogSectionRef);
    } else {
        openDialogElse(dialogRef, dialogSectionRef);
    }
}

function openDialogIf(dialogRef, dialogSectionRef) {
    saveLocal.basket.amount = [];
    saveLocal.basket.name = [];
    saveLocal.basket.price = [];
    dialogSectionRef.innerHTML = getDialogTemplate();
    dialogRef.style.display = "flex";
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    saveToLocalStorage();
    renderBasket();
}

function openDialogElse(dialogRef, dialogSectionRef) {
    dialogSectionRef.innerHTML = getErrorTemplate();
    dialogRef.style.display = "flex";
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    renderBasket();
}

function closeDialog() {
    let dialogRef = document.getElementById('orderConfirmed');
    dialogRef.style.display = "none";
    dialogRef.close();
    dialogRef.classList.remove('opened');
}

function saveToLocalStorage() {
    localStorage.setItem("basketAmount", JSON.stringify(saveLocal.basket.amount));
    localStorage.setItem("basketName", JSON.stringify(saveLocal.basket.name));
    localStorage.setItem("basketPrice", JSON.stringify(saveLocal.basket.price));
}

function getFromLocalStorage() {
    let basketAmountLocal = JSON.parse(localStorage.getItem("basketAmount"));
    let basketNameLocal = JSON.parse(localStorage.getItem("basketName"));
    let basketPriceLocal = JSON.parse(localStorage.getItem("basketPrice"));
    if (basketAmountLocal != null && basketNameLocal != null && basketPriceLocal != null) {
        saveLocal.basket.amount = basketAmountLocal;
        saveLocal.basket.name = basketNameLocal;
        saveLocal.basket.price = basketPriceLocal;
    }
}