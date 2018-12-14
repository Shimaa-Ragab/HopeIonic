import { Component, EventEmitter, Output } from "@angular/core";
import {
  BarcodeScanner,
  BarcodeScannerOptions
} from "@ionic-native/barcode-scanner";

@Component({
  selector: "barcode-scanner",
  templateUrl: "barcode-scanner.html",
  providers: [BarcodeScanner]
})
export class BarcodeScannerComponent {
  @Output()
  BarcodeScannerEvent = new EventEmitter<any>();

  constructor(private barcodeScanner: BarcodeScanner) {}

  prepareBarcodeScanner() {
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      prompt: "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: true // iOS and Android
    };

    this.barcodeScanner
      .scan(options)
      .then(barcodeData => {
        // console.log('Barcode data', barcodeData);
        // alert(
        //   "Result: " +
        //     barcodeData.text +
        //     "\n" +
        //     "Format: " +
        //     barcodeData.format +
        //     "\n"
        // );
        this.BarcodeScannerEvent.emit(barcodeData);
      })
      .catch(err => {
        console.log("Error", err);
        alert("Scanning failed: " + err);
      });
  }
}
