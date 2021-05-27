import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName;
  password;
  loginFailed = false;
  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.adminService.login(this.userName, this.password).subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigate(['admin/list']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
