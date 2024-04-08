import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

import { SortDirection } from "./sort-direction";
import { SortEvent } from "./sort-event";

const rotate: { [key: string]: SortDirection } = { asc: "desc", desc: "asc" };

@Directive({
  selector: "th[appTabelaSortable]",
})
export class TabelaSortableDirective {
  @Input() appTabelaSortable!: string;
  @Input() direction: SortDirection = "asc";
  @Output() sort = new EventEmitter<SortEvent>();

  @HostListener("click") onClick(): void {
    this.rotate();
  }

  rotate(): void {
    this.direction = rotate[this.direction];
    this.sort.emit({
      coluna: this.appTabelaSortable,
      direction: this.direction,
    });
  }
}
