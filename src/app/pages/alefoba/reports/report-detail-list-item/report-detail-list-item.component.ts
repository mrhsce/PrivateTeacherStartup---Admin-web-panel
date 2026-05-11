import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Report} from "../../../../entities/Report";

@Component({
    selector: 'ngx-report-detail-list-item',
    templateUrl: './report-detail-list-item.component.html',
    styleUrls: ['./report-detail-list-item.component.scss'],
})
export class ReportDetailListItemComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() report: Report;


    @Output() disable = new EventEmitter();

}
