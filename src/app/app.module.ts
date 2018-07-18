import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from '.c:/Dev/CorDapps/tic-tac-toe-web/tic-tac-toe/src/board/board.component';

@NgModule({
   declarations: [
      AppComponent,
      BoardComponent
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
