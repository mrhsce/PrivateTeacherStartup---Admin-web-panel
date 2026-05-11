import { Component, OnInit } from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {LessonService} from "../../../services/lesson.service";
import {Lesson} from "../../../entities/Lesson";
import {LessonUpdateOverlayComponent} from "./lesson-update-overlay/lesson-update-overlay.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

    // listStatus
    public LIST_LOADING = 0;
    public LIST_EMPTY = 1;
    public LIST_LOADED = 2;
    public LIST_ERROR = 5;

    public searchTerm: string = '';

    public list = [];

    public listStatus = this.LIST_LOADING;

    serviceSubscription: Subscription;

    constructor(private lessonService: LessonService, private dialogService: NbDialogService,
                private toastrService: NbToastrService) {
    }

    ngOnInit() {
        this.updateList();

        this.serviceSubscription = this.lessonService.observer.subscribe(() => {
            this.updateList();
        });
    }

    ngOnDestroy(): void {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }
    }

    updateList() {
        this.lessonService.getLessonsList(this.searchTerm).subscribe((objects) => {
            if (objects.length === 0) {
                this.listStatus = this.LIST_EMPTY;
            } else {
                this.listStatus = this.LIST_LOADED;
            }
            this.list = objects;
        }, (error) => {
            this.listStatus = this.LIST_ERROR;
        });
    }

    addLesson(lesson: Lesson) {
        this.lessonService.addLesson(lesson).subscribe((success) => {
            this.lessonService.observer.next();
            this.showToastSuccess('افزودن درس ', lesson.Title + ' افزودن شد!');
        }, (error) => {
            this.showToastFailure('شکست افزودن درس ', lesson.Title + ' افزودن نشد!');
        });
    }

    updateLesson(lesson: Lesson) {
        this.lessonService.updateLesson(lesson).subscribe((success) => {
            this.lessonService.observer.next();
            this.showToastSuccess('به‌روزرسانی درس ', lesson.Title + ' به‌روزرسانی شد!');
        }, (error) => {
            this.showToastFailure('شکست به‌روزرسانی درس ', lesson.Title + ' به‌روزرسانی نشد!');
        });
    }

    deleteLesson(lesson: Lesson){
        this.lessonService.deleteLesson(lesson.Id).subscribe((success) => {
            this.lessonService.observer.next();
            this.showToastSuccess('حذف درس ', lesson.Title + ' حذف شد!');
        }, (error) => {
            this.showToastFailure('شکست حذف درس ', lesson.Title + ' حذف نشد!');
        });
    }

    showUpdateOverlay(lesson: Lesson = null) {
        this.dialogService.open(LessonUpdateOverlayComponent, {
            context: {
                lesson: lesson,
            },
            hasBackdrop: true,
            closeOnBackdropClick: false,
            closeOnEsc: true,
        })
            .onClose.subscribe((lessonToBe: Lesson) => {
                if (lessonToBe !== undefined) {
                    if (lessonToBe.Id) {
                        this.updateLesson(lessonToBe);
                    } else {
                        this.addLesson(lessonToBe);
                    }
                }
            },
        );
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
