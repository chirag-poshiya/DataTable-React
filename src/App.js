
import './App.css';
import IndexDataTable from './Componets/DataTable/IndexDataTable_';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import HeaderDataTable from './Componets/layout/HeaderDataTable';
import CustomerService from './Componets/DataTable/CustomerService';



function App() {
  return (
    <>
      <HeaderDataTable />
      <IndexDataTable/>
      {/* <CustomerService /> */}
    </>
  );
}

export default App;
