import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
    selector: 'ngx-yes-no-overlay',
    templateUrl: './yes-no-overlay.component.html',
    styleUrls: ['./yes-no-overlay.component.scss']
})
export class YesNoOverlayComponent implements OnInit {

    @Input('description') description: string;

    constructor(protected ref: NbDialogRef<YesNoOverlayComponent>) {
    }

    ngOnInit() {
    }

    onAccepted() {
        this.ref.close(true);
    }

    onRejected() {
        this.ref.close(false);
    }

}
