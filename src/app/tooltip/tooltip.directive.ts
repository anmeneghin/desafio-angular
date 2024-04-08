import { createPopper, Instance, Placement } from "@popperjs/core";

import { inject } from "@angular/core";
import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  Renderer2,
} from "@angular/core";
import { SidebarService } from "../sidebar/sidebar.service";

let nextId = 0;

@Directive({
  standalone: true,
  selector: "[tooltip]",
})
export class TooltipDirective {
  @Input("tooltip") tooltipTitle!: string;
  @Input() placement!: Placement | undefined;
  @Input() delay!: number;
  @Input() margin = 10;
  @Input() backgroundColor!: string | null | undefined;
  @Input() color!: string;

  sidebarService = inject(SidebarService);

  tooltip!: HTMLElement | null;

  popperInstance!: Instance;

  contentId = `tooltip-${nextId++}`;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  offset = 10;

  @HostListener("mouseenter") onMouseEnter() {
    if (!this.tooltip && !this.sidebarService.sidebarOpen().value) {
      this.show();
    }
  }

  @HostListener("mouseleave") onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener("click") onClick() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.tooltip = this.renderer.createElement("div");

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle)
    );

    this.renderer.setProperty(this.tooltip, "id", this.contentId);

    const arrow = this.renderer.createElement("div");
    this.renderer.setAttribute(arrow, "data-popper-arrow", "");
    this.renderer.addClass(arrow, "arrow");
    this.renderer.appendChild(this.tooltip, arrow);

    this.renderer.addClass(this.tooltip, "tooltip");

    this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    const corTexto = this.color ? this.color : "var(---cor-texto)";
    this.renderer.setStyle(this.tooltip, "color", `${corTexto}`);

    const background = this.backgroundColor
      ? this.backgroundColor
      : "var(---tooltip-cor-fundo)";
    this.renderer.setStyle(this.tooltip, "background-color", background);

    if (this.tooltip) {
      this.popperInstance = createPopper(this.el.nativeElement, this.tooltip, {
        placement: this.placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: () => {
                if (this.tooltip && this.placement === "bottom") {
                  return [0, this.tooltip.offsetHeight / 2];
                } else {
                  return [0, this.margin];
                }
              },
            },
          },
        ],
      });
    }

    this.renderer.addClass(this.tooltip, "tooltip-show");
  }

  hide() {
    this.renderer.removeClass(this.tooltip, "tooltip-show");
    this.renderer.removeChild(this.el.nativeElement, this.tooltip);
    this.tooltip = null;
  }
}
