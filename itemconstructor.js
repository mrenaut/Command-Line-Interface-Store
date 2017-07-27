
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


//			item_idnsole.log(res[i].item_id + "|	" + res[i].product_name + "|" + res[i].department_name + "|$" + res[i].price);
//			//console.log(productArray);
//		


//variable that creates example of the first basic type card
//var basic1 = new Basic (
//"Who was the first president of the United States:", "George Washington");
//;

//console logging for debugging 
//console.log(basic1.front);
//console.log(basic1.back);


///variable that creates a new basic flash card
//var basicQues1 = new Basic(
//	"who is your mama?", "John Adams");
//
//


//exports Basic object
module.exports = Item;