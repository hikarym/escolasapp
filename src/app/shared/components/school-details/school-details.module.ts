import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsRoutingModule } from './school-details-routing.module';
import {SchoolDetailsComponent} from './school-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatSlideToggleModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SchoolDetailsRoutingModule,
    TranslateModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  declarations: [
    SchoolDetailsComponent
  ],
  exports: [
    SchoolDetailsComponent
  ]
})
export class SchoolDetailsModule { }
