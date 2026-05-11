import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule, NbInputModule,
    NbListModule,
    NbSelectModule,
    NbSpinnerModule, NbTabsetModule,
} from '@nebular/theme';
import {ThemeModule} from '../../../@theme/theme.module';
import {FloatingAddButtonComponent} from './floating-add-button/floating-add-button.component';
import {YesNoOverlayComponent} from './yes-no-overlay/yes-no-overlay.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [FloatingAddButtonComponent, YesNoOverlayComponent],
    imports: [
        CommonModule,
        ThemeModule,
        NbCardModule,
        NbListModule,
        NbButtonModule,
        NbInputModule,
        NbSpinnerModule,
        FormsModule,
        NbSelectModule,
        NbTabsetModule,
        NbAccordionModule,
        NbDialogModule.forChild(),
    ],
    exports: [
        CommonModule,
        ThemeModule,
        NbCardModule,
        NbListModule,
        NbSpinnerModule,
        NbButtonModule,
        NbSelectModule,
        NbInputModule,
        FormsModule,
        NbTabsetModule,
        NbAccordionModule,
        FloatingAddButtonComponent,
        YesNoOverlayComponent,
    ],
    entryComponents: [
        YesNoOverlayComponent,
    ],

})
export class SharedModule {
}
