import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {TeachersComponent} from "./alefoba/teachers/teachers.component";
import {TeacherComponent} from "./alefoba/teachers/teacher/teacher.component";
import {LessonsComponent} from "./alefoba/lessons/lessons.component";
import {StudentsComponent} from "./alefoba/students/students.component";
import {StudentComponent} from "./alefoba/students/student/student.component";
import {ECommerceComponent} from "./e-commerce/e-commerce.component";
import {RequestsComponent} from "./alefoba/requests/requests.component";
import {RequestComponent} from "./alefoba/requests/request/request.component";
import {ReportComponent} from "./alefoba/reports/report.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
      {
        path: 'teachers',
          component: TeachersComponent,
      },
      {
          path: 'teacher/:id',
          component: TeacherComponent,
      },
      {
          path: 'students',
          component: StudentsComponent,
      },
      {
          path: 'student/:id',
          component: StudentComponent,
      },
      {
          path: 'requests',
          component: RequestsComponent,
      },
      {
          path: 'reports',
          component: ReportComponent,
      },
      {
          path: 'request/:id',
          component: RequestComponent,
      },
      {
          path: 'lessons',
          component: LessonsComponent,
      },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    // {
    //   path: '',
    //   redirectTo: 'dashboard',
    //   pathMatch: 'full',
    // },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
