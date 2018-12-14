import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BarcodeScannerComponent } from './barcode-scanner';


@NgModule({
  declarations: [
    BarcodeScannerComponent
   ],
  imports: [
    IonicModule,
  ],
  exports: [
    BarcodeScannerComponent
  ],
  entryComponents:[
    BarcodeScannerComponent
  ]
})
export class BarcodeScannerComponentModule {}

