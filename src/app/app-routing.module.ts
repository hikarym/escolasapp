import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GeolocationComponent} from './layout/geolocation/geolocation.component';
import {HeaderComponent} from './shared/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule'
  },
  // { path: '', loadChildren: './shared/components/header/header.module#HeaderModule'},
  {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {path: '**', redirectTo: 'not-found'}
  /*{path: '/geolocation', component: GeolocationComponent},
  {path: '/header', component: HeaderComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
