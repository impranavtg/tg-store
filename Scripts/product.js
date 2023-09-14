if (
  localStorage.getItem("authDetails") === null ||
  localStorage.getItem("userType") === null
) {
  location.href = "auth.html";
}

function availableCategories() {
  let category = document.getElementById("product-category");

  for (let ele of Items) {
    category.innerHTML += `<option value="${ele.category}" id="${ele.category}">${ele.category}</option>`;
  }
}

const products = document.getElementById("products");
function displayProducts(){
  let Products=localStorage.getItem("Products");
  if(Products===null)return;
  Products=JSON.parse(Products);
    if (products) {
      if (Products.length === 0) {
        products.innerHTML = `<div class="noOrder"><h1 class="noOrder-heading">No Products Available!! 👜👜</h1></div>`;
      } else {
             products.innerHTML = `<table class="product">
          <thead class="productHeader">
          <th class="Srno">Product ID</th>
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
                if(product.product.category===item.category){
                    productItems.innerHTML = `<tr class="trow">
                    <td>${product.productId}</td>
            <td> ${product.product.name}</td>
            <td> ${product.product.category}</td>
            <td> ₹${product.product.price}</td>
            <td> <a href=${product.product.src}>${product.product.src.slice(0, 50)}</a></td>
            <td><span id="edit-${product.productId}" class="edit">Edit</span><td id="del-${product.productId}" class="delete">Delete</td></td>
            <tr>` + productItems.innerHTML;
                    i++;
                    flag=false;
                }
                
            }
            if(!flag){
                productItems.innerHTML =
                  `<tr class="trow">
            <td colspan="7" class="row-category"> ${item.category.toUpperCase()}</td>
            <tr>` + productItems.innerHTML;
            }
               
             }
         
      }
    }
}




if(products){
  function getCurrProduct(idx){
    for(let item of Products){
      if(item.productId===idx)return item;
    }
  }
    products.addEventListener("click", (e) => {
      let id = e.target.id;
      if (id.length <= 0) return;
      if (e.target.nodeName === "SPAN" && id.substring(0, 4) === "edit") {
        let idx = parseInt(id.substring(5));
        console.log(idx);
        let allEdits = document.querySelectorAll(".edit");
        for (let i = 0; i < allEdits.length; i++)
          if (allEdits[i].textContent === "Cancel" && parseInt(allEdits[i].id.substring(5)) !== idx) {
            allEdits[i].textContent = "Edit";
          }
        const name = document.getElementById("name");
        const category = document.getElementById("product-category");
        const price = document.getElementById("price");
        const src = document.getElementById("imageUrl");
        let opr = document.getElementById(id);
        if (opr.textContent === "Edit") {
          const currProduct=getCurrProduct(idx);
 
          if(currProduct){
            name.value = currProduct.product.name;
          category.value = currProduct.product.category;
          price.value = currProduct.product.price;
          src.value = currProduct.product.src;
          let btn = document.getElementsByClassName("sendMessage")[0];
          btn.textContent = "Update Product";
          btn.id = `updateProduct-${idx}`;
          opr.textContent = "Cancel";
          }
          else return;
          
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
          const currProduct=getCurrProduct(idx);
          if(currProduct)deleteProduct(currProduct.productId);
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
            <td><span id="edit-${item.category}" class="editCtg">Edit</span><td id="del-${item.category}" class="delete">Delete</td></td>
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
      let allEdits = document.querySelectorAll(".editCtg");
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
        let btn = document.getElementsByClassName("sendMessage")[1];
        console.log(btn);
        btn.textContent = "Update Category";
        btn.id = `updateCategory-${idx}`;
        opr.textContent = "Cancel";
      } else if (opr.textContent === "Cancel") {
        category.value = "";
        let btn = document.getElementsByClassName("sendMessage")[1];
        console.log(btn);
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
  let opr = document.getElementsByClassName("sendMessage")[1];
  let prevCategory;
  if (opr.id.substring(0, 6) === "update") {
    prevCategory = opr.id.substring(opr.id.indexOf("-") + 1);
  }
  addCategory(category, prevCategory);
  return true;
}
