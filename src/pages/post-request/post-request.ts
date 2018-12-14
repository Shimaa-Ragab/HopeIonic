import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { RequestServiceProvider } from "../../providers/request-service";
import { IBloodBankModel } from "../../models/bloodbank.model";
import { NumberValidator } from "../../validators/number.validator";
import { Geolocation } from "@ionic-native/geolocation";

declare var google: any;

@IonicPage()
@Component({
  selector: "page-post-request",
  templateUrl: "post-request.html",
  providers: [RequestServiceProvider, Geolocation]
})
export class PostRequestPage implements OnInit {
  @ViewChild("map") mapElement: ElementRef;
  validations_form: FormGroup;
  numDonners: number;
  bloodbank_list: IBloodBankModel[];
  bloodgroup: string;
  bloodbank: string;
  addressTxt: string;
  directionsService: any;
  directionsDisplay: any;
  stepDisplay: any;
  address: any;
  map: any;
  markers = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    public RequestServiceProvider: RequestServiceProvider
  ) {
    this.numDonners = 1;
    this.addressTxt = "";
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      map: this.map
    });
    this.stepDisplay = new google.maps.InfoWindow();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  ionViewWillLoad() {
    this.RequestServiceProvider.getAllBloodBanks().subscribe(
      data => {
        console.log(data);
        this.bloodbank_list = data;
      },
      error => {}
    );
  }

  initMap() {
    this.geolocation
      .getCurrentPosition({
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
      })
      .then(resp => {
        let mylocation = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        console.log(mylocation);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 15,
          center: mylocation
        });
        let image = "assets/imgs/download.gif";
        this.addMarker(mylocation, image, "You are here!");
      });
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

  ngOnInit() {
    this.initMap();
    this.validations_form = this.formBuilder.group({
      cause: new FormControl("", Validators.compose([Validators.required])),
      date: new FormControl("", Validators.compose([Validators.required])),
      num_donners: new FormControl(
        this.numDonners,
        Validators.compose([Validators.required, NumberValidator.validNumber])
      ),
      bloodgroup: new FormControl(
        this.bloodgroup,
        Validators.compose([Validators.required])
      ),
      bloodbank: new FormControl(
        this.bloodbank,
        Validators.compose([Validators.required])
      )
    });
    console.log(!this.validations_form.valid);
  }

  validation_messages = {
    cause: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      }
    ],
    date: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      }
    ],
    num_donners: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      },
      {
        type: "validNumber",
        message: "Number of Donners should be in range 1-10"
      }
    ],
    bloodgroup: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      }
    ],
    bloodbank: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      }
    ]
  };

  addDonner() {
    if (this.numDonners < 10) {
      this.numDonners = this.numDonners + 1;
    }
  }

  removeDonner() {
    if (this.numDonners > 1) {
      this.numDonners = this.numDonners - 1;
    }
  }

  onchangeBloodGroup($event) {
    console.log($event);
    this.bloodgroup = $event;
    console.log(!this.validations_form.valid);
  }

  onChangeBloodBank($event) {
    console.log($event);
    this.bloodbank = $event;
    console.log(this.bloodbank);
    console.log(!this.validations_form.valid);
  }

  receiveAddress($event) {
    console.log($event);
    this.address = $event;
    console.log(this.address);
    console.log(
      this.address.directions.lat(s => {
        return s;
      })
    );
    console.log(
      this.address.directions.lng(s => {
        return s;
      })
    );
    this.geocodeLatLng(this.address);
  }

  geocodeLatLng(address: any) {
    var that = this;
    var latlng = {
      lat: parseFloat(
        address.directions.lat(s => {
          return s;
        })
      ),
      lng: parseFloat(
        address.directions.lng(s => {
          return s;
        })
      )
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
          let image = "assets/imgs/location-icon.gif";
          that.addMarker(
            results[0].geometry.location,
            image,
            results[0].formatted_address
          );
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  createRequest(values) {
    console.log(values);
    let body = {
      cause: values.cause,
      date: values.date,
      donners_num: values.num_donners,
      bloodtype: values.bloodgroup,
      BbId: values.bloodbank
    };
    console.log(body);
    if (localStorage.getItem("login") === "1") {
      this.RequestServiceProvider.createRequest(body).subscribe(
        data => {
          console.log(data);
          this.navCtrl.push("MyRequestsPage");
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    } else {
      this.presentToast("Log in first, Please!");
    }
  }
}
