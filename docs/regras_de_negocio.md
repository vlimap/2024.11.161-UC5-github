# Regras de negócio — Barbearia

## 1. Agenda
- O ponto de partida é a agenda: cliente escolhe serviço e profissional (barbeiro).
- Um barbeiro não pode ter horários que se sobrepõem.
- Cada serviço possui duração; adicionar 5 minutos de intervalo (buffer) após cada atendimento para arrumação.
- No‑show: cliente é considerado ausente se não comparecer até 15 minutos depois do horário.
- Cancelamento deve registrar origem (cliente ou loja).
- Workflow de status de agendamento (histórico): marcado → confirmado → cancelado → concluído → … (não apagar histórico).
- Um barbeiro só aparece na agenda se:
    - estiver com status ativo;
    - for apto a realizar o(s) serviço(s) selecionado(s).

## 2. Clientes
- Campos mínimos: nome e telefone (telefone é obrigatório e único entre clientes ativos).
- E‑mail é opcional.
- Um cliente pode ter vários agendamentos futuros, contanto que não haja sobreposição de intervalos.
- Serviços combinados (combo) podem ser:
    - registrado como um único item combo, ou
    - registrados como dois serviços na mesma janela (útil para comissão).
- Nunca apagar cadastro de cliente: apenas marcar inativo para esconder da lista ativa; histórico deve ser preservado (aniversários, agendamentos, vendas).

## 3. Colaboradores (Barbeiros)
- Campos relevantes: especialidades (serviços que pode realizar), data de admissão, status (ativo, férias, afastado, desligado).
- Apenas colaboradores ativos podem ser agendados.
- Comissão definida por par (colaborador ↔ serviço) — mesma pessoa pode ter comissões diferentes por serviço.
- Ao desligar, marcar inativo; não deletar.

## 4. Serviços
- Atributos: nome, descrição, preço, duração, status (ativo/inativo).
- Descontinuação = inativar; histórico mantido.
- Preço em vendas é sempre o preço praticado no momento da venda (congelar preço por venda); mudanças de preço não retrocedem vendas já efetuadas.

## 5. Produtos
- Atributos: nome, marca, descrição, SKU (único), preço, estoque.
- Produto sem estoque não pode ser vendido.
- Descontinuação = inativar; histórico mantido.
- Estoque só reduz no fechamento da venda.

## 6. Vendas (comercial)
- Uma venda pode conter itens de tipo produto e/ou serviço.
- Cada item da venda deve registrar:
    - tipo (produto | serviço),
    - quantidade,
    - preço praticado no momento,
    - referência a agendamento (se aplicável).
- Ciclo da venda: orçamento → aberta → fechada (quando pagamentos confirmados).
- Fechamento da venda deve ser transacional (all‑or‑nothing):
    - baixa de estoque,
    - cálculo e registro de comissão por colaborador/serviço,
    - confirmação da venda.
- Se qualquer passo falhar, nada deve ser registrado.

## 7. Pagamentos
- Uma venda pode ter múltiplos pagamentos (ex.: parte Pix, parte cartão).
- Status do pagamento: pendente, confirmado, estornado.
- Venda só é finalizada quando soma dos pagamentos confirmados >= valor da venda.
- Estorno pode reabrir a venda (se valor confirmado ficar abaixo do total).

## 8. Estoque e movimentações
- Histórico de movimentações obrigatório: cada entrada (compra), saída (venda), ajuste ou devolução gera uma linha.
- Saldo calculado a partir das movimentações (não manter contadores separados).
- Não aceitar saldo negativo.
- Ajustes exigem motivo.
- Alertas quando atingir estoque mínimo.

## 9. Relatórios
- Relatórios desejados: vendas mensais, comissões por barbeiro, taxa de no‑show, giro de estoque, etc.
- Ao gerar relatório, registrar: tipo, filtros aplicados e data de geração.
- Conteúdo do relatório pode ser armazenado em arquivo separado (mantendo metadados no sistema).

## 10. Autenticação e permissões
- Perfis: admin, atendente, barbeiro.
    - Admin: acesso total.
    - Atendente: gerencia agenda geral e vendas.
    - Barbeiro: vê apenas sua agenda e suas comissões.
- Usuário: login, senha (hash), status (ativo/inativo), último login.
- Bloqueio: 5 tentativas erradas → bloqueio por 15 minutos.
- Desligamento/inativação: marcar usuário inativo, não deletar.
- Conta de barbeiro pode estar vinculada ao registro do colaborador.

## 11. Regras transversais / de integridade
- Nunca deletar registros históricos relevantes; sempre inativar.
- Unicidade/validações:
    - Telefone único entre clientes ativos.
    - SKU único para produtos.
- Todas as operações críticas (fechamento de venda, movimentação de estoque, cálculo de comissão) devem ser atômicas e auditáveis.
- Registrar motivos e autor em ações administrativas (ajustes de estoque, inativação, cancelamentos).

Resumo: preservar histórico, garantir integridade temporal e financeira, evitar sobreposições em agenda, baixar estoque apenas em fechamento, comissões por par colaborador‑serviço, e controles de acesso claros.