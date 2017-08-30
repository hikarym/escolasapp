import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolDetailsRoutingModule } from './school-details-routing.module';
import {SchoolDetailsComponent} from './school-details.component';

@NgModule({
  imports: [
    CommonModule,
    SchoolDetailsRoutingModule
  ],
  declarations: [
    SchoolDetailsComponent
  ],
  exports: [
    SchoolDetailsComponent
  ]
})
export class SchoolDetailsModule { }
