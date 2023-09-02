import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-manage-participants',
  templateUrl: './manage-participants.component.html',
  styleUrls: ['./manage-participants.component.scss'],
})
export class ManageParticipantsComponent implements OnInit {
  searchUser: string = '';
  errorMessage: string = '';
  @Input() currentUser: User;
  @Input() invitedUsers: Map<number, User> = new Map<number, User>();
  @Output() invitedChanges = new EventEmitter<Map<number, User>>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  findUser() {
    this.userService.getUserByUsername(this.searchUser).subscribe((user) => {
      if (user) {
        if (this.currentUser.id === user.id) {
          this.errorMessage = 'That IS you!! >:(';
        } else {
          this.invitedUsers.set(user.id, user);
          this.invitedChanges.emit(this.invitedUsers);
          this.searchUser = '';
          this.errorMessage = '';
        }
      } else {
        this.errorMessage = 'User not found.';
      }
    });
  }

  removeUser(id: number) {
    this.invitedUsers.delete(id);
    this.invitedChanges.emit(this.invitedUsers);
  }
}
