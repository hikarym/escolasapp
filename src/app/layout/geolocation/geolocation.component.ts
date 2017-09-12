///<reference path="../../../../node_modules/@types/leaflet/index.d.ts"/>
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { SchoolService } from '../../school.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {icon, Layer, popup} from 'leaflet';

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
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  };
  LAYER_GSM = {
    id: 'googlemaps',
    name: 'Google Street Maps',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Google Street Maps'
    })
  };
  LAYER_MAPC = {
    id: 'mapc',
    name: 'Google Street Maps',
    enabled: false,
    layer: L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>'
    })
  };
  // Values to bind to Leaflet Directive
  layersControlOptions = { position: 'bottomright' };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer
  };
  options = {
    zoom: 14,
    center: L.latLng([this.lat, this.lng])
  };

  layers: L.Layer[];
  // --------------------------------
  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markers = L.markerClusterGroup();
  markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit( ) {
    this.getSchoolsList();
    this.customDefault = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png'
    });

    /*this.options2 = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
      ],
      zoom: 14,
      center: L.latLng([this.lat, this.lng])
    };*/
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
      let popup = '';
      let marker;
      let school_i;
      for (let i = 0; i < this.schoolsCoordinates.length; i++) {
        school_i = this.schoolsCoordinates[i];
        popup = '<b>ESCOLA: </b>' + school_i.NO_ENTIDAD +
          '<br/><b>BAIRRO: </b>' + school_i.BAIRRO +
          '<br/><b>ENDEREÇO: </b>' + school_i.ENDERECO + ' - ' + school_i.NUMERO  +
          '<br/><b>LOCATION: </b>' + school_i.lat + ', ' + school_i.lon;
        marker = L.marker(L.latLng(school_i.lat, school_i.lon), {icon: this.schoolMarkerIcon});
        data.push(marker.bindPopup(popup));
      }
      this.markerClusterData = data;
    }, (err) => {
      console.log(err);
    });
  }

  markerClusterReady(group: L.MarkerClusterGroup) {

    this.markerClusterGroup = group;

  }

  public convertStringToNumber(value: string): number {
    return +value;
  }

  public convertToDouble(value: number) {
    return value / 1000000;
  }

}
