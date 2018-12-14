import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderEventPage } from './reminder-event';

@NgModule({
  declarations: [
    ReminderEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderEventPage),
  ],
})
export class ReminderEventPageModule {}
