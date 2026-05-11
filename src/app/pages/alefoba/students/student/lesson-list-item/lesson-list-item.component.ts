import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeacherLesson} from "../../../../../entities/TeacherLesson";
import {Level} from "../../../../../entities/Level";

@Component({
  selector: 'ngx-lesson-list-item',
  templateUrl: './lesson-list-item.component.html',
  styleUrls: ['./lesson-list-item.component.scss'],
})
export class LessonListItemComponent {

    @Input() lesson: TeacherLesson;
    @Input() levels: Level[];

    @Output() levelChanged = new EventEmitter<Number>();

    onLessonLevelChanged(selectedId) {
        this.levelChanged.emit(selectedId);
    }
}
