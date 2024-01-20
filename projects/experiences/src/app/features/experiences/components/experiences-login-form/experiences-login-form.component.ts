import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { setPersistence } from 'firebase/auth';
import { inMemoryPersistence, Auth, signInWithEmailAndPassword, signInWithCustomToken } from '@angular/fire/auth';

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

  /**
   * @reference
   * 1. https://firebase.google.com/docs/auth/web/auth-state-persistence
   */
  async submitClicked(): Promise<boolean> {
    if (this.email === null) { return false; }
    if (this.password === null) { return false; }
    
    // setPersistence(this.auth as any, inMemoryPersistence);

    this.isLoggingIn = true;
    try {
      let userCredential = await signInWithCustomToken(this.auth, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTcwNTY4OTY1MCwiZXhwIjoxNzA1NjkzMjUwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1tcWJhMEB0b3BvaW50LW9yZy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW1xYmEwQHRvcG9pbnQtb3JnLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiZU1FSHZ4a2V0bVZ2NER3eGhuckllemJhZGR2MSJ9.rFbaKgGpt9CL8gcOexUkH4jDofgLTAzWvGv0XRue4i-iN4Suu5o5rGjJqLYNBvCQ1RGJmgSMkTKIRKr24-AINeXUmfLAxNJesV9LPtQb_OwoWexHBvDPqTpH6FXI_YAEaFeWwU9Xr9A8aqhpZ0jR5tARt5x0P0Dj02sCzDf-2HI310fPu09UO0xZ7NtQCkboowtOtir4kB3Gm-0pS2ZYRuJUbTbUV8Roz-gkADYzIJGGSTJLZ18gkxrjHDcYty6xE5rf6sjsqMvUpNer_9MfNiMD02OAcAHrpKTNbzyAYcKQUYQj6JDZR1cm-YVJPr_fI5_PQHH5GfZ3UoXcrye1HQ");
      // let userCredential = await signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
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
