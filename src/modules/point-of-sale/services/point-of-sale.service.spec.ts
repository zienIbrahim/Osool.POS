import { TestBed } from '@angular/core/testing';

import { PointOfSaleService } from './point-of-sale.service';

describe('PointOfSaleService', () => {
    let pointOfSaleService: PointOfSaleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PointOfSaleService],
        });
        pointOfSaleService = TestBed.inject(PointOfSaleService);
    });

    describe('getPointOfSale$', () => {
        it('should return Observable<PointOfSale>', () => {
            expect(pointOfSaleService).toBeDefined();
        });
    });
});
