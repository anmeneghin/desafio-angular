# DesafioAngular

Projeto Angular versão 17.3.2.

Projeto disponivel em [Gerenciamento dispositivos iot](https://anmeneghin.github.io/gerencimento-dispositivos-iot/).
Publicado pelo gihub pages.

## Desenvolvimento

Para o gerenciamento de pacotes do projeto, utilizei o gerenciador [pnpm](https://pnpm.io/pt/)., que tem vantagem sobre o npm pois economiza uma enorme quantidade de espaço em disco, leva menos tempo para instalar os pacotes e possui suporte embutido para repositórios mono.

Para executar o projeto localmente, use o comando `pnpm start` , após instalar suas dependencias.

Na estilização do site optei por usar o [Bootstrap](https://getbootstrap.com/) por ser uma ferramenta que agiliza o desenvolvimento e promove flexibilidade e responsividade.

Para criar a identidade visual optei por cores claras por serem agradáveis visualmente, usei animações para trazer modernidade à aplicação e utilizei de um design simples e objetivo para que o usuário não se perca nas suas tomadas de decisões e consiga usar a aplicação facilmente em qualquer dispositivo devido a responsividade presente na aplicação.

## Service

Para o serviço da aplicação, utilizei uma aplicação [json server](https://github.com/typicode/json-server) que possibilita uma simulação de API REST.
Para o funcionamento da api, fiz um deploy na aplicação cloud [render](https://render.com/), que pode ter o json conferido [aqui](https://json-server-iot.onrender.com/) ou então no [repositório](https://github.com/anmeneghin/json-server-iot).

## Sugestões

- Criar dashboards para verificar melhor visualmente os dispositivos cadastrados;
- Criar filtros para mostrar somente os dispositivos no usuário logado;
- Colocar ícones na tabela para melhor identificação de qual dispositivo está listado.
