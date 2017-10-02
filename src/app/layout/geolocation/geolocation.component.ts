///<reference path="../../../../node_modules/@types/leaflet/index.d.ts"/>
import {Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import { SchoolService } from '../../school.service';
import { routerTransition } from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {ShareddataService} from '../../services/shareddata.service';
import {ISubscription, Subscription} from 'rxjs/Subscription';
import {Event, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {WeightingAreaService} from '../../weighting-area.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit,  OnDestroy {
  centerLat = -23.552133;
  centerLng = -46.6331418;
  schoolsCoordinates: any;
  // @ViewChild(AgmMap) private map: any;
  schoolSelectedID: string;
  schoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador_school_default.png'});
  selectedSchoolMarkerIcon = L.icon({iconUrl: 'assets/images/marcador_school_selected.png'});
  neighborhoodRadius = 2000;
  neighboringSchoolsLayer: any;
  featureCollection: GeoJSON.FeatureCollection<any> = {
    type: 'FeatureCollection',
    features: []
  };
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: true,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  };
  LAYER_GSM = {
    id: 'googlemaps',
    name: 'Google Street Maps',
    enabled: false,
    layer: L.tileLayer('https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i' +
      '{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0', {
      minZoom: 1,
      maxZoom: 22,
      attribution: '&copy; <a href=\'http://maps.google.com\'>Google Maps</a>'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = { position: 'bottomright' };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer,
    'Google Street Maps': this.LAYER_GSM.layer
  };
  options = { zoom: 14, center: L.latLng([this.centerLat, this.centerLng])  };
  zoom = 14;
  center = L.latLng([this.centerLat, this.centerLng]);
  zoom_school_selected = 14;

  // --------------------------------
  // Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: any[] = [];
  markerClusterOptions: L.MarkerClusterGroupOptions;
  private subscription = new Subscription();
  selectionSchooolID: any = {};
  LOCATION = {
    LAT: -23.552133,
    LON: -46.6331418,
    CODAP: ''
  };
  weightingAreaOfSchool: any;

  constructor( private schoolService: SchoolService,
               private weigthingAreaService: WeightingAreaService,
               private sharedDataService: ShareddataService,
               private router: Router) {
    /*const s = sharedDataService.getSchoolID().subscribe(
      schoolID => {
        this.selectionSchooolID = schoolID;
      });
    this.subscription.add(s);*/
  }

  // unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit( ) {

    const s = this.sharedDataService.getSchoolLoc().subscribe(
      res => {
        this.LOCATION = res;
        this.zoom = this.zoom_school_selected;
        this.center = L.latLng([this.LOCATION.LAT, this.LOCATION.LON]);
        console.log('update center in ngOnInit:', this.center);
        this.drawSchoolNeighborhoodArea(this.neighborhoodRadius, this.LOCATION.LAT, this.LOCATION.LON);
        console.log('dibujar el ap:', this.LOCATION.CODAP);
        this.drawWeightingAreaPolygon(this.LOCATION.CODAP);
      });
    this.subscription.add(s);

    // get the school list and Map the schools only once time
    if (this.center.lat === -23.552133) {
      this.getSchoolsList();
    }
  }

  recenter() {
    this.subscription = this.sharedDataService.getSchoolLoc().subscribe(
      res => {
        this.LOCATION = res;
        this.zoom = this.zoom_school_selected;
        this.center = L.latLng([this.LOCATION.LAT, this.LOCATION.LON]);
      });
  }

  drawSchoolNeighborhoodArea(neighborhoodRadius: number, schoolLat: number, schoolLng: number ) {
    this.neighboringSchoolsLayer = [L.circle(L.latLng(schoolLat, schoolLng), { radius: neighborhoodRadius, weight: 1 }),
      L.marker(L.latLng(schoolLat, schoolLng), {icon: this.selectedSchoolMarkerIcon})];
  }

  drawWeightingAreaPolygon(codAp: string) {
    this.weigthingAreaService.getWeightingArea(codAp).then((res) => {
      // console.log('geolocation: ', res);
      this.weightingAreaOfSchool = res;
      this.neighboringSchoolsLayer.push(L.geoJSON(this.weightingAreaOfSchool));
    });
  }

  /* center the map*/
  /*redrawMap(schoolLat: number, schoolLng: number) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // center the map in the new coordinates
        this.map.triggerResize()
          .then(() => this.map._mapsWrapper.setCenter({centerLat: schoolLat, centerLng: schoolLng}));
        // Replace the marker icon of school focused by another one
       }
    });
    // Dra the school's neighborhood
  }*/

  getWeightingAreaPolygon(codAp: string) {
    this.weigthingAreaService.getWeightingArea(codAp).then((res) => {
      this.weightingAreaOfSchool = res;
      this.neighboringSchoolsLayer.push(L.geoJSON(this.weightingAreaOfSchool));
    });
  }
  getSchoolsList() {
    this.schoolService.getAllSchools().then((res) => {
      this.schoolsCoordinates = res;
      this.featureCollection.features = this.schoolsCoordinates;

      /*this.layers = [L.geoJSON(this.featureCollection1, {
        pointToLayer: function(feature, latlng) {
          // return L.marker(latlng, {icon: L.icon({iconUrl: 'assets/images/marcador_school_default.png'})});
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
        container = $('<div />');
        school_i = this.schoolsCoordinates[i];
        popup = '<b>ESCOLA: </b>' + school_i.NO_ENTIDAD +
          '<br/><b>BAIRRO: </b>' + school_i.BAIRRO +
          '<br/><b>ENDEREÇO: </b>' + school_i.ENDERECO + ' - ' + school_i.NUMERO  +
          '<br/><b>LOC.: </b>' + school_i.lat + ', ' + school_i.lon +
          '<br/><a href="#" class="getSchoolInfo">Informaçao da escola</a> - ' +
          '<a href="#" class="getSchoolInfo">Area de Ponderaçao</a>';
          // '<br/><input type="button" value="Ver informaçao da escola" id="bu-show-school-info" ' +
          // '(click)="showSchoolInfo($event)"/>';
        container.html(popup);
        container.append($('<span class="bold">').text('...'));
        marker = L.marker(L.latLng(school_i.lat, school_i.lon), {icon: this.schoolMarkerIcon});
        // data.push(marker.bindPopup($('<a href="#" class="speciallink">TestLink</a>').click(function() {alert('test'); })[0]));
        data.push(marker.bindPopup(container[0]));
      }
      this.markerClusterData = data;
      console.log('getschoollist: ' , this.center);
    }, (err) => {
      console.log(err);
    });
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

}
