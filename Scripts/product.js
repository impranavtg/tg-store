if (
  localStorage.getItem("authDetails") === null ||
  localStorage.getItem("userType") === null
) {
  location.href = "auth.html";
}
// const Items = {
//   sneakers: [
//     {
//       name: "Grey Sneakers",
//       price: 1999,
//       src: "./Images/offer-sneakers.png",
//       inCart: 0,
//     },
//     {
//       name: "White Sneakers",
//       price: 1299,
//       src: "./Images/white-sneakers.png",
//       inCart: 0,
//     },
//     {
//       name: "Canvas Sneakers",
//       price: 1499,
//       src: "./Images/canvas-sneakers.png",
//       inCart: 0,
//     },
//     {
//       name: "Air Jordan",
//       price: 6999,
//       src: "https://w7.pngwing.com/pngs/721/19/png-transparent-air-jordan-shoe-nike-sneakers-sneaker-collecting-michael-jordan-white-basketballschuh-outdoor-shoe-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Vans Old Skool",
//       price: 2999,
//       src: "https://w7.pngwing.com/pngs/499/173/png-transparent-skate-shoe-sneakers-vans-clothing-footwear-vans-oldskool-white-outdoor-shoe-sneakers-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Converse Chuck Taylor",
//       price: 2799,
//       src: "https://w7.pngwing.com/pngs/754/319/png-transparent-converse-chuck-taylor-all-stars-high-top-sneakers-maroon-sneaker-fashion-outdoor-shoe-adidas-thumbnail.png",
//       inCart: 0,
//     },
//   ],
//   jackets: [
//     {
//       name: "Red Varsity Jacket",
//       price: 1799,
//       src: "./Images/offer-jacket.png",
//       inCart: 0,
//     },
//     {
//       name: "Blue Varsity Jacket",
//       price: 1999,
//       src: "./Images/blue-varsity.png",
//       inCart: 0,
//     },
//     {
//       name: "Leather Jacket",
//       price: 2499,
//       src: "./Images/leather-jacket.png",
//       inCart: 0,
//     },
//     {
//       name: "Bikers Jacket",
//       price: 2199,
//       src: "https://w7.pngwing.com/pngs/578/800/png-transparent-leather-jacket-sleeve-jacket-textile-leather-black-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Puffer Jacket",
//       price: 1299,
//       src: "https://w7.pngwing.com/pngs/626/150/png-transparent-jacket-polar-fleece-outerwear-the-north-face-coat-jacket-black-puffer-north-face-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Denim Jacket",
//       price: 1499,
//       src: "https://w7.pngwing.com/pngs/95/820/png-transparent-blue-denim-button-up-jacket-denim-levi-strauss-co-jacket-clothing-jeans-us-silk-straight-denim-jacket-cowboy-textile-material-thumbnail.png",
//       inCart: 0,
//     },
//   ],
//   shirts: [
//     {
//       name: "Floral Shirt",
//       price: 799,
//       src: "./Images/offer-shirts.png",
//       inCart: 0,
//     },
//     {
//       name: "White Shirt",
//       price: 999,
//       src: "./Images/white-shirt.png",
//       inCart: 0,
//     },
//     {
//       name: "Checked Shirt",
//       price: 499,
//       src: "./Images/check-shirt.png",
//       inCart: 0,
//     },
//     {
//       name: "Black Shirt",
//       price: 1199,
//       src: "https://w7.pngwing.com/pngs/9/1001/png-transparent-black-dress-shirt-t-shirt-dress-shirt-clothing-black-dress-shirt-tshirt-black-formal-wear-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Blue Shirt",
//       price: 899,
//       src: "https://w7.pngwing.com/pngs/972/557/png-transparent-blue-dress-shirt-t-shirt-dress-shirt-dress-shirt-tshirt-blue-image-file-formats-thumbnail.png",
//       inCart: 0,
//     },
//     {
//       name: "Flannel Shirt",
//       price: 1399,
//       src: "https://w7.pngwing.com/pngs/395/177/png-transparent-t-shirt-sleeve-flannel-carhartt-t-shirt-blue-tartan-plaid-thumbnail.png",
//       inCart: 0,
//     },
//   ],
//   denims: [
//     {
//       name: "Light Blue Denim",
//       price: 1199,
//       src: "./Images/offer-denim.png",
//       inCart: 0,
//     },
//     {
//       name: "Black Denim",
//       price: 1499,
//       src: "./Images/black-denim.png",
//       inCart: 0,
//     },
//     {
//       name: "Dark Blue Denim",
//       price: 1299,
//       src: "./Images/dark-denim.png",
//       inCart: 0,
//     },
//   ],
// };

function availableCategories() {
  let category = document.getElementById("product-category");
//   console.log(Items);
  for (let ele of Items) {
    category.innerHTML += `<option value="${ele.category}" id="${ele.category}">${ele.category}</option>`;
  }
}

const products = document.getElementById("products");
function displayProducts(){
    if (products) {
      if (Products.length === 0) {
        products.innerHTML = `<div class="noOrder"><h1 class="noOrder-heading">No Products Available!! 👜👜</h1></div>`;
      } else {
             products.innerHTML = `<table class="product">
          <thead class="productHeader">
              <th class="name">Name</th>
              <th class="Category">Category</th>
              <th class="price">Price</th>
              <th class="imgurl">Image URL</th>
              <th colspan="2"></th>
          </thead>
          <tbody class="productItems">
          </tbody>
      </table>`;

             let productItems =
               document.getElementsByClassName("productItems")[0];
             productItems.innerHTML = "";
             for (let item of Items) {
                
            let i=0;
            let flag=true;
            for(let product of Products){
                if(product.category===item.category){
                    productItems.innerHTML = `<tr class="trow">
            <td> ${product.name}</td>
            <td> ${product.category}</td>
            <td> ₹${product.price}</td>
            <td> <a href=${product.src}>${product.src.slice(0, 50)}</a></td>
            <td><span id="edit-${i}" class="edit">Edit</span><td id="del-${i}" class="delete">Delete</td></td>
            <tr>` + productItems.innerHTML;
                    i++;
                    flag=false;
                }
                
            }
            if(!flag){
                productItems.innerHTML =
                  `<tr class="trow">
            <td colspan="6" class="row-category"> ${item.category.toUpperCase()}</td>
            <tr>` + productItems.innerHTML;
            }
               
             }
         
      }
    }
}

if(products){
    products.addEventListener("click", (e) => {
      let id = e.target.id;
      if (id.length <= 0) return;
      if (e.target.nodeName === "SPAN" && id.substring(0, 4) === "edit") {
        let idx = parseInt(id.substring(5));
        // let allEdits = document.querySelectorAll(".edit");
        // for (let i = 0; i < allEdits.length; i++)
        //   if (allEdits[i].textContent === "Cancel" && i != idx) {
        //     allEdits[i].textContent = "Edit";
        //   }
        const name = document.getElementById("name");
        const category = document.getElementById("product-category");
        const price = document.getElementById("price");
        const src = document.getElementById("imageUrl");
        let opr = document.getElementById(id);
        console.log(opr);
        if (opr.textContent === "Edit") {
          if (idx >= Products.length) return;
          name.value = Products[idx].name;
          category.value = Products[idx].category;
          price.value = Products[idx].price;
          src.value = Products[idx].src;
          let btn = document.getElementsByClassName("sendMessage")[0];
          btn.textContent = "Update Product";
          btn.id = `updateProduct-${idx}`;
          opr.textContent = "Cancel";
        } else if (opr.textContent === "Cancel") {
          name.value = "";
          category.value = "";
          price.value="";
          src.value = "";
          let btn = document.getElementsByClassName("sendMessage")[0];
          btn.textContent = "Add Product";
          btn.id = "addProduct";
          opr.textContent = "Edit";
        }
      } else if (e.target.nodeName === "TD" && id.substring(0, 3) === "del") {
        let idx = parseInt(id.substring(4));
        let choice = confirm("Are you sure?");
        if (choice) {
          if (idx >= Products.length) return;
          deleteProduct(ctg,idx);
        } else return;
      }
    });
}

function validateProducts(e){
    e.preventDefault();
     const name = document.getElementById("name").value;
     const category = document.getElementById("product-category").value;
     const price = document.getElementById("price").value;
     const src = document.getElementById("imageUrl").value;
     if (
       name.length === 0 ||
       category.length === 0 ||
       price <= 0 ||
       src.length === 0
     )
       return false;
       const product={name,category,price,src,inCart:0};
    let opr = document.getElementsByClassName("sendMessage")[0];
    let prevProduct;
    if (opr.id.substring(0, 6) === "update") {
      let idx = parseInt(opr.id.substring(opr.id.indexOf("-") + 1));
      prevProduct = Products[idx];
    }
    addProduct(product, prevProduct);
    return true;
}



const categories = document.getElementById("categories");
function displayCategories(){
  if (categories) {
    if (Items.length === 0) {
      categories.innerHTML += `<div class="noOrder"><h1 class="noOrder-heading">No Categories Available!! 😮😮</h1></div>`;
    } else {
      categories.innerHTML = `<table class="category">
          <thead class="categoryHeader">
              <th class="Category">Category</th>
              <th colspan="2"></th>
          </thead>
          <tbody class="categoryItems">
          </tbody>
      </table>`;

      let categoryItems = document.getElementsByClassName("categoryItems")[0];
      categoryItems.innerHTML = "";
      for (let item of Items) {
       categoryItems.innerHTML += `<tr class="trow">
            <td> ${item.category}</td>
            <td><span id="edit-${item.category}" class="edit">Edit</span><td id="del-${item.category}" class="delete">Delete</td></td>
            <tr>`;
      }
    }
  }
};

if (categories) {
  categories.addEventListener("click", (e) => {
    let id = e.target.id;
    if (id.length <= 0) return;
    if (e.target.nodeName === "SPAN" && id.substring(0, 4) === "edit") {
      let idx = id.substring(5);
      let allEdits = document.querySelectorAll(".edit");
      for (let i = 0; i < allEdits.length; i++)
        if (
          allEdits[i].textContent === "Cancel" &&
          allEdits[i].id.substring(5) != idx
        ) {
          allEdits[i].textContent = "Edit";
        }
      const category= document.getElementById("category");
      let opr = document.getElementById(id);
      if (opr.textContent === "Edit") {
        let flag=true;
        for(let item of Items){
            if(item.category===idx)flag=false;
        }
        if (flag) return;
        category.value = idx;
        let btn = document.getElementsByClassName("sendMessage")[0];
        btn.textContent = "Update Category";
        btn.id = `updateCategory-${idx}`;
        opr.textContent = "Cancel";
      } else if (opr.textContent === "Cancel") {
        category.value = "";
        let btn = document.getElementsByClassName("sendMessage")[0];
        btn.textContent = "Add Category";
        btn.id = "addCategory";
        opr.textContent = "Edit";
      }
    } else if (e.target.nodeName === "TD" && id.substring(0, 3) === "del") {
      let idx = id.substring(4);
      let choice = confirm("Are you sure?");
      if (choice) {
         let flag = true;
         for (let item of Items) {
           if (item.category === idx) flag = false;
         }
         if (flag) return;
        deleteCategory(idx);
      } else return;
    }
  });
}


function validateCategory(e) {
  e.preventDefault();
  const category=document.getElementById("category").value;
  if(category.length===0)return false;
  let opr = document.getElementsByClassName("sendMessage")[0];
  let prevCategory;
  if (opr.id.substring(0, 6) === "update") {
    prevCategory = opr.id.substring(opr.id.indexOf("-") + 1);
  }
  addCategory(category, prevCategory);
  return true;
}
