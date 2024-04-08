import { CommonModule } from "@angular/common";

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
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
  selector: "tarefas-confirmacao-envio",
  standalone: true,
  template: `
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-body,
      .modal-header,
      .modal-content {
        background-color: var(--qualisup-cor-fundo-principal) !important;
      }
      .modal-body {
        padding: 0px 0px 32px 42px !important;
      }
      .modal .modal-header {
        padding: 10px 42px 0 42px !important;
      }
      .icone-alerta {
        position: absolute;
        margin: 0 auto;
        top: 55px;
        left: -55px;
        z-index: 10500;
        padding: 15px;

        span {
          font-size: 35px !important;

          .circle-primary {
            color: var(--qualisup-tarefas-modal-desfazer);
          }

          .circle-header-danger {
            color: var(--qualisup-tarefas-modal-circulo-lixeira);
          }
          .icone-primary,
          .icone-danger {
            color: #ffff;
          }
        }
      }
      .conteudo-confirmacao {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-flow: row;
        align-items: center;
        .mensagem {
          padding: 0 0 0 2rem;
          font-size: 1.25rem;
          color: var(--qualisup-modal-cor-texto);
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
  @Input() public open$ = new BehaviorSubject<boolean>(false);

  @Input() public mensagem = "";
  @Input() public tipoModal = "";

  @Output() fecharModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public fecharTodosEvent = new EventEmitter<boolean>();

  closeModal(value: boolean) {
    this.fecharModal.emit(value);
    this.fecharTodosEvent.emit(value);
  }
}
