import "./index.css";

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputEl = document.getElementById("city").value;

  console.log("city value:", inputEl);
});
