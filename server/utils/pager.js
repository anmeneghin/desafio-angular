const getPaginacao = (array, pagina, itensPorPagina) => {
  const obj = {};
  const start = (pagina - 1) * itensPorPagina;
  const end = pagina * itensPorPagina;

  obj.itens = array.slice(start, end);
  obj.totalItens = array.length;
  obj.de = start + 1;
  obj.ate = end;
  if (obj.itens.length === 0) {
    return obj;
  }

  if (pagina > 1) {
    obj.paginaAnterior = pagina - 1;
  } else {
    obj.paginaAnterior = null;
  }

  if (end < array.length) {
    obj.proximaPagina = parseInt(pagina) + 1;
  } else {
    obj.proximaPagina = null;
  }

  // if (obj.itens.length !== array.length) {
  obj.paginaAtual = parseInt(pagina);
  obj.primeiraPagina = 1;
  obj.ultimaPagina = Math.ceil(array.length / itensPorPagina);
  // }

  return obj;
};

export default getPaginacao;
