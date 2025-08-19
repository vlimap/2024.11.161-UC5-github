
# Regras de Negócio - Sistema de Barbearia

Este documento descreve as principais regras de negócio do sistema, baseando-se nos campos e modelos já existentes. As regras aqui listadas devem ser seguidas por todos os módulos e funcionalidades do sistema.

---

## 1. Agenda
- Um agendamento deve conter data, hora, cliente, colaborador, serviço e status.
- Não pode haver dois agendamentos para o mesmo colaborador no mesmo horário.
- O status do agendamento pode ser: agendado, confirmado, cancelado, concluído.
- Só é possível agendar horários disponíveis.
- O cliente e o colaborador devem estar ativos para realizar um agendamento.
- O serviço agendado deve estar ativo.

## 2. Cliente
- Cada cliente deve ter nome, telefone, email, data de nascimento e endereço.
- O email deve ser único no sistema.
- O telefone deve ser válido e pode ser usado para contato e confirmação de agendamento.
- O cliente pode ter múltiplos agendamentos e vendas associadas.

## 3. Colaborador
- Cada colaborador deve ter nome, especialidade, telefone, email, data de admissão e status.
- O status pode ser: ativo, inativo, férias, desligado.
- O colaborador só pode ser associado a agendamentos e vendas se estiver ativo.
- O email deve ser único no sistema.
- A especialidade pode ser usada para filtrar agendamentos e serviços.

## 4. Serviço
- Cada serviço deve ter nome, descrição, preço, duração e status.
- O status pode ser: ativo, inativo.
- O serviço só pode ser agendado se estiver ativo.
- O preço deve ser maior que zero.

## 5. Produto
- Cada produto deve ter nome, marca, preço, quantidade em estoque e descrição.
- O preço deve ser maior que zero.
- A quantidade em estoque não pode ser negativa.
- Produtos podem ser vendidos e movimentados no estoque.

## 6. Venda
- Cada venda deve estar associada a um cliente, colaborador, data, itens vendidos, valor total e pagamento.
- O valor total deve ser a soma dos itens vendidos.
- Não é possível realizar venda sem itens.
- O pagamento deve ser registrado para cada venda.
- O estoque dos produtos vendidos deve ser atualizado após a venda.

## 7. Pagamento
- Cada pagamento deve estar associado a uma venda.
- O tipo de pagamento pode ser: dinheiro, cartão, pix, etc.
- O valor do pagamento deve ser igual ao valor da venda (ou considerar troco/parcelamento).
- O status pode ser: pendente, pago, cancelado.
- A data do pagamento deve ser registrada.

## 8. Estoque
- Cada movimentação de estoque deve estar associada a um produto.
- Não pode haver movimentação que resulte em estoque negativo.
- A entrada e saída de produtos devem ser registradas com data e quantidade.
- O local de armazenamento deve ser informado.

## 9. Relatório
- Relatórios podem ser gerados por tipo (ex: vendas diárias, mensais, produtos mais vendidos, desempenho de colaboradores).
- Os parâmetros do relatório devem ser informados conforme o tipo.
- A geração do relatório deve registrar a data e o usuário responsável.

## 10. Autenticação (Usuário)
- Cada usuário deve ter nome de usuário, senha (armazenada como hash), tipo de usuário, status (ativo/inativo) e data do último login.
- O tipo de usuário define permissões no sistema (ex: administrador, colaborador, gerente).
- Apenas usuários ativos podem acessar o sistema.
- O login deve ser feito por nome de usuário e senha.

---

## Relacionamentos Entre os Domínios

Os relacionamentos entre os modelos são fundamentais para garantir a integridade dos dados e permitir consultas eficientes. Abaixo estão os principais relacionamentos que devem ser implementados:

- **Cliente 1:N Agenda**
	- Um cliente pode ter vários agendamentos.
	- Cada agendamento pertence a um único cliente.

- **Colaborador 1:N Agenda**
	- Um colaborador pode ter vários agendamentos.
	- Cada agendamento pertence a um único colaborador.

- **Servico 1:N Agenda**
	- Um serviço pode estar em vários agendamentos.
	- Cada agendamento está vinculado a um único serviço.

- **Cliente 1:N Venda**
	- Um cliente pode ter várias vendas.
	- Cada venda pertence a um único cliente.

- **Colaborador 1:N Venda**
	- Um colaborador pode realizar várias vendas.
	- Cada venda pertence a um único colaborador.

- **Venda 1:1 Pagamento**
	- Cada venda deve ter um pagamento associado.
	- Cada pagamento pertence a uma única venda.

- **Venda N:M Produto (itens_venda)**
	- Uma venda pode conter vários produtos.
	- Um produto pode estar em várias vendas.
	- Este relacionamento é feito por meio de uma tabela intermediária (itens_venda), que armazena o id do produto, quantidade e valor unitário.

- **Produto 1:N Estoque**
	- Um produto pode ter várias movimentações de estoque (entradas e saídas).
	- Cada movimentação de estoque está vinculada a um único produto.

- **Usuário 1:N Relatório**
	- Um usuário pode gerar vários relatórios.
	- Cada relatório deve registrar o usuário responsável pela geração.

> **Observação:** Sempre utilize chaves estrangeiras (foreign keys) para garantir a integridade referencial entre as tabelas. Implemente os métodos de associação do Sequelize (hasMany, belongsTo, belongsToMany) conforme o tipo de relacionamento.


Essas regras devem ser consideradas em todas as implementações, garantindo integridade, segurança e funcionamento correto do sistema.
