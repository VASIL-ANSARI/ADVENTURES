import config from "../conf/index.js";
const endPointURL = config.backendEndpoint + '/cities';
async function init() {
  console.log('From init()');
 
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities(endPointURL);
  console.log(cities);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let response =  await fetch(endPointURL);
    let cityList = await response.json();
    return cityList;
  }catch(err){
    return null;
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const divContainer = document.getElementById("data");
  const div2 = document.createElement("div");
  div2.className="col-md-3";
  div2.id = id;
  div2.style = "margin : 5px;";
  div2.style.position="relative";
  const imgElement = document.createElement("img");
  imgElement.src = image;
  imgElement.alt = city;
  imgElement.height="200";
  imgElement.style.height="100%";
  imgElement.width="200";
  imgElement.style.width="100%";
  
  const aElement = document.createElement("a");
  aElement.href = `pages/adventures/?city=${id}`;
  aElement.append(imgElement);
  imgElement.style.borderRadius = "5px";
  const h1Element = document.createElement("h3");
  h1Element.innerHTML = city;
  h1Element.style.position="absolute";
  h1Element.style.bottom="30px";
  h1Element.style.left="0px";
  h1Element.style.marginLeft="20px";
  const paraElement = document.createElement("p");
  paraElement.innerText = description;
  paraElement.style.position="absolute";
  paraElement.style.bottom="0px";
  paraElement.style.left="0px";
  paraElement.style.marginLeft="20px";

  div2.append(aElement);
  div2.append(h1Element);
  div2.append(paraElement);
  divContainer.appendChild(div2);
  //console.log(divContainer);

}

export { init, fetchCities, addCityToDOM };
