# DevBlog

Front-end do site DevBlog, esse projeto precisa rodar em conjunto com o [backend](https://github.com/Emanuel-Boaventura/dev-blog-nest).

## Como rodar

- Clone o repositório de baixe as dependências
- Rodando um `npm install` pode dar um _erro_ de dependências, adicionando a flag `--legacy-peer-deps` deve resolver.
- Não é preciso alterar o arquivo `.env`, caso o faça siga o padrão estabelecido.
- Caso altere a porta do backend para algo além de `33333` altere aqui `.env` para comunicar com o servidor e o `next.config.ts` para carregar as imagens corretamente.
- Rode `npm run dev` e o projeto ja deve estar disponível.

## TECNOLOGIAS UTILIZADAS

Os frameworks e bibliotecas foram escolhidos por serem os mais utilizados atualmente no marcado além de serem os que eu mais uso no dia a dia, o que me facilita no desenvolvimento do projeto.

### Next.js

O Next.js combina o melhor de duas abordagens: renderização no servidor (SSR) e no cliente (CSR), além de otimizar o desempenho e a SEO da aplicação.

### Mantine e SASS

O Mantine oferece uma enorme quantidade componentes acessíveis e personalizáveis, enquanto o SASS permite modularizar e reutilizar estilos, proporcionando flexibilidade na estilização e um design coeso. Além dos dois funcionarem muito bem juntos.

### React-hook-form, Yup e @hookform/resolvers

- React-hook-form: Uma das principais bibliotecas para gerenciamento de estado e validação de formulários para React.
- Yup: Biblioteca para definição de esquemas para validação, garantindo que os dados atendam a critérios específicos, funciona bem com o react-hook-form.
- @hookform/resolvers: Integra o yup ao react-hook-form.

### Axios, SWR e Nookies

- Axios: Uma das principais bibliotecas para fazer requests facilitando muito as chamadas de API.
- SWR: A biblioteca foi desenvolvida pelos criadores do Next.js, utiliza a estratégia de primeiro retornar os dados do cache (stale), depois enviar a solicitação de fetch (revalidate), e finalmente retornar com os dados atualizados. Com SWR, componentes irão receber um fluxo de dados constante e automático. E a UI sempre será rápida e reativa.
- Nookies: Biblioteca de cookies feita especialmente para o Next.js, facilitando o controle dos cookies em qualquer lugar da aplicação.
