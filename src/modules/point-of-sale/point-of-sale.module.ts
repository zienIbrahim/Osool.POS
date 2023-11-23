/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';
import { MainLayoutModule } from '../main-layout/main-layout.module';

/* Components */
import * as pointOfSaleComponents from './components';

/* Containers */
import * as pointOfSaleContainers from './containers';

/* Guards */
import * as pointOfSaleGuards from './guards';

/* Services */
import * as pointOfSaleServices from './services';
import { PointOfSaleComponent } from './components/point-of-sale/point-of-sale.component';
import { NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        MainLayoutModule,
        NgbModule,
        NgbNavModule
    ],
    providers: [...pointOfSaleServices.services, ...pointOfSaleGuards.guards],
    declarations: [...pointOfSaleContainers.containers, ...pointOfSaleComponents.components, PointOfSaleComponent],
    exports: [...pointOfSaleContainers.containers, ...pointOfSaleComponents.components],
})
export class PointOfSaleModule {}
