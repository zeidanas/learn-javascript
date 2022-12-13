const input = require('sync-input');

console.log(`WELCOME TO THE CARNIVAL GIFT SHOP!
Hello friend! Thank you for visiting the carnival!`);

let totalTickets = 0;

const gifts = [
    {id: 1, name: "Teddy Bear", price: 10},
    {id: 2, name: "Big Red Ball", price: 5},
    {id: 3, name: "Huge Bear", price: 50},
    {id: 4, name: "Candy", price: 8},
    {id: 5, name: "Stuffed Tiger", price: 15},
    {id: 6, name: "Stuffed Dragon", price: 30},
    {id: 7, name: "Skateboard", price: 100},
    {id: 8, name: "Toy Car", price: 25},
    {id: 9, name: "Basketball", price: 20},
    {id: 10, name: "Scary Mask", price: 75}
];

const menuSelection = () => {
    const choice = Number(input(`\nWhat do you want to do?\n1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n`))

    switch (choice) {
        case 1:
            buyGift();
            break;
        case 2:
            addTickets();
            break;
        case 3:
            checkTickets();
            break;
        case 4:
            showGifts();
            break;
        case 5:
            console.log("Have a nice day!");
            return;
        default:
            console.log("Please enter a valid number!");
            break;
    }
    menuSelection();
}

const buyGift = () => {
    // Check if there are any gifts available to buy
    if (!gifts.length) {
        console.log("Wow! There are no gifts to buy.");
        return;
    }

    // Get the user's input and convert it to a number
    const chosenGift = Number(input(`Enter the number of the gift you want to get: `));

    // Check if the user's input is not a number
    if (isNaN(chosenGift)) {
        console.log("Please enter a valid number!");
        return;
    }

    // Check if there is no gift with the number the user entered
    const index = gifts.findIndex(gift => gift.id === chosenGift);
    if (index === -1) {
        console.log("There is no gift with that number!");
        return;
    }

    // Check if the user doesn't have enough tickets to buy the gift
    const gift = gifts[index];
    if (totalTickets < gift.price) {
        console.log("You don't have enough tickets to buy this gift.");
        return;
    }

    // If all conditions are met, buy the gift
    console.log(`Here you go, one ${gift.name}!`);
    totalTickets -= gift.price;
    gifts.splice(index, 1);
    console.log(`Total tickets: ${totalTickets}`);
}

const addTickets = () => {
    totalTickets += Number(input(`Enter the ticket amount: `));

    // Check if the user's input is not a number
    if (isNaN(totalTickets)) {
        console.log("Please enter a valid number between 0 and 1000.");
        return;
    }

    // Check if the user's input is less than 0 or greater than 1000
    if (totalTickets < 0 || totalTickets > 1000) {
        console.log("Please enter a valid number between 0 and 1000.");
        return;
    }
    console.log(`Total tickets: ${totalTickets}`);
}

const checkTickets = () => {
    console.log(`Total tickets: ${totalTickets}`);
}

const showGifts = () => {
    console.log("Here's the list of gifts:\n");

    // Check if there are no gifts available to buy
    if (!gifts.length) {
        console.log("Wow! There are no gifts to buy");
    } else {
        for (let gift of gifts) {
            const { id, name, price } = gift;
            console.log(`${id}- ${name}, Cost: ${price} tickets`);
        }
    }
}

showGifts();
menuSelection();