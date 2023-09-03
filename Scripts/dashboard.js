if (
  localStorage.getItem("authDetails") === null ||
  localStorage.getItem("userType") === null
) {
  location.href = "auth.html";
}

let links = document.getElementsByClassName("navLinks");
links[links.length - 1].classList.add("bold");

let category = document.getElementById("category");
for(let ele in Items){
    category.innerHTML += `<option value="${ele}" id="${ele}">${ele}</option>`;
}

let offers = document.getElementById("offers");
if(offers){
    if(Offers.length<=0){
        offers.innerHTML += `<div class="noOrder"><h1 class="noOrder-heading">No Offers Available!! 😕😕</h1></div>`;
    }
    else{
        offers.innerHTML = `<table class="offer">
          <thead class="offerHeader">
              <th class="heading">Heading</th>
              <th class="tagline">Tagline</th>
              <th class="category">Category</th>
              <th class="imgurl">Image URL</th>
              <th colspan="2"></th>
          </thead>
          <tbody class="offerItems">
          </tbody>
      </table>`;

      let offerItems=document.getElementsByClassName("offerItems")[0];
      let i=0;
      for(let offer of Offers){
        offerItems.innerHTML += `<tr class="trow">
            <td> ${offer.heading.slice(0, 50)}</td>
            <td> ${offer.tagline.slice(0, 50)}</td>
            <td> ${offer.category}</td>
            <td> <a href=${offer.src}>${offer.src.slice(0, 50)}</a></td>
            <td><span id="edit-${i}" class="edit">Edit</span><td id="del-${i}" class="delete">Delete</td></td>
            <tr>`;
            i++;
      }
    }



    offers.addEventListener("click",(e)=>{
        let id=e.target.id;
        if(id.length<=0)return;
        if(e.target.nodeName==="SPAN" && id.substring(0,4)==="edit"){

        }
        else if(e.target.nodeName==="TD" && id.substring(0,3)==="del"){
            let choice=confirm("Are you sure?");
            if(choice){
                
                
            }
            else return;
        }
    })
}


