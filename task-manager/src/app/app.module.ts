import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from './app.route';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './task/add/add.component';
import { ViewComponent } from './task/view/view.component';
import { UpdateComponent } from './task/update/update.component';
import { FindTaskByIdPipe } from './find-task-by-id.pipe';


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, routing, HttpClientModule, NgbModule
  ],
  declarations: [AppComponent, HeaderComponent, AddComponent, ViewComponent, UpdateComponent, FindTaskByIdPipe],
  bootstrap:[AppComponent]
})
export class AppModule { }
