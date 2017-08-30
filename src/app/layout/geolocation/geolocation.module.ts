import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from './geolocation.component';
import { AgmCoreModule } from '@agm/core';
import {HeaderModule} from "../../shared/components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    GeolocationRoutingModule,
    AgmCoreModule
  ],
  declarations: [
    GeolocationComponent
  ]
})
export class GeolocationModule { }
