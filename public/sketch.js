
var peta;

let mlat = -6.976875 ;
let mlon = 107.630042;

var ww = 1024;
var hh = 876;

var zoom = 5;
var earthquakes;

function preload() {
  // The mlon and mlat in this url are edited to be in the correct order.
  peta = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
    mlon + ',' + mlat + ',' + zoom + '/' +
    ww + 'x' + hh +
    '?access_token=pk.eyJ1IjoidGhpcmFmaXdpYW4iLCJhIjoiY2prbTdjaWFoMHYyNTNwcGJ1eTJ4ZG1kcCJ9.Hz0aaYkBdh54j3Kf5d3Arg');
  //load earthquakes data from usgs
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  // earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

//kalkulasi x dan y lokasi gempa dari globe menjadi datar------------------
function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}
//------------------------selesai----------------------------------------



function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(peta, 0, 0);

  var cx = mercX(mlon);
  var cy = mercY(mlat);

  for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    mag = pow(28, mag);
    mag = sqrt(mag);
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 255, 255);
    fill(255, 153, 153);
    ellipse(x, y, d, d);
  }

}
