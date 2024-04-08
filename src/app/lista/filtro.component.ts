import { NgClass } from "@angular/common";

import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";

import { Router } from "@angular/router";

import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { debounceTime, distinctUntilChanged } from "rxjs";

export type searchForm = {
  filtro: FormControl<string | null>;
};

@Component({
  selector: "app-filtro",
  standalone: true,
  providers: [],
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div [formGroup]="form" class="pesquisa">
      <i class="fas fa-search fs-6"></i>
      <input
        class="form-control ml-2 p-2 ps-5"
        type="seach"
        formControlName="filtro" />
    </div>
  `,
  styles: [
    `
      .fa-search {
        font-size: 1rem !important;
      }
      @media (max-width: 1400px) {
        .fa-search {
          font-size: 0.9rem !important;
        }
        .btn-cadastrar {
          span,
          i {
            font-size: 0.8rem !important;
          }
        }
      }

      .pesquisa {
        .fas.fa-search {
          position: absolute;
          padding: 14px;
          color: #404e67;
        }

        input {
          padding-left: 35px;
          color: #404e67;
        }
      }
    `,
  ],
})
export class FiltroComponent implements OnInit {
  form: FormGroup<{
    filtro: FormControl<string | null>;
  }> = new FormGroup({
    filtro: new FormControl<string | null>(""),
  });

  router = inject(Router);

  @Output() changeFiltro: EventEmitter<string | null> = new EventEmitter<
    string | null
  >();

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: val => this.changeFiltro.emit(val.filtro),
      });
  }
}
