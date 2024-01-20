import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
// TODO: @angular/fire bug.
import { setPersistence } from '@firebase/auth';
import { inMemoryPersistence, Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ENVIRONMENT, Environment } from 'projects/account/src/environments/environment.interface';
import { Router } from '@angular/router';
import { COMMON_ENVIRONMENT_TOKEN, CommonEnvironment } from 'projects/common/environments/environment.interface';

const CSRF_TOKEN = makeStateKey<string>("CSRF_TOKEN");

@Component({
  selector: 'app-account-login-form',
  templateUrl: './account-login-form.component.html',
  styleUrls: ['./account-login-form.component.scss']
})
export class AccountLoginFormComponent implements OnInit {
  isLoggingIn: boolean;
  error?: {
    code: string;
    message: string;
  }
  form: FormGroup;

  constructor(
    private auth: Auth,
    private router: Router,
    private transferState: TransferState,
    @Inject(ENVIRONMENT) private environment: Environment,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(COMMON_ENVIRONMENT_TOKEN) private commonEnvironment: CommonEnvironment,
    ) {
    this.isLoggingIn = false;
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [
          Validators.email,
          Validators.required,
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      csrfToken: new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });

    this.fetchCsrfToken();
  }

  ngOnInit(): void {
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get csrfToken(): string {
    return this.form.get('csrfToken')?.value;
  }

  /**
   * @reference
   * 1. https://firebase.google.com/docs/auth/web/auth-state-persistence
   */
  async submitClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoggingIn = true;
    try {
      let userCredential = await signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
      this.isLoggingIn = false;
      // Signed in
      const user = userCredential.user;
      // ...

      this.router.navigate(['account']);
    } catch (error: any) {
      this.isLoggingIn = false;
      this.error = {
        code: error.code,
        message: error.message
      }

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code ${errorCode}, Error Message ${errorMessage}`)
      return false;
    }

    return true;
  }

  private fetchCsrfToken() {
    if (this.transferState.hasKey(CSRF_TOKEN)) {
      const csrfToken = this.transferState.get(CSRF_TOKEN, "");
      this.form.patchValue({ csrfToken: csrfToken });
      // Set session expiration to 1 minute.
      const expiresIn = 60 * 1000;
      this.setCookie("csrfToken", csrfToken, expiresIn, this.environment.production);
      return;
    }

    const csrfToken = (Math.random() * 100000000000000000).toString();
    this.form.patchValue({ csrfToken: csrfToken })
    this.transferState.set(CSRF_TOKEN, csrfToken);
  }

  private setCookie(key: string, value: string, expiresIn: number, secure: boolean) {
    let date = new Date();
    date.setTime(date.getTime() + expiresIn);
    let expires = `expires=${date.toUTCString()}`;
    let path = `path=/`;
    document.cookie = `${key}=${value}; ${expires}; ${path}${secure ? '; secure' : ''}`;
  }
}
