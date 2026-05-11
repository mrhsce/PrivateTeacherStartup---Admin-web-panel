import {NgModule} from '@angular/core';
import {TeachersComponent} from './teachers.component';
import {TeacherListItemComponent} from './teacher-list-item/teacher-list-item.component';
import {SharedModule} from "../shared/shared.module";
import { TeacherComponent } from './teacher/teacher.component';
import { LessonListItemComponent } from './teacher/lesson-list-item/lesson-list-item.component';
import {TeacherUpdateOverlayComponent} from "./teacher-update-overlay/teacher-update-overlay.component";
import { DocumentListItemComponent } from './teacher/document-list-item/document-list-item.component';
import { ImageAddOverlayComponent } from './teacher/image-add-overlay/image-add-overlay.component';


@NgModule({
    declarations: [TeachersComponent, TeacherListItemComponent, TeacherComponent, LessonListItemComponent,
    TeacherUpdateOverlayComponent, DocumentListItemComponent, ImageAddOverlayComponent],
    imports: [
        SharedModule,
    ],
    entryComponents: [ TeacherUpdateOverlayComponent, ImageAddOverlayComponent,
    ],
    exports: [
    ],
})
export class TeachersModule {
}
