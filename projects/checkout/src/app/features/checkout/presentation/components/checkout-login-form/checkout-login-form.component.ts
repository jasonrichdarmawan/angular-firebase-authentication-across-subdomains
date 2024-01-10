import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-checkout-login-form',
  templateUrl: './checkout-login-form.component.html',
  styleUrls: ['./checkout-login-form.component.scss']
})
export class CheckoutLoginFormComponent implements OnInit {
  isLoggingIn: boolean;
  form: FormGroup;

  constructor() {
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

  get isUserLoggedIn(): boolean {
    return false;
  }

  /**
   * @reference
   * 1. https://firebase.google.com/docs/auth/web/auth-state-persistence
   */
  async submitClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);

    this.isLoggingIn = true;
    try {
      let userCredential = await signInWithEmailAndPassword(auth, this.email.value, this.password.value)
      this.isLoggingIn = false;
      // Signed in
      const user = userCredential.user;
      // ...

    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code ${errorCode}, Error Message ${errorMessage}`)
      return false;
    }

    return true;
  }

}
