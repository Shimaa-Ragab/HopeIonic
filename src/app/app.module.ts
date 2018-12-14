import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule,
  Config
} from "ionic-angular";
import { MyApp } from "./app.component";
import { Device } from "@ionic-native/device";
// import { Firebase } from "@ionic-native/firebase";
import { IonicStorageModule } from "../../node_modules/@ionic/storage";
import { SQLite } from "@ionic-native/sqlite";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AnimationService, AnimatesDirective } from "css-animator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Calendar } from "@ionic-native/calendar";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { ApiServiceProvider } from "../providers/api-service";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { Network } from "@ionic-native/network";
// import { AngularFireModule } from "angularfire2";
// import { AngularFirestoreModule } from "angularfire2/firestore";
import { Diagnostic } from "@ionic-native/diagnostic";
import { ChartsModule } from "ng2-charts";

// const firebase = {
//   apiKey: "AIzaSyA97gA5MEDyb9Rq43ijiMNP78G2Z0RZOJg",
//   authDomain: "fast-envoy-828.firebaseapp.com",
//   databaseURL: "https://fast-envoy-828.firebaseio.com",
//   projectId: "fast-envoy-828",
//   storageBucket: "fast-envoy-828.appspot.com",
//   messagingSenderId: "456279065470"
// };

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    // AngularFireModule.initializeApp(firebase),
    // AngularFirestoreModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    AnimationService,
    // Firebase,
    Device,
    Calendar,
    Network,
    Diagnostic,
    LocalNotifications,
    ApiServiceProvider
  ]
})
export class AppModule {
  constructor(config: Config) {}
}
