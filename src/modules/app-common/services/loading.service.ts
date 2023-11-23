import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoader$$ = new BehaviorSubject<boolean>(false);
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();
  isLoader$ = this.isLoader$$.asObservable();
  
  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }

  setLoader(isLoader: boolean) {
    this.isLoader$$.next(isLoader);
  }
}
