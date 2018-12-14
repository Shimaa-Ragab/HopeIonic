import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public menu: MenuController, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
  }

}
