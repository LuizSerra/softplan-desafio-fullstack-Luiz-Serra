import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.jwtPayload = this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  jwtPayload: any;
  exibindoMenu = false;

  logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      this.router.navigate(['/login']); 
  }

}
