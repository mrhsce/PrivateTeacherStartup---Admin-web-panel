import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {LessonsComponent} from "./lessons.component";
import { LessonListItemComponent } from './lesson-list-item/lesson-list-item.component';
import { LessonUpdateOverlayComponent } from './lesson-update-overlay/lesson-update-overlay.component';


@NgModule({
    declarations: [LessonsComponent, LessonListItemComponent, LessonUpdateOverlayComponent,
        ],
    imports: [
        SharedModule,
    ],
    entryComponents: [LessonUpdateOverlayComponent
    ],
    exports: [
    ],
})
export class LessonsModule {
}
