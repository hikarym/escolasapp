///<reference path="../../../../node_modules/@types/leaflet/index.d.ts"/>
import {Component, OnInit, OnDestroy, EventEmitter, Output, NgZone} from '@angular/core';
import {SchoolService} from '../../school.service';
import {routerTransition} from '../../router.animations';
import {AgmMap} from '@agm/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {ShareddataService} from '../../services/shareddata.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {WeightingAreaService} from '../../weighting-area.service';
import {LayersModel} from './layers.model';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import {marker, popup} from 'leaflet';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css'],
  animations: [routerTransition()]
})
export class GeolocationComponent implements OnInit, OnDestroy {
  // Send information of selected school
  @Output() onSchoolSel = new EventEmitter<any>();
  // Constants
  centerLat = -23.552133;
  centerLng = -46.6331418;

  schoolsCoordinates: any;
  schoolMarkerIcon = L.icon({
    iconUrl: 'assets/images/marcador_school_default.png',
    iconSize: [45, 45], // size of the icon
    iconAnchor: [22, 45], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
  });
  selectedSchoolMarkerIcon = L.icon({
    iconUrl: 'assets/images/marcador_school_selected.png',
    iconSize: [60, 65], // size of the icon
    iconAnchor: [30, 65], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -65] // point from which the popup should open relative to the iconAnchor
  });
  neighborhoodRadius = 2000;
  overlays: any;
  featureCollection: GeoJSON.FeatureCollection<any> = {
    type: 'FeatureCollection',
    features: []
  };
  LAYER_GSM = {
    id: 'googlemaps',
    name: 'Google Street Map',
    enabled: true,
    layer: L.tileLayer('https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i' +
      '{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0', {
      minZoom: 1,
      maxZoom: 22,
      attribution: '&copy; <a href=\'http://maps.google.com\'>Google Maps</a>'
    })
  };

  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  };

  LAYER_MBOX = {
    id: 'mapbox',
    name: 'Mapbox',
    enabled: false,
    // layer: L.tileLayer('https://a.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={token}', {
    layer: L.tileLayer('https://a.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={token}', {
      minZoom: 1,
      maxZoom: 19,
      style: 'mapbox://styles/mapbox/streets-v9',
      attribution: 'Mapbox',
      subdomains: ['a', 'b', 'c', 'd'],
      token: 'pk.eyJ1IjoicHppZWdsZXIiLCJhIjoiY2ltMHo3OGRxMDh0MXR5a3JrdHNqaGQ0bSJ9.KAFBMeyysBLz4Ty-ltXVQQ'
    })
  };

  // Neighborhood
  neighborhood = {
    id: 'neighborhood',
    name: 'Vizinhança',
    enabled: true,
    layer: L.circle([ this.centerLat, this.centerLng], { radius: 2000 })
  };
  // Weighting Area
  weightingArea = {
    id: 'weightingArea',
    name: 'Área de Ponderação',
    enabled: true,
    layer: L.geoJSON(
      ({
        type: 'MultiPolygon',
        coordinates: [[[
          [ 0, 0 ],
          [ 0, 0 ],
          [ 0, 0 ],
          [ 0, 0 ]
        ]]]
      }) as any,
      { style: () => { return {
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: 'red',  // Outline color
        fillOpacity: 0.2 }; } })
  };
  // Icon of a school selected
  marker = {
    id: 'marker',
    name: 'Marker',
    enabled: true,
    layer: L.marker([ this.centerLat, this.centerLng ], {
      icon: L.icon({
        iconUrl: 'assets/images/marcador_school_selected.png',
        iconSize: [60, 65], // size of the icon
        iconAnchor: [30, 65], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -65] // point from which the popup should open relative to the iconAnchor
      })
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = {position: 'bottomright'};
  baseMaps = {
    'Google Street Maps': this.LAYER_GSM.layer,
    'Open Street Map': this.LAYER_OSM.layer,
    'Mapbox': this.LAYER_MBOX.layer
  };
  options = {zoomControl: false, fullscreenControl: true};
  zoom = 14;
  // zoomOptions= L.control.zoom({position: 'topright'});
  zoomOptions = {
    position: 'topright'
  };
  center = L.latLng([this.centerLat, this.centerLng]);
  zoom_school_selected = 14;

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
  schoolSelectedFlag = false;
  weightingAreaInfoSelectedFlag = false;
  // ------------------------------
  // Form model object
  model = new LayersModel(
    [ this.LAYER_GSM, this.LAYER_OSM, this.LAYER_MBOX ],
    this.LAYER_GSM.id,
    [ this.weightingArea, this.marker]
  );

  // Values to bind to Leaflet Directive
  layers: L.Layer[];
  /*layersControl = {
    baseLayers: {
      'Google Street Maps': this.LAYER_GSM.layer,
      'Open Street Maps': this.LAYER_OSM.layer
    },
    overlays: {
      'Vizinhança': this.neighborhood.layer,
      'Área de Ponderação': this.weightingArea.layer,
      'Icone da escola selecionada': this.marker.layer
    }
  };*/

  constructor(private schoolService: SchoolService,
              private weigthingAreaService: WeightingAreaService,
              private sharedDataService: ShareddataService,
              private router: Router, private zone: NgZone) {
    /*const s = sharedDataService.getSchoolID().subscribe(
      schoolID => {
        this.selectionSchooolID = schoolID;
      });
    this.subscription.add(s);*/
    // Get the active base layer
    const baseLayer = this.model.baseLayers.find((l) => l.id === this.model.baseLayer);
    this.layers = [baseLayer.layer];
  }

  onApply() {
    // Get the active base layer
    const baseLayer = this.model.baseLayers.find((l) => l.id === this.model.baseLayer);

    // Get all the active overlay layers
    const newLayers = this.model.overlayLayers
      .filter((l) => l.enabled)
      .map((l) => l.layer);
    newLayers.unshift(baseLayer.layer);

    this.layers = newLayers;

    return false;
  }

  /*
  * Function to round the decimal number to 6 decimals
  * */
  roundDecimalNumber(decimalNumber: number, numberOfDigitsToRound: number) {
    return Math.round(decimalNumber * Math.pow(10, numberOfDigitsToRound)) / Math.pow(10, numberOfDigitsToRound);
  }

  /*
  * Function to trunc the number's decimal to 6 decimals
  * */

  truncDecimalNumber(decimalNumber: number, numberOfDigitsToTrunc: number) {
    return Math.trunc(decimalNumber * Math.pow(10, numberOfDigitsToTrunc)) / Math.pow(10, numberOfDigitsToTrunc);
  }

  ngOnInit() {

    const s = this.sharedDataService.getSchoolLoc().subscribe(
      res => {
        this.LOCATION = res;
        console.log(this.LOCATION);
        this.zoom = this.zoom_school_selected;
        const latRounded = this.truncDecimalNumber(this.LOCATION.LAT, 6);
        const lonRounded = this.truncDecimalNumber(this.LOCATION.LON, 6);
        this.center = L.latLng([latRounded, lonRounded]);
        this.schoolSelectedFlag = true;
        this.weightingAreaInfoSelectedFlag = true;
        console.log('update center in ngOnInit:', this.center);
        this.drawIconForSchoolSelected(latRounded, lonRounded);
        // this.drawSchoolNeighborhoodArea(this.neighborhoodRadius, latRounded, lonRounded);
        console.log('Desenhar o ap:', this.LOCATION.CODAP);
        // this.drawWeightingAreaPolygon(this.LOCATION.CODAP);
        const codAp = this.LOCATION.CODAP;
        this.weigthingAreaService.getWeightingArea(codAp).then((res1) => {
          this.weightingAreaOfSchool = res1;
          this.weightingArea.layer = L.geoJSON(this.weightingAreaOfSchool, {style: this.weightingAreaStyle});
          this.onApply();
        });
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

  drawIconForSchoolSelected(schoolLat: number, schoolLng: number) {
    this.marker.layer = L.marker([ schoolLat, schoolLng ], {
      icon: this.selectedSchoolMarkerIcon
    });
  }

  drawSchoolNeighborhoodArea(neighborhoodRadius: number, schoolLat: number, schoolLng: number) {
    this.neighborhood.layer = L.circle(L.latLng(schoolLat, schoolLng), {radius: neighborhoodRadius, weight: 1}),
      L.marker(L.latLng(schoolLat, schoolLng));
  }

  drawWeightingAreaPolygon(codAp: string) {
    this.weigthingAreaService.getWeightingArea(codAp).then((res) => {
      this.weightingAreaOfSchool = res;
      this.weightingArea.layer = L.geoJSON(this.weightingAreaOfSchool, {style: this.weightingAreaStyle});
    });
  }

  weightingAreaStyle() {
    return {
      fillColor: 'red',
      weight: 1,
      opacity: 1,
      color: 'red',  // Outline color
      fillOpacity: 0.2
    };
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

  getSchoolsList() {
    this.schoolSelectedFlag = false;
    this.weightingAreaInfoSelectedFlag = false;
    let id_temp = '';
    // this.school_sel_id = '';
    this.schoolService.getAllSchools().then((res) => {
      this.schoolsCoordinates = res;
      this.featureCollection.features = this.schoolsCoordinates;
      const data: any[] = [];
      console.log(this.schoolsCoordinates.length);
      let popup_text = '';
      let container = $('<div />');
      let marker;
      let school_i;


      container.on('click', '.speciallink', function () {
        alert('test');
      });

      for (let i = 0; i < this.schoolsCoordinates.length; i++) {
        container = $('<div />');
        school_i = this.schoolsCoordinates[i];
        const latRounded = this.truncDecimalNumber(school_i.lat, 6);
        const lonRounded = this.truncDecimalNumber(school_i.lon, 6);
        popup_text = '<p style="margin-bottom: 0px;">' + school_i._id + '</p>' +
          '<br/><b>ESCOLA: </b>' + school_i.detalhes.nomeesc +
          '<br/><b>BAIRRO: </b>' + school_i.detalhes.bairro +
          '<br/><b>ENDEREÇO: </b>' + school_i.detalhes.endereco + ' - ' + school_i.detalhes.numero +
          '<br/><b>LOC.: </b>' + latRounded + ', ' + lonRounded +
        '<br/> Click no icone/marker para ver mais informações';
          // '<br/><button class="trigger">Say hi</button> ' ;

        // popup_text = '<b>_ID:</b> <p id="idschool">' + school_i._id + '</p><button class="trigger">Say hi</button>';

        container.html(popup_text);
        marker = L.marker(L.latLng(latRounded, lonRounded), {icon: this.schoolMarkerIcon});

        // data.push(marker.bindPopup($('<a href="#" class="speciallink">TestLink</a>').click(function() {alert('test'); })[0]));
        marker.bindPopup(container[0]);
        marker.on('mouseover', function (e) {
          console.log('pasando el mouse');
          this.openPopup();
        });

        marker.on('click', (e) => {
          this.weightingAreaInfoSelectedFlag = true;

          this.zone.run(() => {
            // this.updateSchoolIDSel('5ac3a33d61f5122e7261c263');
            console.log('marker clicked:', e.target._popup._content);
            id_temp = e.target._popup._content.children[0].innerHTML;
            console.log('id_escola :', id_temp);

            const dom: any = document.querySelector('body');
            if (!$('.push-left-indicators-by-weighting-areas')[0]) {
              console.log($('.push-left-indicators-by-weighting-areas')[0]);

              dom.classList.toggle('push-left-indicators-by-weighting-areas');
              console.log('procurando a informaçao detalhada da AP da escola escolhida');
            }
            if (!$('.push-right-school-details')[0]) {
              console.log($('.push-right-school-details')[0]);

              dom.classList.toggle('push-right-school-details');
              console.log('procurando a informaçao detalhada da escola escolhida');
            }
            // update the school ID in the shareservice
            this.updateSchoolIDSel(id_temp);
          });

        });

        marker.on('mouseout', function (e) {
          // this.closePopup();
        });
        data.push(marker);

      }
      this.markerClusterData = data;
      console.log('getschoollist: ', this.center);

    }, (err) => {
      console.log(err);
    });
  }

  updateSchoolIDSel(selectedSchoolID) {
    // send school ID to school-details component via observable subject
    this.sharedDataService.sendSchoolID(selectedSchoolID);
    console.log('sending school id', selectedSchoolID);
    this.onSchoolSel.emit(selectedSchoolID);
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;

    /* // open the panel clicking on the buttom into popup
      $('#mymap').on('click', '.trigger', function(a) {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('push-left-indicators-by-weighting-areas');
    });*/
  }

  mapReady(map: L.Map) {
    map.addControl(L.control.zoom({position: 'bottomleft'}));
  }

  toggleSchoolDetails() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right-school-details');
    const togglebutton: any = document.getElementById('toggle-school-details-icon');
    if (dom.classList.contains('push-right-school-details')) {
      togglebutton.classList.add('fa-chevron-left');
      togglebutton.classList.remove('fa-chevron-right');
    } else {
      // this.toggleSchoolDetailsIcon = 'chevron_left';
      togglebutton.classList.add('fa-chevron-right');
      togglebutton.classList.remove('fa-chevron-left');
    }
  }

  toggleIndicatiorsByWeightingAreas() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-left-indicators-by-weighting-areas');
    const togglebutton: any = document.getElementById('toggle-weighting-area-icon');
    console.log('procurando a informação dos indicadores por AP');
    if (dom.classList.contains('push-left-indicators-by-weighting-areas')) {
      togglebutton.classList.add('fa-chevron-right');
      togglebutton.classList.remove('fa-chevron-left');
    } else {
      togglebutton.classList.add('fa-chevron-left');
      togglebutton.classList.remove('fa-chevron-right');
    }
  }

  toggleWeigthingArea() {
    console.log(this.overlays.length);
    console.log(this.overlays[1]);
    // this.overlays[1].visible = false;
  }

  toggleSettings() {
    alert('Mostrar janela de settings');
  }

  // unsubscribe to ensure no memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTabSelected() {

  }
}
