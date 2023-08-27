if (localStorage.getItem("authDetails") === null) {
  location.href = "auth.html";
}

let slides = document.querySelectorAll(".slider");
let btns = document.querySelectorAll(".navbtn");
let navliks=document.querySelectorAll('.navLinks');

const navs=(idx)=>{
    navliks.forEach((nav) => {
      nav.classList.remove("bold");
    });
    navliks[idx].classList.add("bold");
}

navliks.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    navs(i);
  });
});


let currentSlide = 1;
const manually = (idx) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    btns.forEach((navbtn) => {
      navbtn.classList.remove("active");
    });
  });
  slides[idx].classList.add("active");
  btns[idx].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manually(i);
    currentSlide = i;
  });
});

let Items = [
  {
    name: "Grey Sneakers",
    price: 1999,
    inCart: 0,
  },
  {
    name: "White Sneakers",
    price: 1299,
    inCart: 0,
  },
  {
    name: "Canvas Sneakers",
    price: 1499,
    inCart: 0,
  },
  {
    name: "Red Varsity Jacket",
    price: 1799,
    inCart: 0,
  },
  {
    name: "Blue Varsity Jacket",
    price: 1999,
    inCart: 0,
  },
  {
    name: "Leather Jacket",
    price: 2499,
    inCart: 0,
  },
  {
    name: "Floral Shirt",
    price: 799,
    inCart: 0,
  },
  {
    name: "White Shirt",
    price: 999,
    inCart: 0,
  },
  {
    name: "Checked Shirt",
    price: 499,
    inCart: 0,
  },
  {
    name: "Light Blue Denim",
    price: 1199,
    inCart: 0,
  },
  {
    name: "Black Denim",
    price: 1499,
    inCart: 0,
  },
  {
    name: "Dark Blue Denim",
    price: 1299,
    inCart: 0,
  },
];
let cart = document.querySelectorAll(".addCart");


const setItems=(item)=> {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  item.inCart = 1;
  if (cartItems !== null) {
    let flag=-1;
    for(let i=0;i<cartItems.length;i++){
        if(cartItems[i].name===item.name){
            flag=i;
            break;
        }
    }
    if(flag===-1){
        cartItems.push(item);
    }
    else{
        cartItems[flag].inCart+=1;
    }
  }
   else {
    cartItems=[];
    cartItems.push(item);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}




const calculateTotalCost=()=> {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems !== null) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i])
      total += parseInt(cartItems[i].inCart)*parseInt(cartItems[i].price);
    }
    return total;
  } else {
    return;
  }
}


const onLoading=()=> {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems) {
    let cartNo=0;
    for(let i=0;i<cartItems.length;i++){
        cartNo += parseInt(cartItems[i].inCart);
    }
    let cartEle = document.querySelector("#cart span");
    if (cartEle) cartEle.textContent = cartNo;
  }
}
onLoading();


for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    setItems(Items[i]);
    onLoading();
  });
}


const display=()=> {
  let itemContainer = document.querySelector(".cartItems");
  let cartItems = localStorage.getItem("cartItems");
  let cartTotal = calculateTotalCost();
  let items = localStorage.getItem("cartNumber");
  items = parseInt(items);
  cartItems = JSON.parse(cartItems);
  if (cartItems && itemContainer) {
    itemContainer.innerHTML = "";
    cartItems.map((item) => {
      itemContainer.innerHTML += `
        <tbody class="cartBody">
        <tr>
        <td> ${item.name}</td>
        <td> ₹${item.price}</td>
        <td><span class="dec">-</span> <span class="val"> ${item.inCart} </span> <span class="inc">+</span></td>
        <td> ₹${item.price * item.inCart}</td>
        <tr>
        </tbody>
        `;
    });
    itemContainer.innerHTML += `<tr">
    <td colspan="2" class="totalPrice">Total Price</td>
    <td colspan="2"  class="totalPrice">₹${cartTotal}</td>
    </tr>
    `;
  }
}

display();

const clearAll=()=>{
    localStorage.removeItem("cartItems");
}

const increase=document.querySelectorAll(".inc");
const decrease=document.querySelectorAll(".dec");
for (let i = 0; i < increase.length; i++) {
  increase[i].addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems[i].inCart+=1;
    localStorage.setItem("carItems",JSON.stringify(cartItems));
    let itemval=document.getElementsByClassName("val")[i];
    if(itemval)itemval.textContent=cartItems[i].inCart;
  });
}
for (let i = 0; i < decrease.length; i++) {
  decrease[i].addEventListener("click", () => {
    setItems(Items[i]);
    onLoading();
  });
}