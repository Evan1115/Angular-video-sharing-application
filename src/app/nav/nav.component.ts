import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    public modal: ModalService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

  openModal(event: Event) {
    event.preventDefault(); //prevent default behaviour of browser which will redirect user to diff page as the event is trigger from a anchor tag
    this.modal.toggleModal('auth');
  }

  async logout(event: Event) {
    event.preventDefault(); //prevent the default action of this event (which is redirect to about.html)
    await this.auth.logout(event);
  }
}
