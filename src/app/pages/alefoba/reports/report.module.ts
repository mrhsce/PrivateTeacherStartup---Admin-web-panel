import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {ReportListItemComponent} from "./report-list-item/report-list-item.component";
import {ReportComponent} from "./report.component";
import {ReportDetailListItemComponent} from "./report-detail-list-item/report-detail-list-item.component";



@NgModule({
    declarations: [ReportListItemComponent, ReportComponent, ReportDetailListItemComponent],
    imports: [
        SharedModule,
    ],
    entryComponents: [
    ],
    exports: [
    ],
})
export class ReportModule {
}
