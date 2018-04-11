import {Component, NgModule} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { AgmCoreModule} from '@agm/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageHeaderComponent } from './shared/modules/page-header/page-header.component';
import {HeaderModule} from './shared/components/header/header.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {SchoolDetailsModule} from './shared/components/school-details/school-details.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {NotFoundModule} from './not-found/not-found.module';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSlideToggleModule, MatIconModule, MatTabsModule, MatTabGroup} from '@angular/material';
import {SharedPipesModule} from './shared/pipes/shared-pipes.module';
import {ApSecVariableService} from './services/ap-sec-variable.service';
import {BrSpRmspSecVariableService} from './services/br-sp-rmsp-sec-variable.service';
import {WeightingAreaService} from './services/weighting-area.service';
import {SchoolService} from './services/school.service';
import {ShareddataService} from './services/shareddata.service';


export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({ 	apiKey: 'AIzaSyAQutpUtLQSoM-AjbwB0sCnPcw1M3xx1s4' // key of Google Maps Javascript API
    }),
    LeafletModule.forRoot(),
    LeafletMarkerClusterModule.forRoot(),
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    SchoolDetailsModule,
    Ng2CompleterModule,
    NotFoundModule,
    NgbDropdownModule.forRoot(),
    MatSlideToggleModule,
    MatIconModule,
    MatTabsModule,

  ],
  providers: [ShareddataService, WeightingAreaService, SchoolService, ApSecVariableService, BrSpRmspSecVariableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
