import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PointOfSaleService {
    constructor() {}

    getPointOfSale$(): Observable<{}> {
        return of({});
    }

}
