import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "../../../../services/request.service";
import {EnumService} from "../../../../services/enum.service";
import {Teacher} from "../../../../entities/Teacher";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public list = [];

  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private requestService: RequestService, private enumService: EnumService,
              private dialogService: NbDialogService, private toastrService: NbToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.updateList();

    this.serviceSubscription = this.requestService.observer.subscribe(() => {
      this.updateList();
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  updateList() {
    this.requestService.getTeachersListForRequest(this.route.snapshot.params['id']).subscribe((results) => {
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

    removeTeacherFromRequest(teacher: Teacher){
      this.requestService.manuallyRemoveTeacherFromRequest(
          this.route.snapshot.params['id'], teacher.Id).subscribe((success) => {
        this.requestService.observer.next();
        this.showToastSuccess('افزودن آموزگار به درخواست', teacher.Name + ' ' + teacher.Family +
            ' با موفقیت به درخواست ' + this.route.snapshot.params['id'] + ' افزوده شد!');
      }, (error) => {
        this.showToastFailure('شکست افزودن آموزگار به درخواست', teacher.Name + ' ' + teacher.Family +
            ' با موفقیت به درخواست ' + this.route.snapshot.params['id'] + ' افزوده نشد!');
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
