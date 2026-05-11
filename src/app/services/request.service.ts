import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '../entities/Request';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";

@Injectable()
export class RequestService {
    public observer = new Subject();

    constructor(private http: HttpClient) {
    }

    getRequestsList(): Observable<Request[]> {
        return this.http.get<Request[]>(environment.apiEndpoint + '/api/request/getrequests');
    }

    getTeachersListForRequest(requestId: number): Observable<Request[]> {
        return this.http.get<Request[]>(environment.apiEndpoint +
            `/api/request/getteachersofrequests?requestId=${requestId}`);
    }

    disableRequest(request: Request): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/request/deleteteacherrequest?id=${request.Id}`, null);
    }

    manuallyAddTeacherToRequest(rrequestId: number, teacherId: number): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/request/addteacherrequest?requestId=${rrequestId}&teacherId=${teacherId}`, null);
    }

    manuallyRemoveTeacherFromRequest(requestId: number, teacherId: number): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/request/deleteteacherrequest?requestId=${requestId}&teacherId=${teacherId}`, null);
    }
}
