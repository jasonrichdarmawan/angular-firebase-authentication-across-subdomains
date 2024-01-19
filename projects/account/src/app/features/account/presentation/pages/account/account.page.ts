import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage implements OnInit {
  isLoggedIn?: boolean;
  helloWorld?: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth,
    private functions: Functions,
    ) {
    this.fetchHelloWorld();
    this.initIsLoggedIn();
  }

  ngOnInit(): void {
  }

  private initIsLoggedIn() {
    if (isPlatformServer(this.platformId)) { return; }

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  private async fetchHelloWorld() {
    const callable = httpsCallable<undefined, string>(this.functions, "helloWorld");
    const { data } = await callable();
    this.helloWorld = data;
  }
}
