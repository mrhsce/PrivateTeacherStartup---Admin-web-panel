import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeacherLesson} from "../../../../../entities/TeacherLesson";
import {Level} from "../../../../../entities/Level";
import {Teacher} from "../../../../../entities/Teacher";

@Component({
  selector: 'ngx-teacher-list-item',
  templateUrl: './teacher-list-item.component.html',
  styleUrls: ['./teacher-list-item.component.scss'],
})
export class TeacherListItemComponent {

    @Input() teacher: Teacher;

    @Output() remove = new EventEmitter<Number>();

    onRemove() {
        this.remove.emit();
    }
}
