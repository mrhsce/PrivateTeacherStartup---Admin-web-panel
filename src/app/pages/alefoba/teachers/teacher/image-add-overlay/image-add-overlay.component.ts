import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbComponentStatus, NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {DocumentService} from "../../../../../services/document.service";
import {Enum} from "../../../../../entities/Enum";

@Component({
  selector: 'ngx-image-add-overlay',
  templateUrl: './image-add-overlay.component.html',
  styleUrls: ['./image-add-overlay.component.scss']
})
export class ImageAddOverlayComponent {

    constructor(private documentService: DocumentService, protected ref: NbDialogRef<ImageAddOverlayComponent>,
                private toastrService: NbToastrService) {
    }

    imageName: string;
    docType: number;
    file;

    @Input() teacherId: number;
    @Input() docTypes: Enum[];

    openFile(event) {
        this.file = event.target.files[0];
    }


    cancel() {
        this.ref.close();
    }

    addImage() {
        this.documentService.uploadDocument(this.teacherId, this.docType, this.imageName, this.file).
        subscribe((success) => {
            this.showToastSuccess('آپلود موفق', 'تصویر با موفقیت آپلود شد');
            this.ref.close(true);
        }, (error) => {
            this.showToastFailure('خطا در آپلود', 'تصویر آپلود نشد');
        });
    }

    onDocTypeChanged(selectedId) {
        this.docType = selectedId;
    }

    showToastSuccess(title, description) {
        const status: NbComponentStatus = 'success';
        const config = {
            status: status,
            destroyByClick: true,
            duration: 2000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };

        this.toastrService.show(
            description,
            title,
            config);
    }

    showToastFailure(title, description) {
        const status: NbComponentStatus = 'danger';
        const config = {
            status: status,
            destroyByClick: true,
            duration: 3000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            preventDuplicates: false,
        };
        this.toastrService.show(
            description,
            title,
            config);
    }

}
