
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
  
        // Adiciona os dados ao elemento correspondente
        switch (this.arquivoCSV.name) {
          case 'livros-1.csv':
            document.getElementById('livros-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('livros-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'autores.csv':
            document.getElementById('autores-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('autores-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'estudantes.csv':
            document.getElementById('estudantes-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('estudantes-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          case 'emprestimo.csv':
            document.getElementById('emprestimos-data').innerHTML = '';
            dados.forEach((row) => {
              document.getElementById('emprestimos-data').innerHTML += `${row.join(', ')}<br>`;
            });
            break;
          default:
            console.log('Arquivo não reconhecido');
        }
      };
  
      reader.readAsText(this.arquivoCSV);
    }
  }
  
  document.getElementById('formCSV').addEventListener('submit', (e) => {
    e.preventDefault();
    const arquivoCSV = document.getElementById('arquivoCSV').files[0];
    const leitorCSV = new LeitorCSV(arquivoCSV);
    leitorCSV.lerArquivo();
  });