import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { EscolaService } from '../../escola.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit {
  lat: number;
  lng: number;
  schoolsLocation: any;
  @ViewChild(AgmMap) private map: any;
  options: any;
  markerIcon: any;
  layers: any;

  constructor(
    private escolaService: EscolaService
  ) { }

  ngOnInit( ) {
    this.getEscolaList();
    this.lat = -23.552133;
    this.lng = -46.6331418;
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 14,
      center: L.latLng([this.lat, this.lng])
    };
    this.markerIcon = L.icon({iconUrl: 'assets/images/marcador_small.png'});
    this.layers = [L.circle([ this.lat, this.lng ], { radius: 2000 }),
      L.marker([ this.lat, this.lng ], {icon: this.markerIcon })
    ];
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }

  getEscolaList() {
    this.escolaService.getAllEscolas().then((res) => {
      this.schoolsLocation = res;
    }, (err) => {
      console.log(err);
    });
  }

  public convertStringToNumber(value: string): number {
    return +value;
  }

  public convertToDouble(value: number) {
    return value / 1000000;
  }

}
