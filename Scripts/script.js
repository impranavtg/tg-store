if (localStorage.getItem("authDetails") === null) {
  location.href = "auth.html";
}

let slides = document.querySelectorAll(".slider");
let btns = document.querySelectorAll(".navbtn");
let navliks = document.querySelectorAll('.navLinks');

const navs = (idx) => {
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

if (slides) {
  const repeatSlider = () => {
    let active = document.getElementsByClassName("active");
    const auto = () => {
      setTimeout(() => {
        [...active].forEach((slide) => {
          slide.classList.remove("active");
        });
        slides[currentSlide].classList.add("active");
        btns[currentSlide].classList.add("active");
        currentSlide++;
        if (currentSlide == slides.length) currentSlide = 0;
        if (currentSlide >= slides.length) return;
        auto();
      }, 4000);
    }
    auto();
  }
  repeatSlider();
}


const Items = {
  sneakers: [
    {
      name: "Grey Sneakers",
      price: 1999,
      src: "./Images/offer-sneakers.png",
      inCart: 0,
    },
    {
      name: "White Sneakers",
      price: 1299,
      src: "./Images/white-sneakers.png",
      inCart: 0,
    },
    {
      name: "Canvas Sneakers",
      price: 1499,
      src: "./Images/canvas-sneakers.png",
      inCart: 0,
    }
  ],
  jackets: [
    {
      name: "Red Varsity Jacket",
      price: 1799,
      src: "./Images/offer-jacket.png",
      inCart: 0,
    },
    {
      name: "Blue Varsity Jacket",
      price: 1999,
      src: "./Images/blue-varsity.png",
      inCart: 0,
    },
    {
      name: "Leather Jacket",
      price: 2499,
      src: "./Images/leather-jacket.png",
      inCart: 0,
    }
  ],
  shirts: [
    {
      name: "Floral Shirt",
      price: 799,
      src: "./Images/offer-shirts.png",
      inCart: 0,
    },
    {
      name: "White Shirt",
      price: 999,
      src: "./Images/white-shirt.png",
      inCart: 0,
    },
    {
      name: "Checked Shirt",
      price: 499,
      src: "./Images/check-shirt.png",
      inCart: 0,
    }
  ],
  denims: [
    {
      name: "Light Blue Denim",
      price: 1199,
      src: "./Images/offer-denim.png",
      inCart: 0,
    },
    {
      name: "Black Denim",
      price: 1499,
      src: "./Images/black-denim.png",
      inCart: 0,
    },
    {
      name: "Dark Blue Denim",
      price: 1299,
      src: "./Images/dark-denim.png",
      inCart: 0,
    }
  ]
}
let allProducts = document.getElementById("allProducts");

if (allProducts) {
  allProducts.addEventListener("click", (e) => {
    let product = e.target.id;
    // console.log(e.target.id);
    let idx = "";
    let len = product.length;
    let i = len - 1;
    while (i >= 0 && product.charAt(i) !== '-') {
      idx += product.charAt(i);
      i--;
    }
    idx = parseInt(idx);
    let item = product.substring(0, i);
    console.log(Items[item][idx]);
    if (Items[item]) {
      setItems(Items[item][idx]);
      onLoading();
    }
  });

  for (const item in Items) {

    allProducts.innerHTML += `<div id="${item}">
  <h1 class="subHeadings">${item.charAt(0).toUpperCase() + item.slice(1)}</h1>
  <div class="itemContainer">
</div>
</div>`;

    Items[item].map((prod, i) => {
      let itemCont = document.querySelector(`#${item} .itemContainer`);
      itemCont.innerHTML += `<div class="products">
    <img src="${prod.src}" alt="${item}">
        <h2>${prod.name}</h2>
    <div class="price">
        <h2>₹${prod.price}</h2>
        <button class="addCart" id="${item}-${i}">Add To Cart</button>
    </div>
</div>`
    })
  }

}






// let Items = [
//   {
//     name: "Grey Sneakers",
//     price: 1999,
//     inCart: 0,
//   },
//   {
//     name: "White Sneakers",
//     price: 1299,
//     inCart: 0,
//   },
//   {
//     name: "Canvas Sneakers",
//     price: 1499,
//     inCart: 0,
//   },
//   {
//     name: "Red Varsity Jacket",
//     price: 1799,
//     inCart: 0,
//   },
//   {
//     name: "Blue Varsity Jacket",
//     price: 1999,
//     inCart: 0,
//   },
//   {
//     name: "Leather Jacket",
//     price: 2499,
//     inCart: 0,
//   },
//   {
//     name: "Floral Shirt",
//     price: 799,
//     inCart: 0,
//   },
//   {
//     name: "White Shirt",
//     price: 999,
//     inCart: 0,
//   },
//   {
//     name: "Checked Shirt",
//     price: 499,
//     inCart: 0,
//   },
//   {
//     name: "Light Blue Denim",
//     price: 1199,
//     inCart: 0,
//   },
//   {
//     name: "Black Denim",
//     price: 1499,
//     inCart: 0,
//   },
//   {
//     name: "Dark Blue Denim",
//     price: 1299,
//     inCart: 0,
//   },
// ];


// let sneakerItem=document.querySelector("#sneakers .itemContainer");
// if(sneakerItem){
// Sneakers.map((item,i)=>{
//   sneakerItem.innerHTML+=`<div class="products">
//   <img src="${item.src}" alt="Sneaker">
//       <h2>${item.name}</h2>
//   <div class="price">
//       <h2>₹${item.price}</h2>
//       <button class="addCart" id="Sneaker-${i}">Add To Cart</button>
//   </div>
// </div>`
// })
// }


// let cart = document.querySelectorAll(".addCart");

// for (let i = 0; i < cart.length; i++) {
//   cart[i].addEventListener("click", (e) => {
//     const id=e.target.id;
//     const idx=parseInt(id.substring(id.length-1,id.length));
//     const arr=id.substring(0,id.length-2);
//     if(arr==="Sneaker"){
//       setItems(Sneakers[idx]);
//     }
//     console.log(idx);
//     // setItems(Items[i]);
//     onLoading();
//   });
// }

const setItems = (item) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  item.inCart = 1;
  if (cartItems !== null) {
    let flag = -1;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
        flag = i;
        break;
      }
    }
    if (flag === -1) {
      cartItems.push(item);
    }
    else {
      cartItems[flag].inCart += 1;
    }
  }
  else {
    cartItems = [];
    cartItems.push(item);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}




const calculateTotalCost = () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems !== null) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += parseInt(cartItems[i].inCart) * parseInt(cartItems[i].price);
    }
    return total;
  } else {
    return;
  }
}


const onLoading = () => {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    let cartNo = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cartNo += parseInt(cartItems[i].inCart);
    }
    let cartEle = document.querySelector("#cart span");
    if (cartEle) cartEle.textContent = cartNo;
  }
}
onLoading();


// for (let i = 0; i < cart.length; i++) {
//   cart[i].addEventListener("click", () => {
//     setItems(Items[i]);
//     onLoading();
//   });
// }


const decreaseCart = (i) => {
  i = parseInt(i);
  let cartItems = localStorage.getItem("cartItems");
  cartItems[i].inCart -= 1;
  if (cartItems[i].inCart <= 0) {
    cartItems = cartItems.filter((it, idx) => idx !== i);
  }
  localStorage.setItem("cartItems", cartItems);
}



let length = 0;
const display = () => {
  let itemContainer = document.querySelector(".cartItems");
  let cartItems = localStorage.getItem("cartItems");
  let cartTotal = calculateTotalCost();
  cartItems = JSON.parse(cartItems);
  if (cartItems && itemContainer) {
    length = cartItems.length;
    itemContainer.innerHTML = "";
    let count = 0;
    cartItems.map((item, i) => {
      if (item.inCart > 0) count++;
      itemContainer.innerHTML += item.inCart > 0 ? `
        
        <tr class="trow" id="${i}">
        <td> ${item.name}</td>
        <td> ₹${item.price}</td>
        <td><span class="dec">-</span> <span class="val"> ${item.inCart} </span> <span class="inc">+</span></td>
        <td class="amt"> ₹${item.price * item.inCart}</td>
        <tr>
        
        `: "";
    });
    itemContainer.innerHTML += count > 0 ? `<tr" class="totalAmt">
    <td colspan="2" class="totalPrice">Total Price</td>
    <td colspan="2"  class="totalPriceVal">₹${cartTotal}</td>
    </tr>
    `: `<td colspan="4" style="text-align: center;">Cart is Empty!!</td>`;
  }
}
{/* <tbody class="cartBody">
</tbody> */}
display();

const clearAll = () => {
  localStorage.removeItem("cartItems");
  location.reload();
}


const increase = document.querySelectorAll(".inc");
for (let i = 0; i < increase.length; i++) {
  increase[i]?.addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems[i].inCart = parseInt(cartItems[i].inCart) + 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    let itemval = document.getElementsByClassName("val")[i];
    if (itemval) {
      itemval.textContent = cartItems[i].inCart;
      let amount = document.getElementsByClassName("amt")[i];
      amount.textContent = cartItems[i].inCart * cartItems[i].price;
      let total = document.getElementsByClassName("totalPriceVal")[0];
      total.textContent = calculateTotalCost();
    }
  });
}




const decrease = document.querySelectorAll(".dec");
for (let i = 0; i < decrease.length; i++) {

  decrease[i].addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (!cartItems) return;
    cartItems[i].inCart = parseInt(cartItems[i].inCart) - 1;
    let row = document.querySelectorAll(".trow");
    if (!row) return;
    if (cartItems[i].inCart <= 0) {
      row[i].innerHTML = "";
      cartItems.splice(i, 1);
      location.reload();
    }
    else {
      let itemval = document.getElementsByClassName("val")[i];
      if (itemval) {
        itemval.textContent = cartItems[i].inCart;
        let amount = document.getElementsByClassName("amt")[i];
        amount.textContent = cartItems[i].inCart * cartItems[i].price;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      document.getElementsByClassName("totalAmt")[0].innerHTML = "";
      clearAll();
    }
    let total = document.getElementsByClassName("totalPriceVal")[0];
    if (total) total.textContent = calculateTotalCost();
  });
}

const logout = () => {
  let user = JSON.parse(localStorage.getItem("authDetails"));
  saveCart(user.email);
}