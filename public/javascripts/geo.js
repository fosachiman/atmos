console.log('hello!');

let options = {
  timeout: 5000,
  maximumAge: 20000,
};

function success(pos) {
  let crd = pos.coords;
  let lat = crd.latitude;
  let lng = crd.longitude;
  console.log(lat);
  console.log(lng);
  axios.get(`/geo/${lat}--${lng}`)
  .then(function(response) {
    console.log(response)
  })
  .catch(function(response) {
    console.log(response)
  })
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
