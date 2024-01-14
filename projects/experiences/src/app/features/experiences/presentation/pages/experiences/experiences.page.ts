import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Auth, onAuthStateChanged } from "@angular/fire/auth";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.page.html',
  styleUrls: ['./experiences.page.scss']
})
export class ExperiencesPage implements OnInit {
  isLoggedIn?: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private auth: Auth
    ) {
    if (isPlatformServer(platformId)) { return; }
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
