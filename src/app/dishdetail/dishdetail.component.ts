import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { visibility, flyInOut, expand } from '../animations/app.animations'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
})
export class DishdetailComponent implements OnInit {  
  
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  feedback = {
    name: '',
    comment: ''
  }
  errMess: string;
  dishCopy: Dish;
  visibility = 'shown';
  
  
  constructor(
      private route: ActivatedRoute,
      private location:Location,
      private dishService:DishService,
      @Inject('baseURL') private baseURL) { }

  ngOnInit() {
      this.dishService
                    .getDishIds()
                    .subscribe(ids => this.dishIds = ids)
      this.route.params
                    .pipe(switchMap((params: Params)=> {this.visibility = 'hidden'; return this.dishService.getDish(params['id']);}))
                    .subscribe(dish => {
                                    this.dish = dish;
                                    this.dishCopy = dish;
                                    this.setPrevNext(dish.id);
                                    this.visibility = 'shown';
                                  }, errmess => this.errMess = <any> errmess);
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length ]
    this.next = this.dishIds[(this.dishIds.length + index + 1 ) % this.dishIds.length ]
  }

  onSubmit():void{
    this.dishCopy.comments.push({rating: 5,  comment: 'This is a commentary', author: 'unkown', date: '2022-10-11' });
    this.dishService.putDish(this.dishCopy).subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
    }, errmess => {
        this.dish = null; 
        this.dishCopy = null; 
        this.errMess = <any> errmess;
    });

  }

  goBack():void{
    this.location.back();
  }

}
