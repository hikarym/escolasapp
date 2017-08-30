import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule'
  },
  // { path: '', loadChildren: './shared/components/header/header.module#HeaderModule'},
  {path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule'},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
