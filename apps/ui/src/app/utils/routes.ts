import {Routes} from "@angular/router";
import {EditPortfolioPageComponent} from "../components/pages/edit-portfolio-page/edit-portfolio-page.component";
import {ViewPortfolioPageComponent} from "../components/pages/view-portfolio-page/view-portfolio-page.component";
import {AuthGuard} from "./auth-guard";
import {HomePageComponent} from "../components/pages/home-page/home-page.component";
import {uiPaths} from "./ui.paths";
import {LoginPageComponent} from "../components/pages/login-page/login-page.component";

export const routes: Routes = [
  {path:"",redirectTo:`${uiPaths.HOME_PAGE_FEATURE}`,pathMatch:'full'},
  {path:`${uiPaths.EDIT_PORTFOLIO_FEATURE}/:id`,component:EditPortfolioPageComponent,canActivate:[AuthGuard]},
  {path:`${uiPaths.VIEW_PORTFOLIO_FEATURE}/:id`,component:ViewPortfolioPageComponent},
  {path:`${uiPaths.HOME_PAGE_FEATURE}`,component:HomePageComponent},
  {path:`${uiPaths.LOGIN_FEATURE}`,component:LoginPageComponent},
];
