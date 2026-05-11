import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Lesson} from "../../../../entities/Lesson";

@Component({
  selector: 'ngx-lesson-list-item',
  templateUrl: './lesson-list-item.component.html',
  styleUrls: ['./lesson-list-item.component.scss']
})
export class LessonListItemComponent{

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() lesson: Lesson;


    @Output() delete = new EventEmitter();
    @Output() update = new EventEmitter();

    onDeletePressed() {
        this.delete.emit();
    }

    onUpdatePressed() {
        this.update.emit();
    }
}
