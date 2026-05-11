import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {TeachersModule} from "./alefoba/teachers/teachers.module";
import {LessonsModule} from "./alefoba/lessons/lessons.module";
import {StudentsModule} from "./alefoba/students/students.module";
import {RequestsModule} from "./alefoba/requests/requests.module";
import {ReportModule} from "./alefoba/reports/report.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
      TeachersModule,
      StudentsModule,
      LessonsModule,
      RequestsModule,
      ReportModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
