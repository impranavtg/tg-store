if (
  localStorage.getItem("authDetails") === null ||
  localStorage.getItem("userType") === null
) {
  location.href = "auth.html";
}


// const Items = {
//     sneakers: [
//       {
//         name: "Grey Sneakers",
//         price: 1999,
//         src: "./Images/offer-sneakers.png",
//         inCart: 0,
//       },
//       {
//         name: "White Sneakers",
//         price: 1299,
//         src: "./Images/white-sneakers.png",
//         inCart: 0,
//       },
//       {
//         name: "Canvas Sneakers",
//         price: 1499,
//         src: "./Images/canvas-sneakers.png",
//         inCart: 0,
//       },
//       {
//         name: "Air Jordan",
//         price: 6999,
//         src: "https://w7.pngwing.com/pngs/721/19/png-transparent-air-jordan-shoe-nike-sneakers-sneaker-collecting-michael-jordan-white-basketballschuh-outdoor-shoe-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Vans Old Skool",
//         price: 2999,
//         src: "https://w7.pngwing.com/pngs/499/173/png-transparent-skate-shoe-sneakers-vans-clothing-footwear-vans-oldskool-white-outdoor-shoe-sneakers-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Converse Chuck Taylor",
//         price: 2799,
//         src: "https://w7.pngwing.com/pngs/754/319/png-transparent-converse-chuck-taylor-all-stars-high-top-sneakers-maroon-sneaker-fashion-outdoor-shoe-adidas-thumbnail.png",
//         inCart: 0
//       }
//     ],
//     jackets: [
//       {
//         name: "Red Varsity Jacket",
//         price: 1799,
//         src: "./Images/offer-jacket.png",
//         inCart: 0,
//       },
//       {
//         name: "Blue Varsity Jacket",
//         price: 1999,
//         src: "./Images/blue-varsity.png",
//         inCart: 0,
//       },
//       {
//         name: "Leather Jacket",
//         price: 2499,
//         src: "./Images/leather-jacket.png",
//         inCart: 0,
//       },
//       {
//         name: "Bikers Jacket",
//         price: 2199,
//         src: "https://w7.pngwing.com/pngs/578/800/png-transparent-leather-jacket-sleeve-jacket-textile-leather-black-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Puffer Jacket",
//         price: 1299,
//         src: "https://w7.pngwing.com/pngs/626/150/png-transparent-jacket-polar-fleece-outerwear-the-north-face-coat-jacket-black-puffer-north-face-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Denim Jacket",
//         price: 1499,
//         src: "https://w7.pngwing.com/pngs/95/820/png-transparent-blue-denim-button-up-jacket-denim-levi-strauss-co-jacket-clothing-jeans-us-silk-straight-denim-jacket-cowboy-textile-material-thumbnail.png",
//         inCart: 0
//       }
//     ],
//     shirts: [
//       {
//         name: "Floral Shirt",
//         price: 799,
//         src: "./Images/offer-shirts.png",
//         inCart: 0,
//       },
//       {
//         name: "White Shirt",
//         price: 999,
//         src: "./Images/white-shirt.png",
//         inCart: 0,
//       },
//       {
//         name: "Checked Shirt",
//         price: 499,
//         src: "./Images/check-shirt.png",
//         inCart: 0,
//       },
//       {
//         name: "Black Shirt",
//         price: 1199,
//         src: "https://w7.pngwing.com/pngs/9/1001/png-transparent-black-dress-shirt-t-shirt-dress-shirt-clothing-black-dress-shirt-tshirt-black-formal-wear-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Blue Shirt",
//         price: 899,
//         src: "https://w7.pngwing.com/pngs/972/557/png-transparent-blue-dress-shirt-t-shirt-dress-shirt-dress-shirt-tshirt-blue-image-file-formats-thumbnail.png",
//         inCart: 0
//       },
//       {
//         name: "Flannel Shirt",
//         price: 1399,
//         src: "https://w7.pngwing.com/pngs/395/177/png-transparent-t-shirt-sleeve-flannel-carhartt-t-shirt-blue-tartan-plaid-thumbnail.png",
//         inCart: 0
//       }
//     ],
//     denims: [
//       {
//         name: "Light Blue Denim",
//         price: 1199,
//         src: "./Images/offer-denim.png",
//         inCart: 0,
//       },
//       {
//         name: "Black Denim",
//         price: 1499,
//         src: "./Images/black-denim.png",
//         inCart: 0,
//       },
//       {
//         name: "Dark Blue Denim",
//         price: 1299,
//         src: "./Images/dark-denim.png",
//         inCart: 0,
//       }
//     ],
//   }

function availableCategories(){
let category = document.getElementById("category");
for (let ele of Items) {
  category.innerHTML += `<option value="${ele.category}" id="${ele.category}">${ele.category}</option>`;
}
}



let offer = document.getElementById("offers");

const displayOffers=()=>{
  
  if (offer) {
    if (Offers.length === 0) {
      offer.innerHTML += `<div class="noOrder"><h1 class="noOrder-heading">No Offers Available!! 😕😕</h1></div>`;
    } else {
      offer.innerHTML = `<table class="offer">
          <thead class="offerHeader">
              <th class="heading">Heading</th>
              <th class="tagline">Tagline</th>
              <th class="Category">Category</th>
              <th class="imgurl">Image URL</th>
              <th colspan="2"></th>
          </thead>
          <tbody class="offerItems">
          </tbody>
      </table>`;

      let offerItems = document.getElementsByClassName("offerItems")[0];
      let i = 0;
      offerItems.innerHTML="";
      for (let item of Offers) {
        offerItems.innerHTML += `<tr class="trow">
            <td> ${item.offer.heading.slice(0, 50)}</td>
            <td> ${item.offer.tagline.slice(0, 50)}</td>
            <td> ${item.offer.category}</td>
            <td> <a href=${item.offer.src}>${item.offer.src.slice(0,50)}</a></td>
            <td><span id="edit-${i}" class="edit">Edit</span><td id="del-${i}" class="delete">Delete</td></td>
            <tr>`;
        i++;
      }
    }
  }
}

if(offer){
  offer.addEventListener("click", (e) => {
    let id = e.target.id;
    if (id.length <= 0) return;
    if (e.target.nodeName === "SPAN" && id.substring(0, 4) === "edit") {
      let idx = id.substring(5);
      let allEdits = document.querySelectorAll(".edit");
      for (let i = 0; i < allEdits.length; i++)
        if (allEdits[i].textContent === "Cancel" && i != idx) {
          allEdits[i].textContent = "Edit";
        }
      const heading = document.getElementById("heading");
      const tagline = document.getElementById("tagline");
      const category = document.getElementById("category");
      const src = document.getElementById("imageUrl");
      let opr = document.getElementById(id);
      console.log(opr);
      if (opr.textContent === "Edit") {
        if (idx >= Offers.length) return;
        heading.value = Offers[idx].offer.heading;
        tagline.value = Offers[idx].offer.tagline;
        category.value = Offers[idx].offer.category;
        src.value = Offers[idx].offer.src;
        let btn = document.getElementsByClassName("sendMessage")[0];
        btn.textContent = "Update Offer";
        btn.id = `updateOffer-${idx}`;
        opr.textContent = "Cancel";
      } else if (opr.textContent === "Cancel") {
        heading.value = "";
        tagline.value = "";
        category.value = "";
        src.value = "";
        let btn = document.getElementsByClassName("sendMessage")[0];
        btn.textContent = "Add Offer";
        btn.id = "addOffer";
        opr.textContent = "Edit";
      }
    } else if (e.target.nodeName === "TD" && id.substring(0, 3) === "del") {
      let idx = id.substring(4);
      let choice = confirm("Are you sure?");
      if (choice) {
        if (idx >= Offers.length) return;
        deleteOffer(Offers[idx].idx);
      } else return;
    }
  });
}




async function validateOffers(e){
    e.preventDefault();
    const heading=document.getElementById("heading").value;
    const tagline=document.getElementById("tagline").value;
    const category = document.getElementById("category").value;
    const src=document.getElementById("imageUrl").value;
    if(heading.length===0 || tagline.length===0 || category.length===0 || src.length===0){
        return false;
    }

    let newOffer={heading,tagline,category,src};
    let opr=document.getElementsByClassName("sendMessage")[0];
    let prevOffer;
    if(opr.id.substring(0,6)==="update"){
      let idx=parseInt(opr.id.substring(opr.id.indexOf('-')+1));
      // console.log(idx);
      prevOffer=Offers[idx];
    }
    document.getElementById("heading").value = "";
    document.getElementById("tagline").value = "";
    document.getElementById("category").value = "";
    document.getElementById("imageUrl").value = "";
    // console.log(Offers);
    addOffer(newOffer,prevOffer);   
    
    return true;
}


