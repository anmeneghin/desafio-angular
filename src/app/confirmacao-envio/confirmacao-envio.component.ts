import { CommonModule, DOCUMENT } from "@angular/common";

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  input,
  Inject,
  effect,
  HostListener,
  ElementRef,
  viewChild,
} from "@angular/core";

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-confirmacao-envio",
  standalone: true,
  template: `
    @if (open()) {
      <div
        class="modal-backdrop fade show"
        [style.backgroundColor]="'transparent'"></div>
      <div
        #modal
        class="modal fade"
        [ngClass]="open() ? 'show d-block' : 'hidden d-none'"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div
              class="modal-body alert  m-0 d-flex justify-content-between"
              [ngClass]="
                tipoModal() !== 'falha' ? 'alert-success' : 'alert-danger'
              ">
              {{ mensagem() }}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                (click)="closeModal(false)"></button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .conteudo-confirmacao {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-flow: row;
        align-items: center;
        .mensagem {
          padding: 0 0 0 2rem;
          font-size: 1.25rem;
          text-align: justify;
        }
      }

      @media (max-width: 768px) {
        .conteudo-confirmacao {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-auto-flow: row;
        }
      }
    `,
  ],
  animations: [
    trigger("fade", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      transition(":enter, :leave", [animate("250ms")]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
})
export class ConfirmacaoEnvioComponent {
  open = input<boolean>(false);
  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  mensagem = input<string>("");
  tipoModal = input<string>("");

  @Output() fecharModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public fecharTodosEvent = new EventEmitter<boolean>();

  @HostListener("click", ["$event"]) onClick($event: Event) {
    if (this.modal && $event.target == this.modal()?.nativeElement) {
      this.closeModal(false);
    }
  }

  closeModal(value: boolean) {
    this.fecharModal.emit(value);
    this.fecharTodosEvent.emit(value);
  }
}
