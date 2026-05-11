import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../../../services/teacher.service";
import {EnumService} from "../../../../services/enum.service";
import {DocumentService} from "../../../../services/document.service";
import {Document} from "../../../../entities/Document";
import {Teacher} from "../../../../entities/Teacher";
import {ImageAddOverlayComponent} from "./image-add-overlay/image-add-overlay.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public teacher = new Teacher();

  public list = [];
  public levelsList = [];
    public docTypeList = [];
  public documentList = [];

  public documentListStatus = this.LIST_LOADING;
  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private teacherService: TeacherService, private documentService: DocumentService,
              private enumService: EnumService,
              private dialogService: NbDialogService, private toastrService: NbToastrService,
              private route: ActivatedRoute) {
      this.teacher.Id = this.route.snapshot.params['id'];
      this.teacher.Name = this.route.snapshot.queryParamMap.get('name');
      this.teacher.Family = this.route.snapshot.queryParamMap.get('family');
      this.teacher.Gender = this.route.snapshot.queryParamMap.get('gender') == 'true' ? true : false;
  }

  ngOnInit() {
    this.getAllLevels();
    this.getAllDocTypes();

      this.serviceSubscription = this.teacherService.teachersObserver.subscribe(() => {
      this.updateList();
    });

      this.documentService.observer.subscribe(() => {
          this.updateDocumentList();
      });
  }

  ngOnDestroy(): void {
      if (this.serviceSubscription) {
          this.serviceSubscription.unsubscribe();
      }
  }

  getAllLevels() {
      this.enumService.getAllLevels().subscribe((results) => {
          this.levelsList = results;
          this.updateList();
      }, (error) => {
          this.showToastFailure('دریافت نشد', 'شکست در دریافت لیست سطوح');
      });
  }

    getAllDocTypes() {
        // this.enumService.getAllDocTypes().subscribe((results) => {
        //     this.docTypeList = results;
        //     this.updateDocumentList();
        // }, (error) => {
        //     this.showToastFailure('دریافت نشد', 'شکست در دریافت لیست نوع مدارک');
        // });

        this.docTypeList = [
            {
                "Id": 31,
                "Name": "Shenasnameh",
                "Title": "شناسنامه",
                "Type": "DocType",
                "Val": 0.0
            },
            {
                "Id": 32,
                "Name": "KartMelli",
                "Title": "کارت ملی",
                "Type": "DocType",
                "Val": 1.0
            },
            {
                "Id": 33,
                "Name": "KartDaneshjoui",
                "Title": "کارت دانشجویی",
                "Type": "DocType",
                "Val": 2.0
            },
            {
                "Id": 34,
                "Name": "MadrakeTahsili",
                "Title": "مدرک تحصیلی",
                "Type": "DocType",
                "Val": 3.0
            },
            {
                "Id": 35,
                "Name": "Sayer",
                "Title": "سایر",
                "Type": "DocType",
                "Val": 4.0
            }
        ];
        this.updateDocumentList();
    }

  updateList() {
    this.teacherService.getTeacherLessonList(this.route.snapshot.params['id']).subscribe((results) => {
      if (results.length === 0) {
        this.listStatus = this.LIST_EMPTY;
      } else {
        this.listStatus = this.LIST_LOADED;
      }
      this.list = results;
    }, (error) => {
      this.listStatus = this.LIST_ERROR;
    });
  }

    updateDocumentList() {
        this.documentService.getTeacherDocumentList(this.route.snapshot.params['id']).subscribe((results) => {
            this.documentListStatus = this.LIST_LOADED;
            this.documentList = results;
        }, (error) => {
            this.documentListStatus = this.LIST_ERROR;
        });
    }

    changeTeacherLessonLevel(teacherId: number, lessonId: number, levelId: number) {
        this.teacherService.setTeacherLessonLevel(teacherId, lessonId, levelId).subscribe((success) => {
            this.teacherService.teachersObserver.next();
            this.showToastSuccess('تغییر سطح درس', 'سطح درس علم با موفقیت به روز شد!');
        }, (error) => {
            this.showToastFailure('شکست در تغییر سطح درس', 'سطح درس علم به روز نشد!');
        });
    }

    showDocumentAddOverlay() {
        this.dialogService.open(ImageAddOverlayComponent, {
            context: {
                teacherId: this.route.snapshot.params['id'],
                docTypes: this.docTypeList,
            },
            hasBackdrop: true,
            closeOnBackdropClick: false,
            closeOnEsc: true,
        })
            .onClose.subscribe((result) => {
                if (result) {
                    this.documentService.observer.next();
                }
            },
        );
    }

    deleteDocument(docId: number) {
        this.documentService.deleteDocument(docId).subscribe((success) => {
            this.documentService.observer.next();
            this.showToastSuccess('حذف مدرک', 'مدرک با موفقیت حذف شد');
        }, (error) => {
            this.showToastFailure('شکست در حذف مدرک', 'خطا در حذف مدرک');
        });
    }

    downloadDocument(doc: Document) {
        this.documentService.getDocument(doc.FileName).subscribe((data) => {
            this.downloadFile(data, this.route.snapshot.params['id'] + '_' + doc.Title + '.jpg')
        }, (error) => {
            this.showToastFailure('شکست در دانلود فایل', 'فایل دریافت نشد!');
        });
    }

    downloadFile(data, name) {
        const blob = new Blob([data], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = name;
        anchor.href = url;
        anchor.click();
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
