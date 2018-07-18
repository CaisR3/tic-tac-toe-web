import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MatDialog } from '@angular/material';
import { Game } from '../game';
import { Party } from '../party';
import { Cash } from '../cash';
import { Tx } from '../tx';
import { Play } from '../play';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getUrl(path: string) {
    const url = 'http://localhost:8080';
    return url;
  }

  getGame(id: string): Promise<Game> {
    const _url = this.getUrl('/api/tictactoe/game');
    const url = `${_url}?id=${id}`;

    return this.http.get(url)
      .toPromise()
      .then(
        res => new Game().deserialize(res.json()),
        err => this.handleError(err)
      );
  }

  createGame(): Promise<string> {
    const url = this.getUrl('/api/tictactoe/create-game');
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  play(play: Play): Promise<string> {
    const url = this.getUrl('/api/tictactoe/play-game');
    return this.http
      .post(url, JSON.stringify(play), { headers: this.headers })
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  getCashBalances(): Promise<Cash> {
    const url = this.getUrl('/api/tictactoe/cash-balances');
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Cash().deserialize(res.json()) as Cash,
        err => this.handleError(err)
      );
  }

  getMe(): Promise<Party> {
    const url = this.getUrl('/api/tictactoe/me');
    return this.http.get(url)
      .toPromise()
      .then(
        res => new Party().deserialize(res.json()) as Party,
        err => this.handleError(err)
      );
  }

  getPeers(): Promise<Party[]> {
    const url = this.getUrl('/api/tictactoe/peers');
    return this.http.get(url)
      .toPromise()
      .then(
        res => this.createPartyArray(res.json()) as Party[],
        err => this.handleError(err)
      );
  }

  private createPartyArray(input: any): Party[] {
    const parties = new Array<Party>();
    input.peers.forEach((element: string) => {
      const party = new Party().deserializeName(element);
      parties.push(party);
    });
    return parties;
  }

  private handleError(response: Response): Promise<any> {
    /*this.dialog.open(ErrorFeedbackComponent,
      { data: { error: response.text() } });
    this.refreshService.loading = false;*/
    return Promise.reject(response);
  }
}
