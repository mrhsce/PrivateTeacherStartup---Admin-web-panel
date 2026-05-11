import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {Document} from "../entities/Document";
import {Report} from "../entities/Report";

@Injectable()
export class DocumentService {
    public observer = new Subject();

    constructor(private http: HttpClient) {
    }

    getReportsList(): Observable<Report[]> {
        return this.http.get<Report[]>(environment.apiEndpoint + `/api/bug/getbugs/`);
    }

    getTeacherDocumentList(teacherId: number): Observable<Document[]> {
        return this.http.get<Document[]>(environment.apiEndpoint +
            `/api/document/getteacherdocuments?teacherId=${teacherId}`);
    }

    uploadDocument(teacherId: number, docType: number, title: string, file): Observable<Object> {
        const body = new FormData();
        body.append('image', file);
        return this.http.post<Object>(environment.apiEndpoint +
            `/api/document/upload/?teacherId=${teacherId}&docType=${docType}&title=${title}`, body);
    }

    getDocument(fileName: string) {
        return this.http.get(fileName, {responseType: 'blob'});
    }

    deleteDocument(docId: number): Observable<Object> {
        return this.http.post<Object>(environment.apiEndpoint + `/api/document/delete?id=${docId}`, null);
    }

}
