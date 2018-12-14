import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PostRequestPage } from "./post-request";
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { LocationComponentModule } from "../../components/location/location.module";

@NgModule({
  declarations: [PostRequestPage],
  imports: [
    IonicPageModule.forChild(PostRequestPage),
    TextMaskModule,
    FormsModule,
    LocationComponentModule
  ]
})
export class PostRequestPageModule {}
