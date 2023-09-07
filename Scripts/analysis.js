

function minutesDiff(dateTimeValue2, dateTimeValue1) {
  var differenceValue =(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
}


function displayAnalysis(){
    // console.log(Orders);

    const OrderReceived=document.getElementById("OrderReceived");
    const OrderPending=document.getElementById("OrderPending");
    const OrderAccepted=document.getElementById("OrderAccepted");
    const OrderRejected=document.getElementById("OrderRejected");
    const OrderRevenue=document.getElementById("OrderRevenue");
    const OrderResponse=document.getElementById("OrderResponse");
    let totalOrders=0;
    let accOrders=0;
    let rejOrders=0;
    let penOrders=0;
    let totalRevenue=0;
    let responseTime=0;
    let avgResponseTime=0;
    const Months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let categorySale={};
    const Category=Items.map(item=>item.category);
    for(let cat of Category)categorySale[cat]={quantity:0,revenue:0};
    // console.log(categorySale);
    let monthSale=[0,0,0,0,0,0,0,0,0,0,0,0];
    let monthRevenue=[0,0,0,0,0,0,0,0,0,0,0,0];
    for(let order of Orders){
      totalOrders+=order.orderDetails.length;
        order.orderDetails.map((item)=>{
            let monthIdx=new Date(item.orderDate).getMonth();
            monthSale[monthIdx]++;
            if(item.state==="accepted"){
              accOrders++;
              totalRevenue+=item.totalAmt;
                monthRevenue[monthIdx]+=item.totalAmt;
                item.cart.map((prod)=>{
                    categorySale[prod.category].quantity++;
                    categorySale[prod.category].revenue+=parseInt(prod.price);
                })
                responseTime+=minutesDiff(new Date(item.acceptDate),new Date(item.orderDate));            
            }
            else if(item.state==="rejected"){
              responseTime+=minutesDiff(new Date(item.rejectDate),new Date(item.orderDate));
              rejOrders++;
            }
            else if(item.state==="pending")penOrders++;
           
        })
    }

    avgResponseTime=(responseTime)/(accOrders+rejOrders);
    
    OrderReceived.innerHTML=totalOrders.toLocaleString("en-US");
    OrderPending.innerHTML=penOrders.toLocaleString("en-US");
    OrderAccepted.innerHTML=accOrders.toLocaleString("en-US");
    OrderRejected.innerHTML=rejOrders.toLocaleString("en-US");
    OrderRevenue.innerHTML=`₹${totalRevenue.toLocaleString("en-US")}`;
    OrderResponse.innerHTML=avgResponseTime.toLocaleString("en-US");
    // console.log(categorySale);
    let categoryData=[];
    let catRevenueData=[];
    for(let item in categorySale){
        categoryData.push(categorySale[item].quantity);
        catRevenueData.push(categorySale[item].revenue);
    }

    const orderChart = document.getElementById('allOrdersChart');
      
        new Chart(orderChart, {
          type: 'line',
         
          data: {
            labels: Months,
            datasets: [{
              label: '# of Orders',
              data: monthSale,
              borderColor:"#18f273",
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        const revenueChart=document.getElementById("allRevenueChart");

        new Chart(revenueChart,{
            type: 'bar',
            data: {
              labels: Months,
              datasets: [{
                label: 'Revenue per month (in ₹)',
                data: monthRevenue,
                backgroundColor:"rgba(1, 129, 54,0.8)",
                borderWidth: 1
              }],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });

        const allCategoriesChart=document.getElementById("allCategoriesChart");
        
        new Chart(allCategoriesChart,{
            type: 'bar',
            data: {
              labels: Category,
              datasets: [{
                label: '# of Product',
                data: categoryData,
                backgroundColor:"#18f273",
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });


        const allCatRevenueChart=document.getElementById("allCatRevenueChart");
        
        new Chart(allCatRevenueChart,{
            type: 'bar',
            data: {
              labels: Category,
              datasets: [{
                label: 'Revenue in each Category (in ₹)',
                data: catRevenueData,
                backgroundColor:"rgba(1, 129, 54,0.8)",
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
        });
}


