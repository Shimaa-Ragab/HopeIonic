import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsTwitterPage } from './details-twitter';

@NgModule({
  declarations: [
    DetailsTwitterPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsTwitterPage),
  ],
})
export class DetailsTwitterPageModule {}
