import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from '../animations/app.animations';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders:Leader[];

  constructor(private leaderService: LeaderService, @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

}
