import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Student} from "../../../../entities/Student";

@Component({
    selector: 'ngx-student-list-item',
    templateUrl: './student-list-item.component.html',
    styleUrls: ['./student-list-item.component.scss'],
})
export class StudentListItemComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() student: Student;


    @Output() ban = new EventEmitter();
    @Output() activate = new EventEmitter();

    onBanPressed() {
        this.ban.emit();
    }

    onActivatePressed() {
        this.activate.emit();
    }

    goToStudentPage() {
        this.router.navigate(['../student/' + this.student.Id], {relativeTo: this.route});
    }
}
