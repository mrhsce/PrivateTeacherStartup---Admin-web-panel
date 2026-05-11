import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {DocumentService} from "../../../services/document.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teachers',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public list = [];

  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private documentService: DocumentService, private dialogService: NbDialogService,
              private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.updateList();

      this.serviceSubscription = this.documentService.observer.subscribe(() => {
      this.updateList();
    });
  }

    ngOnDestroy(): void {
        if (this.serviceSubscription) {
            this.serviceSubscription.unsubscribe();
        }
    }

    updateList() {
    this.documentService.getReportsList().subscribe((results) => {
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
