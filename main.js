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
}]

//defining the function here
let generateShop = () => {
    //telling the javascript where you want the objects to be placed in the html
    return (shop.innerHTML = shopItemsData
        //setting the x parameter the map will load every item in the shopItemsData one at a time.
        .map((x) => {
            //by assigning the item data to this x variable we no longer need to specify 'x.name', 'x.img' etc.
            let { id, name, price, desc, img } = x;
            return `
        <div id=product-id-${id} class="item">
                <img width="220" height="240" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i class="bi bi-dash-circle"></i>
                            <div id=${id} class="quantity">0</div>
                            <i class="bi bi-plus-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
};

//invoking the function here
generateShop()
