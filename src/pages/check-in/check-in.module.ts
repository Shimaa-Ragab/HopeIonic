import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CheckInPage } from "./check-in";
import { BarcodeScannerComponentModule } from "../../components/barcode-scanner/barcode-scanner.module";
import { ChartsComponentModule } from "../../components/charts/charts.module";

@NgModule({
  declarations: [CheckInPage],
  imports: [
    IonicPageModule.forChild(CheckInPage),
    BarcodeScannerComponentModule,
    ChartsComponentModule
  ]
})
export class CheckInPageModule {}
