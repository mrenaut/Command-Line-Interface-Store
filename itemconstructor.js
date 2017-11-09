
var bamazon = require("./bamazonCustomer.js");

//constructor for basic flash card question
function Item(item_id, product_name, department_name, price, quantity) {
	this.item_id = item_id;
	this.product_name = product_name;
	this.department_name = department_name;
	this.price = price;
	this.quantity = quantity;
//	this.print = function() {
//		console.log(this);
//	};
}

function Person(first, last, age, eyecolor) {
	this.firstName = first;
	this.lastName = last;
	this.age = age;
	this.eyeColor = eyecolor;
}

Item.prototype.printItem = function() {
	return this.item_id + "|	" + this.product_name + "|" + this.department_name + "|$" + this.price
};



//exports Basic object
module.exports = Item;