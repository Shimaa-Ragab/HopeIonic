import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { AnimationBuilder, AnimationService } from 'css-animator';
import { Device } from '@ionic-native/device';
// import * as firebase from 'firebase';

declare var google: any;
const ROUTES_KEY = 'routes';

@IonicPage()
@Component({
  selector: 'page-live-track-direction',
  templateUrl: 'live-track-direction.html',
  providers: [Geolocation]
})
export class LiveTrackDirectionPage implements OnInit{

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('myElement') myElem;
  private animator: AnimationBuilder;
  // ref = firebase.database().ref('geolocations/');
  map: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  geocoder: any;
  positionSubscription: Subscription;
  markerArray = [];
  markers = [];
  feature = [];
  marker;
  markerss;
  public startValue : string;
  endValue : string;
  add_txt : string;
  directionsService : any;
  directionsDisplay : any;
  stepDisplay : any;
  infowindow : any;
  content = '<html> <style type="text/css">.enjoy-css {-webkit-box-sizing: content-box-moz-box-sizing: content-box;box-sizing: content-box; padding: 19px; border: none; -webkit-border-radius: 3px; border-radius: 3px;font: normal 16px/1 "Comic Sans MS", cursive, sans-serif;color: black;-o-text-overflow: ellipsis;text-overflow: ellipsis;background: -webkit-linear-gradient(0deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background: -moz-linear-gradient(90deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background: linear-gradient(90deg, rgba(252,234,187,1) 0, rgba(252,205,77,1) 18%, rgba(248,181,0,1) 82%, rgba(251,223,147,1) 100%);background-position: 50% 50%;-webkit-background-origin: padding-box;background-origin: padding-box;-webkit-background-clip: border-box;background-clip: border-box;-webkit-background-size: auto auto;background-size: auto auto;-webkit-box-shadow: 0 0 0 3px rgba(100,103,119,1) inset; box-shadow: 0 0 0 3px rgba(100,103,119,1) inset; -webkit-transform: rotateY(-20.626480624709636deg)   ; transform: rotateY(-20.626480624709636deg)  ;}</style> <body><br><div class="enjoy-css">';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private platform: Platform,
              private device: Device,
              public animationService: AnimationService,
              private geolocation: Geolocation) {
                this.animator = animationService.builder();
                platform.ready().then(() => {
                  this.initMap();
                
                // this.ref.on('value', resp => {
                //   this.deleteMarkers();
                //   snapshotToArray(resp).forEach(data => {
                //     if(data.uuid !== this.device.uuid) {
                //       let image = 'assets/imgs/download.gif';
                //       let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
                //       this.addMarker(updatelocation,image);
                //       this.setMapOnAll(this.map);
                //     } else {
                //       let image = 'assets/imgs/star.gif';
                //       let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
                //       this.addMarker(updatelocation,image);
                //       this.setMapOnAll(this.map);
                //     }
                //   });
                // });     
              });      
  }

  ngOnInit() { }

  initMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      console.log(mylocation);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 15,
        center: mylocation
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      // this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/star.gif';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }
  
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }
  
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  // updateGeolocation(uuid, lat, lng) {
  //   if(localStorage.getItem('mykey')) {
  //     firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
  //       uuid: uuid,
  //       latitude: lat,
  //       longitude : lng
  //     });
  //   } else {
  //     let newData = this.ref.push();
  //     newData.set({
  //       uuid: uuid,
  //       latitude: lat,
  //       longitude: lng
  //     });
  //     localStorage.setItem('mykey', newData.key);
  //   }
  // }

  /*
  ionViewDidLoad() {
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow();
    // this.startValue = "27 Monshaet Al Katba, Bab Al Louq, Abdeen, Cairo Governorate";
    this.endValue = "15 Meret Basha, Ismailia, Qasr an Nile, Cairo Governorate";
      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
     this.geolocation.getCurrentPosition().then(resp => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
        let $that = this;
        this.geocoder.geocode({'location': latLng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              this.add_txt = results[0].formatted_address;
              // this.startValue = this.add_txt;
              
              $that.startChanged(this.add_txt);
              var info = new google.maps.InfoWindow({content: this.add_txt});
              setTimeout(function() {
                info.open(this.map, this.marker);
                this.marker = new google.maps.Marker({
                  position: pos,
                  map: this.map,
                  title: 'I am here!',
                  animation: google.maps.Animation.DROP
                });
                $that.markers.push(this.marker);
                }, 200);
            } else {
              alert('No results found');
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
        // setTimeout(function() {
        // let marker = new google.maps.Marker({
        //   position: pos,
        //   map: this.map,
        //   title: 'I am here!',
        //   animation: google.maps.Animation.DROP
        // });
        // $that.markers.push(marker);
        // }, 200);
        this.createMarker(pos);
      }).catch((error) => {
        console.log('Error getting location', error);
      });

this.directionsService = new google.maps.DirectionsService;
this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
this.stepDisplay = new google.maps.InfoWindow;
this.initialize();
}

startChanged(text_addresss: string) {
  this.startValue = text_addresss;
  this.calculateAndDisplayRoute(this.directionsDisplay, this.directionsService, 
                                this.markerArray, this.stepDisplay , this.map);
}

createMarker(results: any) {
  // setTimeout(function() {
  //   let markers = new google.maps.Marker({
  //     position: results.geometry.location,
  //     map: this.map,
  //     animation: google.maps.Animation.DROP
  //   });
  //   this.markers.push(markers);
  // }, 200);
}

clearMarkers() {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);
  }
  this.markers = [];
}

initialize() {
    this.calculateAndDisplayRoute(this.directionsDisplay, this.directionsService, 
                                  this.markerArray, this.stepDisplay , this.map);
}

    calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
      // First, remove any existing markers from the map.
      for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
      }
      // Retrieve the start and end locations and create a DirectionsRequest using WALKING directions.
      console.log(this.startValue);
      console.log(this.endValue);
      
      directionsService.route({
        origin: this.startValue,
        destination: this.endValue,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
          // Route the directions and pass the response to a function to create markers for each step.
          if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              showSteps(response, markerArray, stepDisplay, map);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      });
      
      function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var markerss = markerArray[i] = markerArray[i] || new google.maps.Marker;
          markerss.setMap(map);
          markerss.setPosition(myRoute.steps[i].start_location);
          attachInstructionText(stepDisplay, markerss, myRoute.steps[i].instructions, map);
        }
      }
      
      function attachInstructionText(stepDisplay, markerss, text, map) {
          google.maps.event.addListener(markerss, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, markerss);
      });
      
      }
      }



startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];
 
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        // filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
          this.initialize();
        }, 0);
      });
}
 
redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ea4535',
        strokeOpacity: 3.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
}

stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set(ROUTES_KEY , JSON.stringify(this.previousTracks));
   
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
}
*/
 
  animateElem() {
    this.animator.setType('flipInX').show(this.myElem.nativeElement);
  }
  animateBtn() {
    this.animator.setType('rubberBand').applyDuration(document.getElementById('test') ,1000);
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
