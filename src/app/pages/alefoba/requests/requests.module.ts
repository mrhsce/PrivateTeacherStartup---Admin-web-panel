import {NgModule} from '@angular/core';
import {RequestComponent} from "./request/request.component";
import {RequestsComponent} from "./requests.component";
import {RequestListItemComponent} from "./request-list-item/request-list-item.component";
import {TeacherListItemComponent} from "./request/teacher-list-item/teacher-list-item.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [RequestsComponent, RequestListItemComponent, RequestComponent, TeacherListItemComponent],
    imports: [
        SharedModule,
    ],
    entryComponents: [
    ],
    exports: [
    ],
})
export class RequestsModule {
}
