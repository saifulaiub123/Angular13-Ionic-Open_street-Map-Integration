/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges, OnChanges  } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import {Browser, icon, latLng, LeafletMouseEvent, map, Map, MapOptions, marker, Routing, tileLayer} from 'leaflet';
import 'leaflet-routing-machine';
import { ILocationModel } from 'src/app/@core/model/IlocationModel';
import { MapPoint } from 'src/app/@core/model/map-point-model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input() routeStartingPoint: ILocationModel = null;
  @Input() routeEndPoint: ILocationModel = null;

  map: Map;
  mapPoint: MapPoint;
  mapOptions: MapOptions;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  lastLayer: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
    this.initializeDefaultMapPoint();
    this.initializeDefaultOptions();
  }


  async ngAfterViewInit() {

    const coord = await this.getCurrentPosition();
    const initialState = {
      lat: coord.coords.latitude,
      lng: coord.coords.longitude,
      zoom: 15
    };

    // map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    // const baseUrl = 'https://tile.openstreetmap.org/${z}/${x}/${y}.png';
    const baseUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

    // tileLayer(baseUrl, {
    //   // eslint-disable-next-line max-len
    //   attribution: '© OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
    //   // apiKey: myAPIKey,
    //   maxZoom: 20,
    //   id: 'osm-bright',
    // } as any)
    // .addTo(map);




    // const marker2 = L.marker([23.79688455, 90.406819348108],{title: 'Drop Point',icon: century21icon, draggable : true}).addTo(map);

    // const group = L.featureGroup([marker, marker2]);
    // map.fitBounds(group.getBounds());

  if(!this.routeStartingPoint == null && !this.routeEndPoint == null)
  {
    //   const routing= Routing.control({
    //     // router: L.Routing.osrmv1({
    //     //     serviceUrl: 'http://router.project-osrm.org/route/v1/'
    //     // }),
    //     showAlternatives: true,
    //         lineOptions : {
    //         styles: [
    //           {color: 'blue', opacity: 0.15, weight: 9},
    //           {color: 'blue', opacity: 0.8, weight: 6},
    //           {color: 'blue', opacity: 1, weight: 2}
    //       ],
    //       missingRouteStyles: [
    //           {color: 'black', opacity: 0.5, weight: 7},
    //           {color: 'white', opacity: 0.6, weight: 4},
    //           {color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12'}
    //       ],
    //         extendToWaypoints : false,
    //         missingRouteTolerance : 1
    //     },
    //     fitSelectedRoutes: true,
    //     altLineOptions: {
    //       styles: [{color: '#4c87e1', weight: 10}],
    //       extendToWaypoints : true,
    //       missingRouteTolerance : 1
    //     },
    //     show: false,
    //     routeWhileDragging: true,
    //     waypoints: [
    //         latLng(23.691879, 90.457882),
    //         latLng(23.7093978, 90.433806)
    //     ],
    //     useZoomParameter: true,
    //     autoRoute: true,
    //   }).addTo(map);

    //   routing.on('routesfound', (e) => {
    //     const distance = e.routes[0].summary.totalDistance;
    //     console.log('Distance ' + distance);
    // });
  }
  else{
    const century21icon = icon({
      iconUrl: 'https://nominatim.openstreetmap.org/ui/build/images/marker-icon.png',
      iconSize: [30, 50]
      });
    // eslint-disable-next-line max-len
    //const marker = marker([initialState.lat, initialState.lng],{title: 'Pickup Point',icon: century21icon, draggable : true}).addTo(map);
  }
  // setTimeout(() => {
  //   this.map.invalidateSize();
  // }, 800);
  }


  getCurrentPosition = async () => await Geolocation.getCurrentPosition();


    // eslint-disable-next-line @typescript-eslint/no-shadow
    public initializeMap(map: Map) {
      this.map = map;
      this.createMarker();
    }

  private async initializeDefaultMapPoint(){
    const currPosition = await this.getCurrentPosition();
    this.mapPoint ={
      name : 'Map',
      latitude: currPosition.coords.latitude,
      longitude: currPosition.coords.longitude
    };
  }

  private initializeDefaultOptions()
  {
    this.mapOptions = {
      zoom: 15,
      layers: [
        tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '© OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'})
      ]
    };
  }

  private onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint = {
      latitude,
      longitude,
      name: name ? name : this.mapPoint.name
    };
  }

  public createMarker(){
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }
  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) {
      this.map.removeLayer(this.lastLayer);
    }
  }

}


