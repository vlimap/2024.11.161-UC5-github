

# Melhorias Focadas por Domínio - Sistema de Barbearia

Este documento apresenta as melhorias que cada responsável deve implementar, focando nos tópicos já estudados em aula:

- **Validações no Sequelize (models):**
  - Todos os campos obrigatórios devem ter `allowNull: false` e validações de formato (ex: email, datas, números, enums).
  - Use validações customizadas quando necessário (ex: horários, CPF, telefone, status).

- **Params na URL:**
  - Utilize parâmetros de rota (`/dominio/:id`) para buscar, atualizar e deletar recursos específicos.
  - Sempre valide se o parâmetro existe e é válido antes de executar a ação no controller.

- **Rotas:**
  - Todas as rotas devem estar em arquivos `<dominio>.route.js`.
  - O prefixo das rotas deve ser o nome do domínio no singular (ex: `/agenda`, `/cliente`).
  - Implemente rotas RESTful: GET (listar/buscar), POST (criar), PATCH/PUT (atualizar), DELETE (remover).

- **Controllers:**
  - Separe a lógica de negócio dos controllers.
  - Sempre trate erros e retorne mensagens claras.
  - Valide os dados recebidos antes de criar/atualizar registros.
  - Use os métodos do Sequelize de forma adequada (findByPk, findAll, create, update, destroy).

> **Atenção:** Todos os domínios devem estar no singular, por exemplo: agenda, cliente, colaborador, produto, pagamento, relatório, usuário, venda, etc. Não utilize nomes no plural para pastas, arquivos ou rotas de domínio.

---



## 📅 Domínio: Agenda
- Model: Validações para data, hora, status e campos obrigatórios. Validar conflitos de horário e impedir agendamentos duplicados (mesmo cliente, mesmo horário). Validar dias úteis/finais de semana.
- Controller: Validar conflitos de horário antes de criar agendamento. Impedir alteração de agendamentos já realizados. Buscar por data e colaborador.
- Rotas: Prefixo `/agenda`, arquivo `agenda.route.js`. Rotas RESTful e busca por filtros (data, colaborador, status).

---


## 👤 Domínio: Cliente
- Model: Validar nome, telefone, email (único) e (opcional) CPF. Soft delete (`paranoid: true`).
- Controller: Validar dados de entrada, buscar por email/telefone, contagem total de clientes.
- Rotas: Prefixo `/cliente`, arquivo `cliente.route.js`. Rotas RESTful e busca por múltiplos critérios.

---


## 👤 Domínio: Colaborador
- Model: Validar nome, especialidade, telefone, email (único), data de admissão, status. Corrigir nome da tabela para "colaborador".
- Controller: Validar senha forte, atualizar status, busca por especialidade, impedir inativação com agendamentos.
- Rotas: Prefixo `/colaborador`, arquivo `colaborador.route.js`. Rotas RESTful.

---


## 📦 Domínio: Estoque
- Model: Validar quantidade, localização, datas, motivo de saída. Relacionamento com Produto.
- Controller: Validar produto existente, baixa automática no estoque, alertas de estoque baixo, movimentação de estoque.
- Rotas: Prefixo `/estoque`, arquivo `estoque.route.js`. Rotas RESTful e relatórios de movimentação.

---

## 📅 Módulo: AGENDA


### ✅ Pontos Positivos
- Controller implementa todos os métodos CRUD básicos
- Model já possui validações de data, hora e status
- Uso de Sequelize e estrutura MVC correta

### 🔧 Melhorias Necessárias

#### 1. Model (`agenda.model.js`)
- Corrigir importação do sequelize: usar `import sequelize from '../../../config/database.js'` (remover as chaves)
- Melhorar validação de horário: a validação `isBetween` não cobre horários que atravessam a meia-noite (ex: 22:00 até 03:00)
- Adicionar validação para impedir agendamentos duplicados (mesmo cliente, mesmo horário)
- Implementar validação customizada para dias úteis/finais de semana

#### 2. Controller (`agenda.controller.js`)
- Implementar validação de conflitos de horário antes de criar agendamento
- Adicionar método para buscar agendamentos por data específica e por colaborador
- Adicionar validação para impedir alteração de agendamentos já realizados

#### 3. Rotas (`routes.js`)
- Padronizar nomenclatura das rotas (usar `/agenda/` como prefixo)
- Implementar middleware de validação de dados
- Adicionar rotas para busca por filtros específicos (por data, colaborador, status)

---

## 👥 Módulo: CLIENTE

### ✅ Pontos Positivos
- CRUD completo implementado no controller
- Model já possui validações para nome, telefone e email
- Uso correto do Sequelize e estrutura MVC

### 🔧 Melhorias Necessárias

#### 1. Model (`cliente.model.js`)
- Corrigir typo: `validade` → `validate` no campo nome
- Melhorar validação de telefone para aceitar formatos nacionais (ex: (99) 99999-9999)
- Adicionar validação de CPF (opcional)
- Implementar soft delete (`paranoid: true`)

#### 2. Controller (`cliente.controller.js`)
- Corrigir retorno dos métodos: evitar múltiplos objetos no `res.json`
- Implementar validação de dados de entrada (nome, email, telefone obrigatórios)
- Adicionar método para buscar cliente por email/telefone
- Implementar contagem total de clientes

#### 3. Rotas (`cliente.routes.js`)
- Padronizar nomenclatura das rotas (usar `/clientes/` como prefixo)
- Implementar middleware de validação
- Adicionar rota para busca por múltiplos critérios

---

## 👨‍💼 Módulo: COLABORADORES

### ✅ Pontos Positivos
- Implementação de hash de senha
- Estrutura de controller bem definida

### 🔧 Melhorias Necessárias

#### **1. Correções no Model (`colaborador.models.js`)**
- **CRÍTICO**: Adicionar imports necessários:
  ```javascript
  import { DataTypes } from "sequelize";
  import sequelize from "../../../../config/database.js";
  ```
- **CRÍTICO**: Completar campos não implementados:
  ```javascript
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo', 'ferias'),
    allowNull: false,
    defaultValue: 'ativo'
  }
  ```
- Corrigir validações do telefone e data_admissao
- Corrigir nome da tabela para "colaboradores"

#### **2. Melhorias no Controller (`colaborador.controllers.js`)**
- **CRÍTICO**: Corrigir importação do model
- Implementar validação de senha forte
- Adicionar método para atualizar apenas status
- Implementar busca por especialidade
- Adicionar verificação de agendamentos antes de inativar colaborador

#### **3. Correções nas Rotas (`routes.js`)**
- **CRÍTICO**: Corrigir importação do controller
- Corrigir método `totalUsuarios` para `totalColaboradores`
- Padronizar nomenclatura das rotas

---

## 📦 Módulo: ESTOQUE

### ✅ Pontos Positivos
- Boas validações no model
- Estrutura de datas bem implementada

### 🔧 Melhorias Necessárias

#### **1. Correções no Model (`estoque.model.js`)**
- Corrigir validação customizada `isMaiorQueDataEntrada`:
  ```javascript
  isAfterEntrada(value) {
    if (value && this.data_entrada && new Date(value) <= new Date(this.data_entrada)) {
      throw new Error('Data de saída deve ser posterior à data de entrada!');
    }
  }
  ```
- Implementar relacionamento com o modelo Produto
- Adicionar campo `motivo_saida` (venda, perda, transferência)

#### **2. Melhorias no Controller (`estoque.controller.js`)**
- **CRÍTICO**: Corrigir referência `ProdutoModel` no método `deletarTodos`
- Implementar validação de produto existente antes de criar estoque
- Adicionar método para baixa automática no estoque (quando há venda)
- Implementar alertas de estoque baixo
- Adicionar método para movimentação de estoque

#### **3. Melhorias nas Rotas (`routes.js`)**
- Padronizar nomenclatura (usar `/estoque/` como prefixo)
- Implementar rotas para relatórios de movimentação
- Adicionar rota para produtos com estoque baixo

---


## 💰 Domínio: Pagamento
- Model: Validar campos, referência à venda, campos de desconto, juros, parcelas.
- Controller: Implementar métodos das rotas, estrutura em ES6, garantir referência correta à venda.
- Rotas: Prefixo `/pagamento`, arquivo `pagamento.route.js`. Rotas RESTful.

### ✅ Pontos Positivos
- Boa estrutura de validações
- Implementação de diferentes tipos de pagamento

### 🔧 Melhorias Necessárias

#### **1. Correções no Model (`pagamento.model.js`)**
- **CRÍTICO**: Converter para sintaxe ES6 modules:
  ```javascript
  import { DataTypes } from "sequelize";
  import sequelize from "../../../../config/database.js";
  // ... definição do model
  export default Pagamento;
  ```
- Corrigir referência da tabela de vendas
- Adicionar campos `desconto`, `juros`, `parcelas`

#### **2. Correções no Controller (`pagamento.controller.js`)**
- **CRÍTICO**: Converter completamente para ES6 modules
- **CRÍTICO**: Implementar todos os métodos referenciados nas rotas
- Corrigir estrutura do controller:
  ```javascript
  class PagamentoController {
    static async cadastrar(req, res) { /* implementação */ }
    static async listarTodos(req, res) { /* implementação */ }
    // ... outros métodos
  }
  export default PagamentoController;
  ```

#### **3. Melhorias nas Rotas (`routes.js`)**
- Corrigir método `totalProdutos` para `totalPagamentos`
- Implementar middleware de validação
- Padronizar nomenclatura das rotas

---


## 🛍️ Domínio: Produto
- Model: Validar nome, marca, preço (>0), quantidade em estoque (>=0), descrição, imagem_url, categoria, ativo.
- Controller: Busca por nome/marca, validação de estoque antes de venda, promoções/descontos.
- Rotas: Prefixo `/produto`, arquivo `produto.route.js`. Rotas RESTful.

### ✅ Pontos Positivos
- Excelente implementação do model com validações completas
- Controller bem estruturado e documentado
- Bom tratamento de erros

### 🔧 Melhorias Necessárias

#### **1. Melhorias no Model (`produto.model.js`)**
- Adicionar campo `imagem_url` para foto do produto
- Implementar categoria de produtos
- Adicionar campo `ativo` para controle de status

#### **2. Melhorias no Controller (`produto.controller.js`)**
- Implementar busca por nome/marca
- Adicionar validação de estoque antes de permitir venda
- Implementar sistema de promoções/descontos

---


## 📊 Domínio: Relatório
- Model: Tipos de relatório, campo parâmetros flexível, campo usuario_id.
- Controller: Geração real de relatórios, métodos por tipo, cache, exportação PDF/Excel.
- Rotas: Prefixo `/relatorio`, arquivo `relatorio.route.js`. Rotas RESTful.

### ✅ Pontos Positivos
- Estrutura básica implementada
- Bom uso de ENUM para tipos de relatório

### 🔧 Melhorias Necessárias

#### **1. Melhorias no Model (`relatorio.model.js`)**
- Adicionar mais tipos de relatório:
  ```javascript
  type: DataTypes.ENUM(
    'venda_diaria', 'venda_mensal', 'venda_anual',
    'cliente_frequencia', 'colaborador_performance',
    'produto_estoque', 'financeiro_resumo'
  )
  ```
- Melhorar campo `parametros` para ser mais flexível
- Adicionar campo `usuario_id` para rastrear quem gerou o relatório

#### **2. Melhorias no Controller (`relatorio.controller.js`)**
- Implementar lógica real de geração de relatórios
- Adicionar métodos específicos para cada tipo de relatório
- Implementar cache de relatórios
- Adicionar exportação para PDF/Excel

---


## 👤 Domínio: Usuário
- Model: Validar campos, relacionamento com outras entidades, importação correta do sequelize.
- Controller: (Quando estudado) autenticação, login/logout, recuperação de senha, permissões por tipo.
- Rotas: Prefixo `/usuario`, arquivo `usuario.route.js`. Rotas RESTful.

### ✅ Pontos Positivos
- Implementação de hash de senha
- Boas validações no model

### 🔧 Melhorias Necessárias

#### **1. Correções no Model (`usuario.model.js`)**
- **CRÍTICO**: Corrigir importação: `import sequelize from "../../../../config/database.js"`
- Completar validações dos campos `tipo_usuario` e `ultimo_login`
- Implementar relacionamento com outras entidades

#### **2. Melhorias no Controller (`usuario.controller.js`)**
- Implementar sistema de autenticação JWT
- Adicionar método de login/logout
- Implementar recuperação de senha
- Adicionar validação de permissões por tipo de usuário

#### **3. Correções nas Rotas (`usuario.model.js` → `usuario.routes.js`)**
- **CRÍTICO**: Renomear arquivo para `usuario.routes.js`
- Implementar rotas de autenticação
- Adicionar middleware de autorização

---


## 💼 Domínio: Venda
- Model: Corrigir campo client_id para cliente_id, relacionamentos, validação de valor total, campo desconto.
- Controller: Cálculo automático do valor total, validação de estoque, integração com pagamento, cancelamento de venda.
- Rotas: Prefixo `/venda`, arquivo `venda.route.js`. Rotas RESTful e relatórios de venda.

### ✅ Pontos Positivos
- Boa estrutura do model com validações
- Controller bem implementado
- Tratamento adequado de erros

### 🔧 Melhorias Necessárias

#### **1. Melhorias no Model (`vendas.model.js`)**
- Corrigir nome do campo `client_id` para `cliente_id`
- Implementar relacionamentos com outras tabelas
- Adicionar validação para calcular valor total automaticamente
- Implementar campo `desconto`

#### **2. Melhorias no Controller (`vendas.controller.js`)**
- Implementar cálculo automático do valor total
- Adicionar validação de estoque antes da venda
- Implementar integração com sistema de pagamento
- Adicionar método para cancelar venda

#### **3. Melhorias nas Rotas (`routes.js`)**
- Implementar rotas para relatórios de venda
- Adicionar rota para vendas por período
- Implementar rota para vendas por colaborador

---

## Consistência de Dados

### Melhorias Necessárias

- Implementar e testar todos os relacionamentos entre models conforme documentado nas regras de negócio (ex: belongsTo, hasMany, belongsToMany).
- Garantir que, ao deletar registros relacionados (ex: cliente, colaborador, produto), o sistema trate corretamente as dependências (ex: impedir exclusão se houver agendamentos/vendas, ou usar soft delete).
- Validar no controller se os IDs de entidades relacionadas existem antes de criar/atualizar registros (ex: ao criar um agendamento, verificar se cliente e colaborador existem).
- Garantir que os nomes dos campos de chave estrangeira estejam corretos e padronizados (ex: cliente_id, colaborador_id).
- Adicionar exemplos de uso dos relacionamentos nos controllers (ex: incluir dados do cliente ao buscar um agendamento).

---

**Observação:** Este documento deve ser usado como guia de desenvolvimento. Cada aluno deve implementar as melhorias do seu módulo seguindo as convenções estabelecidas no projeto e testando adequadamente antes de fazer commit.
