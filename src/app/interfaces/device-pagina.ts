import { PaginacaoPagina } from "../lista/paginacao-pagina";
import { Device } from "./device";

export interface DevicePagina extends PaginacaoPagina {
  itens: Device[];
}
