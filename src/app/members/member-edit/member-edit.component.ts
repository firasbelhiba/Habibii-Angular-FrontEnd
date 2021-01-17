import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  onSave() {
    console.log(this.user);

    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (response) => {
          this.alertify.success('Profile updateed successfully');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error('an error has been occured');
        }
      );
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
