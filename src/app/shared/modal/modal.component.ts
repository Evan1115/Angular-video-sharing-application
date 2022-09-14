import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalId = '';

  //ElementRef refer to the host DOM of this component which is app-modal
  constructor(public modal: ModalService, public ef: ElementRef) {}


  ngOnInit(): void {
    //move app-modal to root when component is initialized
    document.body.appendChild(this.ef.nativeElement)
  }

  closeModal(id: string) {
    this.modal.toggleModal(id);
  }

}
