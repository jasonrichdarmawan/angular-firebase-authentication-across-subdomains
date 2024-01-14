import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Auth, User, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss']
})
export class AccountUserComponent implements OnInit {
  user?: User | null;
  isLoggingOut: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    auth: Auth,
    ) {
    this.isLoggingOut = false;
    
    if (isPlatformServer(platformId)) { return; }

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
