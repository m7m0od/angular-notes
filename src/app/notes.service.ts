import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl = "https://routeegypt.herokuapp.com/"

  constructor(private _HttpClient:HttpClient) { }
  getAllNotes(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'getUserNotes',data)
  }
  addNotes(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'addNote',data)
  }
  updateNotes(data:any):Observable<any>
  {
    return this._HttpClient.put(this.baseUrl+'updateNote',data)
  }


  deleteNotes(data:any):Observable<any>
  {
    let Option={ // this for syntax , all apis just return and format in the method but here return and format
      Headers:new HttpHeaders({}),
      body:{
        NoteID:data.NoteId,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.baseUrl+'deleteNote',Option)
  }
}
