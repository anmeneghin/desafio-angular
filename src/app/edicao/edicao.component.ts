import { CommonModule, DOCUMENT } from "@angular/common";
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
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { filter, map, tap } from "rxjs";
import { CommandDescription } from "../interfaces/commandDescription";
import { Device } from "../interfaces/device";
import { UsuarioLogado } from "../interfaces/usuarioLogado";
import { DeviceService } from "../services/device.service";
import { ConfirmacaoEnvioComponent } from "../confirmacao-envio/confirmacao-envio.component";

@Component({
  selector: "app-edicao",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmacaoEnvioComponent,
  ],
  templateUrl: "./edicao.component.html",
  styleUrl: "./edicao.component.scss",
})
export class EdicaoComponent {
  abrirModal = input<boolean>(false);
  device = input<Device | undefined>(undefined);
  open = signal<boolean>(false);

  usuarioLogado!: UsuarioLogado;

  fecharModal = output<boolean>();

  deviceService = inject(DeviceService);
  showOverlay = false;

  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  modalConfirmacao = signal<boolean>(false);
  owner = signal<boolean>(false);
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

    effect(() => {
      const device = this.device();

      if (device) {
        this.identifier?.setValue(device.identifier);
        this.description?.setValue(device.description);
        this.manufacturer?.setValue(device.manufacturer);
        this.url?.setValue(device.url);
        device.commands.forEach(command => {
          const comando = this.commandDescription()?.find(
            i => i.id === command.commandDescriptionId
          );

          if (comando) {
            this.comandosSelecionados.push(comando);

            const group = new FormGroup({
              commandDescriptionId: new FormControl<string>(comando.id),
            });

            this.commands.push(group);
          }
        });
      }
    });

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

  editar() {
    const device = this.device();

    if (device) {
      const newDevices: Device = {
        id: device.id,
        ...this.deviceForm.getRawValue(),
        owner: device.owner,
      };

      if (newDevices) {
        this.deviceService
          .editarDispositivo(newDevices)
          .pipe(
            tap({
              next: () => {
                this.mostrarModalConfirmacao(
                  "Dispositivo atualizado com sucesso!",
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
