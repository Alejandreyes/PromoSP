import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'servicios-tag',
  templateUrl : 'servicios.component.html' ,
  styleUrls: ['../app.component.css']
})
export class ServiciosComponente {
  items: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/messages');
  }
  
}