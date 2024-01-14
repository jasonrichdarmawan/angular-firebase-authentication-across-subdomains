import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { setPersistence } from 'firebase/auth';
import { inMemoryPersistence, Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-experiences-login-form',
  templateUrl: './experiences-login-form.component.html',
  styleUrls: ['./experiences-login-form.component.scss']
})
export class ExperiencesLoginFormComponent implements OnInit {
  isLoggingIn: boolean;
  error?: {
    code: string;
    message: string;
  }
  form: FormGroup;

  constructor(
    private auth: Auth,
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
    
    setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoggingIn = true;
    try {
      let userCredential = await signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
      this.isLoggingIn = false;
      // Signed in
      const user = userCredential.user;
      // ...

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

}
