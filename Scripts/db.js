var db;
if ('indexedDB' in window) {
  const req = indexedDB.open("myDB");
  req.onerror = function () {
    console.log("Some error Occurred:");
  };
  req.onsuccess = function () {
    console.info("DB created");
    db = req.result;
  };
  req.onupgradeneeded = function () {
    console.info("DB updated");
    db = req.result;
    const userStore = db.createObjectStore("users", { keyPath: "email" });
    const cartStore = db.createObjectStore("userCart", { keyPath: "email" });
    const orderStore = db.createObjectStore("order", { keyPath: "email" });
    const offerStore=db.createObjectStore("offer",{keyPath:"idx"});

    userStore.createIndex("name", "name", { unique: false });
    userStore.createIndex("email", "email", { unique: true });
    userStore.createIndex("password", "password", { unique: false });
    userStore.createIndex("userType", "userType", { unique: false });

    cartStore.createIndex("email", "email", { unique: true });
    cartStore.createIndex("cart", "cart", { unique: false });

    orderStore.createIndex("email", "email", { unique: true });
    orderStore.createIndex("orderDetails", "orderDetails", { unique: false });

    offerStore.createIndex("idx","idx",{unique:true});
    offerStore.createIndex("offer","offer",{unique:false});
  };
}
else {
  alert("IndexDB not supported!");
}


// add user to db
async function addUser(user) {
  if (!db) return;
  const userReq = await db.transaction("users").objectStore("users").get(user.email);
  userReq.onsuccess = () => {
    if (userReq.result) {
      alert("Email already exists");
      return false;
    }
  }
  userReq.onerror = () => {
    alert("Some error occurred!")
  };
  const trans = db.transaction("users", "readwrite");
  trans.oncomplete = function (e) {
    console.log("success");
  };

  trans.onerror = function (e) {
    console.log("Some error occurred!");
  };
  const objectStore = trans.objectStore("users");
  user.userType="customer";
  const req = await objectStore.add(user);
  req.onsuccess = () => {
    const orderReq = db.transaction("order").objectStore("order").get(user.email);
    orderReq.onsuccess = () => {
      const orders = orderReq.result;
      console.log(orderReq);
      if (orderReq.result) {
        localStorage.setItem("allOrders", JSON.stringify(orders.cart));
      }
    }
    orderReq.onerror = () => {
      console.log("Some error occurred!");
    }

    const offerReq=db.transaction("offer").objectStore("offer").getAll();
    offerReq.onsuccess=()=>{
      const offers=offerReq.result;
      localStorage.setItem("Offers",JSON.stringify(offers));
    }
    offerReq.onerror = () => {
      console.log("Some error occurred!");
    }

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
  const reqCart = await db.transaction("userCart").objectStore("userCart").get(email);
  req.onsuccess = () => {
    const user = req.result;
    if (!user) {
      alert("User does not exist!");
      return;
    }
    if (password === user.password) {
      const orderReq = db.transaction("order").objectStore("order").get(user.email);
      orderReq.onsuccess = () => {
        const orders = orderReq.result;
        console.log(orderReq);
        if (orderReq.result) {
          localStorage.setItem("allOrders", JSON.stringify(orders.cart));
        }
      }
      orderReq.onerror = () => {
        console.log("Some error occurred!");
      }
      const offerReq=db.transaction("offer").objectStore("offer").getAll();
      offerReq.onsuccess=()=>{
        const offers=offerReq.result;
        localStorage.setItem("Offers",JSON.stringify(offers));
      }
      offerReq.onerror = () => {
        console.log("Some error occurred!");
      }
      if(user.userType==="admin"){
        localStorage.setItem("userType",`admin-${user.email}`);
      }
      delete user.password;
      localStorage.setItem("authDetails", JSON.stringify(user));
      location.href = "index.html";
      return;
    }
    alert("Incorrect Credentials!");
  };

  req.onerror = (err) => {
    alert("Some error occurred!")
  };

  reqCart.onsuccess = () => {
    if (reqCart.result) {
      localStorage.setItem("cartItems", reqCart.result.cartItems);
    }
  }
}

// save cart of user

async function saveCart(email) {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    const obs = await db.transaction("userCart", "readwrite").objectStore("userCart");
    const update = await obs.get(email);
    update.onsuccess = () => {
      if (update.result) {
        obs.delete(email);
      }

    }
    obs.onerror = () => {
      console.log("Some Error Occured");
    }
    localStorage.clear();
    location.href = "auth.html";

    return;
  }
  if (!db) return;
  const req = await db.transaction("userCart", "readwrite").objectStore("userCart").add({ email, cartItems });
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
      console.log(obs);;
      const updateRequest = obs.put(userCart);

      updateRequest.onsuccess = () => {

        console.log(`Cart updated, email: ${updateRequest.result}`)
        localStorage.clear();
        location.href = "auth.html";

      }

    }
    console.log("Some error Occurred", e);
  };
}


// place order

async function placeOrder(email, cart) {
  if (!db) return;
  const obs = db.transaction("order", "readwrite").objectStore("order");
  const userReq = await obs.get(email);

  userReq.onsuccess = () => {
    // console.log(userReq.result);
    if (userReq.result) {
      const orders = userReq.result;
      // console.log(orders);
      orders.cart.push(cart);
      const updateRequest = obs.put(orders);

      updateRequest.onsuccess = () => {
        localStorage.removeItem("cartItems");
        updateCartSummary();
        alert("Order Placed");
        console.log(orders.cart)
        localStorage.setItem("allOrders", JSON.stringify(orders.cart));
        console.log(`Order Placed, email: ${updateRequest.result}`);
      }
    }
    else {
      console.log(cart);
      let arr = [];
      arr.push(cart);
      const req = obs.add({ email, cart: arr });
      req.onsuccess = () => {
        localStorage.removeItem("cartItems");
        console.log(`Order Placed, email: ${req.result}`);
        updateCartSummary();
        alert("Order Placed");
        localStorage.setItem("allOrders", JSON.stringify(arr));
      };
      req.onerror = (e) => {
        console.log("Some error Occurred");
      };
    }
  }
  userReq.onerror = () => {
    console.log("Some error Occurred");
  };
}

// add offer

async function addOffer(offer,prevOffer){
  console.log(prevOffer);
  if(!db)return;
  if(prevOffer){
    deleteOffer(prevOffer.idx);
  }
 const objectStore=await db.transaction("offer","readwrite").objectStore("offer");
 let Offers={idx:offer.heading+offer.src,offer};
 const addReq=objectStore.add(Offers);
 addReq.onsuccess=()=>{
   const res=addReq.result;
   if(res){
    const allOffers=objectStore.getAll();
    allOffers.onsuccess=()=>{
      const result=allOffers.result;
      localStorage.setItem("Offers",JSON.stringify(result));
      location.reload();
    }
   }
 }
 addReq.onerror=()=>{
  console.log("Some Error Occurred!");
 }
 
}

// delete offer

async function deleteOffer(idx){
  console.log(idx);
  if(!db)return;
  const objectStore=db.transaction("offer","readwrite").objectStore("offer");
  const deleteReq=objectStore.delete(idx);
  deleteReq.onsuccess=()=>{
    const allOffers=objectStore.getAll();
    allOffers.onsuccess=()=>{
      const result=allOffers.result;
      localStorage.setItem("Offers",JSON.stringify(result));
      location.reload();
    }
  }
  deleteReq.onerror=()=>{
    console.log("Some Error Occurred!");
  }
}


const logout = () => {
  let user = JSON.parse(localStorage.getItem("authDetails"));
  saveCart(user.email);
}