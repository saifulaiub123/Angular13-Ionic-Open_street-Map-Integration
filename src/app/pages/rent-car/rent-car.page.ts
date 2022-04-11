import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, NavController } from '@ionic/angular';
import { ILocationModel } from 'src/app/@core/model/IlocationModel';
import { MapService } from 'src/app/@core/services/map.service';


@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.page.html',
  styleUrls: ['./rent-car.page.scss'],
})
export class RentCarPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  routeStartingPoint: ILocationModel = {};
  routeEndPoint: ILocationModel = {};

  searchedPlace: any;
  isAutocompleteVisible = false;
  searchType: number;
  pickupPoint: string;
  endPoint: string;
  dateValue2 = '';

  constructor(private navCtrl: NavController, private mapService: MapService) { }

  ngOnInit() {
  }

  confirmDateTime()
  {

  }
  onLocationSearch(event, searchType)
  {
    this.searchType = searchType;
    this.mapService.addressLookup(event.detail.value).subscribe(async (res)=>{
      this.searchedPlace = res;
      this.isAutocompleteVisible = true;
      console.log(res);
    });
  }
  onLocationSelect(place){
    if(this.searchType === 1)
    {
      this.pickupPoint = place.display_name;

      this.routeStartingPoint.lat = place.lat;
      this.routeStartingPoint.long = place.lon;
    }
    else if(this.searchType === 2)
    {
      this.endPoint = place.display_name;

      this.routeEndPoint.lat = place.lat;
      this.routeEndPoint.long = place.lon;
    }
    this.isAutocompleteVisible = false;
  }
  goBack()
  {
    this.navCtrl.back();
  }
}
