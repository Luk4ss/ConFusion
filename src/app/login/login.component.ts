import { Component, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username:'',
    password:'',
    remember: false
  }

  constructor(public dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit():void{
    console.log('User: ', this.user);
    this.dialogRef.close();    
  }

}
