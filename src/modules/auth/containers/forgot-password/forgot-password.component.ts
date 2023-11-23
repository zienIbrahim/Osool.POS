import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-forgot-password',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    fieldTextType: boolean =false;

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
    toggleFieldTextType(): void {
        this.fieldTextType = !this.fieldTextType;
     }
 
}
