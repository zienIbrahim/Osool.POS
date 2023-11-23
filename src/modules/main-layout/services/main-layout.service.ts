import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MainLayoutService {
    constructor() {}

    getMainLayout$(): Observable<{}> {
        return of({});
    }

}
