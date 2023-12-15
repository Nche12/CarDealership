import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VlhiQlVPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSHxSc0VhWn1bc3RTRGc=');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
