import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GameService } from '../services/game.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  me: string;
  port: number;

  constructor(private gameService: GameService, private titleService: Title) {}

  getMe(): void {
    this.gameService.getMe().then(me => this.setup(me.name));
  }

  setup(me: string) {
    this.me = me;
    this.titleService.setTitle(me);
  }

  ngOnInit() {
    this.getMe();
  }
}
