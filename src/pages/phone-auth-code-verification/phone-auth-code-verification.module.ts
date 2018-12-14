import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneAuthCodeVerificationPage } from './phone-auth-code-verification';

@NgModule({
  declarations: [
    PhoneAuthCodeVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneAuthCodeVerificationPage),
  ],
})
export class PhoneAuthCodeVerificationPageModule {}
