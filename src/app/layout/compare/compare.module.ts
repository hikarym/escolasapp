import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import {AgmCoreModule} from '@agm/core';
import {CompareComponent} from './compare.component';

@NgModule({
  imports: [
    CommonModule,
    CompareRoutingModule,
    AgmCoreModule
  ],
  declarations: [
    CompareComponent
  ]
})
export class CompareModule { }
