import ClienteModel from "../models/mordel";

class ClienteController {
    static async criar(req, res) {
        try {
            const { nome, telefone, email, data_nascimento, endereco } = req.body;
            const cliente = await ClienteModel.create({
                nome,
                telefone,
                email,
                data_nascimento,
                endereco
            });
            return res.status(201).json("Cliente criado com sucesso!", cliente);
        } catch (error) {
            return res.status(400).json( "Os parâmetros da requisição estão incorretos ou ausentes.", { error: error.message });
        }
    }

   static async listarTodos(req, res) {
        try {
            const clientes = await ClienteModel.findAll();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(400).json( "Os parâmetros da requisição estão incorretos ou ausentes.", { error: error.message });
        }
    }

   static async ListarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(400).json( "Os parâmetros da requisição estão incorretos ou ausentes.", { error: error.message });
        }
    }

   static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, telefone, email, data_nascimento, endereco } = req.body;
            const cliente = await ClienteModel.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            await cliente.update({
                nome,
                telefone,
                email,
                data_nascimento,
                endereco
            });
            return res.status(200).json("Cliente atualizado com sucesso!", cliente);
        } catch (error) {
            return res.status(400).json( "Os parâmetros da requisição estão incorretos ou ausentes.", { error: error.message });
        }
    }

   static async deletarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }
            await cliente.destroy();
            return res.status(204).send("Operação concluída com sucesso!");
        } catch (error) {
            return res.status(400).json( "Os parâmetros da requisição estão incorretos ou ausentes.", { error: error.message });
        }
    }
}

export default ClienteController;