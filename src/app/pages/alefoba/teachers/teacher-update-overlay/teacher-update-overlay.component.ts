import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Teacher} from "../../../../entities/Teacher";

@Component({
  selector: 'ngx-lesson-update-overlay',
  templateUrl: './teacher-update-overlay.component.html',
  styleUrls: ['./teacher-update-overlay.component.scss']
})
export class TeacherUpdateOverlayComponent implements OnInit {

    constructor(protected ref: NbDialogRef<TeacherUpdateOverlayComponent>) {
    }

    @Input() teacher: Teacher;

    ngOnInit() {
        if (!this.teacher) {
            this.teacher = new Teacher();
        }
    }

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(this.teacher);
    }

}
