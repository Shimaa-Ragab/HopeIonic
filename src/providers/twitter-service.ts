import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiServiceProvider } from "./api-service";
import { Observable } from "rxjs";
import { ITweetModel } from "../models/tweet.model";
import "rxjs/Rx";

@Injectable()
export class TwitterServiceProvider {
  constructor(
    public http: HttpClient,
    private ApiService: ApiServiceProvider
  ) {}

  public getTweets(): Observable<ITweetModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/twitter/tweets:0", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getAllTweets(): Observable<ITweetModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/twitter/user/tweets:0", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getUserTweets(): Observable<ITweetModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/twitter/user/tweets:0", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }
}
