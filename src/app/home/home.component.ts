import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, Inject, effect, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarService } from "../sidebar/sidebar.service";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TooltipDirective } from "../tooltip/tooltip.directive";
import { ListagemComponent } from "../listagem/listagem.component";
import { UsuarioLogado } from "../interfaces/usuarioLogado";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TooltipDirective,
    ListagemComponent,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  sidebarService = inject(SidebarService);
  sidebarOpen = signal<boolean>(false);
  usuarioLogado = signal<UsuarioLogado | undefined>(undefined);

  showDropdown = signal<boolean>(false);

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const localUser = localStorage.getItem("usuarioLogado");
      if (localUser != null) {
        this.usuarioLogado.set(JSON.parse(localUser));
      }
    }
  }

  onLogoff() {
    localStorage.removeItem("usuarioLogado");
    this.router.navigateByUrl("/login");
  }

  openSidebar(open: boolean) {
    this.sidebarOpen.set(open);
    this.sidebarService.toggleOpen(open);
  }
}
