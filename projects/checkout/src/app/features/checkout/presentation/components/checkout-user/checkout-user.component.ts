import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User, Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout-user',
  templateUrl: './checkout-user.component.html',
  styleUrls: ['./checkout-user.component.scss']
})
export class CheckoutUserComponent implements OnInit {
  user?: User | null;
  isLoggingOut: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private auth: Auth
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
    try {
      await signOut(this.auth);
      // Sign-out  successful.
    } catch (error) {
      // An error happened.
      return false;
    }

    return true;
  }
}
