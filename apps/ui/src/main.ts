
import {bootstrapApplication} from "@angular/platform-browser";
import {HomePageComponent} from "./app/components/pages/home-page/home-page.component";
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {importProvidersFrom} from "@angular/core";


bootstrapApplication(HomePageComponent, {
  providers: [provideAnimations(),
    importProvidersFrom(BrowserAnimationsModule)
  importProvidersFrom()]
});
