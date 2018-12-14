import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";
import { IRequestModel } from "../../models/request.model";
import { RequestServiceProvider } from "../../providers/request-service";
import { SocialSharing } from "@ionic-native/social-sharing";
@IonicPage()
@Component({
  selector: "page-my-requests",
  templateUrl: "my-requests.html",
  providers: [RequestServiceProvider, SocialSharing]
})
export class MyRequestsPage {
  my_request_list: IRequestModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public RequestServiceProvider: RequestServiceProvider
  ) {}

  ionViewDidLoad() {}

  ngOnInit() {
    if (localStorage.getItem("login") === "1") {
      this.RequestServiceProvider.getAllMyRequests().subscribe(
        data => {
          console.log(data);
          this.my_request_list = data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.presentToast("Log in first, Please!");
      let prompt = this.alertCtrl.create({
        title: "Log in first, Please!",
        subTitle: "click Ok, if want to go to Login Page",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "cancel",
            handler: data => {
              console.log(data);
              this.navCtrl.setRoot("TabsPage");
            }
          },
          {
            text: "ok",
            handler: data => {
              this.navCtrl.push("LoginPage");
            }
          }
        ]
      });
      prompt.present();
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      cssClass: "custom_bottom_toast"
    });
    toast.present();
  }

  openDetails(request: IRequestModel) {
    console.log(request);
  }

  reminder(request: IRequestModel) {
    console.log(request);
    this.navCtrl.push("ReminderEventPage", {
      title: request.IdDonnationName,
      notes: request.Cause
    });
  }

  join(request: IRequestModel) {
    console.log(request);
    this.presentToast("You Just Join " + request.IdDonnationName);
  }

  share(request: IRequestModel) {
    console.log(request);
    this.socialSharing.share(request.Cause, null).then(res => {
      console.log(res);
    });
  }
}
