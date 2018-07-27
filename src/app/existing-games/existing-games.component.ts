import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../services/game.service';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-existing-games',
  templateUrl: './existing-games.component.html',
  styleUrls: ['./existing-games.component.scss']
})
export class ExistingGamesComponent implements OnInit {
  games: Game[];

  constructor(private gameService: GameService,
    private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.initialise();
  }

  initialise() {
    this.games = new Array<Game>();
    this.gameService.getGames().then(response => (this.games = response));
  }

  loadExisting(id: string) {
    this.gameService.id = id;
    this.refreshService.confirmMission();
  }
}
