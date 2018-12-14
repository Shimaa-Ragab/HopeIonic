import {
  Component,
  OnInit,
  NgZone,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { GoogleMaps } from "@ionic-native/google-maps";
import { Events } from "ionic-angular";

declare var google: any;

interface IAddress {
  description: string;
  directions: string;
}
@Component({
  selector: "location",
  templateUrl: "location.html",
  providers: [GoogleMaps]
})
export class LocationComponent implements OnInit {
  autocomplete: any;
  GoogleAutocomplete: any;
  geocoder: any;
  autocompleteItems: any;
  position: any;
  txtSearch: string;
  address: IAddress;

  @Input() addTxt: string;
  @Output() addressEvent = new EventEmitter<any>();

  constructor(
    public zone: NgZone,
    public googleMaps: GoogleMaps,
    public event: Events
  ) {
    this.txtSearch = "Blood Bank";
    this.event.subscribe("resetFilter", () => {
      this.autocomplete.input = "";
    });
  }

  ngOnInit() {
    this.geocoder = new google.maps.Geocoder();
    //  alert(this.geocoder);
    //  alert(JSON.stringify(this.geocoder));
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: this.addTxt
    };
    this.autocompleteItems = [];
  }

  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach(prediction => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      }
    );
  }

  selectSearchResult(item: any) {
    // alert(JSON.stringify(item));
    // this.txtSearch = item.description;
    this.autocompleteItems = [];
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      // alert(JSON.stringify(results));
      // alert(JSON.stringify(status));
      if (status === "OK" && results[0]) {
        this.position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        this.address = {
          description: item.description,
          directions: results[0].geometry.location
        };
        this.autocomplete.input = item.description;
        //  alert(this.address)
        //  alert(JSON.stringify(this.address));
        this.addressEvent.emit(this.address);
        //alert(results[0].geometry.location+ item.description);
        // let cntry= item.description.split(',');
        // alert(cntry[cntry.length-1]);
      }
    });
  }
}
