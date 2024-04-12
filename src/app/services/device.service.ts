import { Injectable, inject } from "@angular/core";
import { DevicePagina } from "../interfaces/device-pagina";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { CommandDescription } from "../interfaces/commandDescription";
import { Device } from "../interfaces/device";

@Injectable({
  providedIn: "root",
})
export class DeviceService {
  private readonly API_DEVICE = environment.prefixApi + "/Device";
  private readonly API_COMMAND_DESCRIPTION =
    environment.prefixApi + "/CommandDescription";
  // private readonly API_DEVICE = "https://localhost:3000/Device";
  httpService = inject(HttpClient);

  listarDispositivosPaginados(
    pagina: number,
    limite: number,
    sort: string | null,
    ordem: string | null,
    filtro: string | null,
    campos: string | null
  ): Observable<DevicePagina> {
    const url =
      this.API_DEVICE +
      "?pagina=" +
      pagina +
      "&limite=" +
      limite +
      "&sort=" +
      sort +
      "&ordem=" +
      ordem +
      "&filtro=" +
      filtro +
      "&campos=" +
      campos;

    return this.httpService.get<DevicePagina>(url);
  }

  listarDescricaoComandos(): Observable<HttpResponse<CommandDescription[]>> {
    return this.httpService.get<CommandDescription[]>(
      this.API_COMMAND_DESCRIPTION,
      {
        observe: "response",
      }
    );
  }

  adicionarDispositivos(questionario: Device): Observable<Device> {
    return this.httpService.post<Device>(this.API_DEVICE, questionario);
  }

  editarDispositivo(questionario: Device): Observable<Device> {
    return this.httpService.put<Device>(
      `${this.API_DEVICE}/${questionario.id}`,
      questionario
    );
  }

  excluirDispositivo(questionario: Device): Observable<Device> {
    return this.httpService.delete<Device>(
      `${this.API_DEVICE}/${questionario.id}`
    );
  }
}
