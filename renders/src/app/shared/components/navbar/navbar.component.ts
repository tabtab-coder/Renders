import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faChair } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlassArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faMenuClosed = faMagnifyingGlassArrowRight;
  signOutIcon = faSignOut;
  menuOpened = false;
  routes = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: faHome,
    },
    {
      name: 'Furnitures',
      link: '/furnitures',
      icon: faChair,
    },
    {
      name: 'Credits',
      link: '/credits',
      icon: faHeart,
    },
  ];
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  signOut(): void {
    this.auth.logout({
      logoutParams: { returnTo: document.location.origin },
    });
  }
}
