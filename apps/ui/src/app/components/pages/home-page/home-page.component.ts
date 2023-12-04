import { Component } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone:true,
  imports:[HttpClientModule,RouterModule]
})
export class HomePageComponent {

}
