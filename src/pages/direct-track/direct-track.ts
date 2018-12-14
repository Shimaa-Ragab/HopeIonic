import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-direct-track",
  templateUrl: "direct-track.html"
})
export class DirectTrackPage {
  map;
  markerArray = [];
  markers: any;
  feature = [];
  marker;
  markerss;
  startValue: string;
  endValue: string;
  directionsService: any;
  directionsDisplay: any;
  stepDisplay: any;
  infowindow: any;
  content =
    '<html> <style type="text/css">.enjoy-css {-webkit-box-sizing: content-box-moz-box-sizing: content-box;box-sizing: content-box; padding: 19px; border: none; -webkit-border-radius: 3px; border-radius: 3px;font: normal 16px/1 "Comic Sans MS", cursive, sans-serif;color: black;-o-text-overflow: ellipsis;text-overflow: ellipsis;background: -webkit-linear-gradient(0deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background: -moz-linear-gradient(90deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background: linear-gradient(90deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background-position: 50% 50%;-webkit-background-origin: padding-box;background-origin: padding-box;-webkit-background-clip: border-box;background-clip: border-box;-webkit-background-size: auto auto;background-size: auto auto;-webkit-box-shadow: 0 0 0 3px rgba(100,103,119,1) inset; box-shadow: 0 0 0 3px rgba(100,103,119,1) inset; -webkit-transform: rotateY(-20.626480624709636deg)   ; transform: rotateY(-20.626480624709636deg)  ;}</style> <body><br><div class="enjoy-css">';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.startValue = "penn station, new york, ny";
    this.endValue = "260 Broadway New York NY 10007";
    this.map = new google.maps.Map(document.getElementById("map-canvas"), {
      zoom: 16,
      center: new google.maps.LatLng(-8.704956, 115.2275),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.TOP_CENTER
      }
    });

    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(this.map);
    this.infowindow = new google.maps.InfoWindow({ content: "" });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });
    this.stepDisplay = new google.maps.InfoWindow();
    this.initialize();
  }

  startChanged($event) {
    this.startValue = $event;
    this.calculateAndDisplayRoute(
      this.directionsDisplay,
      this.directionsService,
      this.markerArray,
      this.stepDisplay,
      this.map
    );
  }

  endChanged($event) {
    this.endValue = $event;
    this.calculateAndDisplayRoute(
      this.directionsDisplay,
      this.directionsService,
      this.markerArray,
      this.stepDisplay,
      this.map
    );
  }

  initialize() {
    this.calculateAndDisplayRoute(
      this.directionsDisplay,
      this.directionsService,
      this.markerArray,
      this.stepDisplay,
      this.map
    );

    var input = document.getElementById("locationTextField");
    var searchBox = new google.maps.places.SearchBox(input);
    // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    //   this.map.addListener('bounds_changed', function() {
    //       searchBox.setBounds(this.map.getBounds());
    // });

    // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
    searchBox.addListener("places_changed", function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        this.markers.push(
          new google.maps.Marker({
            map: this.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });

    var autocomplete = new google.maps.places.Autocomplete(input);
    //search box function end here
    //define marker icon
    var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    var icons = {
      parking: {
        name: "Parking",
        icon: iconBase + "parking_lot_maps.png"
      },
      library: {
        name: "Library",
        icon: iconBase + "library_maps.png"
      },
      info: {
        name: "Info",
        icon: iconBase + "info-i_maps.png"
      }
    };

    function addMarker(feature, map) {
      this.marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
      this.marker.category = feature[i]["category"];
      this.marker.setVisible(true);
      this.markers.push(this.marker);
    }

    // define marker position
    var features = [
      {
        position: new google.maps.LatLng(-8.702709, 115.224461),
        type: "info",
        title: "Pusat Informasi Kota",
        category: 1
      },
      {
        position: new google.maps.LatLng(-8.704432, 115.230249),
        type: "parking",
        title: "Tempat Parkir Avaliable",
        category: 2
      },
      {
        position: new google.maps.LatLng(-8.704442, 115.231239),
        type: "library",
        title: "perpustakaan kota",
        category: 3
      },
      {
        position: new google.maps.LatLng(-8.702909, 115.230149),
        type: "parking",
        title: "ini parkir",
        category: 2
      },
      {
        position: new google.maps.LatLng(-8.602709, 115.230241),
        type: "library",
        title: "ini perpus",
        category: 3
      },
      {
        position: new google.maps.LatLng(-8.402709, 115.230211),
        type: "info",
        title: "ini info",
        category: 1
      },
      {
        position: new google.maps.LatLng(-8.402704, 115.230114),
        type: "parking",
        title: "ini parkir",
        category: 2
      },
      {
        position: new google.maps.LatLng(-8.401704, 115.130114),
        type: "library",
        title: "ini library",
        category: 3
      },
      {
        position: new google.maps.LatLng(-8.401708, 115.130117),
        type: "info",
        title: "ini info",
        category: 1
      },
      {
        position: new google.maps.LatLng(-8.401608, 115.130107),
        type: "library",
        title: "ini library 1",
        category: 3
      }
    ];

    //Adding marker into map
    for (var i = 0, feature; (feature = features[i]); i++) {
      this.marker = new google.maps.Marker({
        position: feature.position,
        animation: google.maps.Animation.DROP,
        icon: icons[feature.type].icon,
        map: this.map
      });
      this.marker.category = features[i]["category"];
      this.marker.setVisible(false);
      this.markers.push(this.marker);
      google.maps.event.addListener(
        this.marker,
        "click",
        (function(marker, feature) {
          return function() {
            this.infowindow.setContent(
              this.content + " " + feature["title"] + "</div><br></body</html>"
            );
            this.infowindow.setOptions({
              maxWidth: 200
            });
            this.infowindow.open(this.map, marker);
          };
        })(this.marker, feature)
      );
    }
    /*
//define and show floating information on right map
var legend = document.getElementById('legend');
for (var key in icons) {
    var type = icons[key];
    var name = type.name;
    var icon = type.icon;
    var div = document.createElement('div');
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
}
this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
*/
    /*
//function for hide and show POI info
window.showPOI1 = function(t) {
    if (t.is(':checked')) {
        //alert('checked');
        for (i = 0; i < this.markers.length; i++) {
            if (this.markers[i].category === 1) {
                this.markers[i].setVisible(true);
                this.markers[i].setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    } else {
        this.infowindow.close();
        for (i = 0; i < this.markers.length; i++) {
            if (this.markers[i].category === 1) {
                this.markers[i].setVisible(false);
            }
        }
    }
}
*/
    // onChangeHandler();
  }

  calculateAndDisplayRoute(
    directionsDisplay,
    directionsService,
    markerArray,
    stepDisplay,
    map
  ) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }
    // Retrieve the start and end locations and create a DirectionsRequest using WALKING directions.
    console.log(this.startValue);
    console.log(this.endValue);

    directionsService.route(
      {
        origin: this.startValue,
        destination: this.endValue,
        travelMode: google.maps.TravelMode.WALKING
      },
      function(response, status) {
        // Route the directions and pass the response to a function to create markers for each step.
        if (status === google.maps.DirectionsStatus.OK) {
          document.getElementById("warnings-panel").innerHTML =
            "<b>" + response.routes[0].warnings + "</b>";
          directionsDisplay.setDirections(response);
          showSteps(response, markerArray, stepDisplay, map);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );

    function showSteps(directionResult, markerArray, stepDisplay, map) {
      // For each step, place a marker, and add the text to the marker's infowindow.
      // Also attach the marker to an array so we can keep track of it and remove it
      // when calculating new routes.
      var myRoute = directionResult.routes[0].legs[0];
      for (var i = 0; i < myRoute.steps.length; i++) {
        var markerss = (markerArray[i] =
          markerArray[i] || new google.maps.Marker());
        markerss.setMap(map);
        markerss.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(
          stepDisplay,
          markerss,
          myRoute.steps[i].instructions,
          map
        );
      }
    }

    function attachInstructionText(stepDisplay, markerss, text, map) {
      google.maps.event.addListener(markerss, "click", function() {
        // Open an info window when the marker is clicked on, containing the text of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, markerss);
      });
    }
  } //ends of directions calculateAndDisplayRoute func
}
