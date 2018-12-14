import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApiServiceProvider } from "./api-service";
import { IUserModel } from "../models/user.model";
import "rxjs/Rx";

@Injectable()
export class UserServiceProvider {
  constructor(
    public http: HttpClient,
    private ApiService: ApiServiceProvider
  ) {}

  public register(body: {}): Observable<IUserModel> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/register", body)
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public login(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/login", body)
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getUserData(): Observable<IUserModel> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/profile", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }
}
