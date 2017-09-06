import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { SchoolService } from '../../school.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import {icon, Layer} from 'leaflet';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit {
  customDefault: any;
  lat = -23.552133;
  lng = -46.6331418;
  schoolsCoordinates: any;
  neighborhoodRadius = 2000;
  @ViewChild(AgmMap) private map: any;
  schoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador_small.png'});
  selectedSchoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador.png'});
  neighboringSchoolsLayer: any;
  options2: any;
  featureCollection1: GeoJSON.FeatureCollection<any> = {
    type: 'FeatureCollection',
    features: []
  };
  featureCollection: GeoJSON.FeatureCollection<any> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [this.lng, this.lat]
        },
        properties: {}
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-47.14554500000313, -23.98571699999825]
        },
        properties: {}
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-47.14556000000313, -23.98568499999824]
        },
        properties: {}
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-47.146239000003135, -23.983872999998237]
        },
        properties: {}
      }
    ]
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
  // --------------------------------
  markers = L.markerClusterGroup();
  markerClusterData: any[] = [];

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit( ) {
    this.getSchoolsList();
    this.customDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });

    this.options2 = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
      ],
      zoom: 14,
      center: L.latLng([this.lat, this.lng])
    };
  }


  private geolocateAllSchools () {
    return 0;
  }

  private drawSchoolNeighborhoodArea(neighborhoodRadius: number) {
    this.neighboringSchoolsLayer = [L.circle([ this.lat, this.lng ], { radius: neighborhoodRadius }),
      L.marker([ this.lat, this.lng ], {icon: this.selectedSchoolMarkerIcon })
    ];
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => this.map._mapsWrapper.setCenter({lat: this.lat, lng: this.lng}));
  }

  getSchoolsList() {
    this.schoolService.getAllSchools().then((res) => {
      this.schoolsCoordinates = res;
      this.featureCollection1.features = this.schoolsCoordinates;

      /*this.layers = [L.geoJSON(this.featureCollection1, {
        pointToLayer: function(feature, latlng) {
          // return L.marker(latlng, {icon: L.icon({iconUrl: 'assets/images/marcador_small.png'})});
          return L.marker(latlng, {icon: L.divIcon({className: 'school-div-icon'})});
        }
      })];*/
      const data: any[] = [];
      console.log(this.schoolsCoordinates.length);
      for (let i = 0; i < this.schoolsCoordinates.length; i++) {
        const icon = L.icon({iconUrl: 'assets/images/marcador_small.png'});
        data.push(L.marker([this.schoolsCoordinates[i].lon, this.schoolsCoordinates[i].lat], icon));
      }
      this.markerClusterData = data;
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
