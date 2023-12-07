import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";
import {PreloadAllModules, provideRouter, withDebugTracing, withPreloading} from "@angular/router";
import {routes} from "./app/utils/routes";
import {AppComponent} from "./app/components/app.component";
import {provideHttpClient} from "@angular/common/http";


bootstrapApplication(AppComponent,
  {providers:[importProvidersFrom(BrowserAnimationsModule),
      provideHttpClient(),
      provideRouter(routes,
        withPreloading(PreloadAllModules),
        withDebugTracing(),
      ),]})
  .catch(error=>console.log(error));
