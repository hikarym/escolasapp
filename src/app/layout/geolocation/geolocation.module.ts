import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from './geolocation.component';
import { AgmCoreModule } from '@agm/core';
import {HeaderModule} from '../../shared/components/header/header.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import { GraphicsComponent } from './graphics/graphics.component';

@NgModule({
  imports: [
    CommonModule,
    GeolocationRoutingModule,
    AgmCoreModule,
    LeafletModule,
    LeafletMarkerClusterModule
  ],
  declarations: [
    GeolocationComponent,
    GraphicsComponent
  ]
})
export class GeolocationModule { }
