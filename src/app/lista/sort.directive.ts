import { ElementRef, inject, OnInit, Renderer2 } from "@angular/core";
import { Directive, EventEmitter, Input, Output } from "@angular/core";

import { SortEvent } from "./sort-event";

let id = 1;

@Directive({
  standalone: true,
  selector: "[appSort]",
})
export class SortDirective implements OnInit {
  contentId = id++;
  @Input() appSort!: string;
  @Output() sort = new EventEmitter<SortEvent>();

  el = inject(ElementRef<HTMLTableCellElement>);
  renderer = inject(Renderer2);

  ordem = false;

  ngOnInit(): void {
    const elId = "sortable-" + this.contentId;
    this.renderer.setProperty(this.el.nativeElement.parentNode, "id", elId);

    this.el.nativeElement.parentNode.classList.add("active");

    this.renderer.listen(this.el.nativeElement.parentNode, "click", () => {
      this.ordem = !this.ordem;

      const classeOrientacao = this.ordem === true ? "asc" : "desc";

      this.el.nativeElement.parentNode.classList.remove("inactive");
      this.el.nativeElement.parentNode.classList.add("active");

      if (classeOrientacao === "asc") {
        this.el.nativeElement.parentNode.classList.remove("desc");
      } else {
        this.el.nativeElement.parentNode.classList.remove("asc");
      }

      this.el.nativeElement.parentNode.classList.add(classeOrientacao);

      [...this.el.nativeElement.children].map(item => {
        if ((item as HTMLElement).id !== "sortable-" + this.contentId) {
          const itemClassList = (item as HTMLElement).classList;
          itemClassList.remove("active", "asc", "desc");
          itemClassList.add("inactive");
        }
      });

      const ev = {
        coluna: this.appSort,
        ordem: this.ordem === true ? "asc" : "desc",
      };

      this.sort.emit(ev);
    });
  }
}
export { SortEvent };
