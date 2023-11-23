/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '../../modules/app-common/app-common.module';
import { MainLayoutModule } from '../main-layout/main-layout.module';

/* Components */
import * as errorComponents from './components';

/* Containers */
import * as errorContainers from './containers';

/* Guards */
import * as errorGuards from './guards';

/* Services */
import * as errorServices from './services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        MainLayoutModule,TranslateModule
    ],
    providers: [...errorServices.services, ...errorGuards.guards],
    declarations: [...errorContainers.containers, ...errorComponents.components],
    exports: [...errorContainers.containers, ...errorComponents.components],
})
export class ErrorModule {}
