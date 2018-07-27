import { Injectable, OnInit } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { Cash } from "../cash";
import { Party } from "../party";
import { Tx } from "../tx";
import "rxjs/add/operator/toPromise";
import { PortProviderService } from "./port-provider.service";
import { RefreshService } from "./refresh.service";
import { Play } from "../play";
import { Game } from "../game";
import { Peer } from "../peer";

@Injectable()
export class GameService implements OnInit {
  private headers = new Headers({ "Content-Type": "application/json" });
  public me: string;
  public id: string;

  ngOnInit(): void {
    this.getMe().then(response => (this.me = response.name));
  }

  constructor(
    private http: Http,
    private portService: PortProviderService,
    private refreshService: RefreshService
  ) {}

  getUrl(path: string) {
    let url = this.portService.current + path;
    return url;
  }

  getGame(id: string): Promise<Game> {
    const _url = this.getUrl("/api/tictactoe/game");
    const url = `${_url}?id=${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(
        res => new Game().deserialize(res.json()),
        err => this.handleError(err)
      );
  }

  getGames(): Promise<Game[]> {
    const url = this.getUrl("/api/tictactoe/all-games");
    return this.http
      .get(url)
      .toPromise()
      .then(
        res => this.createGameArray(res.json()) as Game[],
        err => this.handleError(err)
      );
  }

  createGame(opponent: string): Promise<string> {
    const _url = this.getUrl("/api/tictactoe/create-game");
    const url = `${_url}?opponent=${opponent}`;

    return this.http
      .get(url)
      .toPromise()
      .then(
        res => new Tx().deserialize(res).txResponse,
        err => this.handleError(err)
      );
  }

  play(play: Play): Promise<string> {
    const _url = this.getUrl("/api/tictactoe/play-game");
    const url = `${_url}?id=${play.id}&row=${play.row}&column=${play.column}`;

    return this.http
      .get(url)
      .toPromise()
      .then(
        () => this.refreshService.confirmMission(),
        err => this.handleError(err)
      );
  }

  getCashBalances(): Promise<Cash> {
    const url = this.getUrl("/api/tictactoe/cash-balances");
    return this.http
      .get(url)
      .toPromise()
      .then(
        res => new Cash().deserialize(res.json()) as Cash,
        err => this.handleError(err)
      );
  }

  getMe(): Promise<Party> {
    let url = this.getUrl("/api/tictactoe/me");
    return this.http
      .get(url)
      .toPromise()
      .then(
        res => new Party().deserialize(res.json()) as Party,
        err => this.handleError(err)
      );
  }

  getPeers(): Promise<Peer[]> {
    let url = this.getUrl("/api/tictactoe/peers");
    return this.http
      .get(url)
      .toPromise()
      .then(
        res => new Peer().deserialize(res.json()).peers as Peer[],
        err => this.handleError(err)
      );
  }

  private createGameArray(input: any): Game[] {
    const games = new Array<Game>();
    if (input.games.length > 0) {
      input.games.forEach((element: string) => {
        const game = new Game().deserialize(element);
        games.push(game);
      });
    }
    return games;
  }

  private handleError(response: Response): Promise<any> {
    /*this.dialog.open(ErrorFeedbackComponent,
      { data: { error: response.text() } });*/
    this.refreshService.confirmMission();
    return Promise.reject(response);
  }
}
