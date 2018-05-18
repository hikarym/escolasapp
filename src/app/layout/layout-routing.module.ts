import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {GeolocationComponent} from './geolocation/geolocation.component';
import {AboutProjectComponent} from './about-project/about-project.component';
import {EducationalVariablesComponent} from './educational-variables/educational-variables.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'geolocation', loadChildren: './geolocation/geolocation.module#GeolocationModule' },
      { path: 'school-details/:id', loadChildren: './geolocation/geolocation.module#GeolocationModule' },
      { path: 'compare', loadChildren: './compare/compare.module#CompareModule'},
      { path: 'educational-variables', component: EducationalVariablesComponent},
      /*{ path: 'socioeconomic-indicators', component: SocioeconomicIndicatorsComponent},*/
      { path: 'about-project', component: AboutProjectComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
