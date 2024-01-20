import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const HELLO_WORLD_KEY = makeStateKey<string>("HELLO WORLD");

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.page.html',
  styleUrls: ['./account-login.page.scss']
})
export class AccountLoginPage implements OnInit {
  helloWorld?: string;

  constructor(
    private functions: Functions,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    this.fetchHelloWorld();
  }

  ngOnInit(): void {
  }

  private async fetchHelloWorld() {
    if (this.transferState.hasKey(HELLO_WORLD_KEY)) {
      this.helloWorld = this.transferState.get(HELLO_WORLD_KEY, "");
      return;
    }

    const callable = httpsCallable<undefined, string>(this.functions, "helloWorld");
    const { data } = await callable();
    this.helloWorld = data;
    this.transferState.set(HELLO_WORLD_KEY, data);
  }
}
