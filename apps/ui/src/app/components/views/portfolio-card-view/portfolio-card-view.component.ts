import {Component, Input} from '@angular/core';
import {PortfolioEntry} from "../../../types/portfolio-entry";
import {MatCardModule} from "@angular/material/card";
import {GenericButtonViewComponent} from "../generic-button-view/generic-button-view.component";
import {CommonModule, NgIf} from "@angular/common";
import {Actions} from "../../../types/actions";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-portfolio-card-view',
  standalone: true,
  imports: [
    MatCardModule,
    GenericButtonViewComponent,
    NgIf,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './portfolio-card-view.component.html',
  styleUrl: './portfolio-card-view.component.scss'
})
export class PortfolioCardViewComponent {
  actions: Actions[] = [
    {
      actionId: 1,
      actionName: 'view',
    },
    {
      actionId: 2,
      actionName: 'edit',
    },
    {
      actionId: 3,
      actionName: 'delete',
    }]
  @Input() portfolioEntry!: PortfolioEntry;
  @Input() isAuthenticated!: boolean;
}
