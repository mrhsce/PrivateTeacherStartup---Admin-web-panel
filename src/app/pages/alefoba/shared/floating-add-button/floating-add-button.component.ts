import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'ngx-floating-add-button',
    templateUrl: './floating-add-button.component.html',
    styleUrls: ['./floating-add-button.component.scss']
})
export class FloatingAddButtonComponent implements OnInit {

    @Output() onAddPressed = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onButtonPressed(){
        this.onAddPressed.emit();
    }

}
