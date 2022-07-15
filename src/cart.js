let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

//this is our array where items the user adds or subtracts will be saved for checkout. it will parse the JSON localStorage from the key "data" on refresh so information is not lost on the users screen, OR recall a empty array if there was nothing in the storage
let basket = JSON.parse(localStorage.getItem("data")) || [];

//this function will add the total number of items the user added to their cart in the small red area of the cart icon
let calculation = () => {
    //this calls the small red areas id and sets it to the cariable cartIcon
    let cartIcon = document.getElementById("cartAmount");
    //basket.map lets us select only the items, then the reduce function tells jacascript x is the previous number, and y is the next number "(x,y)" then we tell it we want to add them but we want the calculation to start at 0 "x+y, 0"
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0)
};

//everytime the page is refreshed this will run to prevent the cart total from resetting to 0
calculation();

//this function will display the basket items on the cart page, whether the basket has items or is empty the if else statement will decide which elements are displayed.
let generateCartItems = () => {
    //if basket is not empty these elements will be displayed
    if(basket.length !==0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            //deconstructing x
            let {id, item} = x;
            //setting the shopItemsData in the data.js file to a variable, that will ensure a match between y.id with the item id, otherwise display nothing to ensure only items in the basket display their img
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search;
            return `
                <div class="cart-item">
                    <img width="100" height="110" src=${img} alt=""/>
                    <div class="details">
                        
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>    
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                        </div>
                        
                        <h3>$ ${item * search.price}</h3>
                
                        </div>
                </div>`
            //.join("") hides the commas (,) from being displayed from the array
            }).join(''));
    //if the basket is empty these elements will be displayed
    } else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="homeBtn">Back to Store</button>
            </a>
        `;
    }
};

generateCartItems();

//this function is to allow the user to add items to their cart
let increment = (id) => {
    let selectedItem = id;
    //searches the basket if the item selected to increase already exists or not
    let search = basket.find((x) => x.id === selectedItem.id);
    //if the item doesn't exist push to the basket
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    //else if the item does exist add 1 to the quantity
    else{
        search.item += 1;
    }
    //duplicating the generateCartItems() here ensures that increasing an item quantity will update any relavent information on the cart page each time
    generateCartItems();
    
    //this tells the update function to run only when the increment function is triggered
    update(selectedItem.id);

    //sets items into the local storage so they wont disapear on refresh, setting the key to "data" and "basket" array is the object being stored, JSON.stringify will allow us to see exactly what is stored by id and item quantity
    localStorage.setItem("data", JSON.stringify(basket))
};

//this function will allow users to decrease the number of specific items from the cart
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    //this prevents an error if the local storage is empty and the user selects the decrement function
    if (search === undefined) return
    //instead of search we do search.item to specifiy the specific selection, then tell it once the quantity is 0, not to continue reducing anymore
    else if (search.item === 0) 
        return;
    //else if the item doesn have a quanitity above 0 continue to minus 1
    else {
        search.item -= 1;
    }
    //this tells the update function to run only when the decrement function is triggered
    update(selectedItem.id);
    //searches the basket by item selecting everything that has an item quantity that is not 0 and returning them to the basket. ensuring items with a 0 quantity are deleted
    basket = basket.filter((x) => x.item !== 0);
    
    //duplicating the generateCartItems() here ensures that decreasing an item quantity will update any relavent information on the cart page each time
    generateCartItems();
    
    localStorage.setItem("data", JSON.stringify(basket));
};

//this function will update the number of that specific item that has been added to the cart on the webpage for the user to see
let update = (id) => {
    //search against the id to make sure the item matches
    let search = basket.find((x) => x.id === id);
    
    //selects the id from generateShop function, and changes the quantity it is associated with in the <div>
    document.getElementById(id).innerHTML = search.item;
    //calculation function will only be trigged when the update function is used by increment and decrement
    calculation();
    //invokes the total amount to update when an item is increased or decreased
    totalAmount();
};


let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter ((x) => x.id !== selectedItem.id);
    generateCartItems();
    //invokes the total amount to update when an item is removed
    totalAmount();
    calculation();
    
    localStorage.setItem("data", JSON.stringify(basket));
};

//this function will clear everything from the cart
let clearCart = () => {
    //clears the basket items to an empty array
    basket = []
    //invokes the cart items
    generateCartItems();
    //invokes the total in the nav bar resetting it to show 0
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
};

//this function will calculate a total amount at the top of the cart page for the user to see
let totalAmount = () => {
    if(basket.length !==0){
        let amount= basket.map((x) => {
           let {id, item} = x;
           let search = shopItemsData.find((y) => y.id === id) || [];
           return item * search.price; 
        })
            .reduce((x, y) => x + y, 0)
            label.innerHTML = `
                <h2>Total Bill : $ ${amount}</h2>
                <button class="checkout">Checkout</button>
                <button onclick="clearCart()" class="remove-all">Clear Cart</button>
                `;       
    }
    else return
}

totalAmount();