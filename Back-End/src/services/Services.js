const dataSource = require('../database/models');

class Services{
    constructor(nomeDaModelo){
        this.model = nomeDaModelo;
    }

    async pegaTodosRegistros(){
        return dataSource[this.model].findAll();
    }

    async pegaPorPk(id){
        return dataSource[this.model].findByPk(id);
    }

    async criarRegistro(novoRegistro){
        return dataSource[this.model].create(novoRegistro);
    }

    async atualizarRegistro(dadosAtualizados, id){
        const registrosAtualizados = dataSource[this.model].update(dadosAtualizados, {
            where: {id: id}
        });

        if(!registrosAtualizados[0] === 0){
            return false;
        }

        return true;
    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({ where: { id: id } });
      }
}

module.exports = Services;