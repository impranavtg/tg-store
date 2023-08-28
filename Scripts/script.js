if (localStorage.getItem("authDetails") === null) {
  location.href = "auth.html";
}

const Offers = [
  {
    heading: "Trendy Sneakers",
    tagline: "Shoes are Boring. Wear Sneakers.",
    category: "sneakers",
    src: "./Images/offer-sneakers.png",
  },
  {
    heading: "Varsity Jacket",
    tagline: "Jackets that make a statement.",
    category: "jackets",
    src: "./Images/offer-jacket.png",
  },
  {
    heading: "Summer Shirts",
    tagline: "Let the Sunlight Shine Through Your Clothes",
    category: "shirts",
    src: "./Images/offer-shirts.png",
  },
  {
    heading: "Denims",
    tagline: "Timeless elegance in every thread",
    category: "denims",
    src: "./Images/offer-denim.png",
  },
];

let allOffers = document.getElementById("offer-container");
if (allOffers) {
   
  Offers.map((offer, i) => {
    allOffers.innerHTML += `<div class="slider ${i === 0 ? "active" : ""}">
       <div class="img">
         <img src="${offer.src}" alt="${offer.category}" />
       </div>

       <div class="content">
         <span>Special Offer!</span>
         <h3>${offer.heading}</h3>
         <p>${offer.tagline}</p>
         <a href="#${offer.category}" class="btn">
           Shop Now
         </a>
       </div>
     </div>`;
  });
    let toggleBtns = document.getElementById("tbtn");
    for (let i = 0; i < Offers.length; i++) {
      toggleBtns.innerHTML += `<div class="navbtn ${
        i === 0 ? "active" : ""
      }"></div>`;
    }
  
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
    if(product==="")return;
    if (e.target.nodeName==="BUTTON"){
      let btnVal=document.getElementById(product);
      btnVal.textContent="Added!";
      setTimeout(()=>{
        btnVal.textContent = "Add To Cart";
      },500);
    let idx = "";
    let len = product.length;
    let i = len - 1;
    while (i >= 0 && product.charAt(i) !== '-') {
      idx += product.charAt(i);
      i--;
    }
    idx = parseInt(idx);
    let item = product.substring(0, i);

    if (Items[item]) {
      setItems(Items[item][idx]);
      onLoading();
    }
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




const logout = () => {
  let user = JSON.parse(localStorage.getItem("authDetails"));
  saveCart(user.email);
}