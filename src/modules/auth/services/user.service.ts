import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';
import { Router } from '@angular/router';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor( private router: Router) {
        const user :any= JSON.parse( localStorage.getItem('app:userData') || '{}')
        if(user !=''){
            this.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            TenantName :user.TenantName

        };
        }
        else
        {
            this.user = {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                image: '',
                TenantName: '',
            };
            this.router.navigate(['/auth/login']);
        }
      
        // this.user = {
        //     id: '123',
        //     firstName: 'Valerie',
        //     lastName: 'Luna',
        //     email: 'vluna@aol.com',
        //     image: '/assets/img/illustrations/profiles/profile-1.png',
        // };
    }

    set user(user: User) {
        userSubject.next(user);
    }
    setuser(user: User) {
        userSubject.next(user);
    }
    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
