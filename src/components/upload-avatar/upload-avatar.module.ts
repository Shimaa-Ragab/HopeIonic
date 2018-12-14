import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { IonicImageViewerModule } from "ionic-img-viewer";
import { UploadAvatarComponent } from "./upload-avatar";

@NgModule({
  declarations: [UploadAvatarComponent],
  imports: [IonicModule, IonicImageViewerModule],
  exports: [UploadAvatarComponent],
  entryComponents: [UploadAvatarComponent]
})
export class UploadAvatarComponentModule {}
