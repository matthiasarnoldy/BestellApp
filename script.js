let viewportWidth = window.innerWidth;
let basketVariable = [];
let basket = [];

function init() {
    getFromLocalStorage();
    renderAll();
    declareVariableBasket();
}

function renderAll() {
    renderAllDishes();
    renderBasket();
}

function saveRender() {
    saveToLocalStorage();
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
    for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
        basketContentsDesktop.innerHTML += getBasketTemplateDesktop(indexBasket);
        basketContentsMobile.innerHTML += getBasketTemplateMobile(indexBasket);
        basketTrashToMinus(indexBasket);
        basketTrashToMinusMobile(indexBasket);
        calculateDishPrice(indexBasket);
    }
    calculateSubtotal();
}

function addToBasket(indexDish, indexAllDishes) {
    let indexOfDish = basket.findIndex(basket => basket.name === allDishes[indexAllDishes].dishes[indexDish].name);
    if (indexOfDish !== -1) {
        basket[indexOfDish].amount++;
    } else {
        basket.unshift({
            "name": allDishes[indexAllDishes].dishes[indexDish].name,
            "price": allDishes[indexAllDishes].dishes[indexDish].price,
            "amount": allDishes[indexAllDishes].dishes[indexDish].amount,
        });
    }
    saveRender();
}

function removeFromBasket(indexBasket) {
    basket.splice(indexBasket, 1);
    saveRender();
}

function subtractionBasket(indexBasket) {
    basket[indexBasket].amount--;
    saveRender();
}

function additionBasket(indexBasket) {
    basket[indexBasket].amount++;
    saveRender();
}

function basketTrashToMinus(indexBasket) {
    let basketTrash = document.getElementById(`mealNumberTrash${indexBasket}`);
    let basketMinus = document.getElementById(`mealNumberMinus${indexBasket}`);
    if (basket[indexBasket].amount > 1) {
        basketTrash.style.display = "none";
        basketMinus.style.display = "block";
    } else if (basket[indexBasket].amount <= 1) {
        basketTrash.style.display = "block";
        basketMinus.style.display = "none";
    }
}

function basketTrashToMinusMobile(indexBasket) {
    let basketTrashMobile = document.getElementById(`mealNumberTrashMobile${indexBasket}`);
    let basketMinusMobile = document.getElementById(`mealNumberMinusMobile${indexBasket}`);
    if (basket[indexBasket].amount > 1) {
        basketTrashMobile.style.display = "none";
        basketMinusMobile.style.display = "block";
    } else if (basket[indexBasket].amount <= 1) {
        basketTrashMobile.style.display = "block";
        basketMinusMobile.style.display = "none";
    }
}

function calculateDishPrice(indexBasket) {
    let mealAmount = document.getElementById(`mealAmount${indexBasket}`);
    mealAmount.innerHTML = `${(basket[indexBasket].price * basket[indexBasket].amount).toFixed(2).replace('\.', ',')}€`;
}

function calculateSubtotal() {
    let subtotalMobile = document.getElementById('subtotalMobile');
    let subtotalDesktop = document.getElementById('subtotalDesktop');
    subtotalMobile.innerHTML = '';
    subtotalDesktop.innerHTML = '';
    let subtotalSum = 0;
    for (let indexSubtotal = 0; indexSubtotal < basket.length; indexSubtotal++) {
        subtotalSum += basket[indexSubtotal].price * basket[indexSubtotal].amount;
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
    if (basket.length !== 0) {
        openDialogIf(dialogRef, dialogSectionRef);
    } else {
        openDialogElse(dialogRef, dialogSectionRef);
    }
}

function openDialogIf(dialogRef, dialogSectionRef) {
    basket = [];
    dialogSectionRef.innerHTML = getDialogTemplate();
    dialogRef.style.display = "flex";
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    saveRender();
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
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getFromLocalStorage() {
    let basketLocal = JSON.parse(localStorage.getItem("basket"));
    if (basketLocal != null) {
        basket = basketLocal;
    }
}