
if(filtroChecked == 'all' || filtroChecked == null){
    document.getElementById('all').checked = true;
}else{
    document.getElementById(filtroChecked).checked = true;
}

async function filtroCat(filtro){
    window.location.href = `/?filtro=${filtro}`;
}

