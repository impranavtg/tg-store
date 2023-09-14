if (localStorage.getItem("authDetails") === null) {
  location.href = "auth.html";
}

const userType = localStorage.getItem("userType");
if (userType !== null) {
  const email = JSON.parse(localStorage.getItem("authDetails")).email;
  if (userType === `admin-${email}`) {
    location.href="./dashboard.html";
  }
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
};

const display = () => {
  let itemContainer = document.querySelector(".cartItems");
  let cartItems = localStorage.getItem("cartItems");
  let cartTotal = calculateTotalCost();
  cartItems = JSON.parse(cartItems);
  if (cartItems && itemContainer) {
    itemContainer.innerHTML = "";
    let count = 0;
    cartItems.map((item, i) => {
      if (item.inCart > 0) count++;
      itemContainer.innerHTML +=
        item.inCart > 0
          ? `
        
        <tr class="trow" id="${i}">
        <td> ${item.name}</td>
        <td> ₹${item.price}</td>
        <td><span class="dec" id="dec-${i}">-</span> <span class="val"> ${item.inCart
          } </span> <span class="inc" id="inc-${i}" >+</span></td>
        <td class="amt"> ₹${item.price * item.inCart}</td>
        <td class="delete"><span id="del-${i}">Delete</span></td>
        <tr>
        
        `
          : "";
    });
    itemContainer.innerHTML +=
      count > 0
        ? `<tr" class="totalAmt">
    <td colspan="2" class="totalPrice">Total Price</td>
    <td colspan="3"  class="totalPriceVal">₹${cartTotal}</td>
    </tr>
    `
        : `<td colspan="4" style="text-align: center;">Cart is Empty!!</td>`;
  }
};
display();



const cartItems = document.getElementsByClassName("cartItems")[0];

if (cartItems) {
  cartItems.addEventListener("click", (e) => {
    console.log(e.target.nodeName);
    let product = e.target.id;
    if (product === "") return;
    if (e.target.nodeName === "SPAN") {
      let i = product.indexOf('-');
      if (i === -1) return;
      let idx = parseInt(product.substring(i + 1));
      let item = product.substring(0, i);
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (!cartItems) return;

      function deleteItem(idx) {
        let row = document.querySelectorAll(".trow");
        if (!row) return;
        row[idx].innerHTML = "";
        cartItems.splice(idx, 1);
        location.reload();
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        if (cartItems.length === 0) {
          document.getElementsByClassName("totalAmt")[0].innerHTML = "";
          clearAll();
        }
      }
      if (item === "inc") {
        cartItems[idx].inCart = parseInt(cartItems[idx].inCart) + 1;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        let itemval = document.getElementsByClassName("val")[idx];
        if (itemval) {
          itemval.textContent = cartItems[idx].inCart;
          let amount = document.getElementsByClassName("amt")[idx];
          amount.textContent = cartItems[idx].inCart * cartItems[idx].price;

        }
      }
      else if (item === "dec") {
        cartItems[idx].inCart = parseInt(cartItems[idx].inCart) - 1;
        let row = document.querySelectorAll(".trow");
        if (!row) return;
        if (cartItems[idx].inCart <= 0) {
          deleteItem(idx);
        } else {
          let itemval = document.getElementsByClassName("val")[idx];
          if (itemval) {
            itemval.textContent = cartItems[idx].inCart;
            let amount = document.getElementsByClassName("amt")[idx];
            amount.textContent = cartItems[idx].inCart * cartItems[idx].price;
          }
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      }
      else if (item === "del") {
        deleteItem(idx);
      }
      let total = document.getElementsByClassName("totalPriceVal")[0];
      if (total) total.textContent = calculateTotalCost();
    }
  })
}


function goToCheckout(e){
  if(localStorage.getItem("cartItems")===null){
    alert("Cart is Empty");
    e.target.href="./cart.html"
  }
}


const clearAll = () => {
  localStorage.removeItem("cartItems");
  location.reload();
};



