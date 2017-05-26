// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyB5g_GBnMEewajWj0VGCk-24b-kp2RKSG0",
    authDomain: "servicioscodigopostal.firebaseapp.com",
    databaseURL: "https://servicioscodigopostal.firebaseio.com",
    projectId: "servicioscodigopostal",
    storageBucket: "servicioscodigopostal.appspot.com",
    messagingSenderId: "1027209434018"
  }
};
