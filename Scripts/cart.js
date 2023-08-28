if (localStorage.getItem("authDetails") === null) {
  location.href = "auth.html";
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
        <td><span class="dec">-</span> <span class="val"> ${
          item.inCart
        } </span> <span class="inc">+</span></td>
        <td class="amt"> ₹${item.price * item.inCart}</td>
        <td class="delete">Delete</td>
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

const clearAll = () => {
  localStorage.removeItem("cartItems");
  location.reload();
};

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
    } else {
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

const deleteBtns = document.querySelectorAll(".delete");
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (!cartItems) return;
    let row = document.querySelectorAll(".trow");
    if (!row) return;
    console.log(row)
    row[i].innerHTML = "";
    cartItems.splice(i, 1);
    location.reload();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      document.getElementsByClassName("totalAmt")[0].innerHTML = "";
      clearAll();
    }
    let total = document.getElementsByClassName("totalPriceVal")[0];
    if (total) total.textContent = calculateTotalCost();
  });
}
