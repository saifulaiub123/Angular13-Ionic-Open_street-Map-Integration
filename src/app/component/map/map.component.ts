/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges, OnChanges, Output, EventEmitter  } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { MAP_TILE_URL, MAP_ATTRIBUTION, MARKER_ICON_PATH, MARKER_ICON_RETINA_PATH, MARKER_ICON_SHADOW_PATH, MARKER_ICON_SHADOW_RETINA_PATH, MARKER_ICON_DEST_PATH, MARKER_ICON_DEST_RETINA_PATH } from 'src/app/@core/constant/app.constant';
import { RouteWayPoint } from 'src/app/@core/model/route-way-point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input() routeWayPoints: RouteWayPoint[] = [];
  @Output() mapRouteCallback? = new EventEmitter();

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  map: L.Map;
  mapView: any;
  coord: Position;
  icon: L.Icon;
  marker: L.Marker;
  routing: L.Routing.Control;


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.routeWayPoints.currentValue !== changes.routeWayPoints.previousValue)
    // {
    //   if(changes.routeWayPoints.currentValue.length >=2)
    //   {
    //     this.getRoutes(this.routeWayPoints);
    //   }
    // }
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'routeWayPoints': {
            if(changes.routeWayPoints.currentValue !== changes.routeWayPoints.previousValue){
              if(changes.routeWayPoints.currentValue.length >=2)
                {
                  this.getRoutes(this.routeWayPoints);
                }
            }
          }
        }
      }
    }
  }

  async ngOnInit() {
    this.loadDefaultMarkerIcon();
  }

  async ngAfterViewInit() {
    this.coord = await this.getCurrentPosition();
    this.loadMap(this.coord.coords.latitude,this.coord.coords.longitude,15);
  }

  getCurrentPosition = async () => await Geolocation.getCurrentPosition();

  loadDefaultMarkerIcon()
  {
    this.icon = L.icon({
      iconUrl: MARKER_ICON_PATH,
      iconRetinaUrl : MARKER_ICON_RETINA_PATH,
      shadowUrl : MARKER_ICON_SHADOW_PATH,
      shadowRetinaUrl : MARKER_ICON_SHADOW_RETINA_PATH,
      iconSize: [30, 50]
      });
  }

  setTile(mapView: L.Map)
  {
    L.tileLayer(MAP_TILE_URL, {
      attribution: MAP_ATTRIBUTION,
      maxZoom: 18,
      id: 'osm-bright',
    } as any)
    .addTo(mapView);
  }

  loadMap(lat: number, long: number, zoom: number) {
    this.mapView = L.map(this.mapContainer.nativeElement).setView([lat, long], zoom);
    this.setTile(this.mapView);
    this.addMarker(lat, long, 'Current location');

    setTimeout(() => {
      this.mapView.invalidateSize();
    }, 800);
  }

  addMarker(lat: number, long: number, title: string)
  {
    this.marker = L.marker([lat, long],{title,icon: this.icon , draggable : false}).addTo(this.mapView);
    // this.marker.bindPopup('Current Position');
  }
  removeMarker()
  {
    this.marker.remove();
  }

  getRoutes(waypoints: RouteWayPoint[])
  {

    this.removeMarker();
    if(this.routing !== undefined)
    {
      this.routing.remove();
    }

    const latLong: L.LatLng[] = [];
    waypoints.forEach((wayPoint) =>{
      latLong.push(L.latLng(wayPoint.lat, wayPoint.long));
    });


    this.routing= L.Routing.control({
      showAlternatives: false,
          lineOptions : {
          styles: [
            {color: 'blue', opacity: 0.15, weight: 9},
            {color: 'blue', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 1, weight: 2}
        ],
        missingRouteStyles: [
            {color: 'black', opacity: 0.5, weight: 7},
            {color: 'white', opacity: 0.6, weight: 4},
            {color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12'}
        ],
          extendToWaypoints : false,
          missingRouteTolerance : 1
      },
      fitSelectedRoutes: true,
      altLineOptions: {
        styles: [{color: '#4c87e1', weight: 10}],
        extendToWaypoints : true,
        missingRouteTolerance : 1
      },
      show: false,
      routeWhileDragging: true,
      waypoints: latLong,
      plan : L.Routing.plan(latLong, {
        createMarker(i, wp) {
            return L.marker(wp.latLng, {
              draggable: true,
              icon: L.icon({
                iconUrl: MARKER_ICON_PATH,
                iconRetinaUrl : MARKER_ICON_RETINA_PATH,
                shadowUrl : MARKER_ICON_SHADOW_PATH,
                shadowRetinaUrl : MARKER_ICON_SHADOW_RETINA_PATH,
                iconSize: [30, 50]
                })
            });
          }
      }),
      useZoomParameter: true,
      autoRoute: true,
    }).addTo(this.mapView);

    this.routing.on('routesfound', (e) => {
      const distance = e.routes[0].summary.totalDistance;
      console.log('Distance ' + distance);
  });
  this.mapRouteCallback.emit();
  }
}
