import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, NgForm, Form } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
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
                    .pipe(switchMap((params: Params)=> this.dishService.getDish(params['id'])))
                    .subscribe(dish => {
                                    this.dish = dish;
                                    this.setPrevNext(dish.id)
                                  }, errmess => this.errMess = <any> errmess);
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length ]
    this.next = this.dishIds[(this.dishIds.length + index + 1 ) % this.dishIds.length ]
  }

  onSubmit():void{

  }

  goBack():void{
    this.location.back();
  }

}
