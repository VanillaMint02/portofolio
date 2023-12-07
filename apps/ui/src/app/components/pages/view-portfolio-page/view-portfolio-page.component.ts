import {Component, Input} from '@angular/core';
import {HeaderViewComponent} from "../../views/header-view/header-view.component";
import {PortfolioEntry} from "../../../types/portfolio-entry";

@Component({
  selector: 'app-view-portfolio-page',
  standalone: true,
  imports: [HeaderViewComponent],
  templateUrl: './view-portfolio-page.component.html',
  styleUrl: './view-portfolio-page.component.css'
})
export class ViewPortfolioPageComponent {
  @Input()
  portfolioEntry!: PortfolioEntry;
  @Input()
  isAuthenticated!: boolean;
}
