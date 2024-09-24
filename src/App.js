import './App.css';
import dados from './dados.json'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [toggledClearRows, settoggledClearRows] = useState(false);
  const [selectedRows, setselectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows]  = useState(0);


  const API_URL = 'http://localhost:8080'

  const columns = [
    {
      name: 'Perfil',
      // eslint-disable-next-line jsx-a11y/alt-text
      selector: row => <img src={ row.perfil} className='img-perfil'/>,
    },
    {
      name: 'Código',
      selector: row => row.id,
      sortable: true
    },
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true
    },
    {
      name: 'Endereço',
      selector: row => row.endereco,
    },
    {
      name: 'Bairro',
      selector: row => row.bairro,
    },
    {
      name: 'CEP',
      selector: row => row.cep,
    },
    {
      name: 'Cidade',
      selector: row => row.cidade,
    },
    {
      name: 'Ação',
      cell: row => <>
        <button className='btn-editar' onClick={() => clickEditar(row.id)}>Editar</button>
        <button className='btn-excluir m-left'onClick={() => clickExcluir(row.id)}>Excluir</button>
        
      </>,
      width: "200px",
      right: true
    },
  ];

  const paginationOptions = {
    rowsPerPageText: 'Registros por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  function clickEditar(id){
      alert(id)
  }

  
  async function clickExcluir(id){
    try{
      const response = await axios.delete(API_URL + '/usuario/'+ id);
      //.then(() => setState({ status: 'Delete successful' }))

      setData(response.data)
    } catch(err) {
      // TODO
      // adicionar tratamento da exceção
      console.error(err);
    }
  }

   function ListarUsuarios(){
     setData(dados);
   }

  //  const handleButton = async () => {
  //   const result = await MessageBox.open({
  //     title: "Confirm",
  //     content: <p>Are you sure about something?</p>,
  //     buttons: [
  //       { name: "Yes", handler: () => "yes" },
  //       { name: "Nevermind", handler: () => "nope" }
  //     ]
  //   });
    //setResult(result);
  //};  

  async function ListarUsuariosAPI(page){
    //const response = await axios.get("https://reqres.in/api/users?page="+ page +"&per_page=10&delay=2");
    const response = await axios.get(API_URL + '/usuario');
    setData(response.data)
  }


  async function handlePerRowsChange(newQtde, page){
    //setData(dados);
    const response = await axios.get("https://reqres.in/api/users?page="+ page +"&per_page="+newQtde+"&delay=2");
    setData(response.data.data)
    setTotalRows(response.data.total)
  }

  async function handlePageChange(page){
    ListarUsuariosAPI(page)
  }

  useEffect(() => {
    //ListarUsuarios();
    ListarUsuariosAPI(1);
    }, [data])


  function handleClearRows(){
     settoggledClearRows(!toggledClearRows);
  }

  function handleSelectedChange({selectedRows}){
    setselectedRows(selectedRows);
  }

  // Arrow Function
  /*const handleClearRows = () => settoggledClearRows(!toggledClearRows);

  const handleClearRows = () => {
    settoggledClearRows(!toggledClearRows);
    alert('Ok');
  }
  */

  function handleExcluir(){
    selectedRows.map(item => {
      return alert('Excluir o registro: '+item.id);
    });
  }

  function rowsDisable(row){
    // eslint-disable-next-line eqeqeq
    return row.id == 3;
  }

  return (
      <>
        <h1>Gerenciamento de Usuários</h1>
        <button onClick={handleClearRows}>Limpar Seleção</button>
        <button onClick={handleExcluir}>Excluir</button>

        <DataTable
		  	columns={columns}
		  	data={data}
        pagination
        selectableRows
        clearSelectedRows={toggledClearRows}
        paginationComponentOptions={paginationOptions}
        onSelectedRowsChange={handleSelectedChange}
        selectableRowDisabled={rowsDisable}
        noDataComponent={"Nehum registro encontrado"}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationTotalRows={totalRows}
        paginationServer
        fixedHeader
	  	/>

    </>
  );
}

export default App;
