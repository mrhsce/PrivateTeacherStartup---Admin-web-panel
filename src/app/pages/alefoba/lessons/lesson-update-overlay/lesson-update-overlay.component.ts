import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Lesson} from "../../../../entities/Lesson";

@Component({
  selector: 'ngx-lesson-update-overlay',
  templateUrl: './lesson-update-overlay.component.html',
  styleUrls: ['./lesson-update-overlay.component.scss']
})
export class LessonUpdateOverlayComponent implements OnInit {

    constructor(protected ref: NbDialogRef<LessonUpdateOverlayComponent>) {
    }

    @Input() lesson: Lesson;

    ngOnInit() {
        if (!this.lesson) {
            this.lesson = new Lesson();
        }
    }

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(this.lesson);
    }

}
