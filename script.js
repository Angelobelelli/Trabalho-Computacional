// Classe que representa um arquivo CSV
class ArquivoCSV {
  // Construtor da classe, que recebe o nome do arquivo e seus dados
  constructor(nome, dados) {
    this.nome = nome; // Nome do arquivo CSV
    this.dados = dados; // Dados do arquivo CSV em formato de string
  }

  // Método para ler e processar os dados CSV
  lerDados() {
    // Converte o string CSV para um array de arrays, separando linhas e células
    const csvArray = this.dados.split('\n').map((row) => row.split(','));
    
    // Remove e retorna a primeira linha do array, que contém os cabeçalhos
    const headers = csvArray.shift();

    // Exibe os dados processados no console
    console.log(`Dados do arquivo ${this.nome}:`);
    console.log(csvArray);

    // Retorna os dados sem o cabeçalho
    return csvArray;
  }
}

// Classe responsável por ler e processar um arquivo CSV selecionado pelo usuário
class LeitorCSV {
  // Construtor da classe, que recebe um arquivo CSV
  constructor(arquivoCSV) {
    this.arquivoCSV = arquivoCSV; // O arquivo CSV selecionado pelo usuário
  }

  // Método para ler o arquivo CSV e processar seus dados
  lerArquivo() {
    // Cria uma instância do FileReader para ler o conteúdo do arquivo
    const reader = new FileReader();

    // Define o que deve ser feito quando o arquivo for carregado
    reader.onload = () => {
      const csvData = reader.result; // Dados CSV lidos como string
      const arquivo = new ArquivoCSV(this.arquivoCSV.name, csvData); // Cria uma instância de ArquivoCSV
      const dados = arquivo.lerDados(); // Processa os dados CSV

      // Renderiza os dados na tabela HTML
      this.renderizarDados(dados, this.arquivoCSV.name);
    };

    // Lê o arquivo como texto
    reader.readAsText(this.arquivoCSV);
  }

  // Método para criar e renderizar a tabela HTML com os dados CSV
  renderizarDados(dados, nomeArquivo) {
    const tabela = document.createElement('table'); // Cria um elemento de tabela HTML
    const cabecalho = dados.shift(); // Remove e armazena a primeira linha como cabeçalho

    // Cria a linha do cabeçalho da tabela
    const linhaCabecalho = document.createElement('tr');
    cabecalho.forEach((cabecalhoCelula) => {
      const celula = document.createElement('th'); // Cria uma célula de cabeçalho
      celula.textContent = cabecalhoCelula; // Define o texto da célula
      linhaCabecalho.appendChild(celula); // Adiciona a célula ao cabeçalho
    });
    tabela.appendChild(linhaCabecalho); // Adiciona a linha de cabeçalho à tabela

    // Adiciona as linhas de dados à tabela
    dados.forEach((linha) => {
      const linhaTabela = document.createElement('tr'); // Cria uma nova linha na tabela
      linha.forEach((celula) => {
        const celulaTabela = document.createElement('td'); // Cria uma célula de dados
        celulaTabela.textContent = celula; // Define o texto da célula
        linhaTabela.appendChild(celulaTabela); // Adiciona a célula à linha
      });
      tabela.appendChild(linhaTabela); // Adiciona a linha à tabela
    });

    // Decide onde inserir a tabela com base no nome do arquivo
    switch (nomeArquivo) {
      case 'livros-1.csv':
        document.getElementById('livros-data').appendChild(tabela); // Insere a tabela na seção 'livros-data'
        break;
      case 'autores.csv':
        document.getElementById('autores-data').appendChild(tabela); // Insere a tabela na seção 'autores-data'
        break;
      case 'estudantes.csv':
        document.getElementById('estudantes-data').appendChild(tabela); // Insere a tabela na seção 'estudantes-data'
        break;
      case 'emprestimo.csv':
        document.getElementById('emprestimos-data').appendChild(tabela); // Insere a tabela na seção 'emprestimos-data'
        break;
      default:
        console.log('Arquivo não reconhecido'); // Mensagem para arquivos não reconhecidos
    }
  }
}

// Adiciona um evento ao formulário para processar o arquivo CSV quando o formulário é submetido
document.getElementById('formCSV').addEventListener('submit', (e) => {
  e.preventDefault(); // Impede o comportamento padrão de envio do formulário
  const arquivoCSV = document.getElementById('arquivoCSV').files[0]; // Obtém o arquivo CSV selecionado
  const leitorCSV = new LeitorCSV(arquivoCSV); // Cria uma instância de LeitorCSV
  leitorCSV.lerArquivo(); // Inicia o processo de leitura e renderização do arquivo
});
