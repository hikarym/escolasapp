import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { SchoolService } from '../../school.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import {Layer} from 'leaflet';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit {
  lat = -23.552133;
  lng = -46.6331418;
  schoolsCoordinates: any;
  neighborhoodRadius = 2000;
  @ViewChild(AgmMap) private map: any;
  schoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador_small.png'});
  selectedSchoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador.png'});
  neighboringSchoolsLayer: any;
  allSchoolsLayer: any;
  options2: any;
  locationGeoJSON = {
    id: 'geoJSON',
    name: 'GEO JSON Point',
    enabled: true,
    layer: L.geoJSON()
  };
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };
  // Values to bind to leaflet Directive
  layers: L.Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer
    }
  };
  options = {
    zoom: 14,
    center: L.latLng([this.lat, this.lng])
  };

  constructor(
    private schoolService: SchoolService
  ) { }

  ngOnInit( ) {
    this.getSchoolsList();

    this.options2 = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 14,
      center: L.latLng([this.lat, this.lng])
    };
    const dom: any = document.querySelector('body');
    this.allSchoolsLayer = {
      id: 'geoJSON',
      name: 'GEO JSON Point',
      enabled: true,
      layer: L.geoJSON(this.schoolsCoordinates, {
        pointToLayer: function (geoJsonPoint, latlng) {
          return L.marker(latlng);
        }
      }).addTo(dom.mymap)
    };

  }

  private geolocateAllSchools () {
    return 0;
  }

  private drawSchoolNeighborhoodArea(neighborhoodRadius: number) {
    this.neighboringSchoolsLayer = [L.circle([ this.lat, this.lng ], { radius: neighborhoodRadius }),
      L.marker([ this.lat, this.lng ], {icon: this.schoolMarkerIcon })
    ];
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }

  getSchoolsList() {
    this.schoolService.getAllSchools().then((res) => {
      this.schoolsCoordinates = res;
      console.log(this.schoolsCoordinates);
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
