import { CommonModule, formatDate } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  LOCALE_ID,
  effect,
  inject,
  signal,
} from "@angular/core";
import { FiltroComponent } from "../lista/filtro.component";
import { TooltipDirective } from "../tooltip/tooltip.directive";
import { DeviceService } from "../services/device.service";
import { ListaComponent } from "../lista/lista.component";
import { SortDirective, SortEvent } from "../lista/sort.directive";
import { ItensPorPaginaComponent } from "../lista/itens-por-pagina.component";
import { PaginacaoComponent } from "../lista/paginacao.component";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { PaginacaoParametros } from "../lista/paginacao-parametros";
import { Device } from "../interfaces/device";
import { DevicePagina } from "../interfaces/device-pagina";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { EdicaoComponent } from "../edicao/edicao.component";
import { ExclusaoComponent } from "../exclusao/exclusao.component";

export type ItemPorPagina = {
  texto: string;
  valor: number;
};

@Component({
  selector: "app-listagem",
  standalone: true,
  imports: [
    CommonModule,
    FiltroComponent,
    TooltipDirective,
    ListaComponent,
    SortDirective,
    TooltipDirective,
    ItensPorPaginaComponent,
    PaginacaoComponent,
    CadastroComponent,
    EdicaoComponent,
    ExclusaoComponent,
  ],
  templateUrl: "./listagem.component.html",
  styleUrl: "./listagem.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemComponent {
  dispositivoService = inject(DeviceService);
  router = inject(Router);
  formatLocale = inject(LOCALE_ID);
  injector = inject(Injector);

  subscriptions: Subscription[] = [];

  icon = signal<string>("");
  acao = signal<string>("");
  device = signal<Device | undefined>(undefined);

  modalExclusao = signal<boolean>(false);
  modalCadastro = signal<boolean>(false);
  modalEdicao = signal<boolean>(false);

  fetchParametros = signal<PaginacaoParametros>({
    sort: { coluna: "description", ordem: "asc" },
    filtro: "",
    limite: 10,
    paginaAtual: 1,
    campos: "description,manufacturer",
  });

  corTema = signal<string | undefined>(undefined);
  itensPorPagina = signal<ItemPorPagina[]>([]);

  dispositivoSelecionado = signal<Device | undefined>(undefined);
  dispositivoPagina = signal<DevicePagina | null>(null);
  devices = signal<Device[]>([]);

  constructor() {
    effect(
      () => {
        setTimeout(() => {
          this.itensPorPagina.set([
            {
              texto: "5 itens por página",
              valor: 5,
            },
            {
              texto: "10 itens por página",
              valor: 10,
            },
            {
              texto: "25 itens por página",
              valor: 25,
            },
            {
              texto: "50 itens por página",
              valor: 50,
            },
            {
              texto: "100 itens por página",
              valor: 100,
            },
          ]);
        }, 300);
      },
      {
        allowSignalWrites: true,
      }
    );

    effect(() => {
      if (this.fetchParametros()) {
        this.dispositivoService
          .listarDispositivosPaginados(
            this.fetchParametros().paginaAtual,
            this.fetchParametros().limite,
            this.fetchParametros()?.sort?.coluna ?? "",
            this.fetchParametros()?.sort?.ordem ?? "",
            this.fetchParametros()?.filtro,
            this.fetchParametros()?.campos
          )
          .subscribe({
            next: pagina => {
              this.dispositivoPagina.set(pagina);
            },
          });
      }
    });

    effect(
      () => {
        if (this.dispositivoPagina()) {
          this.devices.set(this.dispositivoPagina()?.itens ?? []);
        }
      },
      { allowSignalWrites: true }
    );
  }

  editar(url: string, deviceObj: Device): void {
    this.router.navigate([url, { id: deviceObj.id }]);
  }

  cadastrar(value: string): void {
    this.router.navigateByUrl(value);
  }

  excluir(devices: Device, open: boolean): void {
    this.dispositivoSelecionado.set(devices);
    this.modalExclusao.set(open);
  }

  onFecharModalExclusao() {
    this.modalExclusao.set(false);
    this.fetchParametros.update(params => ({ ...params }));
  }

  onSelectPagina($event: number) {
    this.fetchParametros.update(params => ({
      ...params,
      paginaAtual: $event,
    }));
  }

  onSort($event: SortEvent) {
    const ordem = this.fetchParametros().sort?.ordem === "asc" ? "desc" : "asc";
    const sort = { coluna: $event.coluna, ordem: ordem };

    this.fetchParametros.update(fetchParametros => ({
      ...fetchParametros,
      ...{ sort: sort, paginaAtual: 1 },
    }));
  }

  onChangeFiltro($event: string | null) {
    this.fetchParametros.update(params => ({
      ...params,
      ...{ filtro: $event, paginaAtual: 1, campos: "description,manufacturer" },
    }));
  }

  onChangeItensPorPagina($event: string | number) {
    this.fetchParametros.update(params => ({
      ...params,
      ...{ paginaAtual: 1, limite: Number($event) },
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  open(
    action: string,
    icon: string,
    open: boolean,
    device: Device | undefined
  ): void {
    this.acao.set(action);
    this.device.set(device);
    this.icon.set(icon);

    if (action === "Excluir") {
      this.modalExclusao.set(open);
    } else if (action === "Editar") {
      this.modalEdicao.set(open);
    } else if (action === "Cadastrar") {
      this.modalCadastro.set(open);
    }
  }
  onFecharModal(event: boolean) {
    if (this.acao() === "Excluir") {
      this.modalExclusao.set(event);
    } else if (this.acao() === "Editar") {
      this.modalEdicao.set(event);
    } else if (this.acao() === "Cadastrar") {
      this.modalCadastro.set(event);
    }

    this.fetchParametros.update(fetchParametros => ({
      ...fetchParametros,
      ...{ paginaAtual: 1 },
    }));
  }
}
