DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(12,2) NULL,
  stock_quantity INT(45) NULL,  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Let's Go Pikachu", "video games", 59.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "video games", 299.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GoPro", "electronics", 349.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED TV", "electronics", 269.00, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Deathadder Mouse", "electronics", 98.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One Controller", "toys and games", 47.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony Headphones", "electronics", 120.49, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chelsea FC Jersey", "clothing", 79.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basic Tank Top", "clothing", 10.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokemon Sword", "video games", 59.99, 3);
