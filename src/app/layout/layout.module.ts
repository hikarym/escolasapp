import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent} from '../shared';

import { HttpModule} from '@angular/http';
import {HeaderModule} from '../shared/components/header/header.module';
// import {SchoolDetailsModule} from '../shared/components/school-details/school-details.module';
import {ShareddataService} from '../services/shareddata.service';
import {SchoolService} from '../services/school.service';
import {WeightingAreaService} from '../services/weighting-area.service';
import { AboutProjectComponent } from './about-project/about-project.component';
import { EducationalVariablesComponent } from './educational-variables/educational-variables.component';


@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    LayoutRoutingModule,
    TranslateModule,
    HttpModule,
    HeaderModule
    // SchoolDetailsModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    AboutProjectComponent,
    EducationalVariablesComponent
  ],

  providers: [SchoolService, WeightingAreaService, ShareddataService]

})
export class LayoutModule { }
