import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

const HELLO_WORLD_KEY = makeStateKey<string>("HELLO_WORLD");

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
    private route: ActivatedRoute,
    private router: Router,
    private transferState: TransferState,
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
        this.router.navigate(['login'], {relativeTo: this.route})
      }
    });
  }

  private async fetchHelloWorld() {
    if (this.transferState.hasKey(HELLO_WORLD_KEY)) {
      this.helloWorld = this.transferState.get(HELLO_WORLD_KEY, "");
      return;
    }

    const callable = httpsCallable<undefined, string>(this.functions, "helloWorld");
    const { data } = await callable();
    this.helloWorld = data;
  }
}
