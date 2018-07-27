import * as $ from 'jquery';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { RefreshService } from './services/refresh.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CashBalanceComponent } from './cash-balance/cash-balance.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommaSeperatedNumberPipe } from './comma-seperated-number.pipe';
import { Ng2OdometerModule } from 'ng2-odometer';
import { FooterComponent } from './footer/footer.component';
import { PortProviderService } from './services/port-provider.service';
import { LogoComponent } from './logo/logo.component';
import { ErrorFeedbackComponent } from './error-feedback/error-feedback.component';
import { LoadingComponent } from './loading/loading.component';
import { PeersComponent } from './peers/peers.component';
import { SafePipe } from './safe.pipe';
import { TestComponent } from './test/test.component';
import { BoardComponent } from './board/board.component';
import { ExistingGamesComponent } from './existing-games/existing-games.component';
import { GameService } from './services/game.service';
import { AwaitingTurnComponent } from './awaiting-turn/awaiting-turn.component';

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
      MatToolbarModule,
      Ng2OdometerModule.forRoot()
   ],
   declarations: [
      AppComponent,
      HeaderComponent,
      CashBalanceComponent,
      ExistingGamesComponent,
      SpinnerComponent,
      CommaSeperatedNumberPipe,
      FooterComponent,
      ErrorFeedbackComponent,
      LoadingComponent,
      LogoComponent,
      PeersComponent,
      SafePipe,
      TestComponent,
      BoardComponent,
      AwaitingTurnComponent
   ],
   providers: [
      RefreshService,
      PortProviderService,
      GameService
   ],
   entryComponents: [
      ErrorFeedbackComponent,
      PeersComponent
   ],
   bootstrap: [
      AppComponent
   ],
   schemas: [
      NO_ERRORS_SCHEMA
   ]
})
export class AppModule { }
