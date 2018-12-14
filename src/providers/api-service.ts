import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";

@Injectable()
export class ApiServiceProvider {
  public API_URL_dev: string;
  public API_IMG: string;
  public token;
  public header;

  constructor(public http: HttpClient) {
    this.API_URL_dev = "http://app.givemehopes.com";
    this.API_IMG = "https://s3-eu-west-1.amazonaws.com/flixgigs/storage/app/";

    //if login send token
    if (localStorage.getItem("login") === "1") {
      this.token = localStorage.getItem("token");
      this.header = new HttpHeaders({
        "x-access-token": this.token
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Methods':'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization',
        // 'Access-Control-Allow-Credentials': 'true'
      });
      console.log(this.token);
    } else {
      this.header = new HttpHeaders({
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjViZDZlNzgwZDk1ZjZjNDY5YTU5Y2FiNSIsIk5hbWUiOiJUYWhhIE1vaGFtZWQiLCJUeXBlIjoiVXNlciIsImlhdCI6MTU0MzEzNzE5MH0.rfbIOReN5D9wN52Bz3_7pwdnLu6yetfFvWab6UyMa4c"
      });
    }
  }

  public extractData(res: Response | any) {
    let body = res;
    // console.log(res);
    return body || {};
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || "";
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("ApiService::handleError", errMsg);
    console.error("Error", JSON.stringify(error));
    return Observable.throw(error);
  }
}
