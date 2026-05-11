import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Document} from "../../../../../entities/Document";

@Component({
  selector: 'ngx-document-list-item',
  templateUrl: './document-list-item.component.html',
  styleUrls: ['./document-list-item.component.scss'],
})
export class DocumentListItemComponent {

    @Input() document: Document;

    @Output() deleteDocument = new EventEmitter();

    @Output() viewDocument = new EventEmitter();

    onDocumentDelete() {
        this.deleteDocument.emit();
    }

    onViewDocument() {
        this.viewDocument.emit();
    }
}
