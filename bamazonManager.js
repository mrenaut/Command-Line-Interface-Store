//
//Challenge #2: Manager View (Next Level)
//
//Create a new Node application called bamazonManager.js. Running this application will:
//
//List a set of menu options:
//
//View Products for Sale
//
//View Low Inventory
//
//Add to Inventory
//
//Add New Product
//
//If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//
//If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//
//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store


//
//
var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");
//var bamazon = require("./bamazonCustomer.js");
//var Item = require("./itemconstructor.js");

//this will contain all the product objects
//var productArray = [];

var quantityAfterRestock = 0;


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
function startManagerMenu() {
	inquirer.prompt([
		{
			type: "list",
			message: "WELCOME TO MANAGER MENU. PLEASE SELECT AN OPTION",
			choices: ["VIEW ALL INVENTORY", "ADD ITEM TO INVENTORY", "VIEW LOW INVENTORY ITEMS"],
			name: "managerMenu"
		}
	]).then(function (answer) {
		//makes a command out of menu selection
		console.log(answer.managerMenu);


		switch (answer.managerMenu) {
			// causes user command to make basic flash cards/makeBasic function to run
			case 'VIEW ALL INVENTORY':
				//console log we're making a basic card for debugging
				inventoryDisplay();
				break;

				// causes user command to make cloze-delete flash cards/makeBasic function to run
			case 'ADD ITEM TO INVENTORY':
				addToInventory();
				break;

				// causes user command to make run basic flash cards/runBasic function to run
			case 'VIEW LOW INVENTORY ITEMS':
				console.log("we're going to add an item to inventory");
				break;

		}


	});



	//end of start function
}

startManagerMenu();

function inventoryDisplay() {
	connection.query("SELECT * FROM products",
		function (err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				console.log("ItemId:  " + res[i].item_id + " | " + "Name: " + res[i].product_name + "  |   " + "Price : " + "$" + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
			}
		startManagerMenu();
		});

	
	//end of inventoryDisplay function	
}

function addToInventory() {

	inquirer.prompt([
		{
			type: "input",
			message: "PLEASE ENTER ITEM ID TO RESTOCK ",
			name: "restockItemNumber"
		},
		{
			type: "input",
			message: "PLEASE ENTER AMOUNT TO ADD TO INVENTORY",
			name: "addQuantity"
		}
	]).then(function (answer) {
		
//		console.log(answer.restockItemNumber);
		quantityAfterRestock = answer.addQuantity;
//		update database	
		connection.query("Update products Set ? Where ?", [
			{
				stock_quantity: answer.addQuantity + stock_quantity
			}, {
				item_id: answer.restockItemNumber
			}
		], function (err, res) {
			if (err) throw err;
			//confirm inventory has been updated 
			console.log("--------------------");
			console.log("Inventory Added Successfully");
			console.log("--------------------");
			
//		})

	})
});
};

		

//insert new item
//connection.query("INSERT into products_list SET ?", {
//	product_name: name,
//	department_name: department,
//	price: price,
//	stock_quantity: quantity
//},
		
		
		

