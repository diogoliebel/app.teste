import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { EventProvider } from './../../providers/event/event';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events: Observable<any>;

  constructor(public navCtrl: NavController, private provider: EventProvider,
  private toast: ToastController) {

    this.events = this.provider.getAll();
  }

  // Adicionar a página Eventos na Home do App
  newEvent() {
    this.navCtrl.push('EventPage')
  }

  editEvent(event: any) {
    //Maneira 1
    this.navCtrl.push('EventPage', { event: event });
  }
  
  removeEvent(key: string) {
    this.provider.remove(key)
    .then(() => {
      this.toast.create({ message: 'Evento removido com sucesso.', duration: 3000}).present();
    })
    .catch((e) => {
      this.toast.create({ message: 'Erro ao remover evento.', duration: 3000}).present();
    })
  }
}
