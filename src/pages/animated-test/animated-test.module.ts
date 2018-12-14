import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimatedTestPage } from './animated-test';

@NgModule({
  declarations: [
    AnimatedTestPage,
  ],
  imports: [
    IonicPageModule.forChild(AnimatedTestPage),
  ],
})
export class AnimatedTestPageModule {}
