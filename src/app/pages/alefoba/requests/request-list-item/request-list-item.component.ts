import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Request} from "../../../../entities/Request";

@Component({
    selector: 'ngx-request-list-item',
    templateUrl: './request-list-item.component.html',
    styleUrls: ['./request-list-item.component.scss'],
})
export class RequestListItemComponent {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    @Input() request: Request;


    @Output() disable = new EventEmitter();

    onDisablePressed() {
        this.disable.emit();
    }

    goToRequestPage() {
        this.router.navigate(['../request/' + this.request.Id], {relativeTo: this.route});
    }
}
