import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';

import { NgxLoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      // {
      //   path: 'request-password',
      //   component: NgxRequestPasswordComponent,
      // },
      // {
      //   path: 'request-password-verificate',
      //   component: NgxRequestPasswordVerificateComponent,
      // },
      // {
      //   path: 'reset-password',
      //   component: NgxResetPasswordComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {}
