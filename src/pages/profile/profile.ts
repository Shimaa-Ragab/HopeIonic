import { Component, OnInit, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from "ionic-angular";
import { IUserModel } from "../../models/user.model";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions
} from "@ionic-native/file-transfer";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
// import emailMask from 'text-mask-addons/dist/emailMask';
import emailMask from "angular2-text-mask";
import { UsernameValidator } from "../../validators/username.validator";
import { UserServiceProvider } from "../../providers/user-service";
import { ApiServiceProvider } from "../../providers/api-service";
import { CountryServiceProvider } from "../../providers/country-service";
import { ICountryModel } from "../../models/country.model";
// import { FcmProvider } from "../../providers/fcm";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
  providers: [
    UserServiceProvider,
    FileTransfer,
    ApiServiceProvider,
    CountryServiceProvider
    // FcmProvider
  ]
})
export class ProfilePage implements OnInit {
  @ViewChild(Content)
  content: Content;
  user: IUserModel;
  validations_form: FormGroup;
  emailMask = emailMask;
  IsDonner: string;
  BloodGroup: string;
  Gender: string;
  Age: number;
  State: string;
  City: string;
  Country: string;
  Mobile: string;
  Password: string;
  Email: string;
  UserName: string;
  LastName: string;
  FirstName: string;
  editAvatar: {
    changeAvatar: string;
    txtAvatar: string;
  };
  fileImg: any;
  countries: ICountryModel;
  states: ICountryModel;
  cities: ICountryModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private transfer: FileTransfer,
    // public fcm: FcmProvider,
    public ApiService: ApiServiceProvider,
    public UserServiceProvider: UserServiceProvider,
    public CountryServiceProvider: CountryServiceProvider
  ) {
    this.UserName = "";
    this.Age = 0;
    this.Mobile = "";
    this.Password = "";
    this.Email = "";
    this.LastName = "";
    this.FirstName = "";
    this.editAvatar = {
      changeAvatar: "",
      txtAvatar: "add avatar"
    };
  }

  ionViewWillLoad() {
    if (localStorage.getItem("login") === "1") {
      this.UserServiceProvider.getUserData().subscribe(
        data => {
          console.log(data);
          this.UserName = data.Username;
          this.Age = data.Age;
          this.Mobile = data.MobileNum;
          this.Password = "";
          this.Email = data.Email;
          this.LastName = data.LastName;
          this.FirstName = data.FirstName;
          this.editAvatar = {
            changeAvatar: "",
            txtAvatar: "edit avatar"
          };
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {
    this.CountryServiceProvider.getCountries().subscribe(
      data => {
        this.countries = data;
        // console.log(this.countries.Countries);
      },
      err => {
        console.log(err);
      }
    );

    this.validations_form = this.formBuilder.group({
      username: new FormControl(
        this.UserName,
        Validators.compose([
          Validators.required,
          UsernameValidator.validUsername,
          Validators.pattern("^[^-s]{1,}[a-zA-Z0-9-_\\s]{1,}[^-_\\s]$")
        ])
      ),
      firstname: new FormControl(this.FirstName, Validators.required),
      lastname: new FormControl(this.LastName, Validators.required),
      email: new FormControl(
        this.Email,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      mobile: new FormControl(
        this.Mobile,
        Validators.compose([
          Validators.maxLength(11),
          Validators.pattern("^([0-9]{1,5})?([1-9][0-9]{9})")
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
      ),
      country: new FormControl(this.Country, Validators.required),
      city: new FormControl(this.City, Validators.required),
      state: new FormControl(this.State, Validators.required),
      age: new FormControl(
        this.Age,
        Validators.compose([
          Validators.required,
          Validators.pattern("(?:\b|-)([1-9]{1,2}[0]?|100)\b")
        ])
      ),
      gender: new FormControl(this.Gender, Validators.required),
      bloodgroup: new FormControl(this.BloodGroup, Validators.required),
      isdonner: new FormControl(this.IsDonner, Validators.required)
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
    firstname: [
      {
        type: "required",
        message: "الاسم الاول مطلوب"
      }
    ],
    lastname: [
      {
        type: "required",
        message: "الاسم الاخير مطلوب"
      }
    ],
    email: [
      {
        type: "required",
        message: "البريد الالكتروني مطلوب"
      },
      {
        type: "pattern",
        message: "ادخل بريد الكتروني صحيح"
      }
    ],
    mobile: [
      {
        type: "pattern",
        message: "رقم الهاتف لابد أن يتكون من 11 حرف ويبدأ ب 01"
      },
      {
        type: "maxlength",
        message: "رقم الهاتف لا يجب أن يحتوي ألا علي 11 حرف"
      }
    ],
    password: [
      {
        type: "required",
        message: "كلمة السر مطلوبة"
      },
      {
        type: "minlength",
        message: "كلمة السر لابد ان تحتوي علي الأقل 6 أحرف"
      },
      {
        type: "pattern",
        message: "كلمة السر لابد أن تحتوي علي الاقل حرف كبير وحرف صغير و رقم"
      }
    ],
    country: [
      {
        type: "required",
        message: "اسم الدولة مطلوب"
      }
    ],
    city: [
      {
        type: "required",
        message: "اسم المحافظة مطلوب"
      }
    ],
    state: [
      {
        type: "required",
        message: "اسم المنطقة مطلوب"
      }
    ],
    age: [
      {
        type: "required",
        message: "العمر مطلوب"
      }
    ],
    gender: [
      {
        type: "required",
        message: "النوع مطلوب"
      }
    ],
    bloodgroup: [
      {
        type: "required",
        message: "فصيلة الدم مطلوبة"
      }
    ],
    isdonner: [
      {
        type: "required",
        message: "هل تريد أن تصبح متبرع"
      }
    ]
  };

  receiveAvatar($event) {
    this.fileImg = $event;
  }

  onChangeGender($event) {
    console.log($event);
    this.Gender = $event;
  }

  onIsDonner($event) {
    console.log($event);
    this.IsDonner = $event;
  }

  onchangeBloodGroup($event) {
    console.log($event);
    this.BloodGroup = $event;
  }

  onChangeCountry($event) {
    console.log($event);
    this.Country = $event.CountryName;
    this.states = $event.States;
  }

  onChangeState($event) {
    console.log($event);
    this.State = $event.StateName;
    this.cities = $event.Cities;
  }

  onChangeCity($event) {
    console.log($event);
    this.City = $event;
  }

  signupAction(values) {
    // console.log(values);
    let body = {
      user_nm: values.username,
      pass: values.password,
      email: values.email,
      age: values.age,
      firstname: values.firstname,
      lastname: values.lastname,
      country: this.Country,
      city: this.City,
      state: this.State,
      phone: values.mobile,
      lang: "arabic",
      gender: this.Gender,
      blood_group: this.BloodGroup,
      snooze: "36",
      isdonner: this.IsDonner
    };
    // console.log(body);
    this.UserServiceProvider.register(body).subscribe(
      data => {
        console.log(data);
        alert(data.msg);
        this.content.scrollToTop();
        // this.fcm.sendVerficationCode("+2001013500414", 60);
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  GoToLoginPage() {
    this.navCtrl.push("LoginPage");
  }

  uploadAvatar() {
    console.log(this.fileImg);
    if (this.fileImg) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions = {
        fileKey: "avatar",
        //  fileName: filesImg[i].name,
        headers: {
          "x-access-token": localStorage.getItem("token")
        },
        params: {}
      };
      fileTransfer
        .upload(
          this.fileImg,
          this.ApiService.API_URL_dev + "/api/profile/avatar",
          options
        )
        .then(
          data => {
            console.log(JSON.parse(data.response));
          },
          err => {
            console.log(err);
            console.log(err.body);
          }
        );
    }
  }
}
