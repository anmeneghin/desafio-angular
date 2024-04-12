import { NgClass } from "@angular/common";

import { Component, EventEmitter, Input, Output } from "@angular/core";

import { PaginacaoPagina } from "./paginacao-pagina";

@Component({
  selector: "app-paginacao",
  standalone: true,
  imports: [NgClass],
  template: `<div class="paginacao">
    <nav aria-label="page navigation example">
      @if (pagina) {
        <ul class="pagination">
          <li
            class="page-item"
            [ngClass]="{ disabled: pagina.paginaAnterior === null }">
            <a
              class="page-link d-flex justify-content-center align-items-center"
              (click)="selectPagina(pagina.paginaAnterior)"
              aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          @for (item of paginas(); track item) {
            <li
              class="page-item"
              [ngClass]="{ active: pagina.paginaAtual === item }">
              <a
                (click)="selectPagina(item)"
                class="page-link d-flex justify-content-center align-items-center"
                >{{ item }}</a
              >
            </li>
          }
          <li
            class="page-item"
            [ngClass]="{
              disabled: pagina.paginaAtual === pagina.ultimaPagina
            }">
            <a
              class="page-link d-flex justify-content-center align-items-center"
              (click)="selectPagina(pagina.proximaPagina)"
              aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      }
    </nav>
  </div>`,
  styles: [
    `
      .paginacao {
        padding-top: 0;
        nav {
          ul.pagination {
            padding: 8px;
            outline: 0.094rem solid rgb(234, 234, 234);
            border-radius: 6px;
            background-color: rgb(255, 255, 255);
            margin: 0;
            font-size: 12px;

            li.page-item {
              a.page-link {
                color: rgb(33, 34, 38);
                position: relative;
                padding: 0.3rem 0.6rem;
                width: 24px;
                height: 27px;
                background: none;
                border: none !important;
                margin: 0 3px;
                font-size: 13px;
              }

              a.page-link:hover {
                color: rgb(33, 34, 38);
                background-color: #c5e9e9;
                border-radius: 6px;
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
                border-radius: 6px;
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
      }

      @media (max-width: 768px) {
        .paginacao {
          display: none;
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
