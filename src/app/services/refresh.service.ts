import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

@Injectable()
export class RefreshService {
  public loading: boolean;

  // Observable sources
  private confirmedSource = new Subject<boolean>();

  // Observable string streams
  missionConfirmed$ = this.confirmedSource.asObservable();

  confirmMission() {
    this.confirmedSource.next(true);
  }

  constructor() {
  }
}
