import { TestBed } from '@angular/core/testing';

import { MainLayoutGuard } from './main-layout.guard';

describe('MainLayout Guards', () => {
    let mainLayoutGuard: MainLayoutGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [MainLayoutGuard],
        });
        mainLayoutGuard = TestBed.inject(MainLayoutGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            mainLayoutGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
