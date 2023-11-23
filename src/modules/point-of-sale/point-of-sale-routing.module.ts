/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { PointOfSaleModule } from './point-of-sale.module';

/* Containers */
import * as pointOfSaleContainers from './containers';

/* Components */
import * as components from './components';

/* Guards */
import * as pointOfSaleGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: pointOfSaleContainers.PosLayoutComponent,
        children: [
            {
                path: 'new',
                component: components.PointOfSaleComponent,
            }
        ],
    },
];

@NgModule({
    imports: [PointOfSaleModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class PointOfSaleRoutingModule {}
