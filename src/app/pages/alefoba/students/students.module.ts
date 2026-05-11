import {NgModule} from '@angular/core';
import {StudentsComponent} from './students.component';
import {StudentListItemComponent} from './student-list-item/student-list-item.component';
import {SharedModule} from "../shared/shared.module";
import { LessonListItemComponent } from './student/lesson-list-item/lesson-list-item.component';
import {StudentComponent} from "./student/student.component";


@NgModule({
    declarations: [StudentsComponent, StudentListItemComponent, StudentComponent, LessonListItemComponent],
    imports: [
        SharedModule,
    ],
    entryComponents: [
    ],
    exports: [
    ],
})
export class StudentsModule {
}
