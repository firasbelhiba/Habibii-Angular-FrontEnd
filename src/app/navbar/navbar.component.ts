import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  username: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.decodedToken?.unique_name;
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logged in successfully');
      },
      (error) => {
        this.alertify.error('Failed to login');
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
