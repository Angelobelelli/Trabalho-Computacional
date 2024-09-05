const formCSV = document.getElementById('formCSV');
const livrosData = document.getElementById('livros-data');
const autoresData = document.getElementById('autores-data');
const estudantesData = document.getElementById('estudantes-data');
const emprestimosData = document.getElementById('emprestimos-data');

formCSV.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = arquivoCSV.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const csvData = reader.result;
    const csvArray = csvData.split('\n').map((row) => row.split(','));
    const headers = csvArray.shift();

    console.log('Dados do arquivo CSV:');
    console.log(csvArray);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      thead.appendChild(th);
    });

    csvArray.forEach((row) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    
    switch (file.name) {
      case 'livros-1.csv':
        livrosData.innerHTML = '';
        livrosData.appendChild(table);
        break;
      case 'autores.csv':
        autoresData.innerHTML = '';
        autoresData.appendChild(table);
        break;
      case 'estudantes.csv':
        estudantesData.innerHTML = '';
        estudantesData.appendChild(table);
        break;
      case 'emprestimo.csv':
        emprestimosData.innerHTML = '';
        emprestimosData.appendChild(table);
        break;
      default:
        alert("Arquivo não e reconhecido");
    }
  };

  reader.readAsText(file);
});