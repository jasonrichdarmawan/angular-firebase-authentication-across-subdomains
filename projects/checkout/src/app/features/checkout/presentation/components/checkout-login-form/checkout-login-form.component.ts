import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { inMemoryPersistence, Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout-login-form',
  templateUrl: './checkout-login-form.component.html',
  styleUrls: ['./checkout-login-form.component.scss']
})
export class CheckoutLoginFormComponent implements OnInit {
  isLoading: boolean;
  error?: {
    code: string;
    message: string;
  }
  form: FormGroup;

  constructor(
    private auth: Auth
    ) {
    this.isLoading = false;
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
  async signInClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoading = true;
    try {
      let userCredential = await signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
      this.isLoading = false;
      // Signed in
      const user = userCredential.user;
      // ...

    } catch (error: any) {
      this.isLoading = false;
      this.error = {
        code: error.code,
        message: error.message,
      };

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code ${errorCode}, Error Message ${errorMessage}`)
      return false;
    }

    return true;
  }

  /**
   * @reference
   * 1. https://firebase.google.com/docs/auth/web/auth-state-persistence
   */
  async registerClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    // setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoading = true;
    try {
      let userCredential = await createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value);
      this.isLoading = false;
      // Signed in
      const user = userCredential.user;
      // ...

    } catch (error: any) {
      this.isLoading = false;
      this.error = {
        code: error.code,
        message: error.message
      }

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error Code ${errorCode}, Error Message ${errorMessage}`);
      return false;
    }

    return true;
  }
}
