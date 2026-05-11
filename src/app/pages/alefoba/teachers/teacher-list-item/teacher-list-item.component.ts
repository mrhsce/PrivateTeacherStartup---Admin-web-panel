import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Teacher} from '../../../../entities/Teacher';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'ngx-teacher-list-item',
    templateUrl: './teacher-list-item.component.html',
    styleUrls: ['./teacher-list-item.component.scss'],
})
export class TeacherListItemComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() teacher: Teacher;


    @Output() ban = new EventEmitter();
    @Output() activate = new EventEmitter();
    @Output() deactivate = new EventEmitter();
    @Output() edit = new EventEmitter();

    onBanPressed() {
        this.ban.emit();
    }

    onActivatePressed() {
        this.activate.emit();
    }

    onDeactivatePressed() {
        this.deactivate.emit();
    }

    goToEditPage(){
        this.edit.emit();
    }

    goToTeacherPage() {
        this.router.navigate(['../teacher/' + this.teacher.Id], {relativeTo: this.route, queryParams:
                {name: this.teacher.Name, family: this.teacher.Family, gender: this.teacher.Gender}});
    }
}
