import {Component, Input} from '@angular/core';
import {PortfolioEntry} from "../../../types/portfolio-entry";
import {MatCardModule} from "@angular/material/card";
import {GenericButtonViewComponent} from "../generic-button-view/generic-button-view.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-portfolio-card-view',
  standalone: true,
  imports: [
    MatCardModule,
    GenericButtonViewComponent,
    NgIf
  ],
  templateUrl: './portfolio-card-view.component.html',
  styleUrl: './portfolio-card-view.component.scss'
})
export class PortfolioCardViewComponent {
@Input() portfolioEntry!:PortfolioEntry;
@Input() isAuthenticated!:boolean;
}
