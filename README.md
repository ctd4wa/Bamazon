# Bamazon

## What is Bamazon?
Bamazon is a CLI storefront using Node.js and MySQL. Using the customer application displays the items for sale and depletes the inventory when a purchase is made. The manager applictions tracks the stock of items as well as add inventory and new products.

## BamazonCustomer
The customer runs via these steps:
  - A list appears with each product's id, name and price to purchase.
  - The user is then prompted to choose an item and quantity to purchase.
  - If the store has the item in stock in order to full the purchase, the database will update to show the remaining quantity.
  
  ![ConfirmPurchase](https://github.com/ctd4wa/Bamazon/blob/master/images/ConfirmPurchase.JPG?raw=true)
  
  - If a request is made and the store does not have the item in stock, the user will be alerted that there is not enough to fill the order.
  
## BamazonManager
 The manager application begins with an inquirer prompt to choose one of four functions.
 
![ManagerPrompt](https://github.com/ctd4wa/Bamazon/blob/master/images/ManagerPrompt.JPG?raw=true)
  
  - The "View Products" option will list every item.
  
![ProductsForSale](https://github.com/ctd4wa/Bamazon/blob/master/images/ProductsForSale.JPG?raw=true)
  
  - "View Low Inventory" allows the user to see any items that have less than 5 in inventory currently.
  
![LowInventory](https://github.com/ctd4wa/Bamazon/blob/master/images/LowInventory.JPG?raw=true)
  
  - "Add to Inventory" prompts the user to restock any item currently for sale.
  
![AddInventory](https://github.com/ctd4wa/Bamazon/blob/master/images/AddInventory.JPG?raw=true)
  
  - "Add New Product" gives the manager the chance to add a brand new item to the store.
  
![AddNewProduct](https://github.com/ctd4wa/Bamazon/blob/master/images/AddNewProduct.JPG?raw=true)
  
 ## Technologies Used
 
  - Node.js
  - MySQL
  - Javascript
  - Inquirer NPM
  
