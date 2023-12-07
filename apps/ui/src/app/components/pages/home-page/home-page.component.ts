import {Component, OnInit} from '@angular/core';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {RouterService} from "../../../services/router.service";
import {GenericFormViewComponent} from "../../views/generic-form-view/generic-form-view.component";
import {InputViewComponent} from "../../views/input-view/input-view.component";
import {FormControl} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {HeaderViewComponent} from "../../views/header-view/header-view.component";
import {AuthInterceptor} from "../../../utils/auth.interceptor";
import {GenericButtonViewComponent} from "../../views/generic-button-view/generic-button-view.component";
import {AuthService} from "../../../services/auth.service";
import {InputComponent} from "../../container/input/input.component";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {PortfolioEntry} from "../../../types/portfolio-entry";
import {PortfolioEntryService} from "../../../services/portfolio-entry.service";
import {PortfolioCardViewComponent} from "../../views/portfolio-card-view/portfolio-card-view.component";

@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    InputComponent,
    GenericFormViewComponent,
    GenericButtonViewComponent,
    HeaderViewComponent,
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    PortfolioCardViewComponent,
  ],
  providers: [RouterService,AuthInterceptor,AuthService],
})
export class HomePageComponent implements OnInit {
  isAuthenticated!:boolean;
  onlyHasHeader!:boolean;
  login: string = '';
  value!: FormControl;
  input!: {
    errorMessages: string[];
    isMandatoryField: boolean;
    formControlName: string;
    inputType: string;
    value: FormControl<any>
  };
  portfolioEntries!:PortfolioEntry[];

  constructor(private authService:AuthService,private portfolioEntryService:PortfolioEntryService) {
  }
  ngOnInit(): void {
    this.onlyHasHeader=false;
    this.isAuthenticated=this.authService.getAuthenticated();
    if(this.isAuthenticated){
      this.portfolioEntryService.getAll().pipe(untilDestroyed(this)).subscribe(data=> {
        this.portfolioEntries = data;
        console.log(data);
      });
    }
    console.log(this.isAuthenticated);
    this.login = 'login';
    this.value = new FormControl('');
    this.input = {
      errorMessages: ['This field is required'],
      value: this.value,
      isMandatoryField: true,
      inputType: 'Email',
      formControlName: '',
    }
  }

}
