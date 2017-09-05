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
  allSchoolsLayer: any;
  options2: any;
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
  schoolsCollection: GeoJSON.FeatureCollection<any> = {type: 'FeatureCollection', features: []};
  locationGeoJSON = {
    id: 'geoJSON',
    name: 'GEO JSON Point',
    enabled: true,
    layer: L.geoJSON(this.featureCollection)
    /*layer: L.geoJSON(
      ([
        {type: 'Point', coordinates: [-47.14398600000312, -23.986885999998258]},
        {type: 'Point', coordinates: [-47.14554500000313, -23.98571699999825]},
        {type: 'Point', coordinates : [ -47.14556000000313, -23.98568499999824 ] }
      ]) as any,
      { style: () => ({ color: '#ff7800' })})*/
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
  // layers: L.Layer[];
  layers: L.Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer
    },
    overlays: {
      'Schools': this.allSchoolsLayer
    }
  };
  options = {
    zoom: 14,
    center: L.latLng([this.lat, this.lng])
  };

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
    this.schoolsCollection.features = this.schoolsCoordinates;
    // const dom: any = document.querySelector('body');
    /*this.allSchoolsLayer = {
      id: 'geoJSON',
      name: 'GEO JSON Point',
      enabled: true,
      layer: L.geoJSON(this.schoolsCoordinates, {
        pointToLayer: function (geoJsonPoint, latlng) {
          return L.marker(latlng);
        }
      }).addTo(dom.mymap)
    };*/
    /*this.layers = [
        L.marker([ this.lat, this.lng ], {icon: this.selectedSchoolMarkerIcon }),
        L.marker([-23.986885999998258, -47.14398600000312], {icon: this.schoolMarkerIcon})
    ];*/
    this.layers = [L.geoJSON(this.featureCollection, {
      pointToLayer: function(feature, latlng) {
        console.log(latlng, feature);
        return L.marker(latlng, {icon:L.icon({iconUrl: 'assets/images/marcador_small.png'})});
      }
     })
    ];
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
