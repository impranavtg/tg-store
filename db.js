var db;
if('indexedDB' in window){
    const req=indexedDB.open("myDB");
    req.onerror=function(e){
        console.log(`Some error Occurred: ${e.message}`);
    };
    req.onsuccess=function(e){
        console.info("DB created");
        db = req.result;
        
    };
    req.onupgradeneeded=function(e){
      console.info("DB updated");
      db = req.result;
      const objectStore = db.createObjectStore("users", { keyPath: "email" });
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("password", "password", { unique: false });
    };
}
else{
    alert("IndexDB not supported!");
}


function addUser(user){
    if(!db)return;
    const trans=db.transaction("users", "readwrite");
    trans.oncomplete = function (e) {
        console.log("success");
    };

    trans.onerror = function (e) {
        console.log(e);
    };
    const objectStore = trans.objectStore("users");
    const req = objectStore.add(user);
    req.onsuccess = () => {
      console.log(`New user added, email: ${req.result}`);
      localStorage.setItem("authDetails",JSON.stringify(user));
      location.href="index.html";
    };
    req.onerror = (e) => {
      console.log(`Some error Occurred: ${e.message}`);
    };
}

// create hash for password



function verifyUser(email,password) {
  const trans = db.transaction("users");
  const objectStore=trans.objectStore("users");
  const req = objectStore.get(email);

  req.onsuccess = () => {
    const user = req.result;
    if(!user){
        alert("User does not exist!");
        return;
    }
    console.log(user)
    if(password===user.password){
        localStorage.setItem("authDetails", JSON.stringify(user));
        location.href = "index.html";
        return;
    }
    alert("Incorrect Credentials!");
  };

  req.onerror = (err) => {
    alert("Some error occurred!")
  };
}

