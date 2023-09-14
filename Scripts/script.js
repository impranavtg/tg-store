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



let UserOffers=localStorage.getItem("Offers");
if(UserOffers!==null){
  UserOffers=JSON.parse(UserOffers);
  // console.log(UserOffers)
  let allOffers = document.getElementById("offer-container");
  if (allOffers) {
    UserOffers.map((offer, i) => {
      allOffers.innerHTML += `<div class="slider ${i === 0 ? "active" : ""}">
       <div class="img">
         <img src="${offer.offer.src}" alt="${offer.offer.category}" />
       </div>

       <div class="content">
         <span>Special Offer!</span>
         <h3>${offer.offer.heading}</h3>
         <p>${offer.offer.tagline}</p>
         <a href="#${offer.offer.category}" class="btn">
           Shop Now
         </a>
       </div>
     </div>`;
    });
    let toggleBtns = document.getElementById("tbtn");
    for (let i = 0; i < UserOffers.length; i++) {
      toggleBtns.innerHTML += `<div class="navbtn ${
        i === 0 ? "active" : ""
      }"></div>`;
    }
  }
}



let slides = document.querySelectorAll(".slider");
let btns = document.querySelectorAll(".navbtn");
let navliks = document.querySelectorAll('.navLinks');

const navs = (idx) => {
  navliks.forEach((nav) => {
    nav.classList.remove("bold");
  });
  navliks[idx].classList.add("bold");
}

navliks.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    navs(i);
  });
});


let currentSlide = 1;
const manually = (idx) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    btns.forEach((navbtn) => {
      navbtn.classList.remove("active");
    });
  });
  slides[idx].classList.add("active");
  btns[idx].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manually(i);
    currentSlide = i;
  });
});

if (slides.length!=0) {
  const repeatSlider = () => {
    let active = document.getElementsByClassName("active");
    const auto = () => {
      setTimeout(() => {
        [...active].forEach((slide) => {
          slide.classList.remove("active");
        });
        slides[currentSlide].classList.add("active");
        btns[currentSlide].classList.add("active");
        currentSlide++;
        if (currentSlide == slides.length) currentSlide = 0;
        if (currentSlide >= slides.length) return;
        auto();
      }, 4000);
    }
    auto();
  }
  repeatSlider();
}

let url = location.hash;
if (url) {
  let page = document.getElementById(url);
  if (page) {
    navliks.forEach((nav) => {
      nav.classList.remove("bold");
    });
    page.classList.add("bold");
  }
}


function decreaseItem(product) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (!cartItems) return;
  let i = -1;
  for (let j = 0; j < cartItems.length; j++) {
    if (cartItems[j].identifier === product) {
      i = j;
      break;
    }
  }
  if (i === -1) return;
  cartItems[i].inCart = parseInt(cartItems[i].inCart) - 1;
  if (cartItems[i].inCart <= 0) {
        cartItems.splice(i, 1);     
        let btnVal = document.getElementById(product);
        btnVal.classList.remove("incDecCart");
        btnVal.classList.add("addCart");
        btnVal.innerHTML=`Add To Cart`;
  }
  else{
    let val=document.getElementById(`val-${product}`);
    if(val)val.innerHTML=cartItems[i].inCart;
  }
  if(cartItems.length>0)localStorage.setItem("cartItems", JSON.stringify(cartItems));
  else localStorage.removeItem("cartItems");
  onLoading();
  updateCartSummary(cartItems);
  
}





const UserProducts={};
let AllProducts=localStorage.getItem("Products");
if(AllProducts){
  AllProducts=JSON.parse(AllProducts);
    for(let prod of AllProducts){
      if(!UserProducts[prod.product.category])UserProducts[prod.product.category]=[];
        UserProducts[prod.product.category].push(prod.product);
    }
}


let allProducts = document.getElementById("allProducts");

if (allProducts) {

  allProducts.addEventListener("click", (e) => {
    let product = e.target.id;
    if (product === "") return;
    if (e.target.nodeName === "DIV" || e.target.nodeName === "SPAN") {

      if (product.substring(0, 3) === "dec") {
        product = product.substring(4);
        decreaseItem(product);
        return;
      }
      else if (product.substring(0, 3) === "inc") {
        product = product.substring(4);
      }
      console.log(product);
      let btnVal = document.getElementById(product);
      let i = product.indexOf('-');
      if (i === -1) return;
      let idx = parseInt(product.substring(i + 1));
      let item = product.substring(0, i);
      if (UserProducts[item]) {
        let count=setItems(UserProducts[item][idx], product);
        onLoading();
        btnVal.classList.remove("addCart");
        btnVal.classList.add("incDecCart");
        btnVal.innerHTML = `<span class="dec" id="dec-${product}">-</span> <span class="val" id="val-${product}"> ${count} </span> <span class="inc" id="inc-${product}">+</span>`
      }
    }
  });

  for (const item in UserProducts) {

    allProducts.innerHTML += `<div id="${item}" >
    <div class="product-category">
  <h1 class="subHeadings">${item.toUpperCase()}</h1>
  </div>
  <div class="itemContainer">
</div>
</div>`;

UserProducts[item].map((prod, i) => {
      let itemCont = document.querySelector(`#${item} .itemContainer`);
      itemCont.innerHTML += `<div class="products">
    <img src="${prod.src}" alt="${item}">
    <div class="prod-info">
        <h2>${prod.name}</h2>
    <div class="price">
        <h2>₹${prod.price}</h2>
        <div id="${item}-${i}" class="addCart">Add To Cart</div>
    </div>
    </div>
</div>`;
    })
  }

}


function updateCartSummary(cartItems){
  let summary=document.getElementById("summary");
  if(!summary)return;
  if(!cartItems || cartItems.length===0){
    summary.classList.add("empty");
    return;
  }
  let total = 0;
  let cartSummary = document.getElementsByClassName("cartItems")[0];
  if (cartSummary) {
    cartSummary.innerHTML="";
cartItems.map((item)=>{
    cartSummary.innerHTML += ` <tr class="trow"">
<td> ${item.name}</td>
<td> ₹${item.price}</td>
<td><span class="val"> ${item.inCart
      } </span> </td>
<td class="amt"> ₹${item.price * item.inCart}</td>
<tr>`
    document.getElementById("summary").classList.remove("empty");
    total += (item.price * item.inCart);
 
});

  if(cartItems.length===0){
    document.getElementById("summary").classList.add("empty");
  }
  else{
    cartSummary.innerHTML += `<tr" class="totalAmt">
<td colspan="2" class="totalPrice orderPrice">Total Price</td>
<td colspan="3"  class="totalPriceVal orderPriceVal">₹${total}</td>
</tr>`;
  }

}
}







let cartItems = localStorage.getItem("cartItems");
if (cartItems) {
  cartItems = JSON.parse(cartItems);
  
  cartItems.map((item) => {

    let btnVal=document.getElementById(item.identifier);
    if(btnVal){
      btnVal.classList.remove("addCart");
      btnVal.classList.add("incDecCart");
      btnVal.innerHTML = `<span class="dec" id="dec-${item.identifier}">-</span> <span class="val" id="val-${item.identifier}"> ${item.inCart} </span> <span class="inc" id="inc-${item.identifier}">+</span>`
    }
  });

    updateCartSummary(cartItems);

}






const setItems = (item, prod) => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  item.inCart = 1;
  let count=0;
  if (cartItems !== null) {
    
    let flag = -1;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].name === item.name) {
        flag = i;
        break;
      }
    }
    if (flag === -1) {
      item.identifier = prod;
      cartItems.push(item);
      count=1;
    }
    else {
      cartItems[flag].inCart += 1;
      count=cartItems[flag].inCart;
    }
  }
  else {
    cartItems = [];
    item.identifier = prod;
    cartItems.push(item);
    count=1;
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartSummary(cartItems);
  return count;
}






const onLoading = () => {
  let cartItems = localStorage.getItem("cartItems");
  let cartEle = document.querySelector("#cart span");
  
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    let cartNo = 0;
    for (let i = 0; i < cartItems.length; i++) {
      cartNo += parseInt(cartItems[i].inCart);
    }
    if (cartEle) cartEle.textContent = cartNo;
  }
  else {
    if (cartEle) cartEle.textContent = 0;
  }
}
onLoading();



const states = {
  "Andaman and Nicobar Islands": [
    "Port Blair"
  ],
  "Haryana": [
    "Faridabad",
    "Gurgaon",
    "Hisar",
    "Rohtak",
    "Panipat",
    "Karnal",
    "Sonipat",
    "Yamunanagar",
    "Panchkula",
    "Bhiwani",
    "Bahadurgarh",
    "Jind",
    "Sirsa",
    "Thanesar",
    "Kaithal",
    "Palwal",
    "Rewari",
    "Hansi",
    "Narnaul",
    "Fatehabad",
    "Gohana",
    "Tohana",
    "Narwana",
    "Mandi Dabwali",
    "Charkhi Dadri",
    "Shahbad",
    "Pehowa",
    "Samalkha",
    "Pinjore",
    "Ladwa",
    "Sohna",
    "Safidon",
    "Taraori",
    "Mahendragarh",
    "Ratia",
    "Rania",
    "Sarsod"
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Ranipet",
    "Nagercoil",
    "Thanjavur",
    "Vellore",
    "Kancheepuram",
    "Erode",
    "Tiruvannamalai",
    "Pollachi",
    "Rajapalayam",
    "Sivakasi",
    "Pudukkottai",
    "Neyveli (TS)",
    "Nagapattinam",
    "Viluppuram",
    "Tiruchengode",
    "Vaniyambadi",
    "Theni Allinagaram",
    "Udhagamandalam",
    "Aruppukkottai",
    "Paramakudi",
    "Arakkonam",
    "Virudhachalam",
    "Srivilliputhur",
    "Tindivanam",
    "Virudhunagar",
    "Karur",
    "Valparai",
    "Sankarankovil",
    "Tenkasi",
    "Palani",
    "Pattukkottai",
    "Tirupathur",
    "Ramanathapuram",
    "Udumalaipettai",
    "Gobichettipalayam",
    "Thiruvarur",
    "Thiruvallur",
    "Panruti",
    "Namakkal",
    "Thirumangalam",
    "Vikramasingapuram",
    "Nellikuppam",
    "Rasipuram",
    "Tiruttani",
    "Nandivaram-Guduvancheri",
    "Periyakulam",
    "Pernampattu",
    "Vellakoil",
    "Sivaganga",
    "Vadalur",
    "Rameshwaram",
    "Tiruvethipuram",
    "Perambalur",
    "Usilampatti",
    "Vedaranyam",
    "Sathyamangalam",
    "Puliyankudi",
    "Nanjikottai",
    "Thuraiyur",
    "Sirkali",
    "Tiruchendur",
    "Periyasemur",
    "Sattur",
    "Vandavasi",
    "Tharamangalam",
    "Tirukkoyilur",
    "Oddanchatram",
    "Palladam",
    "Vadakkuvalliyur",
    "Tirukalukundram",
    "Uthamapalayam",
    "Surandai",
    "Sankari",
    "Shenkottai",
    "Vadipatti",
    "Sholingur",
    "Tirupathur",
    "Manachanallur",
    "Viswanatham",
    "Polur",
    "Panagudi",
    "Uthiramerur",
    "Thiruthuraipoondi",
    "Pallapatti",
    "Ponneri",
    "Lalgudi",
    "Natham",
    "Unnamalaikadai",
    "P.N.Patti",
    "Tharangambadi",
    "Tittakudi",
    "Pacode",
    "O' Valley",
    "Suriyampalayam",
    "Sholavandan",
    "Thammampatti",
    "Namagiripettai",
    "Peravurani",
    "Parangipettai",
    "Pudupattinam",
    "Pallikonda",
    "Sivagiri",
    "Punjaipugalur",
    "Padmanabhapuram",
    "Thirupuvanam"
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Ratlam",
    "Satna",
    "Murwara (Katni)",
    "Morena",
    "Singrauli",
    "Rewa",
    "Vidisha",
    "Ganjbasoda",
    "Shivpuri",
    "Mandsaur",
    "Neemuch",
    "Nagda",
    "Itarsi",
    "Sarni",
    "Sehore",
    "Mhow Cantonment",
    "Seoni",
    "Balaghat",
    "Ashok Nagar",
    "Tikamgarh",
    "Shahdol",
    "Pithampur",
    "Alirajpur",
    "Mandla",
    "Sheopur",
    "Shajapur",
    "Panna",
    "Raghogarh-Vijaypur",
    "Sendhwa",
    "Sidhi",
    "Pipariya",
    "Shujalpur",
    "Sironj",
    "Pandhurna",
    "Nowgong",
    "Mandideep",
    "Sihora",
    "Raisen",
    "Lahar",
    "Maihar",
    "Sanawad",
    "Sabalgarh",
    "Umaria",
    "Porsa",
    "Narsinghgarh",
    "Malaj Khand",
    "Sarangpur",
    "Mundi",
    "Nepanagar",
    "Pasan",
    "Mahidpur",
    "Seoni-Malwa",
    "Rehli",
    "Manawar",
    "Rahatgarh",
    "Panagar",
    "Wara Seoni",
    "Tarana",
    "Sausar",
    "Rajgarh",
    "Niwari",
    "Mauganj",
    "Manasa",
    "Nainpur",
    "Prithvipur",
    "Sohagpur",
    "Nowrozabad (Khodargama)",
    "Shamgarh",
    "Maharajpur",
    "Multai",
    "Pali",
    "Pachore",
    "Rau",
    "Mhowgaon",
    "Vijaypur",
    "Narsinghgarh"
  ],
  "Jharkhand": [
    "Dhanbad",
    "Ranchi",
    "Jamshedpur",
    "Bokaro Steel City",
    "Deoghar",
    "Phusro",
    "Adityapur",
    "Hazaribag",
    "Giridih",
    "Ramgarh",
    "Jhumri Tilaiya",
    "Saunda",
    "Sahibganj",
    "Medininagar (Daltonganj)",
    "Chaibasa",
    "Chatra",
    "Gumia",
    "Dumka",
    "Madhupur",
    "Chirkunda",
    "Pakaur",
    "Simdega",
    "Musabani",
    "Mihijam",
    "Patratu",
    "Lohardaga",
    "Tenu dam-cum-Kathhara"
  ],
  "Mizoram": [
    "Aizawl",
    "Lunglei",
    "Saiha"
  ],
  "Nagaland": [
    "Dimapur",
    "Kohima",
    "Zunheboto",
    "Tuensang",
    "Wokha",
    "Mokokchung"
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Mandi",
    "Solan",
    "Nahan",
    "Sundarnagar",
    "Palampur",
    "Kullu"
  ],
  "Tripura": [
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Pratapgarh",
    "Kailasahar",
    "Belonia",
    "Khowai"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Kakinada",
    "Tirupati",
    "Anantapur",
    "Kadapa",
    "Vizianagaram",
    "Eluru",
    "Ongole",
    "Nandyal",
    "Machilipatnam",
    "Adoni",
    "Tenali",
    "Chittoor",
    "Hindupur",
    "Proddatur",
    "Bhimavaram",
    "Madanapalle",
    "Guntakal",
    "Dharmavaram",
    "Gudivada",
    "Srikakulam",
    "Narasaraopet",
    "Rajampet",
    "Tadpatri",
    "Tadepalligudem",
    "Chilakaluripet",
    "Yemmiganur",
    "Kadiri",
    "Chirala",
    "Anakapalle",
    "Kavali",
    "Palacole",
    "Sullurpeta",
    "Tanuku",
    "Rayachoti",
    "Srikalahasti",
    "Bapatla",
    "Naidupet",
    "Nagari",
    "Gudur",
    "Vinukonda",
    "Narasapuram",
    "Nuzvid",
    "Markapur",
    "Ponnur",
    "Kandukur",
    "Bobbili",
    "Rayadurg",
    "Samalkot",
    "Jaggaiahpet",
    "Tuni",
    "Amalapuram",
    "Bheemunipatnam",
    "Venkatagiri",
    "Sattenapalle",
    "Pithapuram",
    "Palasa Kasibugga",
    "Parvathipuram",
    "Macherla",
    "Gooty",
    "Salur",
    "Mandapeta",
    "Jammalamadugu",
    "Peddapuram",
    "Punganur",
    "Nidadavole",
    "Repalle",
    "Ramachandrapuram",
    "Kovvur",
    "Tiruvuru",
    "Uravakonda",
    "Narsipatnam",
    "Yerraguntla",
    "Pedana",
    "Puttur",
    "Renigunta",
    "Rajam",
    "Srisailam Project (Right Flank Colony) Township"
  ],
  "Punjab": [
    "Ludhiana",
    "Patiala",
    "Amritsar",
    "Jalandhar",
    "Bathinda",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Moga",
    "Malerkotla",
    "Khanna",
    "Mohali",
    "Barnala",
    "Firozpur",
    "Phagwara",
    "Kapurthala",
    "Zirakpur",
    "Kot Kapura",
    "Faridkot",
    "Muktsar",
    "Rajpura",
    "Sangrur",
    "Fazilka",
    "Gurdaspur",
    "Kharar",
    "Gobindgarh",
    "Mansa",
    "Malout",
    "Nabha",
    "Tarn Taran",
    "Jagraon",
    "Sunam",
    "Dhuri",
    "Firozpur Cantt.",
    "Sirhind Fatehgarh Sahib",
    "Rupnagar",
    "Jalandhar Cantt.",
    "Samana",
    "Nawanshahr",
    "Rampura Phul",
    "Nangal",
    "Nakodar",
    "Zira",
    "Patti",
    "Raikot",
    "Longowal",
    "Urmar Tanda",
    "Morinda, India",
    "Phillaur",
    "Pattran",
    "Qadian",
    "Sujanpur",
    "Mukerian",
    "Talwara"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Bikaner",
    "Udaipur",
    "Ajmer",
    "Bhilwara",
    "Alwar",
    "Bharatpur",
    "Pali",
    "Barmer",
    "Sikar",
    "Tonk",
    "Sadulpur",
    "Sawai Madhopur",
    "Nagaur",
    "Makrana",
    "Sujangarh",
    "Sardarshahar",
    "Ladnu",
    "Ratangarh",
    "Nokha",
    "Nimbahera",
    "Suratgarh",
    "Rajsamand",
    "Lachhmangarh",
    "Rajgarh (Churu)",
    "Nasirabad",
    "Nohar",
    "Phalodi",
    "Nathdwara",
    "Pilani",
    "Merta City",
    "Sojat",
    "Neem-Ka-Thana",
    "Sirohi",
    "Pratapgarh",
    "Rawatbhata",
    "Sangaria",
    "Lalsot",
    "Pilibanga",
    "Pipar City",
    "Taranagar",
    "Vijainagar, Ajmer",
    "Sumerpur",
    "Sagwara",
    "Ramganj Mandi",
    "Lakheri",
    "Udaipurwati",
    "Losal",
    "Sri Madhopur",
    "Ramngarh",
    "Rawatsar",
    "Rajakhera",
    "Shahpura",
    "Shahpura",
    "Raisinghnagar",
    "Malpura",
    "Nadbai",
    "Sanchore",
    "Nagar",
    "Rajgarh (Alwar)",
    "Sheoganj",
    "Sadri",
    "Todaraisingh",
    "Todabhim",
    "Reengus",
    "Rajaldesar",
    "Sadulshahar",
    "Sambhar",
    "Prantij",
    "Mount Abu",
    "Mangrol",
    "Phulera",
    "Mandawa",
    "Pindwara",
    "Mandalgarh",
    "Takhatgarh"
  ],
  "Assam": [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Nagaon",
    "Tinsukia",
    "Jorhat",
    "Bongaigaon City",
    "Dhubri",
    "Diphu",
    "North Lakhimpur",
    "Tezpur",
    "Karimganj",
    "Sibsagar",
    "Goalpara",
    "Barpeta",
    "Lanka",
    "Lumding",
    "Mankachar",
    "Nalbari",
    "Rangia",
    "Margherita",
    "Mangaldoi",
    "Silapathar",
    "Mariani",
    "Marigaon"
  ],
  "Odisha": [
    "Bhubaneswar",
    "Cuttack",
    "Raurkela",
    "Brahmapur",
    "Sambalpur",
    "Puri",
    "Baleshwar Town",
    "Baripada Town",
    "Bhadrak",
    "Balangir",
    "Jharsuguda",
    "Bargarh",
    "Paradip",
    "Bhawanipatna",
    "Dhenkanal",
    "Barbil",
    "Kendujhar",
    "Sunabeda",
    "Rayagada",
    "Jatani",
    "Byasanagar",
    "Kendrapara",
    "Rajagangapur",
    "Parlakhemundi",
    "Talcher",
    "Sundargarh",
    "Phulabani",
    "Pattamundai",
    "Titlagarh",
    "Nabarangapur",
    "Soro",
    "Malkangiri",
    "Rairangpur",
    "Tarbha"
  ],
  "Chhattisgarh": [
    "Raipur",
    "Bhilai Nagar",
    "Korba",
    "Bilaspur",
    "Durg",
    "Rajnandgaon",
    "Jagdalpur",
    "Raigarh",
    "Ambikapur",
    "Mahasamund",
    "Dhamtari",
    "Chirmiri",
    "Bhatapara",
    "Dalli-Rajhara",
    "Naila Janjgir",
    "Tilda Newra",
    "Mungeli",
    "Manendragarh",
    "Sakti"
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Baramula",
    "Anantnag",
    "Sopore",
    "KathUrban Agglomeration",
    "Rajauri",
    "Punch",
    "Udhampur"
  ],
  "Karnataka": [
    "Bengaluru",
    "Hubli-Dharwad",
    "Belagavi",
    "Mangaluru",
    "Davanagere",
    "Ballari",
    "Mysore",
    "Tumkur",
    "Shivamogga",
    "Raayachuru",
    "Robertson Pet",
    "Kolar",
    "Mandya",
    "Udupi",
    "Chikkamagaluru",
    "Karwar",
    "Ranebennuru",
    "Ranibennur",
    "Ramanagaram",
    "Gokak",
    "Yadgir",
    "Rabkavi Banhatti",
    "Shahabad",
    "Sirsi",
    "Sindhnur",
    "Tiptur",
    "Arsikere",
    "Nanjangud",
    "Sagara",
    "Sira",
    "Puttur",
    "Athni",
    "Mulbagal",
    "Surapura",
    "Siruguppa",
    "Mudhol",
    "Sidlaghatta",
    "Shahpur",
    "Saundatti-Yellamma",
    "Wadi",
    "Manvi",
    "Nelamangala",
    "Lakshmeshwar",
    "Ramdurg",
    "Nargund",
    "Tarikere",
    "Malavalli",
    "Savanur",
    "Lingsugur",
    "Vijayapura",
    "Sankeshwara",
    "Madikeri",
    "Talikota",
    "Sedam",
    "Shikaripur",
    "Mahalingapura",
    "Mudalagi",
    "Muddebihal",
    "Pavagada",
    "Malur",
    "Sindhagi",
    "Sanduru",
    "Afzalpur",
    "Maddur",
    "Madhugiri",
    "Tekkalakote",
    "Terdal",
    "Mudabidri",
    "Magadi",
    "Navalgund",
    "Shiggaon",
    "Shrirangapattana",
    "Sindagi",
    "Sakaleshapura",
    "Srinivaspur",
    "Ron",
    "Mundargi",
    "Sadalagi",
    "Piriyapatna",
    "Adyar"
  ],
  "Manipur": [
    "Imphal",
    "Thoubal",
    "Lilong",
    "Mayang Imphal"
  ],
  "Kerala": [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Kollam",
    "Thrissur",
    "Palakkad",
    "Alappuzha",
    "Malappuram",
    "Ponnani",
    "Vatakara",
    "Kanhangad",
    "Taliparamba",
    "Koyilandy",
    "Neyyattinkara",
    "Kayamkulam",
    "Nedumangad",
    "Kannur",
    "Tirur",
    "Kottayam",
    "Kasaragod",
    "Kunnamkulam",
    "Ottappalam",
    "Thiruvalla",
    "Thodupuzha",
    "Chalakudy",
    "Changanassery",
    "Punalur",
    "Nilambur",
    "Cherthala",
    "Perinthalmanna",
    "Mattannur",
    "Shoranur",
    "Varkala",
    "Paravoor",
    "Pathanamthitta",
    "Peringathur",
    "Attingal",
    "Kodungallur",
    "Pappinisseri",
    "Chittur-Thathamangalam",
    "Muvattupuzha",
    "Adoor",
    "Mavelikkara",
    "Mavoor",
    "Perumbavoor",
    "Vaikom",
    "Palai",
    "Panniyannur",
    "Guruvayoor",
    "Puthuppally",
    "Panamattom"
  ],
  "Delhi": [
    "Delhi",
    "New Delhi"
  ],
  "Dadra and Nagar Haveli": [
    "Silvassa"
  ],
  "Puducherry": [
    "Pondicherry",
    "Karaikal",
    "Yanam",
    "Mahe"
  ],
  "Uttarakhand": [
    "Dehradun",
    "Hardwar",
    "Haldwani-cum-Kathgodam",
    "Srinagar",
    "Kashipur",
    "Roorkee",
    "Rudrapur",
    "Rishikesh",
    "Ramnagar",
    "Pithoragarh",
    "Manglaur",
    "Nainital",
    "Mussoorie",
    "Tehri",
    "Pauri",
    "Nagla",
    "Sitarganj",
    "Bageshwar"
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Firozabad",
    "Agra",
    "Meerut",
    "Varanasi",
    "Allahabad",
    "Amroha",
    "Moradabad",
    "Aligarh",
    "Saharanpur",
    "Noida",
    "Loni",
    "Jhansi",
    "Shahjahanpur",
    "Rampur",
    "Modinagar",
    "Hapur",
    "Etawah",
    "Sambhal",
    "Orai",
    "Bahraich",
    "Unnao",
    "Rae Bareli",
    "Lakhimpur",
    "Sitapur",
    "Lalitpur",
    "Pilibhit",
    "Chandausi",
    "Hardoi ",
    "Azamgarh",
    "Khair",
    "Sultanpur",
    "Tanda",
    "Nagina",
    "Shamli",
    "Najibabad",
    "Shikohabad",
    "Sikandrabad",
    "Shahabad, Hardoi",
    "Pilkhuwa",
    "Renukoot",
    "Vrindavan",
    "Ujhani",
    "Laharpur",
    "Tilhar",
    "Sahaswan",
    "Rath",
    "Sherkot",
    "Kalpi",
    "Tundla",
    "Sandila",
    "Nanpara",
    "Sardhana",
    "Nehtaur",
    "Seohara",
    "Padrauna",
    "Mathura",
    "Thakurdwara",
    "Nawabganj",
    "Siana",
    "Noorpur",
    "Sikandra Rao",
    "Puranpur",
    "Rudauli",
    "Thana Bhawan",
    "Palia Kalan",
    "Zaidpur",
    "Nautanwa",
    "Zamania",
    "Shikarpur, Bulandshahr",
    "Naugawan Sadat",
    "Fatehpur Sikri",
    "Shahabad, Rampur",
    "Robertsganj",
    "Utraula",
    "Sadabad",
    "Rasra",
    "Lar",
    "Lal Gopalganj Nindaura",
    "Sirsaganj",
    "Pihani",
    "Shamsabad, Agra",
    "Rudrapur",
    "Soron",
    "SUrban Agglomerationr",
    "Samdhan",
    "Sahjanwa",
    "Rampur Maniharan",
    "Sumerpur",
    "Shahganj",
    "Tulsipur",
    "Tirwaganj",
    "PurqUrban Agglomerationzi",
    "Shamsabad, Farrukhabad",
    "Warhapur",
    "Powayan",
    "Sandi",
    "Achhnera",
    "Naraura",
    "Nakur",
    "Sahaspur",
    "Safipur",
    "Reoti",
    "Sikanderpur",
    "Saidpur",
    "Sirsi",
    "Purwa",
    "Parasi",
    "Lalganj",
    "Phulpur",
    "Shishgarh",
    "Sahawar",
    "Samthar",
    "Pukhrayan",
    "Obra",
    "Niwai",
    "Mirzapur"
  ],
  "Bihar": [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Arrah",
    "Begusarai",
    "Chhapra",
    "Katihar",
    "Munger",
    "Purnia",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Dehri-on-Sone",
    "Bettiah",
    "Motihari",
    "Bagaha",
    "Siwan",
    "Kishanganj",
    "Jamalpur",
    "Buxar",
    "Jehanabad",
    "Aurangabad",
    "Lakhisarai",
    "Nawada",
    "Jamui",
    "Sitamarhi",
    "Araria",
    "Gopalganj",
    "Madhubani",
    "Masaurhi",
    "Samastipur",
    "Mokameh",
    "Supaul",
    "Dumraon",
    "Arwal",
    "Forbesganj",
    "BhabUrban Agglomeration",
    "Narkatiaganj",
    "Naugachhia",
    "Madhepura",
    "Sheikhpura",
    "Sultanganj",
    "Raxaul Bazar",
    "Ramnagar",
    "Mahnar Bazar",
    "Warisaliganj",
    "Revelganj",
    "Rajgir",
    "Sonepur",
    "Sherghati",
    "Sugauli",
    "Makhdumpur",
    "Maner",
    "Rosera",
    "Nokha",
    "Piro",
    "Rafiganj",
    "Marhaura",
    "Mirganj",
    "Lalganj",
    "Murliganj",
    "Motipur",
    "Manihari",
    "Sheohar",
    "Maharajganj",
    "Silao",
    "Barh",
    "Asarganj"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Nadiad",
    "Porbandar",
    "Anand",
    "Morvi",
    "Mahesana",
    "Bharuch",
    "Vapi",
    "Navsari",
    "Veraval",
    "Bhuj",
    "Godhra",
    "Palanpur",
    "Valsad",
    "Patan",
    "Deesa",
    "Amreli",
    "Anjar",
    "Dhoraji",
    "Khambhat",
    "Mahuva",
    "Keshod",
    "Wadhwan",
    "Ankleshwar",
    "Savarkundla",
    "Kadi",
    "Visnagar",
    "Upleta",
    "Una",
    "Sidhpur",
    "Unjha",
    "Mangrol",
    "Viramgam",
    "Modasa",
    "Palitana",
    "Petlad",
    "Kapadvanj",
    "Sihor",
    "Wankaner",
    "Limbdi",
    "Mandvi",
    "Thangadh",
    "Vyara",
    "Padra",
    "Lunawada",
    "Rajpipla",
    "Vapi",
    "Umreth",
    "Sanand",
    "Rajula",
    "Radhanpur",
    "Mahemdabad",
    "Ranavav",
    "Tharad",
    "Mansa",
    "Umbergaon",
    "Talaja",
    "Vadnagar",
    "Manavadar",
    "Salaya",
    "Vijapur",
    "Pardi",
    "Rapar",
    "Songadh",
    "Lathi",
    "Adalaj",
    "Chhapra",
    "Gandhinagar"
  ],
  "Telangana": [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Mancherial",
    "Adilabad",
    "Suryapet",
    "Jagtial",
    "Miryalaguda",
    "Nirmal",
    "Kamareddy",
    "Kothagudem",
    "Bodhan",
    "Palwancha",
    "Mandamarri",
    "Koratla",
    "Sircilla",
    "Tandur",
    "Siddipet",
    "Wanaparthy",
    "Kagaznagar",
    "Gadwal",
    "Sangareddy",
    "Bellampalle",
    "Bhongir",
    "Vikarabad",
    "Jangaon",
    "Bhadrachalam",
    "Bhainsa",
    "Farooqnagar",
    "Medak",
    "Narayanpet",
    "Sadasivpet",
    "Yellandu",
    "Manuguru",
    "Kyathampalle",
    "Nagarkurnool"
  ],
  "Meghalaya": [
    "Shillong",
    "Tura",
    "Nongstoin"
  ],
  "Himachal Praddesh": [
    "Manali"
  ],
  "Arunachal Pradesh": [
    "Naharlagun",
    "Pasighat"
  ],
  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Solapur",
    "Mira-Bhayandar",
    "Bhiwandi",
    "Amravati",
    "Nanded-Waghala",
    "Sangli",
    "Malegaon",
    "Akola",
    "Latur",
    "Dhule",
    "Ahmednagar",
    "Ichalkaranji",
    "Parbhani",
    "Panvel",
    "Yavatmal",
    "Achalpur",
    "Osmanabad",
    "Nandurbar",
    "Satara",
    "Wardha",
    "Udgir",
    "Aurangabad",
    "Amalner",
    "Akot",
    "Pandharpur",
    "Shrirampur",
    "Parli",
    "Washim",
    "Ambejogai",
    "Manmad",
    "Ratnagiri",
    "Uran Islampur",
    "Pusad",
    "Sangamner",
    "Shirpur-Warwade",
    "Malkapur",
    "Wani",
    "Lonavla",
    "Talegaon Dabhade",
    "Anjangaon",
    "Umred",
    "Palghar",
    "Shegaon",
    "Ozar",
    "Phaltan",
    "Yevla",
    "Shahade",
    "Vita",
    "Umarkhed",
    "Warora",
    "Pachora",
    "Tumsar",
    "Manjlegaon",
    "Sillod",
    "Arvi",
    "Nandura",
    "Vaijapur",
    "Wadgaon Road",
    "Sailu",
    "Murtijapur",
    "Tasgaon",
    "Mehkar",
    "Yawal",
    "Pulgaon",
    "Nilanga",
    "Wai",
    "Umarga",
    "Paithan",
    "Rahuri",
    "Nawapur",
    "Tuljapur",
    "Morshi",
    "Purna",
    "Satana",
    "Pathri",
    "Sinnar",
    "Uchgaon",
    "Uran",
    "Pen",
    "Karjat",
    "Manwath",
    "Partur",
    "Sangole",
    "Mangrulpir",
    "Risod",
    "Shirur",
    "Savner",
    "Sasvad",
    "Pandharkaoda",
    "Talode",
    "Shrigonda",
    "Shirdi",
    "Raver",
    "Mukhed",
    "Rajura",
    "Vadgaon Kasba",
    "Tirora",
    "Mahad",
    "Lonar",
    "Sawantwadi",
    "Pathardi",
    "Pauni",
    "Ramtek",
    "Mul",
    "Soyagaon",
    "Mangalvedhe",
    "Narkhed",
    "Shendurjana",
    "Patur",
    "Mhaswad",
    "Loha",
    "Nandgaon",
    "Warud"
  ],
  "Goa": [
    "Marmagao",
    "Panaji",
    "Margao",
    "Mapusa"
  ],
  "West Bengal": [
    "Kolkata",
    "Siliguri",
    "Asansol",
    "Raghunathganj",
    "Kharagpur",
    "Naihati",
    "English Bazar",
    "Baharampur",
    "Hugli-Chinsurah",
    "Raiganj",
    "Jalpaiguri",
    "Santipur",
    "Balurghat",
    "Medinipur",
    "Habra",
    "Ranaghat",
    "Bankura",
    "Nabadwip",
    "Darjiling",
    "Purulia",
    "Arambagh",
    "Tamluk",
    "AlipurdUrban Agglomerationr",
    "Suri",
    "Jhargram",
    "Gangarampur",
    "Rampurhat",
    "Kalimpong",
    "Sainthia",
    "Taki",
    "Murshidabad",
    "Memari",
    "Paschim Punropara",
    "Tarakeswar",
    "Sonamukhi",
    "PandUrban Agglomeration",
    "Mainaguri",
    "Malda",
    "Panchla",
    "Raghunathpur",
    "Mathabhanga",
    "Monoharpur",
    "Srirampore",
    "Adra"
  ]
};


function restrictCities(e) {
  let state = e.target.value;
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = `<option value="">--Select City--</option>`;
  if (state === "") return;
  if (!states[state]) return;
  states[state].map((city) => {
    citySelect.innerHTML += `<option value="${city}" id="${city}">${city}</option>`
  })
}


const stateSelect = document.getElementById("state");
if (stateSelect) {
  for (let state in states) {
    stateSelect.innerHTML += `<option value="${state}" id="${state}">${state}</option>`;
  }
}


// show error 
function showError(cls, message) {
  let ele = document.getElementsByClassName(cls)[0];
  ele.getElementsByClassName("err")[0].innerHTML = message;
}

// remove all errors
function removeErrors(cls) {
  console.log("called");
  let errors = document.getElementsByClassName(cls);
  console.log(errors);
  for (let err in errors) {
    err.innerHTML = "";
  }
}

// remove an error
function removeError(cls) {
  let ele = document.getElementsByClassName(cls)[0];
  ele.getElementsByClassName("err")[0].innerHTML = "";
}


function validateName(id){
  const name = document.getElementById("name").value.trim();
  let nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name) || name.length < 3) {
    showError(id, "Enter a valid Name!");
    return false;
  }
  else removeError(id);
  return true;
}


function validateNumber(id){
  const number=document.getElementById("number").value;
  let numberRegex=/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
  if(!numberRegex.test(number)){
    showError(id,"Enter a valid Number!");
    return false;
  }
  else removeError(id);
  return true;
}


function validateAddress(id){
  const address = document.getElementById("address").value.trim();
  if (address.length < 3) {
    showError(id, "Enter a valid Address!");
    return false;
  }
  else removeError(id);
  return true;
}



function validateOrder(e) {
  e.preventDefault();
  removeErrors("err");
  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value.trim();
  let flag = true;


  if(!validateName("name")){
    showError("name", "Enter a valid Name!");
    flag = false;
  }
  if(!validateNumber("number")){
    showError("number", "Enter a valid Number!");
    flag = false;
  }
  if(!validateAddress("address")){
    showError("address", "Enter a valid Address!");
      flag = false;
  }
  if (state === "" || city === "") {
    const message = (state === "" && city === "") ? "Please Select State and City" : (state === "" && city !== "") ? "Please Select State" : "Please Select City";
    showError("state-city", message);
    flag = false;
  }

  if (flag) {
    let cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      alert("Cart is Empty!!");
      flag = false;
    }
    else {
      cartItems = JSON.parse(cartItems);
      const email = JSON.parse(localStorage.getItem("authDetails")).email;
      const orderNo=Date.now();
      const orderDetails={name,number,state,city,address};
      let totalAmt=0;
      for(let item of cartItems)totalAmt+=parseInt(item.inCart)*parseInt(item.price);
      removeErrors("err");
      placeOrder(email, cartItems,orderDetails,"pending",orderNo,totalAmt,orderNo,null,null);
      document.getElementById("name").value="";
      document.getElementById("number").value="";
      document.getElementById("state").value="";
      document.getElementById("city").value="";
      document.getElementById("address").value="";
    }
  }
  return flag;
}














