import { NgClass } from "@angular/common";

import { Component, EventEmitter, Input, Output } from "@angular/core";

import { PaginacaoPagina } from "./paginacao-pagina";

@Component({
  selector: "app-paginacao",
  standalone: true,
  imports: [NgClass],
  template: `
    @if (pagina) {
      <nav>
        <ul class="pagination">
          <li
            class="page-item"
            [ngClass]="{ disabled: pagina.paginaAnterior === null }">
            <a class="page-link" (click)="selectPagina(pagina.paginaAnterior)"
              ><i class="fa-solid fa-angles-left"></i
            ></a>
          </li>
          @for (item of paginas(); track item) {
            <li
              class="page-item d-flex justify-content-center align-items-center"
              [ngClass]="{ active: pagina.paginaAtual === item }">
              <a class="page-link" (click)="selectPagina(item)">{{ item }}</a>
            </li>
          }

          <li
            class="page-item"
            [ngClass]="{
              disabled: pagina.paginaAtual === pagina.ultimaPagina
            }">
            <a class="page-link" (click)="selectPagina(pagina.proximaPagina)"
              ><i class="fa-solid fa-angles-right"></i
            ></a>
          </li>
        </ul>
      </nav>
    }
  `,
  styles: [
    `
      nav {
        ul.pagination {
          font-size: 12px;

          li.page-item {
            a.page-link {
              color: rgb(33, 34, 38);
            }

            a.page-link:hover {
              color: rgb(33, 34, 38);
              background-color: #c5e9e9;
              cursor: pointer;
            }
          }

          li.page-item:first-child {
            a.page-link {
              margin-left: 0px;
            }
          }

          li.page-item:last-child {
            a.page-link {
              margin-right: 0px;
            }
          }

          li.page-item.active {
            a.page-link {
              z-index: 0;
              color: rgb(255, 255, 255);
              background-color: #00b5b8;
              border-color: #00b5b8;
              // border-radius: 6px;
            }
          }

          li.page-item.disabled {
            a.page-link {
              color: rgb(177, 177, 177);
            }
          }

          li.page-item.disabled:hover {
            cursor: not-allowed;
          }
        }
      }
    `,
  ],
})
export class PaginacaoComponent {
  @Input() pagina!: PaginacaoPagina | null;
  @Output() selectedPagina: EventEmitter<number> = new EventEmitter<number>();

  selectPagina(pagina: number | null) {
    if (pagina !== null) {
      this.selectedPagina.emit(pagina);
    }
  }

  paginas() {
    return new Array(this.pagina?.ultimaPagina).fill(null).map((_, i) => i + 1);
  }
}
