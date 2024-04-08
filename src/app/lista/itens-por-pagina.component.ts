import { NgClass } from "@angular/common";

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  effect,
  input,
  output,
  signal,
} from "@angular/core";

export type ItemPorPagina = {
  texto: string;
  valor: number;
};

@Component({
  selector: "app-itens-por-pagina",
  standalone: true,
  imports: [NgClass],
  template: `
    @defer (when itensPorPagina()) {
      <div class="dropdown-itens-pagina">
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ selectedOption()?.texto }}
          </button>
          <ul class="dropdown-menu">
            @for (item of itensPorPagina(); track $index) {
              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  (click)="setItensPorPagina(item)">
                  {{ item.texto }}
                </button>
              </li>
            }
          </ul>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .dropdown-itens-pagina {
        display: flex;
        position: relative;
        width: 13.5rem;
      }
      @media (max-width: 768px) {
        .itens-por-pagina {
          display: none;
        }
      }
    `,
  ],
  providers: [],
})
export class ItensPorPaginaComponent {
  qtdItensPorPagina = output<number>();

  qntPorPagina = input.required<number>();
  itensPorPagina = input.required<ItemPorPagina[]>();

  selectedOption = signal<ItemPorPagina | undefined>(undefined);

  constructor() {
    effect(
      () => {
        let findedValue = this.itensPorPagina().find(
          item => item.valor === this.qntPorPagina()
        );
        this.selectedOption.set(findedValue);
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  setItensPorPagina(itemSelected: ItemPorPagina) {
    const valorDropdown = this.itensPorPagina()?.find(
      item => item.valor === itemSelected.valor
    );
    if (valorDropdown) {
      this.qtdItensPorPagina.emit(valorDropdown.valor);
    }
  }
}
