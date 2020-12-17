// Classes
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }

        return true;
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id');

        // Verifica se já existe uma despesa salva previamente.
        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    // Verifica o id da proxima despesa a ser gerada.
    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    // Salva a despesa no local storage.
    salvarDespesa(d) {
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));
        
        localStorage.setItem('id', id);
    }

    // Recupera registros
    recuperarTodosRegistros() {
        let despesas = Array();
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa === null) {
                continue;
            }

            despesas.push(despesa);
        }

        return despesas;
    }
}

let bd = new Bd();

// Cadastro de despesa
function cadastrarDespesa() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );
    
    if (despesa.validarDados()) {
        // bd.salvarDespesa(despesa);

        $('#tituloModal').text('Sucesso!').removeClass('text-danger').addClass('text-success');
        $('.modal-body').text('Despesa cadastrada.');
        $('.btn-modal').removeClass('btn-danger').addClass('btn-success');
        $('#modalCadastro').modal('show');

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';

    } else {
        $('#tituloModal').text('Erro na gravação').addClass('text-danger');
        $('.modal-body').text('Verifique se todos os campos foram preenchidos corretamente.');
        $('.btn-modal').addClass('btn-danger');
        $('#modalCadastro').modal('show');
    }
}

// Carrega a lista de despesas
function carregaListaDespesas() {
    let despesas = Array();

    despesas = bd.recuperarTodosRegistros();

    let listaDespesas = document.getElementById('listaDespesas');

    despesas.forEach(function (desp) {
        let linha = listaDespesas.insertRow();

        linha.insertCell(0).innerHTML = `${desp.dia}/${desp.mes}/${desp.ano}`;
        linha.insertCell(1).innerHTML = desp.tipo;

        switch(desp.tipo) {
            case '1': desp.tipo = 'Alimentação'
                break;
            case '2': desp.tipo = 'Educação'
                break;
            case '3': desp.tipo = 'Lazer'
                break;
            case '4': desp.tipo = 'Saúde'
                break;
            case '5': desp.tipo = 'Transporte'
                break;
        }

        linha.insertCell(2).innerHTML = desp.descricao;
        linha.insertCell(3).innerHTML = desp.valor;
    })
}