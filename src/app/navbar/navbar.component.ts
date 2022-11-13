import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService,private _Router:Router) { }
  logOut(){
    localStorage.clear(); //that have the token that let user sign in 
    this._Router.navigate(['/signin'])
  }

  ngOnInit(): void {
  }

}
