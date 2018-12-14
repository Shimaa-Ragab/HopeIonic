import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ChartsComponent } from "./charts";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [ChartsComponent],
  imports: [IonicModule, ChartsModule],
  exports: [ChartsComponent],
  entryComponents: [ChartsComponent]
})
export class ChartsComponentModule {}
