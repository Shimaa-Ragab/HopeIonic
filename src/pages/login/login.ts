import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { IUserModel } from "../../models/user.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { UsernameValidator } from "../../validators/username.validator";
import { UserServiceProvider } from "../../providers/user-service";
// import { FcmProvider } from "../../providers/fcm";
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [UserServiceProvider]
})
export class LoginPage implements OnInit {
  user: IUserModel;
  validations_form: FormGroup;
  Password: string;
  UserName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public event: Events,
    // public fcm: FcmProvider,
    public UserServiceProvider: UserServiceProvider
  ) {
    this.Password = "";
    this.UserName = "";
    // this.fcm.getToken().then(token => {
    //   console.log(token);
    // });
  }

  ionViewDidLoad() {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          UsernameValidator.validUsername,
          Validators.pattern("^[^-s]{1,}[a-zA-Z0-9-_\\s]{1,}[^-_\\s]$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(6)
          // Validators.pattern(
          //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]+$"
          // )
        ])
      )
    });
  }

  validation_messages = {
    username: [
      {
        type: "required",
        message: "اسم المستخدم مطلوب"
      },
      {
        type: "validUsername",
        message: "اسم المستخدم الخاص بك قد تم أخذه بالفعل"
      },
      {
        type: "pattern",
        message: "ادخل اسم مستخدم مناسب"
      }
    ],
    password: [
      {
        type: "required",
        message: "كلمة السر مطلوبة"
      },
      {
        type: "minlength",
        message: "كلمة السر لابد ان تحتوي علي الأقل 3 أحرف"
      },
      {
        type: "pattern",
        message: "كلمة السر لابد أن تحتوي علي الاقل حرف كبير وحرف صغير و رقم"
      }
    ]
  };

  loginAction(values) {
    console.log(values);
    let body = {
      user_nm: values.username,
      pass: values.password
    };

    this.UserServiceProvider.login(body).subscribe(
      data => {
        console.log(data);
        localStorage.setItem("login", "1");
        localStorage.setItem("token", data.token);
        this.event.publish("ApplyChange", "login");
        // this.navCtrl.setRoot("TabsPage");
        // this.fcm.sendVerficationCode("+201013500414", 60, "");
        this.navCtrl.push("PhoneAuthCodeVerificationPage");
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  GoToProfilePage() {
    this.navCtrl.push("ProfilePage");
  }
}
