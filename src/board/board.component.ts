import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Play } from '../play';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  id: string;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  createGame(row: number, column: number) {
    const play = new Play();
    play.id = this.id;
    play.row = row;
    play.column = column;
    this.gameService.play(play);
  }

  play(row: number, column: number) {
    const play = new Play();
    play.id = this.id;
    play.row = row;
    play.column = column;
    this.gameService.play(play);
  }

}
