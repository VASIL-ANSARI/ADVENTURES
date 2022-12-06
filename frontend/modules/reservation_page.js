import config from "../conf/index.js";
const endPointURL = config.backendEndpoint + "/reservations/";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const resp = await fetch(endPointURL);
    const body = await resp.json();
    console.log(body);

    // Place holder for functionality to work in the Stubs
    return body;
  } catch (err) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let divContainer = document.getElementById("no-reservation-banner");
  let tableDiv = document.getElementById("reservation-table-parent");
  if (reservations.length === 0) {
    //console.log(reservations);
    divContainer.style.display = "block";
    tableDiv.style.display = "none";
  } else {
    //console.log(reservations);
    divContainer.style.display = "none";
    tableDiv.style.display = "block";
    let tableBody = document.getElementById("reservation-table");
    for (let reservation of reservations) {
      const tr = document.createElement("tr");
      const bookingDate = new Date(reservation.date);
      const date = bookingDate.toLocaleDateString("en-IN");

      const bookingTime = new Date(reservation.time);
      const options1 = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const options2 = {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
      }
      console.log(bookingTime.toLocaleDateString("en-IN", options1));
      console.log(bookingTime.toLocaleTimeString("en-IN", options2));
      const time = bookingTime.toLocaleDateString("en-IN", options1) + ", " + bookingTime.toLocaleTimeString("en-IN", options2);
      const buttonElement = document.createElement("button");
      buttonElement.id = reservation.id;
      buttonElement.className = "reservation-visit-button";
      const aElement = document.createElement("a");
      aElement.innerText = "Visit Adventure";
      aElement.href = `../detail/?adventure=${reservation.adventure}`;
      buttonElement.appendChild(aElement);
      //console.log(buttonElement.outerHTML);
      tr.innerHTML = `<tr>
                            <td>${reservation.id}</td>
                            <td>${reservation.name}</td>
                            <td>${reservation.adventureName}</td>
                            <td>${reservation.person}</td>
                            <td>${date}</td>
                            <td>${reservation.price}</td>
                            <td>${time}</td>
                            <td>${buttonElement.outerHTML}</td>
                            </tr>
      `;
      tableBody.appendChild(tr);
    }
    console.log(tableBody);
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
