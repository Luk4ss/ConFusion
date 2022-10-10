import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMes: string;



  //O construtor é executado primeiro
  constructor(private dishService: DishService,
          @Inject('baseURL') private baseURL) { }

  //Logo em seguida o ngOnInit é executado.
  ngOnInit() {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes, (errmess) => this.errMes = <any>errmess);
  }
 

}
