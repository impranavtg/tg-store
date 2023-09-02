if (localStorage.getItem("authDetails") === null) {
    location.href = "auth.html";
  }


const allOrders=document.getElementById("allOrders");
if(allOrders){
    const email=JSON.parse(localStorage.getItem("authDetails")).email;
  let orders=localStorage.getItem("allOrders");
  if(orders){
    orders=JSON.parse(orders);
    allOrders.innerHTML=`
        <table class="orderTable">
        <thead class="orderHeader">
        <th class="orderNo">Order No.</th>
        
        <th class="name">Name</th>
            <th class="price">Price</th>
            <th class="quantity">Quantity</th>
            <th class="total" colspan="2">Total</th>
        </thead>
        <tbody class="orderItems">
        </tbody>
    </table>`;

    let orderItems=document.getElementsByClassName("orderItems")[0];
    if(orderItems){
    orders.map((order,i)=>{
        let idx=i;
        let total=0;
        order.map((item)=>{
            orderItems.innerHTML+=`<tr class="trow" id="${i}">
            ${idx++===i?`<td>${i+1}.</td>`:`<td></td>`}
            <td> ${item.name}</td>
            <td> ₹${item.price}</td>
            <td><span class="val"> ${item.inCart}</td>
            <td class="amt"> ₹${item.price * item.inCart}</td>
            <tr>`;
            total+=item.price * item.inCart;
        });
        orderItems.innerHTML+=`<tr" class="totalAmt">
        <td colspan="2" class="totalPrice orderPrice">Total Price</td>
        <td colspan="3"  class="totalPriceVal orderPriceVal">₹${total}</td>
        </tr>`
    });
}
allOrders.innerHTML+=`<a class="order" href="./index.html#all-items">Shop More</a>`
  }
  else{
    allOrders.innerHTML=`<div class="noOrder"><h1 class="noOrder-heading">Nothing to show here! 🥺🥺</h1> <a class="order" href="./index.html#all-items">Shop Now</a></div>`
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