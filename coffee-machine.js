const input = require('sync-input')

const supply = {
    money: 550,
    water: 400,
    milk: 540,
    beans: 120,
    ice: 30,
    cups: 9
}

const drinks = {
    espresso: {
        name: 'espresso',
        water: 250,
        milk: 0,
        beans: 16,
        ice: 0,
        cups: 1,
        price: 4
    },
    latte: {
        name: 'latte',
        water: 350,
        milk: 75,
        beans: 20,
        ice: 0,
        cups: 1,
        price: 7
    },
    cappuccino: {
        name: 'cappuccino',
        water: 200,
        milk: 100,
        beans: 12,
        ice: 0,
        cups: 1,
        price: 6
    },
    icedCoffee: {
        name: 'iced coffee',
        water: 300,
        milk: 50,
        beans: 20,
        ice: 10,
        cups: 1,
        price: 5
    }
}


const getMenu = () => {
    const option = input("Enter an Action ('buy', 'fill', 'take', 'remaining', 'exit'):\n").toLowerCase();

    switch (option) {
        case "buy":
            buyCoffee();
            break;
        case "fill":
            fillMachine();
            break;
        case "take":
            takeMoney();
            break;
        case "remaining":
            checkSupply();
            break;
        case "exit":
            return;
        default:
            console.log("Error: Invalid Option");
            break;
    }
    getMenu();
}

const buyCoffee = (coffeeType) => {
    coffeeType = Number(input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - iced coffee, 5 - main menu:\n"));
    let coffee;
    switch (coffeeType) {
        case 1:
            coffee = drinks.espresso;
            break;
        case 2:
            coffee = drinks.latte;
            break;
        case 3:
            coffee = drinks.cappuccino;
            break;
        case 4:
            coffee = drinks.icedCoffee;
            break;
        case 5:
            getMenu();
            break;
        default:
            console.log("Error: Invalid Choice");
            buyCoffee();
            break;
    }
    checkIngredients(coffee);
}

function checkIngredients(drink) {
    // Check if there is not enough supply to make the selected drink
    if (supply.water < drink.water) {
        console.log("Sorry, not enough water!");
    } else if (supply.milk < drink.milk) {
        console.log("Sorry, not enough milk!");
    } else if (supply.beans < drink.beans) {
        console.log("Sorry, not enough beans!");
    } else if (supply.cups < drink.cups) {
        console.log("Sorry, not enough cups!");
    } else if (supply.ice < drink.ice) {
        console.log("Sorry, not enough ice!");
    } else {
        // There is enough supply to make the selected drink
        console.log(`Making: ${drink.name}`);
        supply.money += drink.price;
        supply.water -= drink.water;
        supply.milk -= drink.milk;
        supply.beans -= drink.beans;
        supply.ice -= drink.ice;
        supply.cups -= drink.cups;
    }
}

const checkSupply = () => {
    console.log(`The coffee machine has:
    ${supply.water} ml of water
    ${supply.milk} ml of milk
    ${supply.beans} g of coffee beans
    ${supply.ice} cubes of ice
    ${supply.cups} disposable cups
    $${supply.money} of money\n`);
}
const fillMachine = () => {
    const supplies = ["water", "milk", "beans", "ice", "cups"];

    for (const supplyName of supplies) {
        let inputValue = Number(input(`Enter the amount of ${supplyName} you want to add:\n`));
        if (Number.isNaN(inputValue)) {
            console.log("Error: Not a Number");
            fillMachine();
            break;
        } else {
            supply[supplyName] += inputValue;
        }
    }
}

const takeMoney = () => {
    console.log(`I gave you $${supply.money}`);
    supply.money = 0;
}

getMenu();
