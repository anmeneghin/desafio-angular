import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";

import { Component, effect, inject, output, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

import { RouterLink } from "@angular/router";
import { TooltipDirective } from "../tooltip/tooltip.directive";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgOptimizedImage, TooltipDirective],
  template: `
    @if (open()) {
      <div
        class="modal-backdrop fade show z-1"
        (click)="open.set(!open())"
        [style.opacity]="0.7"
        [style.backgroundColor]="corTema()"></div>
    }
    <div
      class="sidebar z-2 position-fixed top-0 start-0"
      id="sidebar"
      [class.open]="open()">
      <div
        class="logo-details d-flex flex-row justify-content-start align-items-center">
        <div class="logo-name">
          <img (click)="open.set(!open())" src="assets/icons/iot.png" alt="" />
          <h6 class="ms-3 mb-0">Community IoT Device</h6>
        </div>
        <div
          class="logo-icone d-flex flex-column justify-content-center align-items-center">
          <a (click)="open.set(!open())"><i class="fa-solid fa-bars"></i></a>
        </div>
      </div>
      <ul class="nav-list p-0 m-0">
        <li class="position-relative">
          <a routerLink="home" class="d-flex align-items-center">
            <i
              class="icone-sidebar fa-solid fa-house"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="Home"></i>
            <span class="links_name">Home</span>
          </a>
        </li>
      </ul>
    </div>
  `,
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  open = signal(false);

  corTema = signal<string | undefined>(undefined);

  openSidebar = output<boolean>();

  constructor() {
    effect(() => {
      this.openSidebar.emit(this.open());
    });
  }
}
