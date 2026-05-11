import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment.prod";
import {Level} from "../entities/Level";
import {Enum} from "../entities/Enum";
@Injectable()
export class EnumService {
    public enumObserver = new Subject();

    constructor(private http: HttpClient) {
    }

    getAllLevels(): Observable<Level[]> {
        return this.http.get<Level[]>(environment.apiEndpoint + '/api/admin/getalllevels');
    }

    getAllDocTypes(): Observable<Enum[]> {
        return this.http.get<Enum[]>(environment.apiEndpoint + '/api/enums/?enumType=DocType');
    }
}
