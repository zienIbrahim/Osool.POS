import { TestBed } from '@angular/core/testing';

import { PointOfSaleGuard } from './point-of-sale.guard';

describe('PointOfSale Guards', () => {
    let pointOfSaleGuard: PointOfSaleGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PointOfSaleGuard],
        });
        pointOfSaleGuard = TestBed.inject(PointOfSaleGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            pointOfSaleGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
