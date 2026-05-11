import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Report} from "../../../../entities/Report";

@Component({
    selector: 'ngx-report-list-item',
    templateUrl: './report-list-item.component.html',
    styleUrls: ['./report-list-item.component.scss'],
})
export class ReportListItemComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() report: Report;


    @Output() disable = new EventEmitter();

}
