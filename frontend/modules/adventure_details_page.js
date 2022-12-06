import config from "../conf/index.js";
let endPointURl = config.backendEndpoint + "/adventures/detail?adventure=";
let reservationEndpointURL = config.backendEndpoint + "/reservations/new";
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  return search.split("=")[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(endPointURl + adventureId);
    let lists = await response.json();
    return lists;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  helper(
    adventure.id,
    adventure.name,
    adventure.reserved,
    adventure.subtitle,
    adventure.images,
    adventure.costPerHead,
    adventure.available
  );
}

function helper(id, name, reserved, subtitle, images, cost, available) {
  const hElement = document.getElementById("adventure-name");
  hElement.innerHTML = name;
  const pElement = document.getElementById("adventure-subtitle");
  pElement.innerHTML = subtitle;

  const div1 = document.getElementById("photo-gallery");

  // divInnner.style.display="flex";
  // divInnner.style.flexDirection = "column";
  for (let img of images) {
    const divInnner = document.createElement("div");
    divInnner.className = "activity-card-image";
    const imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.alt = name;
    imgElement.width = "100";
    imgElement.height = "100";
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    divInnner.append(imgElement);
    div1.appendChild(divInnner);
  }

  const div2 = document.getElementById("adventure-content");
  const p1Element = document.createElement("p");
  p1Element.innerText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus faucibus ornare. Fames ac turpis egestas sed tempus urna et. Massa ultricies mi quis hendrerit dolor magna eget est lorem. Tellus mauris a diam maecenas sed enim ut. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Et tortor consequat id porta nibh venenatis cras. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. Volutpat lacus laoreet non curabitur. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Rhoncus mattis rhoncus urna neque viverra. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Interdum velit euismod in pellentesque massa placerat duis ultricies. Enim neque volutpat ac tincidunt vitae semper quis lectus nulla. Erat imperdiet sed euismod nisi porta.";
  div2.appendChild(p1Element);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const divOuter = document.getElementById("photo-gallery");

  let divInner1 = document.createElement("div");
  divInner1.className = "carousel-indicators";

  let divInner2 = document.createElement("div");
  divInner2.className = "carousel-inner";

  for (let i = 0; i < images.length; i++) {
    let classNaming = "";
    if (i === 0) classNaming = "active";
    const btnHTML = ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${i} class=${classNaming} aria-current="true" aria-label="Slide ${
      i + 1
    }"></button>
    `;
    divInner1 += btnHTML;
    const imgHTML = `
    <div class="carousel-item ${classNaming}">
      <img src=${images[i]} class="d-block w-100" alt="..." style = "height:500px;">
    </div>`;
    divInner2 += imgHTML;
  }

  divOuter.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  ${divInner1}
  ${divInner2}
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const divSoldOut = document.getElementById("reservation-panel-sold-out");
  const divAvailable = document.getElementById("reservation-panel-available");
  const divPricePerHead = document.getElementById("reservation-person-cost");
  if (adventure.available) {
    divSoldOut.style.display = "none";
    divAvailable.style.display = "block";
    divPricePerHead.innerHTML = adventure.costPerHead;
  } else {
    divAvailable.style.display = "none";
    divSoldOut.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const divTotalPrice = document.getElementById("reservation-cost");
  if (persons === "") {
    persons = 0;
  }
  divTotalPrice.innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  document.forms["myForm"].addEventListener("submit", async (event) => {
    event.preventDefault();
    const formInputs = document.getElementsByClassName("form-control");
   // console.log(formInputs);
    const obj = {
      name: formInputs.name.value,
      date: formInputs.date.value,
      person: formInputs.person.value,
      adventure: adventure.id,
    };
    console.log(obj);
    try{
      const resp = await fetch(reservationEndpointURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if(resp.ok){
        alert("Success!");
      }
      else{
        alert("Failed!");
      }
    }
    catch(err){
      alert("Failed!");
    }
    
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const divContainer = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    divContainer.style.display = "block";
  } else {
    divContainer.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
