import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';

// app components
import { AppComponent } from './app.component';
import { RoomComponent } from './virtual-room/room/room.component';
import { FurnitureComponent } from './virtual-room/furniture/furniture.component';
import { HudComponent } from './virtual-room/hud/hud.component';
import { HomeComponent } from './pages/home/home.component';
import { CommunityFurnituresComponent } from './pages/community-furnitures/community-furnitures.component';
import { RoomCreationComponent } from './pages/room/room-creation/room-creation.component';

import { AuthModule } from '@auth0/auth0-angular';
import { OauthLoginComponent } from './pages/oauth-login/oauth-login.component';
import { environment as env } from '../environments/environment';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnauthenticatedHomeComponent } from './pages/unauthenticated-home/unauthenticated-home.component';
import { ManageRoomComponent } from './pages/manage-room/manage-room.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { ManageParticipantsComponent } from './shared/components/manage-participants/manage-participants.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    FurnitureComponent,
    HudComponent,
    HomeComponent,
    CommunityFurnituresComponent,
    RoomCreationComponent,
    OauthLoginComponent,
    NavbarComponent,
    DashboardComponent,
    UnauthenticatedHomeComponent,
    ManageRoomComponent,
    CreditsComponent,
    ManageParticipantsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    InputNumberModule,
    CardModule,
    ToastModule,
    DialogModule,
    SelectButtonModule,
    AuthModule.forRoot({
      domain: env.auth.domain,
      clientId: env.auth.clientId,
      authorizationParams: {
        redirect_uri: env.auth.redirectUri,
      },
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
