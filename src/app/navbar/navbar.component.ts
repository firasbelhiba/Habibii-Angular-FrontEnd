import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  // username: string;
  photoUrl: string;
  isLoading = false ;


  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.username = this.authService.decodedToken?.unique_name;
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
    this.model.username = this.model.username.toLocaleLowerCase();
  }

  login() {
    this.isLoading = true ;
    this.model.username = this.model.username.toLocaleLowerCase();
    this.authService.login(this.model).subscribe(
      (next) => {
        this.isLoading = false ;

        this.alertify.success('Logged in successfully');
        this.router.navigate(['/members']);
      },
      (error) => {
        this.isLoading = false ;

        this.alertify.error('Failed to login');
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('You are logged out');
    this.router.navigate(['/']);
  }
}
