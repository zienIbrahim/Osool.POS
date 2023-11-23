import { TestBed } from '@angular/core/testing';

import { MainLayoutService } from './main-layout.service';

describe('MainLayoutService', () => {
    let mainLayoutService: MainLayoutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MainLayoutService],
        });
        mainLayoutService = TestBed.inject(MainLayoutService);
    });

    describe('getMainLayout$', () => {
        it('should return Observable<MainLayout>', () => {
            expect(mainLayoutService).toBeDefined();
        });
    });
});
