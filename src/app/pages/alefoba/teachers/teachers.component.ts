import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeacherService} from '../../../services/teacher.service';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {Teacher} from "../../../entities/Teacher";
import {TeacherUpdateOverlayComponent} from "./teacher-update-overlay/teacher-update-overlay.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit, OnDestroy {

  // teacherListStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public teacherList = [];

  public teacherListStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private teacherService: TeacherService, private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.updateTeacherList();

      this.serviceSubscription = this.teacherService.teachersObserver.subscribe(() => {
      this.updateTeacherList();
    });

  }

    ngOnDestroy(): void {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }
    }

  updateTeacherList() {
    this.teacherService.getTeachersList().subscribe((teachers) => {
      if (teachers.length === 0) {
        this.teacherListStatus = this.LIST_EMPTY;
      } else {
        this.teacherListStatus = this.LIST_LOADED;
      }
      this.teacherList = teachers;
    }, (error) => {
      this.teacherListStatus = this.LIST_ERROR;
    });
  }

  activateTeacher(teacher: Teacher) {
    this.teacherService.activateTeacher(teacher).subscribe((success) => {
      this.teacherService.teachersObserver.next();
        this.showToastSuccess('فعالسازی معلم', teacher.Name + ' ' + teacher.Family + ' با موفقیت فعال شد!');
    }, (error) => {
      this.showToastFailure('شکست فعالسازی معلم', teacher.Name + ' ' + teacher.Family + ' فعال نشد!');
    });
  }

  deactivateTeacher(teacher: Teacher) {
    this.teacherService.deactivateTeacher(teacher).subscribe((success) => {
      this.teacherService.teachersObserver.next();
        this.showToastSuccess('غیرفعالسازی معلم', teacher.Name + ' ' + teacher.Family + ' با موفقیت غیرفعال شد!');
    }, (error) => {
        this.showToastFailure('شکست غیرفعالسازی معلم', teacher.Name + ' ' + teacher.Family + ' غیرفعال نشد!');
    });
  }

  banTeacher(teacher: Teacher) {
    this.teacherService.banTeacher(teacher).subscribe((success) => {
      this.teacherService.teachersObserver.next();
        this.showToastSuccess('تعلیق معلم', teacher.Name + ' ' + teacher.Family + 'با موفقیت مغلق شد!');
    }, (error) => {
        this.showToastFailure('شکست تعلیق معلم', teacher.Name + ' ' + teacher.Family + ' معلق نشد!');
    });
  }

    addTeacher(teacher: Teacher) {
        this.teacherService.createTeacher(teacher).subscribe((success) => {
            this.teacherService.teachersObserver.next();
            this.showToastSuccess('افزودن معلم', teacher.Name + ' ' + teacher.Family + ' با موفقیت افزوده شد!');
        }, (error) => {
            this.showToastFailure('شکست در افزودن معلم', teacher.Name + ' ' + teacher.Family + ' افزوده نشد!');
        });
    }

    updateTeacher(teacher: Teacher) {
        this.teacherService.updateTeacher(teacher).subscribe((success) => {
            this.teacherService.teachersObserver.next();
            this.showToastSuccess('به روزرسانی معلم', teacher.Name + ' ' + teacher.Family + ' با موفقیت به روز شد!');
        }, (error) => {
            this.showToastFailure('شکست در به روزرسانی معلم', teacher.Name + ' ' + teacher.Family + ' به روز نشد!');
        });
    }

    showUpdateOverlay(teacher: Teacher = null) {
        this.dialogService.open(TeacherUpdateOverlayComponent, {
            context: {
                teacher: teacher,
            },
            hasBackdrop: true,
            closeOnBackdropClick: false,
            closeOnEsc: true,
        })
            .onClose.subscribe((teacherToBe: Teacher) => {
                if (teacherToBe !== undefined) {
                    if (teacherToBe.Id) {
                        this.updateTeacher(teacherToBe);
                    } else {
                        this.addTeacher(teacherToBe);
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
