var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "github",

    password: "github",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    managerDuties();
});

function managerDuties() {
    inquirer.prompt([{
        type: "list",
        message: "Hello boss. Please select what you would like to do today?",
        name: "duty",
        choices: ["view products for sale", "view low inventory", "add to inventory", "add new product"]
    }, ]).then(function (answer) {
        if (answer.duty === "view products for sale") {
            viewProducts();
        } else if (answer.duty === "view low inventory") {
            lowInventory();
        } else if (answer.duty === "add to inventory") {
            addInventory();
        } else {
            newProduct();
        };
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("-----------------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " : " + res[i].product_name + ", Price " + res[i].price + ", Quantity " + res[i].stock_quantity);
            }
            console.log("-----------------------------------");
            connection.end();
        }
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var lowInvent = [];
        for (var i = 0; i < res.length; i += 1) {
            if (res[i].stock_quantity < 5) {
                lowInvent.push("\nID: " + res[i].item_id + " ITEM: " + res[i].product_name + " QUANTITY: " + res[i].stock_quantity);
            }
        };
        console.log("---------------------------------------------------------------------------------------------------");
        console.log("Low inventory (stock quantity below 5):" + lowInvent);
        console.log("---------------------------------------------------------------------------------------------------");
        connection.end();
    })
};

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt([{
                type: "list",
                message: "Hello boss! What would you like to restock now?",
                name: "restock",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
            },
            {
                type: "input",
                message: "How much would you like to add to your inventory?",
                name: "numberrestock"
            }
        ]).then(function (answer) {
            var restockProduct = answer.restock;

            var restockQuantity;
            for (var i = 0; i < res.length; i += 1) {
                if (res[i].product_name === answer.restock) {
                    restockQuantity = res[i].stock_quantity;
                }
            };

            var restockTotal = parseInt(answer.numberrestock) + restockQuantity;

            connection.query(
                "UPDATE products SET ? WHERE ?", [{
                        stock_quantity: restockTotal
                    },
                    {
                        product_name: restockProduct
                    }
                ],
                function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("---------------------------------------------------------------------------------------------------");
                        console.log("Your inventory has been updated!")
                        console.log("You now have updated " + restockProduct + " to a quantity of " + restockTotal + ".")
                        console.log("---------------------------------------------------------------------------------------------------");
                        connection.end();
                    }
                }
            )
        });
    });
};

function newProduct() {
    inquirer.prompt([{
            type: "input",
            message: "What is the product name of your item?",
            name: "productName",
        },
        {
            type: "input",
            message: "What is the department name of your item?",
            name: "department",
        },
        {
            type: "input",
            message: "At what price?",
            name: "price",
        },
        {
            type: "input",
            message: "How many are we ordering?",
            name: "inventory",
        },
    ]).then(function (answer) {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [
            answer.productName,
            answer.department,
            parseInt(answer.price),
            parseInt(answer.inventory)
        ], function (err) {
            if (err) throw err;
            console.log("---------------------------------------------------------------------------------------------------");
            console.log("Product added!");
            console.log("Product Name: " + answer.productName + " Departnment Name: " + answer.department + " Price: " + answer.price + " Inventory: " + answer.inventory);
            console.log("---------------------------------------------------------------------------------------------------");
            connection.end();
        });
    });
};