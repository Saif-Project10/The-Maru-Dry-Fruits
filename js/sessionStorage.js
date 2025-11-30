// sessionStorage.js

function setActiveUser(user) {
    sessionStorage.setItem("activeUser", JSON.stringify(user));
    console.log("Active user set in Session Storage:", user);
  }
  
  function getActiveUser() {
    return JSON.parse(sessionStorage.getItem("activeUser"));
  }
  
  function logoutUser() {
    sessionStorage.removeItem("activeUser");
    console.log("User logged out and session cleared!");
  }
  