import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, SimpleChanges, OnChanges  } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ILocationModel } from 'src/app/@core/model/IlocationModel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges  {

  @Input() routeStartingPoint: ILocationModel = null;
  @Input() routeEndPoint: ILocationModel = null;

  map: L.Map;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {

    const coord = await this.getCurrentPosition();
    const initialState = {
      lat: coord.coords.latitude,
      lng: coord.coords.longitude,
      zoom: 15
    };

    const map = L.map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const myAPIKey = 'ba63517931d94498b2961f2aa4ba7eb8';
    const isRetina = L.Browser.retina;

    //const baseUrl = 'https://maps.geoapify.com/v1/tile/osm-bright-grey/{z}/{x}/{y}.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    // const baseUrl = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    //const retinaUrl = 'https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=ba63517931d94498b2961f2aa4ba7eb8';
    // const baseUrl = 'https://tile.openstreetmap.org/${z}/${x}/${y}.png';
    const baseUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

    L.tileLayer(baseUrl, {
      // eslint-disable-next-line max-len
      attribution: '© OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
      // apiKey: myAPIKey,
      maxZoom: 20,
      id: 'osm-bright',
    } as any)
    .addTo(map);




    // const marker2 = L.marker([23.79688455, 90.406819348108],{title: 'Drop Point',icon: century21icon, draggable : true}).addTo(map);

    // const group = L.featureGroup([marker, marker2]);
    // map.fitBounds(group.getBounds());

  if(!this.routeStartingPoint == null && !this.routeEndPoint == null)
  {
      const routing= L.Routing.control({
        // router: L.Routing.osrmv1({
        //     serviceUrl: 'http://router.project-osrm.org/route/v1/'
        // }),
        showAlternatives: true,
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
        waypoints: [
            L.latLng(23.691879, 90.457882),
            L.latLng(23.7093978, 90.433806)
        ],
        useZoomParameter: true,
        autoRoute: true,
      }).addTo(map);

      routing.on('routesfound', (e) => {
        const distance = e.routes[0].summary.totalDistance;
        console.log('Distance ' + distance);
    });
  }
  else{
    const century21icon = L.icon({
      iconUrl: 'https://nominatim.openstreetmap.org/ui/build/images/marker-icon.png',
      iconSize: [30, 50]
      });
    // eslint-disable-next-line max-len
    const marker = L.marker([initialState.lat, initialState.lng],{title: 'Pickup Point',icon: century21icon, draggable : true}).addTo(map);
  }


    setTimeout(() => {
      map.invalidateSize();
    }, 800);
  }


  getCurrentPosition = async () => await Geolocation.getCurrentPosition();

}


