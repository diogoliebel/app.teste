import { Injectable } from '@angular/core';
import {AngularFireDatabase, snapshotChanges } from 'angularfire2/database';

@Injectable()
export class EventProvider {
  private PATH = 'events/';

  constructor(private db: AngularFireDatabase) { }
    
    getAll() {
      return this.db.list(this.PATH)
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val()
          }))
        })
    }

    get(key: string) {
      return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() }
      })
    }

    save(event: any) {
      return new Promise((resolve, reject) => {
        if (event.key) {
          this.db.list(this.PATH)
          .update(event.key, {name: event.name, desc: event.desc })
          .then(() => resolve())
          .catch((e) => reject(e))
        } else {
          this.db.list(this.PATH)
          .push({name: event.name, desc: event.desc })
          .then(() => resolve())
        }
      })
    }

    remove(key: string) {
      return this.db.list(this.PATH).remove(key);
    }
  }
