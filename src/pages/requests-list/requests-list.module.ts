import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestsListPage } from './requests-list';

@NgModule({
  declarations: [
    RequestsListPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestsListPage),
  ],
})
export class RequestsListPageModule {}
