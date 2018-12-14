import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { LocationComponent } from "./location";

@NgModule({
  declarations: [LocationComponent],
  imports: [IonicModule],
  exports: [LocationComponent],
  entryComponents: [LocationComponent]
})
export class LocationComponentModule {}
