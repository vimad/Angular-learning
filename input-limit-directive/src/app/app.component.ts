import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  testForm: FormGroup;
  volume: number;

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.testForm = this.fb.group({
      'vol':['',null]

    });

    this.testForm.get('vol').valueChanges.subscribe(
      (value) => {
          //this.volume = 999;
          console.log(this.volume);
      }
    )
  }

}
