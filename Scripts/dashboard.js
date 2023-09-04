if (
    localStorage.getItem("authDetails") === null ||
    localStorage.getItem("userType") === null
  ) {
    location.href = "auth.html";
  }