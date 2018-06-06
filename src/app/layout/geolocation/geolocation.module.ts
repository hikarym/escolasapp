import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeolocationRoutingModule } from './geolocation-routing.module';
import { GeolocationComponent } from './geolocation.component';
import { AgmCoreModule } from '@agm/core';
// import {HeaderModule} from '../../shared/components/header/header.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {ChartsModule as Ng2Charts} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatTabsModule} from '@angular/material';
import {MapDirective } from './map.directive';
import {
  IndicatorsByWeightingAreasComponent
} from './indicators-by-weighting-areas/indicators-by-weighting-areas.component';
import {EducationalIndicatorsComponent} from './educational-indicators/educational-indicators.component';
import { GeralInformationComponent } from './educational-indicators/geral-information/geral-information.component';
import { GraphsComponent } from './educational-indicators/graphs/graphs.component';

@NgModule({
  imports: [
    CommonModule,
    GeolocationRoutingModule,
    AgmCoreModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    Ng2Charts,
    FormsModule,
    TranslateModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    GeolocationComponent,
    MapDirective,
    IndicatorsByWeightingAreasComponent,
    EducationalIndicatorsComponent,
    GeralInformationComponent,
    GraphsComponent
  ]
  /*providers: [RoundDecimalPipe]*/
})
export class GeolocationModule { }
