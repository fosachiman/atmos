let lat, lng;
// let headerForm = document.querySelector('#header-form');
// let locationLink = document.createElement('a');

// locationLink.setAttribute('class', 'submit');
// locationLink.innerHTML = 'My Location';
// headerForm.appendChild(locationLink);
let locationButton = document.querySelector('#location-button');
locationButton.style.borderColor = 'gray';

let options = {
  timeout: 5000,
  maximumAge: 20000,
};

function success(pos) {
  let crd = pos.coords;
  lat = crd.latitude;
  lng = crd.longitude;
  locationButton.style.borderColor = "#00B7FF"
  locationButton.setAttribute('href', `/geo/${lat}--${lng}`)
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

//my location should be there, on click it should run all of the stuff above
