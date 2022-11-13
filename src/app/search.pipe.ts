import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(notes: any[], term: string): any 
  {
    if (term == undefined)
      {
        return notes;
      }

    return notes.filter(function(notes)
    {
      return notes.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    });
  }

}