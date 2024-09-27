import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-display',
  standalone: true,
  imports: [],
  templateUrl: './message-display.component.html',
  styleUrl: './message-display.component.scss'
})
export class MessageDisplayComponent implements OnInit{


  private _snackBar = inject(MatSnackBar);
  constructor(
    private store: Store<{error:{
      code: string,
      message: string
    }}>,
  ) {
    this.store.select('error').subscribe((e) =>{
      if(e.message){
        this._snackBar.open(e.message,'Close',{
          duration:3500,
          verticalPosition: 'top'
        });
      }
      
     })
  }
  ngOnInit(): void {
   
  }

}
