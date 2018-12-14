import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ToastController
} from "ionic-angular";
import { SMS } from "@ionic-native/sms";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Subscription } from "rxjs/Subscription";
import * as $ from "jquery";
import { TwitterServiceProvider } from "../../providers/twitter-service";
import { ITweetModel } from "../../models/tweet.model";

declare var google: any;
const ROUTES_KEY = "routes";
@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [SMS, Geolocation, SocialSharing, TwitterServiceProvider]
})
export class HomePage implements OnInit {
  @ViewChild("map")
  mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription: Subscription;
  twitters_list: ITweetModel[];
  custom_class: string;
  div_class: string;
  twitID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sms: SMS,
    private plt: Platform,
    private storage: Storage,
    private geolocation: Geolocation,
    public toastCtrl: ToastController,
    public socialSharing: SocialSharing,
    public TwitterProvider: TwitterServiceProvider
  ) {
    this.twitters_list = [];
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.twitID = "0";
    await this.TwitterProvider.getUserTweets().subscribe(
      data => {
        console.log(data);
        this.twitters_list = data;
      },
      error => {}
    );

    this.plt.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        // mapTypeControlOptions: {
        //   mapTypeIds: ['roadmap', 'styled_map']
        // },
        fullscreenControl: false,
        mapTypeControl: false,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ],
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement);

      this.geolocation
        .getCurrentPosition()
        .then(pos => {
          let latLng = new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          this.map.setCenter(latLng);
          this.map.setZoom(16);
        })
        .catch(error => {
          console.log("Error getting location", error);
        });
    });
  }

  ionViewDidLoad() {}

  loadHistoricRoutes() {
    this.storage.get(ROUTES_KEY).then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.positionSubscription = this.geolocation
      .watchPosition()
      .pipe
      // filter((p) => p.coords !== undefined) //Filter Out Errors
      ()
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({
            lat: data.coords.latitude,
            lng: data.coords.longitude
          });
          this.redrawPath(this.trackedRoute);
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
        strokeColor: "#ff00ff",
        strokeOpacity: 3.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set(ROUTES_KEY, JSON.stringify(this.previousTracks));

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }

  // Send SMS
  sendwithoutoption() {
    this.sms.send("+2001013500414", "Hello world!");
  }

  sendwithoption() {
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: "INTENT" // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
      }
    };
    this.sms.send("01013500414", "Hello world!", options);
  }

  reminder(id: string) {
    let twit: any = this.twitters_list.find(t => id == t.TweetId);
    // console.log(twit);
    this.navCtrl.push("ReminderEventPage", {
      title: twit.UserName,
      notes: twit.firsTxt + " " + twit.secondTxt
    });
  }

  join(id: string) {
    if (localStorage.getItem("login") === "1") {
      let twit: any = this.twitters_list.find(t => id == t.TweetId);
      this.presentToast("You Just Join " + twit.UserName);
    } else {
      this.presentToast("Log in first, Please!");
    }
  }

  share(id: string) {
    let twit: any = this.twitters_list.find(t => id == t.TweetId);
    this.socialSharing.share(twit.UserName, null).then(res => {
      console.log(res);
    });
  }

  openDetails(twitId: string) {
    this.twitID = twitId;
    this.navCtrl.push("DetailsTwitterPage", {
      paramTwitID: this.twitID
    });
  }
}
