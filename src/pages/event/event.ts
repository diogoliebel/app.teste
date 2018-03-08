import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  title: string;
  form: FormGroup;
  event: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: EventProvider,
    private toast: ToastController, public alertCtrl: AlertController) {

      //Maneira 1
      this.event = this.navParams.data.event || {};
      this.setupPageTitle();
      this.createForm();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.event ? 'Alterando evento' : 'Novo evento';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.event.key],
      name: [this.event.name, Validators.required],
      desc: [this.event.desc, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid)
      this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Evento salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar evento.', duration: 3000}).present();
        console.error(e);
      });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Redirecionar?',
      message: 'Você será redirecionado para outra tela. Deseja continuar?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
