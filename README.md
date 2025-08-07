# Estrutura de Diretórios - Sistema de Barbearia (MVC)

O sistema está organizado em 10 módulos/domínios principais, cada um representando um aspecto do negócio de barbearia. Utilizaremos o padrão MVC (Model-View-Controller) para garantir separação de responsabilidades e escalabilidade.

---

## Estrutura de Diretórios

```
barbearia-system/
│
├── src/
│   ├── modules/
│   │   ├── agenda/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── clientes/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── colaboradores/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── servicos/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── produtos/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── vendas/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── pagamentos/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── estoque/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── relatorios/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│   │   ├── autenticacao/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── views/
│
├── config/
├── database/
├── public/
├── tests/
└── README.md
```

---

## Descrição dos Models (Domínios)

1. **Agenda**
   - Model: Agendamento
   - Campos: data, hora, cliente_id, colaborador_id, servico_id, status

2. **Clientes**
   - Model: Cliente
   - Campos: nome, telefone, email, data_nascimento, endereco

3. **Colaboradores**
   - Model: Colaborador
   - Campos: nome, especialidade, telefone, email, data_admissao, status

4. **Serviços**
   - Model: Servico
   - Campos: nome, descricao, preco, duracao, status

5. **Produtos**
   - Model: Produto
   - Campos: nome, marca, preco, quantidade_estoque, descricao

6. **Vendas**
   - Model: Venda
   - Campos: cliente_id, colaborador_id, data, itens_venda, valor_total, pagamento_id

7. **Pagamentos**
   - Model: Pagamento
   - Campos: venda_id, tipo_pagamento, valor, status, data_pagamento

8. **Estoque**
   - Model: Estoque
   - Campos: produto_id, quantidade, localizacao, data_entrada, data_saida

9. **Relatórios**
   - Model: Relatorio
   - Campos: tipo_relatorio, parametros, data_geracao

10. **Autenticação**
    - Model: Usuario
    - Campos: nome_usuario, senha_hash, tipo_usuario, ativo, ultimo_login

---

## Descrição das Rotas

Cada módulo terá o seguinte padrão de rotas RESTful:

- `GET /modulo` — Listar todos
- `GET /modulo/:id` — Buscar por ID
- `POST /modulo` — Criar novo
- `PUT /modulo/:id` — Atualizar
- `DELETE /modulo/:id` — Remover

**Exemplo para Clientes:**
- `GET /clientes` — Lista todos os clientes
- `GET /clientes/123` — Busca o cliente de ID 123
- `POST /clientes` — Cria um novo cliente
- `PUT /clientes/123` — Atualiza o cliente de ID 123
- `DELETE /clientes/123` — Remove o cliente de ID 123

**Rotas Especiais**
- Agenda: `/agenda/colaborador/:id` (listar agendamentos de um colaborador)
- Relatórios: `/relatorios/vendas-mensais` (gerar relatório de vendas)
- Autenticação: `/login`, `/logout`, `/register`

---

## Observações

- Os subdiretórios `controllers`, `models`, `routes` e `views` garantem a separação entre as camadas do MVC.
- A pasta `config` contém arquivos de configuração (ambiente, variáveis, etc).
- A pasta `database` contém scripts ou migrations para banco de dados.
- A pasta `public` serve arquivos estáticos (imagens, css, js).
- A pasta `tests` contém os testes automatizados do sistema.
