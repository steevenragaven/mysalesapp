import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      userPass: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // Inside your LoginComponent
login() {
  const username = this.loginForm.value.username;
  const userPass = this.loginForm.value.userPass;

  this.authService.authenticateUser(username, userPass).subscribe(
    (user) => {
      if (user) {
        if (user.isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          // Store the storeid in local storage
          localStorage.setItem('storeid', user.id.toString());
          console.log()
          this.router.navigate(['/staff']);
        }
      } else {
        console.error('Authentication failed');
        // Handle authentication failure, show an error message
      }
    },
    (error) => {
      console.error('Authentication error:', error);
      // Handle any error that occurred during authentication
    }
  );
}

}
