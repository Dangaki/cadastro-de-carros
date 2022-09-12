let tableInicial;

window.onload = function() {
    tableInicial = document.getElementById("listaCarros").innerHTML;

    listarCarros();
};

function listarCarros(){
    let carros = JSON.parse(localStorage.getItem("carros") || "[]");
    let table = document.getElementById("listaCarros");
    table.innerHTML = tableInicial;
    carros.forEach(carro => {
        let row = table.insertRow(); 

        let cell = row.insertCell();
        cell.innerHTML = carro.marca;
        cell = row.insertCell();
        cell.innerHTML = carro.modelo;
        cell = row.insertCell();
        cell.innerHTML = carro.ano;
        cell = row.insertCell();
        cell.innerHTML = '<button onclick="abrirFormularioEditarCarro('+ carro.id +')" class="btn__opcoes editar">Editar</button>' + 
                         '<button onclick="excluirCarro('+ carro.id +')" class="btn__opcoes excluir">Excluir</button>';
    });
};

function adicionarCarro() {

    for (const el of document.getElementById('formulario').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            return;
        }
    }

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

    document.getElementById("formulario").reset();

    listarCarros();

    fecharFormulario()
};

function editarCarro(editarID){

    for (const el of document.getElementById('formulario').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            return;
        }
    }

    let carros = JSON.parse(localStorage.getItem("carros") || "[]");

    var posCarro = carros.map(function(x) {return x.id; }).indexOf(editarID);
    
    if(carros == null){
        console.log("carros é nulo");
        carros = [];
    }

    const form = document.querySelector('form');
    let data = Object.fromEntries(new FormData(form).entries());

    data.id = carros[posCarro].id;

    carros[posCarro] = data;

    localStorage.setItem("carros", JSON.stringify(carros));

    document.getElementById("formulario").reset();

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

function abrirFormularioNovoCarro(){
    document.getElementById("tituloForm").innerHTML = "Novo Carro";
    document.getElementById("btnFormulario").outerHTML = "<button id='btnFormulario' class='btn add' onclick='adicionarCarro()' form='formulario'>Adicionar</button>";

    document.getElementById("formulario").reset();
    document.getElementById("formularioJanela").style.display = "flex";
    document.getElementById("formularioCarroInner").scrollTop=0;
};

function abrirFormularioEditarCarro(editarID){
    document.getElementById("tituloForm").innerHTML = "Editar Carro";
    document.getElementById("btnFormulario").outerHTML = "<button id='btnFormulario' class='btn add' onclick='editarCarro("+editarID+")' form='formulario'>Editar</button>";

    document.getElementById("formulario").reset();
    document.getElementById("formularioJanela").style.display = "flex";
    document.getElementById("formularioCarroInner").scrollTop=0;

    let carros = JSON.parse(localStorage.getItem("carros") || "[]");
    
    let carroEditar = carros.find(x => x.id === editarID);

   const { elements } = document.querySelector('form');
   const checkbox_elements = document.querySelectorAll('input[type=checkbox]'); 


    for (const [ key, value ] of Object.entries(carroEditar) ) {
        const field = elements.namedItem(key);
        field && (field.value = value);
        
        for(var i=0, n=checkbox_elements.length;i<n;i++) {
            if(checkbox_elements[i].name == key){
                checkbox_elements[i].checked = true;
            }
        }
    }
};