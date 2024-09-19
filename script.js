class ArquivoCSV {
  constructor(nome, dados) {
    this.nome = nome;
    this.dados = dados;
  }

  lerDados() {
    const csvArray = this.dados.split('\n').map((row) => row.split(','));
    const headers = csvArray.shift();

    console.log(`Dados do arquivo ${this.nome}:`);
    console.log(csvArray);

    return csvArray;
  }
}

class LeitorCSV {
  constructor(arquivoCSV) {
    this.arquivoCSV = arquivoCSV;
  }

  lerArquivo() {
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result;
      const arquivo = new ArquivoCSV(this.arquivoCSV.name, csvData);
      const dados = arquivo.lerDados();

      this.renderizarDados(dados, this.arquivoCSV.name);
    };

    reader.readAsText(this.arquivoCSV);
  }

  renderizarDados(dados, nomeArquivo) {
    const tabela = document.createElement('table');
    const cabecalho = dados.shift();

    const linhaCabecalho = document.createElement('tr');
    cabecalho.forEach((cabecalhoCelula) => {
      const celula = document.createElement('th');
      celula.textContent = cabecalhoCelula;
      linhaCabecalho.appendChild(celula);
    });
    tabela.appendChild(linhaCabecalho);

    dados.forEach((linha) => {
      const linhaTabela = document.createElement('tr');
      linha.forEach((celula) => {
        const celulaTabela = document.createElement('td');
        celulaTabela.textContent = celula;
        linhaTabela.appendChild(celulaTabela);
      });
      tabela.appendChild(linhaTabela);
    });

    switch (nomeArquivo) {
      case 'livros-1.csv':
        document.getElementById('livros-data').appendChild(tabela);
        break;
      case 'autores.csv':
        document.getElementById('autores-data').appendChild(tabela);
        break;
      case 'estudantes.csv':
        document.getElementById('estudantes-data').appendChild(tabela);
        break;
      case 'emprestimo.csv':
        document.getElementById('emprestimos-data').appendChild(tabela);
        break;
      default:  
        console.log('Arquivo não reconhecido');
    }
  }
}

document.getElementById('formCSV').addEventListener('submit', (e) => {
  e.preventDefault();
  const arquivoCSV = document.getElementById('arquivoCSV').files[0];
  const leitorCSV = new LeitorCSV(arquivoCSV);
  leitorCSV.lerArquivo();
});