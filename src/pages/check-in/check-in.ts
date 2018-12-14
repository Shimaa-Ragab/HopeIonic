import {
  Component,
  NgZone,
  OnInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import * as $ from "jquery";
import { RequestServiceProvider } from "../../providers/request-service";
import { IBloodBankModel } from "../../models/bloodbank.model";

declare var google: any;
@IonicPage()
@Component({
  selector: "page-check-in",
  templateUrl: "check-in.html",
  providers: [Geolocation, RequestServiceProvider]
})
export class CheckInPage implements OnInit {
  @ViewChild("map")
  mapElement: ElementRef;
  BarcodeScannerData: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  geocoder: any;
  autocompleteItems: any;
  position: any;
  markers: any;
  nearbyItems: any;
  map: any;
  infowindow: any;
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  num_points: number;
  bloodbank_list: IBloodBankModel[];
  BloodList: number[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    public RequestServiceProvider: RequestServiceProvider
  ) {
    this.presentToast("scroll map to see all blood banks");
  }

  ngOnInit() {
    this.num_points = 100;
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: "" };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
    // this.initMap();
    // this.tryGeolocation();
    this.RequestServiceProvider.getAllBloodBanks().subscribe(
      data => {
        console.log(data);
        this.bloodbank_list = data;
        this.geocodeListLatLng(this.bloodbank_list);
      },
      error => {}
    );
    let body = {
      bloodbankId: "5be1a289e1351267e53f921a"
    };
    this.RequestServiceProvider.getBloodBalance(body).subscribe(
      data => {
        console.log(data);
        this.BloodList = [20, 30, 50, 60, 20, 30, 40, 50];
        console.log(this.BloodList);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  ionViewWillLoad() {}

  ionViewDidLoad() {}

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
      cssClass: "custom_toast"
    });
    toast.present();
  }

  addMarker(location, image, txtLoc) {
    var infowindow = new google.maps.InfoWindow();
    var img = {
      url: image,
      scaledSize: new google.maps.Size(30, 30)
    };
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: img
    });
    this.markers.push(marker);
    infowindow.setContent(txtLoc);
    infowindow.open(this.map, marker);
  }

  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === "OK" && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }

  selectSearchResult2(item) {
    this.autocompleteItems = [];
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === "OK" && results[0]) {
        this.geocoder.nearbySearch(
          {
            location: results[0].geometry.location,
            radius: "500",
            types: ["restaurant"]
          },
          near_places => {
            this.zone.run(() => {
              this.nearbyItems = [];
              for (var i = 0; i < near_places.length; i++) {
                this.nearbyItems.push(near_places[i]);
              }
            });
          }
        );
      }
    });
  }

  createMarker(results: any) {
    let marker = new google.maps.Marker({
      position: results.geometry.location,
      map: this.map
    });
    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers = [];
  }

  initMap() {
    navigator.geolocation.getCurrentPosition(
      location => {
        console.log(location);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: {
            lat: location.coords.latitude,
            lng: location.coords.longitude
          },
          zoom: 15
        });

        this.infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(
          {
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            },
            radius: 1000,
            type: ["store"]
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
              }
            }
          }
        );
      },
      error => {
        console.log(error);
      },
      this.options
    );
  }

  tryGeolocation() {
    this.clearMarkers();
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: pos,
          zoom: 15
        });
        let marker = new google.maps.Marker({
          position: pos,
          setMap: this.map,
          title: "I am here!"
        });
        this.markers.push(marker);

        this.infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(this.map);
        service.nearbySearch(
          {
            location: pos,
            radius: "1000",
            types: ["restaurant"]
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
              }
            }
          }
        );
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  getBarcodeData($event) {
    console.log($event);
    this.BarcodeScannerData = $event;
    let objId = this.BarcodeScannerData.text;
    console.log(objId);
    this.geocodeLatLng(objId);
  }

  geocodeLatLng(obj: string) {
    this.clearMarkers();
    var that = this;

    let objId = obj;
    var latlngStr = objId.split(",", 2);
    var latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1])
    };
    var latlngmap = new google.maps.LatLng(latlng.lat, latlng.lng);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ latLng: latlngmap }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log(results[0]);
          that.map = new google.maps.Map(that.mapElement.nativeElement, {
            center: results[0].geometry.location,
            zoom: 15
          });
          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: that.map
          });
          var infowindow = new google.maps.InfoWindow();
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(that.map, marker);
          that.num_points = that.num_points + 100;
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  geocodeListLatLng(list: IBloodBankModel[]) {
    this.geolocation.getCurrentPosition().then(resp => {
      // let pos = {
      //   lat: resp.coords.latitude,
      //   lng: resp.coords.longitude
      // };
      let objId = this.bloodbank_list[0].Location.value;
      let latlng = objId.split(",", 2);
      let pos = {
        lat: parseFloat(latlng[0]),
        lng: parseFloat(latlng[1])
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: pos,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      // let marker = new google.maps.Marker({
      //   position: pos,
      //   map: this.map,
      //   title: "I am here!"
      // });
      // this.markers.push(marker);

      for (var i = 0; i < this.bloodbank_list.length; i++) {
        // var infowindow = new google.maps.InfoWindow();
        let objId = this.bloodbank_list[i].Location.value;
        var latlngStr = objId.split(",", 2);
        let pos = {
          lat: parseFloat(latlngStr[0]),
          lng: parseFloat(latlngStr[1])
        };
        // let marker = new google.maps.Marker({
        //   position: pos,
        //   map: this.map
        // });
        // this.markers.push(marker);
        let image = "assets/imgs/BloodPinBank.png";
        this.addMarker(pos, image, this.bloodbank_list[i].Location.text);
        // infowindow.setContent(this.bloodbank_list[i].Location.text);
        // infowindow.open(this.map, marker);
      }
    });
  }
}
