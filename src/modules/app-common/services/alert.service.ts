import { Injectable } from '@angular/core';
import { ToastMessage, ToastMessageData, ToastMessageOptions } from '../../app-common/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlertService {
    constructor() {}
    private alert: BehaviorSubject<ToastMessage[]> = new BehaviorSubject<ToastMessage[]>([]);

    show(header: ToastMessageData, body: ToastMessageData) {
        this.alert.next([]);
        this.alert.next(this.alert.getValue().concat({ header, body, uuid: uuid()}));
    }

    remove(toastID: string) {
      this.alert.next(this.alert.value.filter((toast) => toast.uuid !== toastID));
    }
    getAlert(): Observable<ToastMessage[]>{
        return this.alert.asObservable()
    }
}
