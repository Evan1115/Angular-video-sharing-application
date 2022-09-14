import { Injectable } from '@angular/core';

interface IModal {
  id: string,
  visible: boolean
}
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisible = false;
  private modals : IModal[] = []

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible :false
    })
  }

  unRegister(id: string){
    this.modals = this.modals.filter( modal => {
      modal.id !== id
    })
  }

  isModalOpen(id : string): boolean {
    return !!this.modals.find(e => e.id === id)?.visible //cast undefined to false boolean type without affecting the original boolean value . True -> true /false-> false
  }

  toggleModal(id: string) {
    let modal = this.modals.find(e => e.id === id)

    if(modal) {
      modal.visible = !modal.visible
    }
  }
}
