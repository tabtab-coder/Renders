import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityFurnituresComponent } from './pages/community-furnitures/community-furnitures.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomCreationComponent } from './pages/room/room-creation/room-creation.component';
import { RoomComponent } from './virtual-room/room/room.component';
import { OauthLoginComponent } from './pages/oauth-login/oauth-login.component';

import { AuthGuardService } from './services/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnauthenticatedHomeComponent } from './pages/unauthenticated-home/unauthenticated-home.component';
import { ManageRoomComponent } from './pages/manage-room/manage-room.component';
import { CreditsComponent } from './pages/credits/credits.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'virtual-room',
        component: RoomComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'credits',
        component: CreditsComponent,
      },
      {
        path: 'furnitures',
        component: CommunityFurnituresComponent,
      },
      {
        path: 'create-room',
        component: RoomCreationComponent,
      },
      {
        path: 'manage-room',
        component: ManageRoomComponent,
      },
    ],
  },
  {
    path: '',
    component: UnauthenticatedHomeComponent,
    children: [
      {
        path: 'login',
        component: OauthLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
