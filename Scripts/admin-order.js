if (
    localStorage.getItem("authDetails") === null ||
    localStorage.getItem("userType") === null
) {
    location.href = "auth.html";
}


const pendingOrders = document.getElementById("pendingOrders");

function displayPendingOrders() {
    if (pendingOrders && Orders) {

        let flag = true;

        pendingOrders.innerHTML = `
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
    </table>`
    // ${idx++ === i ? `<td>${i + 1}.</td>` : `<td></td>`}
    const orderItems=document.getElementsByClassName("orderItems")[0];
        
        
            
            Orders.map((order, userIdx) => {
                // console.log(order.orderDetails);

                //   console.log(order);
                order.orderDetails.map((userOrder, i) => {
                    // console.log(userOrder);
                    if (userOrder.state === "pending") {
                        flag = false;
                        let idx = i;
                        // let total = 0;
                        
                        userOrder.cart.map((item) => {
                            orderItems.innerHTML += `<tr class="trow" id="${i}">
                            ${idx++ === i ? `<td>#${userOrder.orderNo} <span class="info" id="info-${i}&${userIdx}">&#8505</span></td>` : `<td></td>`}
                        <td> ${item.name}</td>
                        <td> ₹${item.price}</td>
                        <td><span class="val"> ${item.inCart}</td>
                        <td colspan="3" class="amt"> ₹${item.price * item.inCart}</td>
                        <tr>`;
                            // total += item.price * item.inCart;
                        });
                        orderItems.innerHTML += `<tr" class="totalAmt">
                    <td colspan="2" class="totalPrice orderPrice">Total Price</td>
                    <td colspan="2"  class="totalPriceVal orderPriceVal">₹${userOrder.totalAmt}</td>
                    <td class="accept" id="accept-${i}&${userIdx}">Accept</td>
                    <td class="reject" id="reject-${i}&${userIdx}">Reject</td>
                    </tr>`
                    }

                });


            });
        

       
        if(flag) {
            pendingOrders.innerHTML = `<div class="noOrder"><h1 class="noOrder-heading">No Pending Orders!! 😁😁</h1></div>`;
        }
    }
}


if (pendingOrders) {
    pendingOrders.addEventListener("click", (e) => {
        const id = e.target.id;
        const idx = parseInt(id.substring(id.indexOf('-')+1, id.indexOf('&')));
        const userIdx = parseInt(id.substring(id.indexOf('&') + 1));
        if (userIdx >= Orders.length || idx >= Orders[userIdx].orderDetails.length) return;

        if (e.target.nodeName === "TD" && id.substring(0, 6) === "accept") {
            const res = confirm("Are you sure?");
            if (res) {
                acceptOrder(idx, userIdx);
            }
            else return;
        }
        else if (e.target.nodeName === "TD" && id.substring(0, 6) === "reject") {
            const res = confirm("Are you sure?");
            if (res) {
                rejectOrder(idx, userIdx);
            }
            else return;
        }
        else if(e.target.nodeName==="SPAN" && id.substring(0,4)==="info"){
            showModal(Orders[userIdx].orderDetails[idx].userDetails,Orders[userIdx].orderDetails[idx].orderNo,Orders[userIdx].email);
        }
    })
}


const allOrders=document.getElementById("allOrders");


function displayAcceptedOrders(){
    if (allOrders && Orders) {
        allOrders.innerHTML = `
              <table class="orderTable">
              <thead class="orderHeader">
              <th class="orderNo">Order No.</th>
              
              <th class="name">Name</th>
                  <th class="price">Price</th>
                  <th class="quantity">Quantity</th>
                  <th class="total" colspan="2">Total</th>
              </thead>
              <tbody class="orderItems allOrderItems">
              </tbody>
          </table>`;
        let flag = true;
        const orderItems=document.getElementsByClassName("allOrderItems")[0];
        // console.log(orderItems);
        // console.log(allOrders);
            Orders.map((order, userIdx) => {
                // console.log(order.orderDetails);

                //   console.log(order);
                order.orderDetails.map((userOrder, i) => {
                    // console.log(userOrder);
                    if (userOrder.state === "accepted") {
                        flag = false;
                        let idx = i;
                        // let total = 0;
                        userOrder.cart.map((item) => {
                            orderItems.innerHTML += `<tr class="trow" id="${i}">
                            ${idx++ === i ? `<td>#${userOrder.orderNo} <span class="info" id="info-${i}&${userIdx}">&#8505</span></td>` : `<td></td>`}
                        <td> ${item.name}</td>
                        <td> ₹${item.price}</td>
                        <td><span class="val"> ${item.inCart}</td>
                        <td class="amt"> ₹${item.price * item.inCart}</td>
                        <tr>`;
                            // total += item.price * item.inCart;
                        });
                        orderItems.innerHTML += `<tr" class="totalAmt">
                    <td colspan="2" class="totalPrice orderPrice">Total Price</td>
                    <td colspan="3"  class="totalPriceVal orderPriceVal">₹${userOrder.totalAmt}</td>
                    </tr>`
                    }

                });


            });
        

        if(flag) {
            allOrders.innerHTML = `<div class="noOrder"><h1 class="noOrder-heading">No Pending Orders!! 😁😁</h1></div>`;
        }
    }
}

if(allOrders){
    allOrders.addEventListener("click",(e)=>{
        const id = e.target.id;
        const idx = parseInt(id.substring(id.indexOf('-')+1, id.indexOf('&')));
        const userIdx = parseInt(id.substring(id.indexOf('&') + 1));
        if (userIdx >= Orders.length || idx >= Orders[userIdx].orderDetails.length) return;
        if(e.target.nodeName==="SPAN" && id.substring(0,4)==="info"){
            // console.log(Orders[userIdx]);
            showModal(Orders[userIdx].orderDetails[idx].userDetails,Orders[userIdx].orderDetails[idx].orderNo,Orders[userIdx].email);
        }
    })
}


const rejectedOrders=document.getElementById("rejectedOrders");

function displayRejectedOrders(){
    if(rejectedOrders && Orders){
        rejectedOrders.innerHTML = `
              <table class="orderTable">
              <thead class="orderHeader">
              <th class="orderNo">Order No.</th>
              
              <th class="name">Name</th>
                  <th class="price">Price</th>
                  <th class="quantity">Quantity</th>
                  <th class="total" colspan="2">Total</th>
              </thead>
              <tbody class="orderItems rejectedOrderItems">
              </tbody>
          </table>`;
        let flag = true;
        const orderItems=document.getElementsByClassName("rejectedOrderItems")[0];
        // console.log(orderItems);
        // console.log(allOrders);
            Orders.map((order, userIdx) => {
                // console.log(order.orderDetails);

                //   console.log(order);
                order.orderDetails.map((userOrder, i) => {
                    // console.log(userOrder);
                    if (userOrder.state === "rejected") {
                        flag = false;
                        let idx = i;
                        // let total = 0;
                        userOrder.cart.map((item) => {
                            orderItems.innerHTML += `<tr class="trow" id="${i}">
                            ${idx++ === i ? `<td>#${userOrder.orderNo} <span class="info" id="info-${i}&${userIdx}" >&#8505</span></td>` : `<td></td>`}
                        <td> ${item.name}</td>
                        <td> ₹${item.price}</td>
                        <td><span class="val"> ${item.inCart}</td>
                        <td class="amt"> ₹${item.price * item.inCart}</td>
                        <tr>`;
                            // total += item.price * item.inCart;
                        });
                        orderItems.innerHTML += `<tr" class="totalAmt">
                    <td colspan="2" class="totalPrice orderPrice">Total Price</td>
                    <td colspan="3"  class="totalPriceVal orderPriceVal">₹${userOrder.totalAmt}</td>
                    </tr>`
                    }

                });


            });
        

        if(flag) {
            rejectedOrders.innerHTML = `<div class="noOrder"><h1 class="noOrder-heading">No Rejected Orders!! 😁😁</h1></div>`;
        }
    }
}

if(rejectedOrders){
    rejectedOrders.addEventListener("click",(e)=>{
        const id = e.target.id;
        const idx = parseInt(id.substring(id.indexOf('-')+1, id.indexOf('&')));
        const userIdx = parseInt(id.substring(id.indexOf('&') + 1));
        if (userIdx >= Orders.length || idx >= Orders[userIdx].orderDetails.length) return;
        if(e.target.nodeName==="SPAN" && id.substring(0,4)==="info"){
            showModal(Orders[userIdx].orderDetails[idx].userDetails,Orders[userIdx].orderDetails[idx].orderNo,Orders[userIdx].email);
        }
    })
}


function showModal(info,orderNo,email){
    document.getElementById("CustomerOrderId").innerHTML=`#${orderNo}`;
    document.getElementById("CustomerEmail").innerHTML=email;
    document.getElementById("CustomerName").innerHTML=info.name;
    document.getElementById("CustomerNumber").innerHTML=info.number;
    document.getElementById("CustomerState").innerHTML=info.state;
    document.getElementById("CustomerCity").innerHTML=info.city;
    document.getElementById("CustomerAddress").innerHTML=info.address;
    document.querySelector('.overlay').classList.add('showOverlay');
    document.querySelector('.modal').classList.add('showModal');

    document.body.classList.add("modal-open");
}
function closeModal(){
    document.querySelector('.overlay').classList.remove('showOverlay');
    document.querySelector('.modal').classList.remove('showModal');
    document.body.classList.remove("modal-open");
}