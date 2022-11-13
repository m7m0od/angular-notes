import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


declare var $:any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isClicked = false
  ResponseMessage = ""
  isSuccess = false 
  isUniqueEmail = false
  isUniqueEmailMessage =""
  
  constructor(private _AuthService:AuthService,private _Router:Router) { }

  signUp = new FormGroup({
    first_name : new FormControl('',[Validators.required,Validators.pattern(/^([a-aA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name : new FormControl('',[Validators.required,Validators.pattern(/^([a-aA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    age : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  saveForm()
  {
    this.isClicked = true;

    if(this.signUp.valid){
      this._AuthService.signUp(this.signUp.value).subscribe(response =>{
        if(response.message=="success")
        {
          this.isClicked = false
          this.isSuccess = true
          this.isUniqueEmail=false
          this.ResponseMessage=response.message
          this.signUp.reset()
          this._Router.navigate(['/signin'])

        }
        else
        {
          this.isUniqueEmailMessage = response.errors.email.message
          this.isUniqueEmail=true
          this.isSuccess = false
          this.isClicked = false
        }
      
        console.log(response)

      })
    }
    
  }
  register()
  {
    this._Router.navigate(['/signin'])

  }

  ngOnInit(): void {
    $('#signUp').particleground();
  }

}
