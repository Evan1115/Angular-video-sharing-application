import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy{

  @Input() modalId = '';

  //ElementRef refer to the host DOM of this component which is app-modal
  constructor(public modal: ModalService, public ef: ElementRef) {}


  ngOnInit(): void {
    //move app-modal to root when component is initialized
    document.body.appendChild(this.ef.nativeElement)
  }

  //remove the element when it's destroyed (due to parent component is removed - auth-modal)
  ngOnDestroy(): void {
    document.body.removeChild(this.ef.nativeElement)
  }

  closeModal(id: string) {
    this.modal.toggleModal(id);
  }

}
