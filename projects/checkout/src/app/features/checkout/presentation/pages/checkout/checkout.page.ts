import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {
  isLoggedIn?: boolean;
  helloWorld?: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth,
    private functions: Functions
    ) {

    this.initIsLoggedIn();
    this.fetchHelloWorld();
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
