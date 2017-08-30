import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    // CommonModule,
    NotFoundRoutingModule,
    RouterModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
