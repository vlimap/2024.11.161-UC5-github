export function renderPagamentoList(pagamentos) {
    return `
        <ul>
            ${pagamentos.map(p => `
                <li>
                    <strong>ID:</strong> ${p.id} |
                    <strong>Valor:</strong> R$ ${p.valor.toFixed(2)} |
                    <strong>Status:</strong> ${p.status}
                </li>
            `).join('')}
        </ul>
    `;
}

export function renderPagamentoForm(pagamento = {}) {
    return `
        <form id="pagamento-form">
            <label>
                Valor:
                <input type="number" name="valor" value="${pagamento.valor || ''}" required />
            </label>
            <label>
                Status:
                <select name="status">
                    <option value="pendente" ${pagamento.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                    <option value="pago" ${pagamento.status === 'pago' ? 'selected' : ''}>Pago</option>
                </select>
            </label>
            <button type="submit">Salvar</button>
        </form>
    `;
}