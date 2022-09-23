import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  selectedDish:Dish ;

  //O construtor é executado primeiro
  constructor(private dishService: DishService) { }

  //Logo em seguida o ngOnInit é executado.
  ngOnInit() {
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
