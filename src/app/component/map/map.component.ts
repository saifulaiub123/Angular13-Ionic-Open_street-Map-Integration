import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: L.Map;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const initialState = {
      lat: 23.777176,
      lng: 90.399452,
      zoom: 12
    };

    const map = L.map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const myAPIKey = 'ba63517931d94498b2961f2aa4ba7eb8';
    const isRetina = L.Browser.retina;

    const baseUrl = 'https://maps.geoapify.com/v1/tile/osm-bright-grey/{z}/{x}/{y}.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    // const baseUrl = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    const retinaUrl = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    // var p = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    L.tileLayer(baseUrl, {
      // eslint-disable-next-line max-len
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
      apiKey: myAPIKey,
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 800);
  }
}
