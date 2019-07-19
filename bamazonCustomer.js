    
// requires
var mysql = require("mysql");
var inquirer = require('inquirer');

// connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "github",

    // password
    password: "github",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    displayProducts();
});


function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("-----------------------------------");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " : " + res[i].product_name + ", " + res[i].price);
            }
            console.log("-----------------------------------");
            promptCustomer();
        }
    });
};

//purchasing prompts
function promptCustomer() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) console.log(err);

        inquirer.prompt([{
                type: "input",
                message: "Please input the ID of the product you are interested in.",
                name: "itemID",
            },
            {
                type: "input",
                message: "How many units of the product are you interested in?",
                name: "quantity",
            },
        ]).then(function (answer) {
            var chosenProduct;

            for (var i = 0; i < res.length; i += 1) {
                if (res[i].item_id === parseInt(answer.itemID)) {
                    chosenProduct = res[i];
                }
            };

            if (chosenProduct.stock_quantity < parseInt(answer.quantity)) {
                console.log("\n")
                console.log("Sorry, we don't have enough to fill your order!");
                console.log("\n")
                connection.end();
            } else {
                var quantityUpdate = chosenProduct.stock_quantity - parseInt(answer.quantity);

                connection.query(
                    "UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: quantityUpdate
                        },
                        {
                            item_id: chosenProduct.item_id
                        }
                    ],
                    function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            var totalPrice = chosenProduct.price * parseInt(answer.quantity);
                            console.log("\n")
                            console.log("--------------------------------------------------");
                            console.log("Your total is be: " + totalPrice);
                            console.log("Thank you for your purchase!");
                            console.log("We now only have " + quantityUpdate + " left!");
                            console.log("--------------------------------------------------");
                            console.log("\n")
                            connection.end();
                        }
                    }
                )
            }; 
        });
    });
};