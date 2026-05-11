import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {Student} from "../../../entities/Student";
import {StudentService} from "../../../services/student.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teachers',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public list = [];

  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private studentService: StudentService, private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.updateList();

      this.serviceSubscription = this.studentService.observer.subscribe(() => {
      this.updateList();
    });
  }

    ngOnDestroy(): void {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }
    }

    updateList() {
    this.studentService.getStdentsList().subscribe((results) => {
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

  activateStudent(student: Student) {
    this.studentService.activateStudent(student).subscribe((success) => {
      this.studentService.observer.next();
        this.showToastSuccess('فعالسازی دانش‌آموز', student.Name + ' ' + student.Family + ' با موفقیت فعال شد!');
    }, (error) => {
        this.showToastFailure('شکست فعالسازی دانش‌آموز', student.Name + ' ' + student.Family + ' فعال نشد!');
    });
  }

  banStudent(student: Student) {
    this.studentService.banStudent(student).subscribe((success) => {
      this.studentService.observer.next();
        this.showToastSuccess('تعلیق دانش‌آموز', student.Name + ' ' + student.Family + 'با موفقیت مغلق شد!');
    }, (error) => {
        this.showToastFailure('شکست تعلیق دانش‌آموز', student.Name + ' ' + student.Family + ' معلق نشد!');
    });
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
