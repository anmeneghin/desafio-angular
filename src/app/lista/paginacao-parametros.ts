import { SortParams } from "./sort-params";

export interface PaginacaoParametros {
  limite: number;
  paginaAtual: number;
  sort?: SortParams;
  filtro: string | null;
  campos: string | null;
}
