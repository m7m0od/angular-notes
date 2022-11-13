import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
declare var $:any


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  term!: string;
  AllNotes:{title:string,desc:string,_id:any}[]=[];
  token: any 
  decoded: any
  isLoad=false //for spinner
  isnav = false

  constructor(private _Router:Router,private _NotesService:NotesService) { 

    try{
      this.token = localStorage.getItem("TOKEN");//to know user id and ... 
      this.decoded = jwt_decode(this.token);
    }catch(error)
    {
      localStorage.clear()
      this._Router.navigate(['/signin'])

    }
    

    this.getAllNotes()  //method data
    

    if(!localStorage.getItem("TOKEN")) // for secuirty like guards
    {
      this._Router.navigate(['/signin'])
    }

  }

  AddNote = new FormGroup({ // to handel form
    titlle : new FormControl('',[Validators.required]),
    dessc : new FormControl('',[Validators.required])
  })

  getAllNotes(){ // method data to call twice
    let data ={//format to get data by id and token
      token:this.token,
      userID:this.decoded._id 
    }
    this._NotesService.getAllNotes(data).subscribe(ress =>{
      console.log(ress);
      if(ress.message=="success")
      {
        this.isLoad=true  //for spinner
        this.AllNotes=ress.Notes; // for display
      }
      else
      {
        localStorage.clear()
        this._Router.navigate(['/signin'])
      }
      
    })
  }


  addData()//to add data 
  {
    let data = {//format to put data by id token title and desc
      title :this.AddNote.value.titlle,//from the form inputs
      desc :this.AddNote.value.dessc,
      token:this.token, // from localstorage
      citizenID:this.decoded._id
    }
    this._NotesService.addNotes(data).subscribe((ress: { message: string; }) =>{
      if(ress.message=="success")
      {
        $('#addData').modal('hide');
        this.getAllNotes(); 
        this.AddNote.reset(); //one of advantage to make it form that form has method of reset
      }
    })
  }



  NOTE_ID : any ; //to store in it id that i get from model of all data
  getId(id:any)
  {
    this.NOTE_ID = id;
  }
  deleteNote()//to delete note
  {
    let data={ //format that you will delete note that has token this and note id this
     NoteID:this.NOTE_ID,
     token:this.token
    }
    this._NotesService.deleteNotes(data).subscribe((res: { message: string; }) =>{
      if(res.message=="deleted")
      {
        $('#deleteData').modal('hide');
        this.getAllNotes();
      }
    })
  }

 setValue()
  { 

    for(let index = 0 ; index < this.AllNotes.length; index++)
    {
      if(this.AllNotes[index]._id==this.NOTE_ID)//._id
      {
        this.editNote.controls['title'].setValue(this.AllNotes[index].title)//.title
        this.editNote.controls['desc'].setValue(this.AllNotes[index].desc)//.desc
      }
    }
  }

  editNote = new FormGroup({ // to handel form
    title : new FormControl('',[Validators.required]),
    desc : new FormControl('',[Validators.required])
  })

  editData()
  {
    let data={
      title:this.editNote.value.title,
      desc:this.editNote.value.desc,
      NoteID:this.NOTE_ID,
      token:this.token
    }
    this._NotesService.updateNotes(data).subscribe((res: { message: string; }) =>{
      if(res.message=="updated")
      {
        $('#editData').modal('hide');
        this.getAllNotes();
      }

    })

  }



  ngOnInit() {
  }

}

function data(data: any) {
  throw new Error('Function not implemented.');
}

