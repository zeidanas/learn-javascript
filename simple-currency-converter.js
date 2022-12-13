const input = require('sync-input');
const program = "Currency Converter";

console.log(`Welcome to ${program}!
1 USD equals 1 USD
1 USD equals 113.5 JPY
1 USD equals 0.89 EUR
1 USD equals 74.36 RUB
1 USD equals 0.75 GBP`);

const rates = {
    USD: 1,
    JPY: 113.5,
    EUR: 0.89,
    RUB: 74.36,
    GBP: 0.75
}

const getMenuSelection = () => {
    const choice = Number(input("\nWhat do you want to do?\n" +
        "1-Convert currencies 2-Exit program\n"));

    switch (choice) {
        case 1:
            convertCurrency();
            break;
        case 2:
            console.log("Have a nice day!");
            return;
        default:
            console.log("Error: Invalid Choice");
            break;
    }
    getMenuSelection();
}

const convertCurrency = () => {
    console.log("What do you want to convert?");
    const from = input("From: ").toUpperCase();

    // Check if user input is invalid
    if (!rates[from]) {
        console.log("Unknown currency");
        return;
    }

    const to = input("To: ").toUpperCase();

    // Check if user input is invalid
    if (!rates[to]) {
        console.log("Unknown currency");
        return;
    }

    const amount = Number(input("Amount: "));

    // Check if user input is invalid
    if (isNaN(amount)) {
        console.log("The amount has to be a number");
        return;
    } else if (amount < 1) {
        console.log("The amount cannot be less than 1");
        return;
    }

    // Calculate the converted amount
    const convertedAmount = amount / rates[from] * rates[to];
    console.log(`Result: ${amount} ${from} equals ${convertedAmount.toFixed(4)} ${to}`);
}

getMenuSelection();