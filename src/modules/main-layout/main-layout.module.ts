/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../app-common/app-common.module';

/* Components */
import * as mainLayoutComponents from './components';

/* Containers */
import * as mainLayoutContainers from './containers';

/* Guards */
import * as mainLayoutGuards from './guards';

/* Services */
import * as mainLayoutServices from './services';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
    ],
    providers: [...mainLayoutServices.services, ...mainLayoutGuards.guards,
        { provide: 'window', useValue: window }],
    declarations: [...mainLayoutContainers.containers, ...mainLayoutComponents.components],
    exports: [...mainLayoutContainers.containers, ...mainLayoutComponents.components],
})
export class MainLayoutModule {}
