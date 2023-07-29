// variables-----------------------------------
var logOut = document.getElementById("logOut");
var boxName = document.getElementById("boxName");

logOut.addEventListener("click", function () {
  localStorage.removeItem("homeUserName");
});

boxName.innerHTML = `<h1 class="">Welcome <span > ${localStorage.getItem(
  "homeUserName"
)}</span></h1>`;
