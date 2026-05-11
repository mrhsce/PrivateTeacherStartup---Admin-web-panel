import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {Lesson} from "../entities/Lesson";

@Injectable()
export class LessonService {
    public observer = new Subject();

    constructor(private http: HttpClient) {
    }

    getLessonsList(filter: string = ''): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(environment.apiEndpoint + `/api/lessons/getalllessons?filter=${filter}`);
    }

    addLesson(lesson: Lesson): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint + `/api/lessons/addlesson`, lesson);
    }

    updateLesson(lesson: Lesson): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint + `/api/lessons/updatelesson?id=${lesson.Id}`, lesson);
    }

    deleteLesson(id: number): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint + `/api/lessons/deletelesson?id=${id}`, null);
    }

}
