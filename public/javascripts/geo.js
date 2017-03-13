
let options = {
  timeout: 5000,
  maximumAge: 20000,
};

function success(pos) {
  let crd = pos.coords;
  let lat = crd.latitude;
  let lng = crd.longitude;

  let headerForm = document.querySelector('#header-form');
  let locationLink = document.createElement('a');
  locationLink.setAttribute('href', `/geo/${lat}--${lng}`)
  locationLink.setAttribute('class', 'submit');
  locationLink.innerHTML = 'My Location';
  headerForm.appendChild(locationLink);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

