import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../entities/Teacher';
import {TeacherLesson} from '../entities/TeacherLesson';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";

@Injectable()
export class TeacherService {
    public teachersObserver = new Subject();

    constructor(private http: HttpClient) {
    }

    createTeacher(teacher: Teacher): Observable<Object> {
        // TODO this should be removed
        teacher.Mobile = teacher.PhoneNumber;
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/signup?role=Teacher`, teacher);
    }

    updateTeacher(teacher: Teacher): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/signup?role=Teacher`, teacher);
    }

    getTeachersList(): Observable<Teacher[]> {
        return this.http.get<Teacher[]>(environment.apiEndpoint + '/api/admin/getteachers');
    }

    getTeacherLessonList(id: number): Observable<TeacherLesson[]> {
        return this.http.get<TeacherLesson[]>(environment.apiEndpoint + `/api/admin/getteacherlessons?teacherId=${id}`);
    }

    setTeacherLessonLevel(teacherId, lessonId, levelId): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/setteacherlessonlevel?teacherId=${teacherId}&lessonId=${lessonId}&levelId=${levelId}`, null);
    }

    activateTeacher(teacher: Teacher): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/activateteacher?userName=${teacher.PhoneNumber}&toWhat=true`, null);
    }

    deactivateTeacher(teacher: Teacher): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/activateteacher?userName=${teacher.PhoneNumber}&toWhat=false`, null);
    }

    banTeacher(teacher: Teacher): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/banuser?userName=${teacher.PhoneNumber}&role=Teacher&toWhat=true`, null);
    }
}
