import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { ConfirmacaoEnvioComponent } from "../confirmacao-envio/confirmacao-envio.component";
import { Device } from "../interfaces/device";
import { UsuarioLogado } from "../interfaces/usuarioLogado";
import { CommonModule, DOCUMENT } from "@angular/common";
import { DeviceService } from "../services/device.service";
import { tap } from "rxjs";

@Component({
  selector: "app-exclusao",
  standalone: true,
  imports: [CommonModule, ConfirmacaoEnvioComponent],
  templateUrl: "./exclusao.component.html",
  styleUrl: "./exclusao.component.scss",
})
export class ExclusaoComponent {
  abrirModal = input<boolean>(false);
  device = input<Device | undefined>(undefined);
  open = signal<boolean>(false);

  tituloModalConfirmacao!: string;
  mensagemModalConfirmacao!: string;
  tipoModalConfirmacao!: string;

  usuarioLogado!: UsuarioLogado;

  fecharModal = output<boolean>();

  deviceService = inject(DeviceService);

  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  modalConfirmacao = signal<boolean>(false);
  owner = signal<boolean>(false);

  @HostListener("click", ["$event"]) onClick($event: Event) {
    if (this.modal && $event.target == this.modal()?.nativeElement) {
      this.closeModal(false);
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const localUser = localStorage.getItem("usuarioLogado");
      if (localUser != null) {
        this.usuarioLogado = JSON.parse(localUser);
      }
    }

    effect(
      () => {
        this.open.set(this.abrirModal());
      },
      {
        allowSignalWrites: true,
      }
    );

    effect(
      () => {
        if (this.device()?.owner !== this.usuarioLogado.email) {
          this.owner.set(false);
        } else {
          this.owner.set(true);
        }
      },
      { allowSignalWrites: true }
    );
  }

  closeModal($event: boolean) {
    this.open.set($event);
    this.fecharModal.emit($event);
  }

  mostrarModalConfirmacao(mensagem: string, open: boolean, tipoModal: string) {
    this.mensagemModalConfirmacao = mensagem;
    this.modalConfirmacao.set(open);
    this.tipoModalConfirmacao = tipoModal;
  }

  excluir() {
    const device = this.device();

    if (device) {
      this.deviceService
        .excluirDispositivo(device)
        .pipe(
          tap({
            next: () => {
              this.mostrarModalConfirmacao(
                "Dispositivo excluído com sucesso!",
                true,
                "sucesso-concluido"
              );
            },
            error: (error: Error) => {
              this.mostrarModalConfirmacao(error.message, true, "falha");
            },
          })
        )
        .subscribe();
    }
  }
}
