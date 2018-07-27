import { Component, OnInit } from '@angular/core';
import { Peer } from '../peer';
import { GameService } from '../services/game.service';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.scss']
})
export class PeersComponent implements OnInit {
  peers: Peer[];
  selectedPeer: string;

  constructor(private gameService: GameService, private refreshService: RefreshService) { }

  ngOnInit() {
    this.peers = new Array<Peer>();
    this.gameService.getPeers().then(response => this.peers = response);
  }

  setOpponent(peer: Peer) {
    this.gameService.createGame(peer.original).then(response => this.setGame(response));
  }

  setGame(id: string) {
    this.gameService.id = id;
    this.refreshService.confirmMission();
  }
}
