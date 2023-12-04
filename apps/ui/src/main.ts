import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {HomePageComponent} from "./app/components/pages/home-page/home-page.component";


platformBrowserDynamic().bootstrapModule(HomePageComponent)
  .catch(err => console.error(err));
