import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  open$ = new BehaviorSubject<boolean>(false);

  toggleOpen(state: boolean) {
    this.open$.next(state);
  }

  sidebarOpen(): BehaviorSubject<boolean> {
    return this.open$;
  }
}
