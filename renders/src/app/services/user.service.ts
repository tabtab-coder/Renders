import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, Observable, of } from 'rxjs';
import { User } from '../shared/model/user.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  backendUrl = environment.backendUrl;
  currentUser: User;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser);
    } else {
      return this.auth.user$.pipe(
        mergeMap((user) =>
          this.http.get<User>(`${this.backendUrl}/api/v1/users/${user.email}`)
        )
      );
    }
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `${this.backendUrl}/api/v1/users?username=${username}`
    );
  }

  searchUsers(
    queryString: string,
    limit: number = 6,
    page: number = 0
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.backendUrl}/api/v1/users?searchString=${queryString}&limit=${limit}&page=${page}`
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/api/v1/users/${email}`);
  }

  getUserByEmailExists(email: string): Observable<User> {
    return this.http.get<User>(`${this.backendUrl}/api/v1/users/${email}`);
  }

  createUser(userField: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    const user = this.http.post<User>(
      `${this.backendUrl}/api/v1/users`,
      userField
    );
    return user;
  }
}
