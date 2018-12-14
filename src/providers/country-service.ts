import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiServiceProvider } from "./api-service";
import { ICountryModel } from "../models/country.model";

@Injectable()
export class CountryServiceProvider {
  constructor(public http: HttpClient, public ApiService: ApiServiceProvider) {}

  public getCountries(): Observable<ICountryModel> {
    return this.http
      .get("../assets/data/Contries.json")
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }

  public getAllBloodBank(): Observable<any> {
    return this.http
      .get(this.ApiService.API_URL_dev + "/api/bloodbanks", {
        headers: this.ApiService.header
      })
      .map(this.ApiService.extractData)
      .catch(this.ApiService.handleError);
  }
}
