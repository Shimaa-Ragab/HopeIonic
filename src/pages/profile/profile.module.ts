import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProfilePage } from "./profile";
import { FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { UploadAvatarComponentModule } from "../../components/upload-avatar/upload-avatar.module";

@NgModule({
  declarations: [ProfilePage],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TextMaskModule,
    FormsModule,
    UploadAvatarComponentModule
  ]
})
export class ProfilePageModule {}
