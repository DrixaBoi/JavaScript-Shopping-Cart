//Selecting Shop Id and saving as a new variable.
let shop = document.getElementById('shop');

//defining the array of items to return through the generateShop function
let shopItemsData = [{
    id:"one",
    name:"Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-1.jpg"
},
{
    id:"two",
    name:"Suit Shirts",
    price: 65,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-2.jpg"
},
{
    id:"three",
    name:"White T-Shirt",
    price: 30,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-3.jpg"
},
{
    id:"four",
    name:"Suit Jacket",
    price: 210,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-4.jpg"
},
{
    id:"five",
    name:"Custom Outfit",
    price: 500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-5.jpg"
},
{
    id:"six",
    name:"Athletic Shoes",
    price: 85,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-6.jpg"
},
{
    id:"seven",
    name:"Beanie Hats",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-7.jpg"
},
{
    id:"eight",
    name:"Plain Baseball Cap",
    price: 35,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    img: "images/img-8.jpg"
}];

//this is our array where items the user adds or subtracts will be saved for checkout. it will parse the JSON localStorage from the key "data" on refresh so information is not lost on the users screen, OR recall a empty array if there was nothing in the storage
let basket = JSON.parse(localStorage.getItem("data")) || []

//defining the function here
let generateShop = () => {
    //telling the javascript where you want the objects to be placed in the html
    return (shop.innerHTML = shopItemsData
        //setting the x parameter the map will load every item in the shopItemsData one at a time.
        .map((x) => {
            //by assigning the item data to this x variable we no longer need to specify 'x.name', 'x.img' etc.
            let { id, name, price, desc, img } = x;
            //searches the basket to find if there is any stored ids and if they match our ids
            let search = basket.find((x) => x.id === id) || []
            return `
        <div id=product-id-${id} class="item">
                <img width="220" height="240" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-circle"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
};

//invoking the function here
generateShop()

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
};

//this function will add the total number of items the user added to their cart in the small red area of the cart icon
let calculation = () => {
    //this calls the small red areas id and sets it to the cariable cartIcon
    let cartIcon = document.getElementById("cartAmount");
    //basket.map lets us select only the items, then the reduce function tells jacascript x is the previous number, and y is the next number "(x,y)" then we tell it we want to add them but we want the calculation to start at 0 "x+y, 0"
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0)
};

//everytime the page is refreshed this will run to prevent the cart total from resetting to 0
calculation();