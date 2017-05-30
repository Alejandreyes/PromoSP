import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { DescuentosComponente } from './componentes/descuentos.component' 
import { ServiciosComponente } from './componentes/servicios.component';
@NgModule({
  declarations: [
    AppComponent, 
    DescuentosComponente,
    ServiciosComponente
  ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [],
  bootstrap: [AppComponent] // Indica el componente pricipal del poryecto 
  //bootstrap: [ServiciosComponent]
})
export class AppModule { }
