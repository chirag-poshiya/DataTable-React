
import './App.css';
import IndexDataTable from './Componets/DataTable/IndexDataTable_';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import HeaderDataTable from './Componets/layout/HeaderDataTable';



function App() {
  return (
    <>
      <HeaderDataTable/>
      <IndexDataTable/>
    </>
  );
}

export default App;
