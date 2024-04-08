import { NgTemplateOutlet, KeyValuePipe } from "@angular/common";

import { Component, ContentChild, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-lista",
  template: `
    <div [class.table-responsive]="itens.length > 0">
      <table class="table mb-0">
        <thead>
          <tr>
            <ng-container
              [ngTemplateOutlet]="thead"
              [ngTemplateOutletContext]="itens"></ng-container>
          </tr>
        </thead>
        <tbody>
          @if (itens) {
            @for (item of itens; track item; let i = $index) {
              <tr>
                <ng-container
                  [ngTemplateOutlet]="tbody || defaultTbody"
                  [ngTemplateOutletContext]="{
                    $implicit: { item: item, index: i }
                  }">
                </ng-container>
                <ng-template #defaultTbody>
                  @for (item of itens | keyvalue; track itens) {
                    <td>
                      {{ item.value }}
                    </td>
                  }
                </ng-template>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .table {
        thead {
          font-size: 1.25rem;
        }

        tbody {
          font-size: 1.15rem;
        }
      }
    `,
  ],
  standalone: true,
  imports: [NgTemplateOutlet, KeyValuePipe],
})
export class ListaComponent {
  @Input() itens!: unknown[];

  @ContentChild("thead") thead!: TemplateRef<unknown>;
  @ContentChild("tbody") tbody!: TemplateRef<unknown>;
}
