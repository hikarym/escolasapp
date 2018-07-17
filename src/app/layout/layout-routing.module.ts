import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {AboutProjectComponent} from './about-project/about-project.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'geolocation', loadChildren: './geolocation/geolocation.module#GeolocationModule' },
      { path: 'school-details/:id', loadChildren: './geolocation/geolocation.module#GeolocationModule' },
      { path: 'about-project', component: AboutProjectComponent}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
