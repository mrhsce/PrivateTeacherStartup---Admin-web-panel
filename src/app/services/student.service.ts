import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {Student} from "../entities/Student";
@Injectable()
export class StudentService {
    public observer = new Subject();

    constructor(private http: HttpClient) {
    }

    getStdentsList(): Observable<Student[]> {
        return this.http.get<Student[]>(environment.apiEndpoint + '/api/admin/getstudents');
    }

    banStudent(student: Student): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/banuser?userName=${student.PhoneNumber}&role=Student&toWhat=true`, null);
    }

    activateStudent(student: Student): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/admin/banuser?userName=${student.PhoneNumber}&role=Student&toWhat=false`, null);
    }
}
