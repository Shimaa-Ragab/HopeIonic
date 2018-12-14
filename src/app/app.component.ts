import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, ToastController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Network } from "@ionic-native/network";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav)
  nav: Nav;
  rootPage: any;
  icons: string[];
  pages: Array<{ title: string; component: any; icon: string }>;
  StatusConnection: string;
  sign_status: string;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public network: Network,
    public events: Events,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();
    this.rootPage =
      localStorage.getItem("SetUp") === "true"
        ? "PrivacyPage"
        : localStorage.getItem("login") === "1"
        ? "TabsPage"
        : "LoginPage";
    this.sign_status =
      localStorage.getItem("login") === "1" ? "Sign Out" : "Sign In";
    this.pages = [
      { title: "Home", component: "TabsPage", icon: "home" },
      { title: "Post Request", component: "PostRequestPage", icon: "water" },
      // { title: "Requests", component: "RequestsListPage", icon: "list-box" },
      { title: "My Requests", component: "MyRequestsPage", icon: "list-box" },
      // { title: "Settings", component: "SettingsPage", icon: "options" },
      { title: "About us", component: "PrivacyPage", icon: "help-circle" }
    ];
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  initializeApp() {
    this.events.subscribe("ApplyChange", data => {
      this.sign_status =
        localStorage.getItem("login") === "1" ? "Sign Out" : "Sign In";
    });
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ffffff");
      this.statusBar.show();
      this.splashScreen.hide();
      this.network.onConnect().subscribe(
        data => {
          console.log(data);
          this.StatusConnection = "Connection";
        },
        error => {
          console.error(error);
          this.presentToast("No Internet Access");
        }
      );
      this.network.onDisconnect().subscribe(
        data => {
          console.log(data);
          this.presentToast("No Internet Access");
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goToLog() {
    if (localStorage.getItem("login") === "1") {
      console.log("out");
    } else {
      this.nav.setRoot("TabsPage");
      this.nav.push("LoginPage");
    }
  }
}
