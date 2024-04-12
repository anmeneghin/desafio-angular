import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { DeviceService } from "../services/device.service";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommandDescription } from "../interfaces/commandDescription";
import { CommonModule, DOCUMENT } from "@angular/common";
import { filter, map, tap } from "rxjs";
import { Device } from "../interfaces/device";
import { UsuarioLogado } from "../interfaces/usuarioLogado";
import { v4 as uuidv4 } from "uuid";
import { ConfirmacaoEnvioComponent } from "../confirmacao-envio/confirmacao-envio.component";
@Component({
  selector: "app-cadastro",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmacaoEnvioComponent,
  ],
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.scss",
})
export class CadastroComponent {
  abrirModal = input<boolean>(false);
  open = signal<boolean>(false);

  usuarioLogado!: UsuarioLogado;

  fecharModal = output<boolean>();

  deviceService = inject(DeviceService);
  showOverlay = false;

  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  modalConfirmacao = signal<boolean>(false);
  commandDescription = signal<CommandDescription[]>([]);
  comandosSelecionados: CommandDescription[] = [];

  tituloModalConfirmacao!: string;
  mensagemModalConfirmacao!: string;
  tipoModalConfirmacao!: string;

  disabled = false;

  deviceForm = new FormGroup({
    identifier: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    manufacturer: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    url: new FormControl<string>("", {
      nonNullable: true,
      validators: [Validators.required],
    }),
    commands: new FormArray([], Validators.required),
  });

  get identifier() {
    return this.deviceForm.get("identifier");
  }
  get description() {
    return this.deviceForm.get("description");
  }
  get manufacturer() {
    return this.deviceForm.get("manufacturer");
  }
  get url() {
    return this.deviceForm.get("url");
  }
  get commands() {
    return this.deviceForm.get("commands") as FormArray;
  }

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

    effect(() => {
      this.deviceService
        .listarDescricaoComandos()
        .pipe(
          filter(res => res.status === 200),
          map(res => res.body),
          tap(comandos => {
            if (comandos) {
              this.commandDescription.set(comandos);
            }
          })
        )
        .subscribe();
    });
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

  cadastrar(): void {
    const device: Device = {
      id: uuidv4(),
      ...this.deviceForm.getRawValue(),
      owner: this.usuarioLogado.email,
    };

    if (device) {
      this.deviceService
        .adicionarDispositivos(device)
        .pipe(
          tap({
            next: () => {
              this.mostrarModalConfirmacao(
                "Dispositivo cadastrado com sucesso!",
                true,
                "sucesso-concluido"
              );
            },
            error: (error: Error) => {
              this.mostrarModalConfirmacao(error.message, true, "danger");
            },
          })
        )
        .subscribe();
    }
  }

  adicionaComando(event: Event) {
    const target = event.target as HTMLInputElement;
    const idSelected = target?.value;
    const comando = this.commandDescription()?.find(i => i.id === idSelected);

    if (comando) {
      this.comandosSelecionados.push(comando);

      const group = new FormGroup({
        commandDescriptionId: new FormControl<string>(comando.id),
      });

      this.commands.push(group);
    }
  }

  removeComando(index: number) {
    this.commands.removeAt(index);
    this.comandosSelecionados.splice(index, 1);
  }

  isInputValid(field: string, formName: string) {
    let control: AbstractControl<any, any> | null;
    if (formName === "cadastroForm") {
      control = this.deviceForm.get(field);
    } else {
      control = this.deviceForm.get(field);
    }

    if (control) {
      return control.invalid && control.touched;
    } else {
      return false;
    }
  }
}
