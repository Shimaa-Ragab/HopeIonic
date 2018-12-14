import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Camera } from "@ionic-native/camera";
import { Platform } from "ionic-angular";
import { File, Entry, FileEntry, FileSystem } from "@ionic-native/file";
import { normalizeURL } from "ionic-angular";

declare var cordova: any;
@Component({
  selector: "upload-avatar",
  templateUrl: "upload-avatar.html",
  providers: [File, Camera]
})
export class UploadAvatarComponent {
  @Input()
  inputAvatar: {
    changeAvatar: string;
    txtAvatar: string;
  };
  @Output()
  uploadAvatarEvent = new EventEmitter<string>();

  constructor(
    public camera: Camera,
    public platform: Platform,
    public file: File
  ) {}

  public takePicture() {
    var options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imagePath => {
        // imagePath = normalizeURL(imagePath);
        // this.inputAvatar.changeAvatar = imagePath;
        console.log(imagePath);
        console.log(imagePath.lastIndexOf("/") + 1);
        var currentN = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        var correctP = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        console.log(currentN);
        console.log(correctP);
        currentN = currentN.split("?");
        this.copyFileToLocalDir(correctP, currentN[0]);
      },
      err => {
        console.log("Error while selecting image.", err);
      }
    );
  }

  public copyFileToLocalDir(namePath, currentName) {
    console.log(namePath);
    console.log(currentName);
    let externalStoragePath: string = cordova.file.dataDirectory;
    this.file
      .resolveLocalFilesystemUrl(namePath + currentName)
      .then((entry: any) => {
        console.log("entry", entry);
        this.file
          .resolveLocalFilesystemUrl(externalStoragePath)
          .then((dirEntry: any) => {
            entry.copyTo(
              dirEntry,
              "",
              res => {
                console.log(res);
                this.resize(res);
              },
              err => console.log(err)
            );
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  private resize(original: Entry) {
    console.log(original);
    this.inputAvatar.changeAvatar = normalizeURL(original.nativeURL);
    console.log(original.nativeURL);
    this.uploadAvatarEvent.emit(this.inputAvatar.changeAvatar);
    /*
    let options: ImageResizerOptions = {
        uri: original.nativeURL,
        quality: 90,
        width: 1280,
        height: 1280
    }
    this.image_resizer.resize(options).then(photoSize =>{
      console.log(photoSize);
      this.inputAvatar.changeAvatar = photoSize;
      this.uploadAvatarEvent.emit(this.inputAvatar.changeAvatar);
    }, (err)=> {
      console.log(err);
    });
    */
  }
}
