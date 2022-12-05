import config from "../conf/index.js";
const endPointURL = config.backendEndpoint + "/adventures";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  console.log(search.split("=")[1]);
  return search.split("=")[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(endPointURL + `?city=${city}`);
    let adventures = await response.json();
    console.log(adventures);
    return adventures;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((e) => {
    helper(
      e.category,
      e.costPerHead,
      e.currency,
      e.duration,
      e.id,
      e.name,
      e.image
    );
  });
}

function helper(category, cost, curr, duration, id, name, img) {
  const divContainer = document.getElementById("data");
  const div2 = document.createElement("div");
  div2.className = "col-md-3";
  div2.style.position="relative";
  div2.style.borderRadius = "5px";
  div2.style.border ="solid 0.5px";
  div2.style.borderColor = "#F5F5F5";
  div2.style.paddingLeft = "0px";
  div2.style.paddingRight = "0px";
  div2.style.margin = "5px";

  const div3 = document.createElement("div");
  div3.style.backgroundColor = "orange";
  div3.style.flexWrap = "wrap"
  const pElement = document.createElement("p");
  pElement.innerText = category;
  pElement.style.padding = "5px";
  div3.appendChild(pElement);
  div3.style.position = "absolute";
  div3.style.top = "0px";
  div3.style.right = "0px";
  div3.style.borderTopLeftRadius = "5px";
  div3.style.borderBottomLeftRadius = "5px";

  const imgElement = document.createElement("img");
  imgElement.src = img;
  imgElement.alt = name;
  imgElement.height = "200";
  imgElement.width = "200";
  imgElement.style.borderRadius = "5px";
  imgElement.style.width = "100%";

  const aElement = document.createElement("a");
  aElement.href = `/detail/?adventure=${id}`;
  aElement.id=id;
  aElement.append(imgElement);
  const divInner1 = document.createElement("div");
  divInner1.style.display = "flex";
  divInner1.style.justifyContent = "space-between";
  divInner1.style.marginLeft = "5px";
  divInner1.style.marginRight = "5px";
  const h1Element = document.createElement("p");
  h1Element.innerHTML = name;
  // h1Element.style.position="absolute";
  // h1Element.style.bottom="30px";
  // h1Element.style.left="0px";
  // h1Element.style.marginLeft="20px";
  const h2Element = document.createElement("p");
  h2Element.innerText = curr + " " + cost;
  // h2Element.style.position="absolute";
  // h2Element.style.bottom="30px";
  // h2Element.style.right="0px";

  divInner1.appendChild(h1Element);
  divInner1.appendChild(h2Element);

  const divInner2 = document.createElement("div");
  divInner2.style.display = "flex";
  divInner2.style.justifyContent = "space-between";
  const paraElement = document.createElement("p");
  paraElement.innerText = "Duration";

  const paraElement2 = document.createElement("p");
  paraElement2.innerText = duration + " Hours";
  // paraElement.style.position="absolute";
  // paraElement.style.bottom="0px";
  // paraElement.style.right="0px";
  // paraElement.style.marginLeft="20px";

  divInner2.style.marginLeft = "5px";
  divInner2.style.marginRight = "5px";
  divInner2.appendChild(paraElement);
  divInner2.appendChild(paraElement2);

  div2.append(aElement);
  div2.append(divInner1);
  div2.append(divInner2);
  div2.appendChild(div3);
  divContainer.appendChild(div2);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
