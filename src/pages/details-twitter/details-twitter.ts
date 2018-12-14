import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-details-twitter",
  templateUrl: "details-twitter.html"
})
export class DetailsTwitterPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("paramTwitID"));
  }

  ionViewDidLoad() {}
}
