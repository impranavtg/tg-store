var db;
var Offers;
var Items;
var Products;
var Orders;
if ("indexedDB" in window) {
  function connectToDb() {
    const req = indexedDB.open("myDB");
    req.onerror = function () {
      console.log("Some error Occurred:");
    };
    req.onsuccess = function () {
      console.info("DB created");
      db = req.result;
      getAllOffers();
      getAllCategories();
      getAllProducts();
      getAllOrders();
    };
    req.onupgradeneeded = function () {
      console.info("DB updated");
      db = req.result;
      const userStore = db.createObjectStore("users", { keyPath: "email" });
      const cartStore = db.createObjectStore("userCart", { keyPath: "email" });
      const orderStore = db.createObjectStore("order", { keyPath: "email" });
      const offerStore = db.createObjectStore("offer", { keyPath: "idx" });
      const categoryStore = db.createObjectStore("category", { keyPath: "category" });
      const productStore = db.createObjectStore("product", { keyPath: "category" });

      userStore.createIndex("name", "name", { unique: false });
      userStore.createIndex("email", "email", { unique: true });
      userStore.createIndex("password", "password", { unique: false });
      userStore.createIndex("userType", "userType", { unique: false });

      cartStore.createIndex("email", "email", { unique: true });
      cartStore.createIndex("cart", "cart", { unique: false });

      orderStore.createIndex("email", "email", { unique: true });
      orderStore.createIndex("orderDetails", "orderDetails", {
        unique: false,
      });

      offerStore.createIndex("idx", "idx", { unique: true });
      offerStore.createIndex("offer", "offer", { unique: false });

      categoryStore.createIndex("category", "category", { unique: true });

      productStore.createIndex("category", "category", { unique: true });
      productStore.createIndex("product", "product", { unique: false });

    };
  }
  connectToDb();
} else {
  alert("IndexDB not supported!");
}

// add user to db
async function addUser(user) {
  if (!db) return;
  const userReq = await db
    .transaction("users")
    .objectStore("users")
    .get(user.email);
  userReq.onsuccess = () => {
    if (userReq.result) {
      alert("Email already exists");
      return false;
    }
  };
  userReq.onerror = () => {
    alert("Some error occurred!");
  };
  const trans = db.transaction("users", "readwrite");
  trans.oncomplete = function (e) {
    console.log("success");
  };

  trans.onerror = function (e) {
    console.log("Some error occurred!");
  };
  const objectStore = trans.objectStore("users");
  user.userType = "customer";
  const req = await objectStore.add(user);
  req.onsuccess = () => {
    const orderReq = db
      .transaction("order")
      .objectStore("order")
      .get(user.email);
    orderReq.onsuccess = () => {
      const orders = orderReq.result;
      console.log(orderReq);
      if (orderReq.result) {
        localStorage.setItem("allOrders", JSON.stringify(orders.orderDetails));
      }
    };
    orderReq.onerror = () => {
      console.log("Some error occurred!");
    };

    const offerReq = db.transaction("offer").objectStore("offer").getAll();
    offerReq.onsuccess = () => {
      const offers = offerReq.result;
      localStorage.setItem("Offers", JSON.stringify(offers));
    };
    offerReq.onerror = () => {
      console.log("Some error occurred!");
    };

    console.log(`New user added, email: ${req.result}`);
    delete user.password;
    localStorage.setItem("authDetails", JSON.stringify(user));
    location.href = "index.html";
  };
  req.onerror = (e) => {
    console.log("Some error Occurred");
  };
}

// verify login

async function verifyUser(email, password) {
  const trans = db.transaction("users");
  const objectStore = trans.objectStore("users");
  const req = await objectStore.get(email);
  const reqCart = await db
    .transaction("userCart")
    .objectStore("userCart")
    .get(email);
  req.onsuccess = () => {
    const user = req.result;
    if (!user) {
      alert("User does not exist!");
      return;
    }
    if (password === user.password) {
      const orderReq = db
        .transaction("order")
        .objectStore("order")
        .get(user.email);
      orderReq.onsuccess = () => {
        const orders = orderReq.result;
        console.log(orders);
        if (orderReq.result) {
          localStorage.setItem("allOrders", JSON.stringify(orders.orderDetails));
        }
      };
      orderReq.onerror = () => {
        console.log("Some error occurred!");
      };
      const offerReq = db.transaction("offer").objectStore("offer").getAll();
      offerReq.onsuccess = () => {
        const offers = offerReq.result;
        localStorage.setItem("Offers", JSON.stringify(offers));
      };
      offerReq.onerror = () => {
        console.log("Some error occurred!");
      };
      if (user.userType === "admin") {
        localStorage.setItem("userType", `admin-${user.email}`);
      }
      delete user.password;
      localStorage.setItem("authDetails", JSON.stringify(user));
      location.href = "index.html";
      return;
    }
    alert("Incorrect Credentials!");
  };

  req.onerror = (err) => {
    alert("Some error occurred!");
  };

  reqCart.onsuccess = () => {
    if (reqCart.result) {
      localStorage.setItem("cartItems", reqCart.result.cartItems);
    }
  };
}

// save cart of user

async function saveCart(email) {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    const obs = await db
      .transaction("userCart", "readwrite")
      .objectStore("userCart");
    const update = await obs.get(email);
    update.onsuccess = () => {
      if (update.result) {
        obs.delete(email);
      }
    };
    obs.onerror = () => {
      console.log("Some Error Occured");
    };
    localStorage.clear();
    location.href = "auth.html";

    return;
  }
  if (!db) return;
  const req = await db
    .transaction("userCart", "readwrite")
    .objectStore("userCart")
    .add({ email, cartItems });
  req.onsuccess = () => {
    console.log(`New cart saved, email: ${req.result}`);
    localStorage.clear();
    location.href = "auth.html";
  };
  req.onerror = (e) => {
    const obs = db.transaction("userCart", "readwrite").objectStore("userCart");
    const upreq = obs.get(email);
    upreq.onsuccess = () => {
      let userCart = upreq.result;
      userCart.cartItems = cartItems;
      console.log(obs);
      const updateRequest = obs.put(userCart);

      updateRequest.onsuccess = () => {
        console.log(`Cart updated, email: ${updateRequest.result}`);
        localStorage.clear();
        location.href = "auth.html";
      };
    };
    console.log("Some error Occurred", e);
  };
}

// place order

async function placeOrder(email, cart,userDetails,state,orderNo,totalAmt,orderDate,acceptDate,rejectDate) {
  if (!db) return;
  const obs = db.transaction("order", "readwrite").objectStore("order");
  const userReq = await obs.get(email);
  // orderDetails
  userReq.onsuccess = () => {
    // console.log(userReq.result);
    if (userReq.result) {
      const orders = userReq.result;
      // console.log(orders);
      orders.orderDetails.push({userDetails,cart,state,orderNo,totalAmt,orderDate,acceptDate,rejectDate});

      const updateRequest = obs.put(orders);

      updateRequest.onsuccess = () => {
        localStorage.removeItem("cartItems");
        updateCartSummary();
        alert("Order Placed");
        console.log(orders.orderDetails.cart);
        localStorage.setItem("allOrders", JSON.stringify(orders.orderDetails));
        console.log(`Order Placed, email: ${updateRequest.result}`);
      };
    } else {
      console.log(cart);
      let arr = [];
      arr.push({userDetails,cart,state,orderNo,totalAmt,orderDate,acceptDate,rejectDate});
      const req = obs.add({ email, orderDetails: arr });
      req.onsuccess = () => {
        localStorage.removeItem("cartItems");
        console.log(`Order Placed, email: ${req.result}`);
        updateCartSummary();
        alert("Order Placed");
        localStorage.setItem("allOrders", JSON.stringify(arr));
        location.reload();
      };
      req.onerror = (e) => {
        console.log("Some error Occurred");
      };
    }
  };
  userReq.onerror = () => {
    console.log("Some error Occurred");
  };
}

// add offer

async function addOffer(offer, prevOffer) {
  console.log(prevOffer);
  if (!db) return;
  if (prevOffer) {
    deleteOffer(prevOffer.idx);
  }
  const objectStore = await db
    .transaction("offer", "readwrite")
    .objectStore("offer");
  let Offer = { idx: offer.heading + offer.src, offer };
  const addReq = objectStore.add(Offer);
  addReq.onsuccess = () => {
    const res = addReq.result;
    if (res) {
      const allOffers = objectStore.getAll();
      allOffers.onsuccess = () => {
        Offers = allOffers.result;
        location.reload();
      };
    }
  };
  addReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// delete offer

async function deleteOffer(idx) {
  console.log(idx);
  if (!db) return;
  const objectStore = db.transaction("offer", "readwrite").objectStore("offer");
  const deleteReq = objectStore.delete(idx);
  deleteReq.onsuccess = () => {
    const allOffers = objectStore.getAll();
    allOffers.onsuccess = () => {
      Offers = allOffers.result;
      location.reload();
    };
  };
  deleteReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// get all offers

function getAllOffers() {
  if (!db) return;
  const req = db.transaction("offer").objectStore("offer").getAll();
  req.onsuccess = () => {
    Offers=req.result;
    if(localStorage.getItem("userType")!==null)if (typeof displayOffers === "function"){
      displayOffers(req.result);
    }
    else localStorage.setItem("Offers", JSON.stringify(req.result));
  };
  req.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// add category

async function addCategory(category, prevCategory) {
  console.log(prevCategory);
  if (!db) return;
  if (prevCategory) {
    deleteCategory(prevCategory);
  }
  const objectStore = await db
    .transaction("category", "readwrite")
    .objectStore("category");
  let Category = {category};
  const addReq = objectStore.add(Category);
  addReq.onsuccess = () => {
    const res = addReq.result;
    if (res) {
      const allCategories = objectStore.getAll();
      allCategories.onsuccess = () => {
        Items = allCategories.result;
        location.reload();
      };
    }
  };
  addReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// delete category

async function deleteCategory(idx) {
  if (!db) return;
  const objectStore = db
    .transaction("category", "readwrite")
    .objectStore("category");
  const deleteReq = objectStore.delete(idx);
  deleteReq.onsuccess = () => {
    const allCategories = objectStore.getAll();
    allCategories.onsuccess = () => {
      Items = allCategories.result;
      deleteProductsOfCategory(idx);
      location.reload();
    };
  };
  deleteReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

async function deleteProductsOfCategory(category){
  if (!db) return;
   const req = db.transaction("product").objectStore("product").getAll();
   req.onsuccess = () => {
     const result=req.result;
     console.log(result);
     for(let item of result){
      if(item.product.category===category){
        deleteProduct(item.category);
      }
     }
    };
    req.onerror = () => {
      console.log("Some Error Occurred!");
    };
}

// get all categories

function getAllCategories() {
  if (!db) return;
  const req = db.transaction("category").objectStore("category").getAll();
  req.onsuccess = () => {
    Items = req.result;
    if(localStorage.getItem("userType")!==null){
      if (typeof displayCategories === "function") {
        displayCategories();
      }
     if (typeof availableCategories === "function") availableCategories();
      
    } 
    else localStorage.setItem("Items", JSON.stringify(req.result));
  };
  req.onerror = () => {
    console.log("Some Error Occurred!");
  };
}


// add product 

async function addProduct(product,prevProduct){
   console.log(prevProduct);
  if (!db) return;
  if (prevProduct) {
    deleteProduct(prevProduct.category);
  }
  const objectStore = await db
    .transaction("product", "readwrite")
    .objectStore("product");
  const addReq = objectStore.add({category:product.name+product.src,product});
  addReq.onsuccess = () => {
    const res = addReq.result;
    if (res) {
      const allProducts = objectStore.getAll();
      allProducts.onsuccess = () => {
        Products = allProducts.result;
        location.reload();
      };
    }
  };
  addReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// delete product

async function deleteProduct(idx) {
  if (!db) return;
  const objectStore = db
    .transaction("product", "readwrite")
    .objectStore("product");
  const deleteReq = objectStore.delete(idx);
  deleteReq.onsuccess = () => {
    const allProducts = objectStore.getAll();
    allProducts.onsuccess = () => {
      Products = allProducts.result;
      location.reload();
    };
  };
  deleteReq.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// get all products
function getAllProducts(){
   if (!db) return;
   const req = db.transaction("product").objectStore("product").getAll();
   req.onsuccess = () => {
     Products= req.result;
     if (localStorage.getItem("userType") !== null) {
       if (typeof displayProducts === "function") {
         displayProducts();
       }
     } else localStorage.setItem("Products", JSON.stringify(req.result));
   };
   req.onerror = () => {
     console.log("Some Error Occurred!");
   };
}


// get all orders

function getAllOrders(){
  if(!db)return;
  const req=db.transaction("order").objectStore("order").getAll();
  req.onsuccess=()=>{
    Orders=req.result;
    if (localStorage.getItem("userType") !== null){
      if (typeof displayPendingOrders === "function") {
        displayPendingOrders();
        displayAcceptedOrders();
        displayRejectedOrders()
      }
      if(typeof  displayAnalysis==="function") displayAnalysis();
    }
  }
  req.onerror = () => {
    console.log("Some Error Occurred!");
  };
}



// accept order

function acceptOrder(idx,userIdx){
  if(!db)return;
  const objectStore=db.transaction("order","readwrite").objectStore("order");
  const email=Orders[userIdx].email;
  const req=objectStore.get(email);
  req.onsuccess=()=>{
    const result=req.result;
    result.orderDetails[idx].state="accepted";
    result.orderDetails[idx].acceptDate=Date.now();
    const updateReq=objectStore.put(result);
    updateReq.onsuccess=()=>{
      alert("Order Accepted!");
      location.reload();
    }
  }
  req.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

// reject order

function rejectOrder(idx,userIdx){
  if(!db)return;
  const objectStore=db.transaction("order","readwrite").objectStore("order");
  const email=Orders[userIdx].email;
  const req=objectStore.get(email);
  req.onsuccess=()=>{
    const result=req.result;
    result.orderDetails[idx].state="rejected";
    result.orderDetails[idx].rejectDate=Date.now();
    const updateReq=objectStore.put(result);
    updateReq.onsuccess=()=>{
      alert("Order Rejected!");
      location.reload();
    }
  }
  req.onerror = () => {
    console.log("Some Error Occurred!");
  };
}

const username=document.getElementById("username");
let user=localStorage.getItem("authDetails");
if(user){
  user=JSON.parse(user);
  username.innerHTML=`Hi ${user.name}!`;
}


const logout = () => {
  let user = JSON.parse(localStorage.getItem("authDetails"));
  saveCart(user.email);
  localStorage.clear();
};
