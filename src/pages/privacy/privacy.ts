import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { Diagnostic } from "@ionic-native/diagnostic";

@IonicPage()
@Component({
  selector: "page-privacy",
  templateUrl: "privacy.html"
})
export class PrivacyPage {
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public diagnostic: Diagnostic
  ) {
    localStorage.setItem("SetUp", "true");
  }

  ionViewDidLoad() {}

  location() {
    console.log("test");
    this.platform.ready().then(() => {
      this.diagnostic.requestCameraAuthorization();
      this.diagnostic.requestLocationAuthorization();
      this.diagnostic.isLocationAvailable().then(
        function(available) {
          console.log(
            "Location is " + (available ? "available" : "not available")
          );
        },
        function(error) {
          console.error("The following error occurred: " + error);
        }
      );
    });
  }

  notification() {
    // this.diagnostic.requestRemoteNotificationsAuthorization();
  }

  calendar() {
    this.diagnostic.requestCalendarAuthorization();
  }

  privacyPolicy() {
    if (
      this.diagnostic.permission.CAMERA ===
        this.diagnostic.permissionStatus.GRANTED &&
      this.diagnostic.permission.ACCESS_FINE_LOCATION ===
        this.diagnostic.permissionStatus.GRANTED &&
      this.diagnostic.permission.WRITE_CALENDAR ===
        this.diagnostic.permissionStatus.GRANTED
    ) {
      this.navCtrl.push("TabsPage");
    }
  }
}
