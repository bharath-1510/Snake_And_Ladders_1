import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  playerCount: number[] = [1, 2, 3, 4];
  constructor(private route: Router) {}
  navigate(num: number) {
    this.route.navigate(['/game'], {
      queryParams: { game: num },
    });
  }
}
