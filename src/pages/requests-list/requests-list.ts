import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { IRequestModel } from "../../models/request.model";
import { RequestServiceProvider } from "../../providers/request-service";
import { SocialSharing } from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: "page-requests-list",
  templateUrl: "requests-list.html",
  providers: [RequestServiceProvider, SocialSharing]
})
export class RequestsListPage implements OnInit {
  request_list: IRequestModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public RequestServiceProvider: RequestServiceProvider
  ) {}

  ionViewDidLoad() {}

  ngOnInit() {
    this.RequestServiceProvider.getAllRequests().subscribe(
      data => {
        console.log(data);
        this.request_list = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
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
