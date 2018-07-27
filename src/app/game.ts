import { Serializable } from './serializable';

export class Game implements Serializable<Game> {

  public id: string;
  public player1: string;
  public player2: string;
  public activePlayer: string = '';
  public board: number[][];
  public complete: boolean;
  public winner: string;

  deserialize(input: any) {
    this.id = input.linearId.id;
    this.player1 = input.player1;
    this.player2 = input.player2;
    this.activePlayer = input.activePlayer;
    this.board = input.board;
    this.complete = input.complete;
    this.winner = input.winner;

    return this;
  }
}
