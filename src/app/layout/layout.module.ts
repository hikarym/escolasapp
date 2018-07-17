import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent} from '../shared';

import { HttpModule} from '@angular/http';
import {HeaderModule} from '../shared/components/header/header.module';
import {ShareddataService} from '../services/shareddata.service';
import {SchoolService} from '../services/school.service';
import {WeightingAreaService} from '../services/weighting-area.service';
import { AboutProjectComponent } from './about-project/about-project.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule.forRoot(),
    LayoutRoutingModule,
    TranslateModule,
    HttpModule,
    HeaderModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    AboutProjectComponent
  ],

  providers: [SchoolService, WeightingAreaService, ShareddataService]

})
export class LayoutModule { }
