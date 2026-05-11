import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../../../services/teacher.service";
import {EnumService} from "../../../../services/enum.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-teacher',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit, OnDestroy {

  // listStatus
  public LIST_LOADING = 0;
  public LIST_EMPTY = 1;
  public LIST_LOADED = 2;
  public LIST_ERROR = 5;

  public searchTerm: string = '';

  public list = [];
  public levelsList = [];

  public listStatus = this.LIST_LOADING;

  serviceSubscription: Subscription;

  constructor(private teacherService: TeacherService, private enumService: EnumService,
              private dialogService: NbDialogService, private toastrService: NbToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllLevels();
    this.updateList();

    this.serviceSubscription = this.teacherService.teachersObserver.subscribe(() => {
      this.updateList();
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
      }, (error) => {

      });
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
}
