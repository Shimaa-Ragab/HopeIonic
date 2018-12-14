import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
// import { FcmProvider } from "../../providers/fcm";

@IonicPage()
@Component({
  selector: "page-phone-auth-code-verification",
  templateUrl: "phone-auth-code-verification.html"
  // providers: [FcmProvider]
})
export class PhoneAuthCodeVerificationPage {
  code: [string];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) // public fcm: FcmProvider
  {
    this.code = [""];
  }

  ionViewDidLoad() {}

  next(el, $event) {
    // console.log($event.key);
    if (this.code.length <= 6) {
      this.code.push($event.key);
      console.log(this.code);
      if (this.code[6] !== undefined) {
        var codeTxt =
          this.code[1] +
          this.code[2] +
          this.code[3] +
          this.code[4] +
          this.code[5] +
          this.code[6];
        console.log(codeTxt);
        // this.fcm.sendVerficationCode("", 0, codeTxt);
      }
    }
    if (el !== "") {
      el.setFocus();
    }
  }
}
