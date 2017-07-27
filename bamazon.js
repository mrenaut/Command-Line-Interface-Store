//
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");
var Item = require("./itemconstructor.js");

//this will contain all the product objects
var productArray = [];

var requestedQuantity = 0;
var selectedItemNumber = 0;
var updatedQuantity = 0;


//connects to database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password: keys,
	database: 'bamazonDB'
});

connection.connect(function (err) {
	if (err) throw err;
	//console.log("connected as id " + connection.threadId + "\n");
	//createProduct();
});

//Brings user to main menu and asks what they would like to do, post or buy
function start() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["CHECK OUT OUR STORE", "POST AN ITEM FOR SALE"],
			name: "mainMenu"
		}
	]).then(function (answer) {
		if (answer.mainMenu === "CHECK OUT OUR STORE") {
			queryproducts();
		}
	});

}

//starts up main menu
start();

//PRINTS PRODUCTS ON SCREEN FOR USER TO VIEW=====================================

//Gets current list of products from mySQL table
function queryproducts() {

	//queries and displays products to for sale
	connection.query("SELECT * FROM products", function (err, res) {

		//this loops through each item in the table in mySQL
		for (var i = 0; i < res.length; i++) {

			//this makes a new object out of each of the items, using the object constructor Item, in the itemCosntructor.js file. It then pushes each new object into the product array and displays it
			var itemAdd = new Item(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
			productArray.push(itemAdd);
		}

		//Prints productArray on sceen
		console.log(productArray);
		//Triggers buyWhat function that asks user what item and quantity they would like to buy
		buyWhat();

	});
	//end of queryproducts function
};


//asks user what item number and quantity they'd like to purchase
function buyWhat() {
	inquirer.prompt([
		{
			type: "input",
			name: "itemNumber",
			message: "What is the id number of the product you would like to buy?"
		},
		{
			type: "input",
			name: "unitsRequested",
			message: "How many units would you like to buy?"
		}
		//this takes the user's answers on item number and quantity, then displays them for verification, then validates the information.
	]).then(function (answer) {
		//displays user's input
		console.log("You have requested " + answer.unitsRequested + " of the following item: ");
		requestedQuantity = answer.unitsRequested;
		selectedItemNumber = answer.itemNumber; 

		//Validates user input to make sure it is an integer and that the quantity requested by the user is less than or equal to the quantity of that item.	
		for (var i = 0; i < productArray.length; i++) {
			//console.log(myItems[i].item_id);
			if (productArray[i].item_id == answer.itemNumber) {
				currentItem = productArray[i];
				currentItemIndex = i;
			}
		}


		//this takes the user's answers on item number and quantity, then displays them for verification, then validates the information.
		console.log(currentItem);
		//This checks if user is inputting valid information and if so it displays the price
		if ((currentItem.quantity >= answer.unitsRequested) && (1000 < answer.itemNumber < 1011)) {
			console.log("Total: $" + answer.unitsRequested * currentItem.price);
			//asks user if they would like to proceed with purchase
			inquirer.prompt([
				{
					type: "list",
					message: "Proceed with purchase?",
					choices: ["Yes, plase order.", "No, exit back to store"],
					name: "purchaseConfirm"
						 }

			]).then(function (answer) {
				//if user does not want to complete purchase, this function brings up the store front again.
				if (answer.purchaseConfirm == "No, exit back to store") {
					queryproducts();
					requestedQuantity = 0;
					selectedItemNumber = 0;
				} else {
					//this updates the quantity in the database
					//needs to take quantity user asks for, find item by item number in database, then subtract that amount from the database
					console.log("Purchase confirmed!  Thank you for shopping with Bamazon!");
					updatedQuantity = currentItem.quantity - requestedQuantity;
					//this updates quantity in datbase
					updateDatabase ();								
					
				}
			});

		}

		//if the requested quantity is not available console log error and return to inputs for purchase request
		if (answer.unitsRequested > currentItem.quantity) {
			console.log("Not enough in stock!  Please reenter your order and select a lower quantity ");
			buyWhat();
		} else {
			//lets user know if an invalid id number was entered
			console.log("Please enter a valid id number");
		}
	})
};


function updateDatabase () {
connection.query("UPDATE products SET ? WHERE ?", [
	{
		stock_quantity: updatedQuantity
	}, {
		item_id: selectedItemNumber
	}
]);
};


//Post an item for sale