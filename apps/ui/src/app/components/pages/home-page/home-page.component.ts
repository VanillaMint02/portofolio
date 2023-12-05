import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {GenericButtonViewComponent} from "../../views/generic-button-view/generic-button-view.component";
import {RouterService} from "../../../services/router.service";
import {GenericFormViewComponent} from "../../views/generic-form-view/generic-form-view.component";
import {GenericFormComponent} from "../../container/generic-form/generic-form.component";
import {InputViewComponent} from "../../views/input-view/input-view.component";
import {MatInputModule} from "@angular/material/input";
import {InputComponent} from "../../container/input/input.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone:true,
  imports: [HttpClientModule, RouterModule, GenericButtonViewComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    InputComponent,
    MatInputModule,
    InputViewComponent,
    GenericFormComponent,
    GenericFormViewComponent,
    ],
  providers:[RouterService],
})
export class HomePageComponent implements OnInit {
login:string='';
constructor(protected routerService:RouterService)  {
}

  ngOnInit(): void {
  this.login='login';
  }
}
