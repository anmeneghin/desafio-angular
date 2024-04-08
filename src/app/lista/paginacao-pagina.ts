export interface PaginacaoPagina {
  totalItens?: number;
  paginaAtual: number;
  primeiraPagina?: number;
  ultimaPagina?: number;
  paginas?: number[];
  pagina: number;
  porPagina?: number;
  totalPaginas?: number;
  paginaAnterior: number | null;
  proximaPagina: number | null;
  de?: number;
  ate?: number;
  itens?: unknown[];
}
