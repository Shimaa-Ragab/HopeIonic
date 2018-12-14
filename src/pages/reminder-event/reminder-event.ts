import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Calendar } from "@ionic-native/calendar";
import { Time } from "@angular/common";
import { LocalNotifications } from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: "page-reminder-event",
  templateUrl: "reminder-event.html"
})
export class ReminderEventPage implements OnInit {
  title: string;
  location: string;
  notes: string;
  startDate: Date;
  startTime: Time;
  endDate: Date;
  endTime: Time;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private localNotifications: LocalNotifications
  ) {}

  ngOnInit() {
    console.log(this.navParams.data);
    let twitData: any = this.navParams.data;
    this.title = twitData.title;
    this.notes = twitData.notes;
  }

  ionViewDidLoad() {}

  getCalender() {
    var startDateTimeISO = this.buildISODate(this.startDate, this.startTime);
    var enddateTimeISO = this.buildISODate(this.endDate, this.endTime);

    this.calendar.requestWritePermission();
    this.calendar
      .createEvent(
        this.title,
        this.location,
        this.notes,
        new Date(startDateTimeISO),
        new Date(enddateTimeISO)
      )
      .then(
        msg => {
          // alert("msg " + msg);
          this.localNotifications.schedule({
            title: this.title,
            text: this.notes,
            trigger: { at: new Date(startDateTimeISO) },
            led: "FF0000",
            sound: "file://sound.mp3"
          });
          this.navCtrl.setRoot("TabsPage");
        },
        err => {
          alert("err " + err);
        }
      );
  }

  buildISODate(date, time) {
    var dateArray = date && date.split("-");
    var timeArray = time && time.split(":");
    var normalDate = new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[2]),
      parseInt(timeArray[0]),
      parseInt(timeArray[1]),
      0,
      0
    );
    return normalDate.toISOString();
  }
}
