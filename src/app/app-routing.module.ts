import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GeolocationComponent} from './layout/geolocation/geolocation.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule' },
  // { path: '', loadChildren: './shared/components/header/header.module#HeaderModule'},
  // {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {component: NotFoundComponent, path: 'not-found'},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
