/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOCATION_SEARCH_API, LOCATION_SEARCH_API_ADDITIONAL_PARAMS } from '../constant/app.constant';
import { AddressLookupResponse } from '../model/address-lookup-response';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {

   }


   addressLookup(query: string): Observable<AddressLookupResponse[]>{
     const link = `https://${LOCATION_SEARCH_API}/search?q=${query}&${LOCATION_SEARCH_API_ADDITIONAL_PARAMS}`;
    return this.http.get(link).pipe(map((data: any[]) =>
      data.map((item: any) =>
        new AddressLookupResponse(
          item.display_name,
          item.lat,
          item.lon
        )
      )
    ));
  }

}


