import { Component, Inject, OnInit } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-oauth-login',
  templateUrl: './oauth-login.component.html',
  styleUrls: ['./oauth-login.component.scss'],
})
export class OauthLoginComponent implements OnInit {
  // Inject the authentication service into your component through the constructor
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.loginWithRedirect();
  }
}
