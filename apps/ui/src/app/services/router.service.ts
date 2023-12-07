import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {uiPaths} from "../utils/ui.paths";

@Injectable({
  providedIn:'root',
})
export class RouterService{
  constructor(private router:Router){

  }
  public navigateToLogin():void{
    this.router.navigateByUrl(`/${uiPaths.LOGIN_FEATURE}`);
  }
  public navigateToHome():void{
    this.router.navigateByUrl(`/${uiPaths.HOME_PAGE_FEATURE}`);
  }

  public navigateToPortfolioView():void{
    this.router.navigateByUrl(`/${uiPaths.VIEW_PORTFOLIO_FEATURE}`);
  }
  public navigateToPortfolioEdit():void{
    this.router.navigateByUrl(`${uiPaths.EDIT_PORTFOLIO_FEATURE}`);
  }
}
