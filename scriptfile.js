const products = [
  {
    name: "Rebok",
    image: "shoe1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, est?",
    cetegory: "shoes",
    price: "2000",
    id: "1",
  },
  {
    name: "Accer",
    image: "laptop.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, est?",
    cetegory: "Laptops",
    price: "60000",
    id: "2",
  },
  {
    name: "Headphone",
    image: "headbphone.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, est?",
    cetegory: "headphone",
    price: "4000",
    id: "3",
  },
  {
    name: "oneplus",
    image: "oneplus.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, est?",
    cetegory: "Phone",
    price: "50000",
    id: "4",
  },
];

const sec = document.querySelector(".row");
//  console.log(card);

const cart = document.querySelector(".cart");
const cart_card = document.querySelector(".cart-card");

    const body_tag = document.getElementsByTagName("tbody")[0];
    console.log("bodytag", body_tag);
    let quantity_fields = document.getElementsByClassName('num');
console.log(quantity_fields);
let grand_total = document.querySelector('.grand-total');
let btn_remove = document.getElementsByClassName("btn-danger");
console.log("btn_remove",btn_remove);
const search_string = document.querySelector(".search-string");
console.log("search_string",search_string);



cart.addEventListener("click", function (e) {
  cart_card.classList.add("cart-display");
});
document.body.addEventListener("click", function (e) {
  if (e.target !== cart) cart_card.classList.remove("cart-display");
});

function DisplayProducts(searched_result){
sec.innerHTML = searched_result.map((item) => {
  return `
  <div class="card m-2" style="width: 15rem;">
 <img src="${item.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">${item.description}</p>
    <a  class="btn btn-primary">Add</a>
    <span>${item.price}rps</span>
    <span style="display:none;">${item.id}</span>
    

  </div>

  </div>
     `;
}).join("");
}

// sec.innerHTML = showProduct.join("");
// console.log(showProduct);



function addToCart(event) {
    event.preventDefault();
    console.log("hello");
  let btn = event.target;
  let btn_parent = btn.parentElement;
  let btn_grandParent = btn.parentElement.parentElement;
  let itemName = btn_parent.children[0].innerText;
  let itemPrice = btn_parent.children[3].innerText;
  let itemImage = btn_grandParent.children[0].src;
  let itemId = btn_parent.children[4].innerText;
  console.log("ItemId",itemId);
 





  
  let tr_element = document.createElement('tr');
  

 tr_element.innerHTML = `
  <th scope="row">#</th>
      <td colspan="2"><img src="${itemImage}" alt="hsh"></td>
      <td colspan="2" class="item-name">${itemName}</td>
      <td colspan="2" class="item-price">${itemPrice}</td>
      <td colspan="2"><input type="number" class="num" value="1"></td>
      <td colspan="2" class="total_price">${itemPrice}</td>
      <p class="item-id">${itemId}</p>
      <td><p class="btn btn-danger" type="button">Remove</p></td>
 `;
 body_tag.append(tr_element);

//  const item_id = document.querySelectorAll(".item-id");
//  for (let i = 0; i < item_id.length; i++) {
//    console.log("item_idd", item_id[i]);

//    if (item_id[i].innerText.includes(itemId)) {
//      console.log("true");
//    } else {
//      console.log("false");
//    }
//  }



  //   console.log(itemName);
  //   console.log(btn_grandParent);
  //   console.log(btn_parent);
  //    console.log(btn);
 for(let i = 0; i < btn_remove.length; i++) {
   btn_remove[i].addEventListener("click",removeItem);
 }

  for (let i = 0; i < quantity_fields.length; i++) {
    quantity_fields[i].addEventListener("click", updateTotal);
  }
  grandTotal();

    
}
function  updateTotal(event){
    event.preventDefault();
    
    let number_of_item = event.target;
     if (isNaN(number_of_item.value) || number_of_item.value <= 0) {
       number_of_item.value = 1;
     }
    number_of_items_parent = number_of_item.parentElement.parentElement;
   console.log(number_of_items_parent);
 
   item_price_field =number_of_items_parent.getElementsByTagName('td')[2].innerHTML;
   item_price_field= item_price_field.replace('rps','');
   console.log(item_price_field);
  
   number_of_items_parent.getElementsByTagName("td")[4].innerHTML =
      number_of_item.value * item_price_field + "rps";
  
   
//    console.log(total_item_field.parentElement);
//    total_item_field.children.innerHTML=
grandTotal();


}

function grandTotal(){
    console.log("hello1");
    let Grand_total_final=0
     total_price =document.getElementsByClassName('total_price');
    console.log(total_price);
    for(let i=0;i<total_price.length;i++){
      Grand_total=Number(total_price[i].innerText.replace('rps',""));
     console.log(Grand_total)
     
        Grand_total_final+=Grand_total;
        
        
    }
    console.log(Grand_total_final);
    grand_total.innerText = Grand_total_final;

}
function removeItem(event){
    event.preventDefault();
    console.log("hello");
    remove_btn =event.target;
    console.log(remove_btn);
    remove_btn_grandparent = remove_btn.parentElement.parentElement;
    remove_btn_grandparent.remove();
    grandTotal();

}

document.addEventListener('DOMContentLoaded',function(){

    search_string.addEventListener("keyup", function (e) {
      let pressed_string= e.target.value;
    const result = products.filter(function(item){
         return item.name.includes(pressed_string);
     })
         DisplayProducts(result);

    });
    DisplayProducts(products);

    let add_to_cart_btn = document.getElementsByClassName("btn-primary");
    console.log(add_to_cart_btn);
    for (let i = 0; i < add_to_cart_btn.length; i++) {
      add_to_cart_btn[i].addEventListener("click", addToCart);
    }
})
