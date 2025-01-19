const username = document.getElementById("username").value;
const password = document.getElementById("username").value;

const body = {
  username,
  password,
};

const URL = "www.mybackend.com/api/users/signup";
const bearer = "dsjsnihjbnasicbiasjdcijasbjcsbsajbcj";

const requestObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearer}`, // Bearer dsjsnihjbnasicbiasjdcijasbjcsbsajbcj
  },
  body: JSON.stringify(body), // turning the body from an object to JSON format
};

console.log(requestObj.body);

fetch(url, requestObj) // sends a request out to the backend
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
