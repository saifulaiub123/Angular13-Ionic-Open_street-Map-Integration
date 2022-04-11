/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) {

   }


   searchPlaces(query: string): Observable<any>{
     const link = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=bd`;
    return this.http.get(link);
  }

}


