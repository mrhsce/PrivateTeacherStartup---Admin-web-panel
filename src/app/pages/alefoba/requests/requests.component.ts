import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {Request} from "../../../entities/Request";
import {RequestService} from "../../../services/request.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teachers',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public list = [];

  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private requestService: RequestService, private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
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
    this.requestService.getRequestsList().subscribe((results) => {
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

    disableRequest(request: Request) {
    this.requestService.disableRequest(request).subscribe((success) => {
      this.requestService.observer.next();
        this.showToastSuccess('غیرفعالسازی درخواست', request.Id + ' با موفقیت غیرفعال شد!');
    }, (error) => {
        this.showToastFailure('شکست غیرفعالسازی درخواست', request.Id + ' غیرفعال نشد!');
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
