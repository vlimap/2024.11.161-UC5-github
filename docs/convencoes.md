# Convenções de Nomenclatura do Projeto

Este documento estabelece as convenções de nomenclatura a serem seguidas em todo o projeto, visando garantir organização, legibilidade e padronização do código.

## 1. Nomes de Arquivos

### Padronização de Nomes de Arquivos por Camada (padrão solicitado)

Regra geral: use o padrão <nome>.<papel>.<ext> onde:
- nome: kebab-case (tudo minúsculo, palavras separadas por hífen) — ex.: produto, usuario, carrinho
- papel: identificador da responsabilidade em minúsculas (controller, model, service, repository, adapter, routes, config, client, etc.)
- ext: extensão apropriada (.js/.ts/.jsx/.tsx/.json/.env/.css/.scss/etc)

Observações:
- Dentro do arquivo mantenha nomes de classes/entidades em PascalCase (ex.: class Produto { ... }) mesmo que o arquivo seja produto.model.ts.
- Exceção para componentes UI (React/Vue): usar PascalCase no nome do arquivo (ex.: MinhaCard.tsx, BotaoPrimario.vue).
- Páginas/Views: kebab-case sem sufixo de papel (ex.: pagina-inicial.tsx).
- Testes: mesmo nome do arquivo alvo + .spec antes da extensão (ex.: produto.controller.spec.js).

Exemplos por camada (padrão com ponto):
- Apresentação (UI / Components / Pages)
    - Component (React): MinhaCard.tsx
    - Page/View: pagina-inicial.tsx
- Aplicação (Controllers / Routes / Handlers)
    - produto.controller.js
    - usuario.routes.ts
- Domínio (Models / Entities / Domain Services)
    - produto.model.js
    - pedido.service.ts (serviços de domínio podem usar .service)
    - Dentro do produto.model.ts: export class Produto { ... }
- Infraestrutura (Repositories / Adapters / Clients)
    - usuario.repository.ts
    - email.adapter.js
    - mongo.client.ts
- Configuração e scripts
    - database.config.js
    - build-script.sh
- Testes
    - produto.controller.spec.js
    - usuario.service.spec.ts
- Assets e recursos estáticos
    - logo-principal.png
    - estilo-global.css

Extensões recomendadas: .js / .ts / .jsx / .tsx / .json / .env / .css / .scss / .png / .svg / .md

Resumo rápido de exemplos (seguindo o formato requerido):
- produto.controller.js
- produto.model.js
- produto.service.ts
- produto.repository.ts
- produto.controller.spec.js
- src/components/MinhaCard.tsx
- src/pages/pagina-inicial.tsx
- config/database.config.js
- assets/logo-principal.png

- Utilize o padrão **UPPERCASE** (letras maiúsculas e underscore para separar palavras).
- Exemplo:  
    `DATABASE_URL`

## 3. Classes

- Utilize o padrão **PascalCase** (primeira letra de cada palavra em maiúsculo, sem separadores).
- Exemplo:  
    `MinhaClasseExemplo`

## 4. Funções e Métodos

- Utilize o padrão **camelCase** (primeira palavra em minúsculo e as demais iniciando com maiúscula).
- Exemplo:  
    `minhaFuncaoExemplo()`

## 5. Constantes

- Utilize o padrão **lowercase** (letras maiúsculas e underscore para separar palavras).
- Exemplo:  
    `tamanho_maximo`

## 6. Variáveis

- Utilize o padrão **camelCase**.
- Exemplo:  
    `minhaVariavelExemplo`

---

Siga rigorosamente estas convenções em todo o projeto para manter o código consistente, organizado e de fácil manutenção.