import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiServiceProvider } from "./api-service";
import { Observable } from "rxjs/Rx";
import { IBloodBankModel } from "../models/bloodbank.model";
import { IRequestModel } from "../models/request.model";
import "rxjs/Rx";

@Injectable()
export class RequestServiceProvider {
  constructor(
    public http: HttpClient,
    private ApiService: ApiServiceProvider
  ) {}

  public getAllBloodBanks(): Observable<IBloodBankModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/bloodbanks", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getBloodBalance(body: {}): Observable<IBloodBankModel[]> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/api/bloodbalance/last", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public createRequest(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/api/requests/create", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getAllRequests(): Observable<IRequestModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/requests", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getAllMyRequests(): Observable<IRequestModel[]> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/myrequests/", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public confirmRequest(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/web/donnations/confirm", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public nearbyUsers(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/api/nearby", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public Going(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/api/donnations/going", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public UNGoing(body: {}): Observable<any> {
    return this.http
      .post(this.ApiService.API_URL_dev + "/api/donnations/ungoing", body, {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }
}
