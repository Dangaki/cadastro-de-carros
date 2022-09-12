let tableInicial;

window.onload = function() {
    tableInicial = document.getElementById("listaCarros").innerHTML;
    console.log(tableInicial)

    listarCarros();
};

function listarCarros(){
    let carros = JSON.parse(localStorage.getItem("carros") || "[]");
    let table = document.getElementById("listaCarros");
    table.innerHTML = tableInicial;
    console.log(table);
    console.log(carros.length);
    console.log(carros);
    carros.forEach(carro => {
        let row = table.insertRow(); 

        let cell = row.insertCell();
        cell.innerHTML = carro.marca;
        cell = row.insertCell();
        cell.innerHTML = carro.modelo;
        cell = row.insertCell();
        cell.innerHTML = carro.ano;
        cell = row.insertCell();
        cell.innerHTML = '<button onclick="editarCarro('+ carro.id +')">Editar</button>' + '<button onclick="excluirCarro('+ carro.id +')">Excluir</button>';
    });
};

function adicionarCarro() {
    let carros = JSON.parse(localStorage.getItem("carros") || "[]");
    let ultimoID = localStorage.getItem("ultimoID");

    if(carros == null){
        console.log("carros é nulo");
        carros = [];
    }

    if(ultimoID == null){
        console.log("ultimoID é nulo");
        ultimoID = -1;
    }
    
    const form = document.querySelector('form');
    let data = Object.fromEntries(new FormData(form).entries());

    data.id = Number(ultimoID) + 1;

    carros. push(data);
    localStorage.setItem("carros", JSON.stringify(carros));
    localStorage.setItem("ultimoID",Number(ultimoID)+ 1);
    console.log(carros);
    document.getElementById("formulario").reset();

    listarCarros();

    fecharFormulario()
};

function editarCarro(id){
    console.log("Carro editado:" + id);
    
    listarCarros();

    fecharFormulario()
};

function excluirCarro(removerID){
    let carros = JSON.parse(localStorage.getItem("carros") || "[]");
    
     carros = carros.filter(function( carro ) {
        return carro.id !== removerID;
    });

    localStorage.setItem("carros", JSON.stringify(carros));

    listarCarros();
};

function fecharFormulario(){
    document.getElementById("formularioJanela").style.display = "none";
};

function abrirFormulario(){
    document.getElementById("formulario").reset();
    document.getElementById("formularioJanela").style.display = "block";
    document.getElementById("formularioCarroInner").scrollTop=0;
};