import { Component, OnInit } from '@angular/core';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

@Component({
  selector: 'app-experiences-user',
  templateUrl: './experiences-user.component.html',
  styleUrls: ['./experiences-user.component.scss']
})
export class ExperiencesUserComponent implements OnInit {
  user?: User | null;
  isLoggingOut: boolean;

  constructor() {
    this.isLoggingOut = false;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Signed In
        this.user = user;
      } else {
        // Signed Out
        this.user = null;
      }
    });
  }

  ngOnInit(): void {
  }

  async logOutClicked(): Promise<boolean> {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Sign-out  successful.
    } catch (error) {
      // An error happened.
      return false;
    }

    return true;
  }
}
