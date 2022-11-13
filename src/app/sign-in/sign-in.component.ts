import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $:any

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router) {
  }

  
   signIn = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })

  saveForm()
  {
    if(this.signIn.valid)
    {
      this._AuthService.signIn(this.signIn.value).subscribe(res =>{
        if(res.message=="success")
        {
          this._Router.navigate(['/profile'])
          localStorage.setItem("TOKEN",res.token)
        }
      })
    }
   
  }
  register()
  {
    this._Router.navigate(['/signup'])

  }

  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
