import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, NavController } from '@ionic/angular';
import { WayPoint } from 'src/app/@core/enum/way-point';
import { AddressLookupResponse } from 'src/app/@core/model/address-lookup-response';
import { RouteWayPoint } from 'src/app/@core/model/route-way-point';
import { MapService } from 'src/app/@core/services/map.service';


@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.page.html',
  styleUrls: ['./rent-car.page.scss'],
})
export class RentCarPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  routeWayPoints: RouteWayPoint[] = [];

  searchedPlace: AddressLookupResponse[];
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
    });
  }
  onLocationSelect(place: AddressLookupResponse){
    if(this.searchType === WayPoint.Start)
    {
      this.pickupPoint = place.displayName;
      this.routeWayPoints.push(new RouteWayPoint(place.latitude,place.longitude));
    }
    else if(this.searchType === WayPoint.Destination)
    {
      this.endPoint = place.displayName;
      this.routeWayPoints.push(new RouteWayPoint(place.latitude,place.longitude));
      this.routeWayPoints = [...this.routeWayPoints];
    }
    this.isAutocompleteVisible = false;
  }
  mapRouteCallback()
  {
    this.routeWayPoints = [];
    this.routeWayPoints = [...this.routeWayPoints];
  }
  goBack()
  {
    this.navCtrl.back();
  }
}
