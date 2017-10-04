import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import {AgmCoreModule} from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header.component';
import {TranslateModule} from '@ngx-translate/core';
import {Ng2CompleterModule} from 'ng2-completer';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HeaderRoutingModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    Ng2CompleterModule,
    NgbDropdownModule
  ],
  declarations: [
    HeaderComponent // important!
  ],
  exports: [
    HeaderComponent // important!
  ]
})
export class HeaderModule { }
