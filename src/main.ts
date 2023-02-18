import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

if (environment.production) {
  enableProdMode();
}

//initialize firebase before angular app
firebase.initializeApp(environment.firebaseConfig);

let appInit = false;

//emit event whenever authentication state changes (log in or log out)
//so before angular app init, if user ald log in previously , firbase will automatically store the token which represent user has loggged in before
// so it will trigger the event and run the angular init if it is not yet init before
firebase.auth().onAuthStateChanged(() => {
  console.log("inittializa" + appInit)
  if (!appInit) {
    console.log("inside")
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }
  appInit = true;
});
