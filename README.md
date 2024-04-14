# DesafioAngular

Projeto Angular versão 17.3.2.

## Desenvolvimento

Para o gerenciamento de pacotes do projeto, utilizei o gerenciador [pnpm](https://pnpm.io/pt/)., que tem vantagem sobre o npm pois economiza uma enorme quantidade de espaço em disco, leva menos tempo para instalar os pacotes e possui suporte embutido para repositórios mono.

Para executar o projeto localmente, use o comando `pnpm start` , após instalar suas dependencias.

Na estilização do site optei por usar o [Bootstrap](https://getbootstrap.com/) por ser uma ferramenta que agiliza o desenvolvimento e promove flexibilidade e responsividade.

Para criar a identidade visual optei por cores claras por serem agradáveis visualmente, usei animações para trazer modernidade à aplicação e utilizei de um design simples e objetivo para que o usuário não se perca nas suas tomadas de decisões e consiga usar a aplicação facilmente em qualquer dispositivo devido a responsividade presente na aplicação.

## Service

Para o serviço local da aplicação, utilizei uma aplicação node server que apesar de ser usado como tecnologia back-end, pode ser usado no processo de desenvolvimento de front-end, o que posibilitou a simulação de uma api.
Para o funcionamento da api, execute `node server/server.js`.
