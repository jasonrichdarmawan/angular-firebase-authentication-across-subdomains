import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Auth, onAuthStateChanged } from "@angular/fire/auth";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const HELLO_WORLD = makeStateKey<string>("HELLO_WORLD");

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss']
})
export class ExperiencesPage implements OnInit {
  isLoggedIn?: boolean;
  helloWorld?: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: Auth,
    private functions: Functions,
    private transferState: TransferState,
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
    if (this.transferState.hasKey(HELLO_WORLD)) {
      this.helloWorld = this.transferState.get(HELLO_WORLD, "");
      return;
    }

    const callable = httpsCallable<undefined, string>(this.functions, "helloWorld");
    const { data } = await callable();
    this.helloWorld = data;
    this.transferState.set(HELLO_WORLD, data);
  }
}
