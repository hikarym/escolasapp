import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { AgmCoreModule} from '@agm/core';
import { EscolaService } from './escola.service';
import { HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PageHeaderComponent } from './shared/modules/page-header/page-header.component';
import {HeaderModule} from './shared/components/header/header.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {SchoolDetailsModule} from './shared/components/school-details/school-details.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

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
    HttpModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    SchoolDetailsModule,
    Ng2CompleterModule
  ],
  providers: [EscolaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
