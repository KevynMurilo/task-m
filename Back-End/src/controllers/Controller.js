class Controller {
    constructor(entidadeService){
        this.entidadeService = entidadeService;
    }

    async getAll(req, res){
        try {
            const tasks = await this.entidadeService.pegaTodosRegistros();
            return res.status(200).json(tasks);
        } catch (error) {
            return res.status(500).json({message: `Erro interno de servidor - ${error.message}`});
        }
    }

    async getById(req, res){
        const { id } = req.params;
        try {
            const task = await this.entidadeService.pegaPorPk(id);

            if(task === null){
                return res.status(404).json({message: "Registro não encontrado"})
            }
            return res.status(200).json(task);
        } catch (error) {
            return res.status(500).json({message: `Erro interno de servidor - ${error.message}`});
        }
    }

    async createTask(req, res){
        const novoRegistro = req.body;
        try {
            const registroCriado = await this.entidadeService.criarRegistro(novoRegistro);
            return res.status(200).json(registroCriado);
        } catch (error) {
            return res.status(500).json({message: `Erro interno de servidor - ${error.message}`});
        }
    }

    async updateTask(req, res){
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const foiAtualizado = await this.entidadeService.atualizarRegistro(dadosAtualizados, Number(id));

            if(!foiAtualizado){
                return res.status(400).json({message: `Erro ao atualizar os dados!`});
            }

            return res.status(200).json({message: 'Dados atualizados com sucesso!'});

        } catch (error) {
            return res.status(500).json({message: `Erro interno de servidor - ${error.message}`});
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        try {
          await this.entidadeService.excluiRegistro(Number(id));
          return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
          res.status(500).json({message: 'Erro interno de servidor'});
        }
      }
}

module.exports = Controller;