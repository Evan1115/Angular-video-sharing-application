import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit , OnDestroy{

  constructor(public modal: ModalService) { }

  ngOnInit(): void {
    this.modal.register('auth');
  }

  //handle memory leak to remove auth modal when component is destroyed
  ngOnDestroy(): void {
    this.modal.unRegister('auth');
  }

}
