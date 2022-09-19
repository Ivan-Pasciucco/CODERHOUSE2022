const editForm = document.getElementById('editForm');
const divEdit = document.getElementById('divEdit');

if(filtroChecked == 'all' || filtroChecked == null){
    document.getElementById('all').checked = true;
}else{
    document.getElementById(filtroChecked).checked = true;
}


async function prodById(id){
    const response = await axios.get(`/productos/${id}`);
    render(response.data);
}

function render(data){
    editForm.reset();
    divEdit.style.display = '';

    editForm[0].value = data.id;
    editForm[1].value = data.descripcion;
    editForm[2].value = data.precio;
    editForm[3].value = data.categoria;
}

function cancelEdit(){
    editForm.reset();
    divEdit.style.display = 'none';
}

async function filtroCat(filtro){
    window.location.href = `/productos?filtro=${filtro}`;
}