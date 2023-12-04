
import {bootstrapApplication} from "@angular/platform-browser";
import {HomePageComponent} from "./app/components/pages/home-page/home-page.component";
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(HomePageComponent, {
  providers: [provideAnimations()]
});
