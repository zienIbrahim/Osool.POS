/* tslint:disable: ordered-imports*/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* Modules */
import { IconsModule } from '../../modules/icons/icons.module';

const modules = [IconsModule,
    A11yModule,
    CdkAccordionModule,
    ClipboardModule,
    CdkListboxModule,
    CdkMenuModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    DialogModule,
    FlexLayoutModule,
    NgbModule,
    FontAwesomeModule,
    LayoutModule

];

/* Containers */
import * as appCommonContainers from './containers';

/* Components */
import * as appCommonComponents from './components';

/* Directives */
import * as appCommonDirectives from './directives';

/* Guards */
import * as appCommonGuards from './guards';

/* Services */
import * as authServices from '../../modules/auth/services';

/* Services */
import * as appCommonServices from './services';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DialogModule } from '@angular/cdk/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
         RouterModule,
          ...modules
        ],
    declarations: [
        ...appCommonContainers.containers,
        ...appCommonComponents.components,
        ...appCommonDirectives.directives,
    ],
    exports: [
        ...appCommonContainers.containers,
        ...appCommonComponents.components,
        ...appCommonDirectives.directives,
        ...modules,
    ],
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders<AppCommonModule> {
        return {
            ngModule: AppCommonModule,
            providers: [
                ...appCommonServices.services,
                ...authServices.services,
                ...appCommonGuards.guards,
                { provide: 'window', useValue: window },
            ],
        };
    }
}
