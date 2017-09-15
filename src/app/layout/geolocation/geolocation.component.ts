///<reference path="../../../../node_modules/@types/leaflet/index.d.ts"/>
import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { SchoolService } from '../../school.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit {
  centerLat = -23.552133;
  centerLng = -46.6331418;
  schoolsCoordinates: any;
  neighborhoodRadius = 2000;
  @ViewChild(AgmMap) private map: any;
  schoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador_small.png'});
  selectedSchoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador.png'});
  iconDefault = L.icon({iconUrl: 'assets/marker-icon.png', shadowUrl: 'assets/marker-shadow.png'});
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
          coordinates: [this.centerLng, this.centerLat]
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
    layer: L.tileLayer('https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0', {
      maxZoom: 18,
      attribution: '&copy; <a href=\'http://maps.google.com\'>Google Maps</a>'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = { position: 'bottomright' };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer,
    'Google Street Maps': this.LAYER_GSM.layer
  };
  options = {
    zoom: 14,
    center: L.latLng([this.centerLat, this.centerLng])
  };

  // --------------------------------
  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit( ) {
    this.getSchoolsList();
  }

  private geolocateAllSchools () {
    return 0;
  }

  private drawSchoolNeighborhoodArea(neighborhoodRadius: number, schoolLat: number, schoolLng) {
    /* this.neighboringSchoolsLayer = [L.circle([ this.centerLat, this.centerLng ], { radius: neighborhoodRadius }),
      L.marker([ this.centerLat, this.centerLng ], {icon: this.selectedSchoolMarkerIcon })
    ]; */
    this.neighboringSchoolsLayer = [L.circle(L.latLng(schoolLat, schoolLng), { radius: neighborhoodRadius }),
      L.marker(L.latLng(schoolLat, schoolLng), {icon: this.selectedSchoolMarkerIcon})
    ];
  }

  private redrawMap() {
    this.map.triggerResize()
      .then(() => this.map._mapsWrapper.setCenter({centerLat: this.centerLat, centerLng: this.centerLng}));
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
      let container = $('<div />');
      let marker;
      let school_i;
      container.on('click', '.getSchoolInfo', function(){
        alert('test');
      });
      for (let i = 0; i < this.schoolsCoordinates.length; i++) {
        school_i = this.schoolsCoordinates[i];
        popup = '<b>ESCOLA: </b>' + school_i.NO_ENTIDAD +
          '<br/><b>BAIRRO: </b>' + school_i.BAIRRO +
          '<br/><b>ENDEREÇO: </b>' + school_i.ENDERECO + ' - ' + school_i.NUMERO  +
          '<br/><b>LOCATION: </b>' + school_i.lat + ', ' + school_i.lon +
          '<br/><a href="#" class="getSchoolInfo">Ver informaçao da escola</a>';
          // '<br/><input type="button" value="Ver informaçao da escola" id="bu-show-school-info" ' +
          // '(click)="showSchoolInfo($event)"/>';
        container.html(popup);
        container.append($('<span class="bold">').text('...'))
        marker = L.marker(L.latLng(school_i.lat, school_i.lon), {icon: this.schoolMarkerIcon});
        // data.push(marker.bindPopup($('<a href="#" class="speciallink">TestLink</a>').click(function() {alert('test'); })[0]));
        data.push(marker.bindPopup(container[0]));
      }
      this.markerClusterData = data;
    }, (err) => {
      console.log(err);
    });
  }

  showSchoolInfo(event) {
    alert('hello!');
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

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

}
