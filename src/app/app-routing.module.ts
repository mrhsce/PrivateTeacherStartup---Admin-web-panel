import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {NbAuthGuard} from "./route-guards/auth-guard.service";
import {NbNoAuthGuard} from "./route-guards/no-auth-guard.service";

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: 'app/pages/pages.module#PagesModule',
        canActivate: [NbAuthGuard],
    },
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#NgxAuthModule',
        canActivate: [NbNoAuthGuard],
    },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
