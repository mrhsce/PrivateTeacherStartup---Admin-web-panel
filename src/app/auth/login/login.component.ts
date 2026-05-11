/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component} from '@angular/core';
import {NbAuthResult, NbLoginComponent} from '@nebular/auth';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class NgxLoginComponent extends NbLoginComponent {

    login(): void {
        this.errors = [];
        this.messages = [];
        this.submitted = true;

        this.service.authenticate(this.strategy, 'grant_type=password&username=' + this.user.username +
            '&password=' + this.user.password).subscribe((result: NbAuthResult) => {
            this.submitted = false;
            if (result.isSuccess()) {
                const {token, ...noToken} = result.getResponse().body;
                // Todo Implement a better way to save user info
                localStorage.setItem('User', JSON.stringify(noToken));
                this.messages = result.getMessages();
            } else {
                this.errors = result.getErrors();
            }

            const redirect = result.getRedirect();
            if (redirect) {
                setTimeout(() => {
                    return this.router.navigateByUrl(redirect);
                }, this.redirectDelay);
            }
            this.cd.detectChanges();
        });
    }

}
