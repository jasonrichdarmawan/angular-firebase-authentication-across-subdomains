import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
// TODO: @angular/fire bug.
import { setPersistence } from '@firebase/auth';
import { inMemoryPersistence, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { makeStateKey } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { Functions, httpsCallable } from '@angular/fire/functions';

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
    @Inject(PLATFORM_ID) private platformId: Object,
    private functions: Functions,
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
    });
  }

  ngOnInit(): void {
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
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
      const idToken = await user.getIdToken();
      await this.createSessionToken(idToken);

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

  async registerClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoggingIn = true;
    try {
      let userCredential = await createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value)
      this.isLoggingIn = false;
      // Signed in
      const user = userCredential.user;
      // ...
      const idToken = await user.getIdToken();
      await this.createSessionToken(idToken);

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

  /**
   * @bug Set-Cookie in the response header is ignored.
   */
  private async createSessionToken(idToken: string) {
    if (isPlatformServer(this.platformId)) { return; }

    const callable = httpsCallable<{idToken: string}>(this.functions, "createSessionToken",);
    const { data } = await callable({idToken: idToken});
  }
}
