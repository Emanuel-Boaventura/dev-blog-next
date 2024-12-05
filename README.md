# DevBlog

Front-end do site DevBlog, esse projeto precisa rodar em conjunto com o [backend](https://github.com/Emanuel-Boaventura/dev-blog-nest).

## Como rodar

- Clone o repositório de baixe as dependências
- Rodando um `npm install` pode dar um _erro_ de dependências, adicionando a flag `--legacy-peer-deeps` deve resolver.
- Lembre de criar um arquivo `.env` e adicionar o apontamento para a rota do servidor backend.
- Caso altere a porta do backend para algo além de `33333` altere aqui o `next.config.ts` para carregar as imagens corretamente.
- Rode `npm run dev` e o projeto ja deve estar disponível.

## TECNOLOGIAS UTILIZADAS

Os frameworks e bibliotecas foram escolhidos por suas vantagens técnicas e pelo fato de serem amplamente utilizados no meu ambiente profissional atual. Essa familiaridade garantiu um desenvolvimento mais rápido.

### Next.js

O Next.js combina o melhor de duas abordagens: renderização no servidor (SSR) e no cliente (CSR), além de otimizar o desempenho e a SEO da aplicação.

### Mantine e SASS

O Mantine oferece uma ampla gama de componentes acessíveis e personalizáveis, enquanto o SASS permite modularizar e reutilizar estilos, proporcionando flexibilidade na estilização e um design coeso. Além dos dois funcionarem muito bem juntos.

### React-hook-form, Yup e @hookform/resolvers

- React-hook-form: Gerencia estado e validação de formulários de forma performática.
- Yup: Define esquemas para validação, garantindo que os dados atendam a critérios específicos.
- @hookform/resolvers: Integra o yup ao react-hook-form, simplificando a validação dos formulários.

### Axios, SWR e Nookies

- Axios: Um cliente HTTP confiável e fácil de usar, ideal para chamadas de API.
- SWR: Um mecanismo eficiente de busca e cache de dados, melhorando a performance e garantindo informações atualizadas.
- Nookies: Simplifica o gerenciamento de cookies, especialmente em aplicações com renderização do lado do servidor (SSR).
