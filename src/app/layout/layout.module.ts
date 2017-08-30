import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent} from '../shared';

import { EscolaService} from '../escola.service';
import { HttpModule} from '@angular/http';
import {HeaderModule} from '../shared/components/header/header.module';
import {SchoolDetailsModule} from "../shared/components/school-details/school-details.module";

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    LayoutRoutingModule,
    TranslateModule,
    HttpModule,
    HeaderModule,
    SchoolDetailsModule
  ],
  declarations: [
    LayoutComponent,
    // HeaderComponent,
    SidebarComponent
  ],

  providers: [EscolaService]

})
export class LayoutModule { }
