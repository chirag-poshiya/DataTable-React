
import './App.css';
import IndexDataTable from './Componets/DataTable/IndexDataTable_';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import HeaderDataTable from './Componets/layout/HeaderDataTable';
import { WordCountProvider } from './Context/WordCountContext';
import UserLogin from './Componets/UserLogin';
import { useState } from 'react';
import Spinner from './Componets/Spinner.js';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <WordCountProvider>
        {/* {loading ? ( */}
          <Spinner loading={loading}/>
        {/* ) :  */}
        {formId === null ? (
          <UserLogin setFormId={setFormId} setLoading={setLoading} />
        ) : (
          <>
            <HeaderDataTable />
            <IndexDataTable formId={formId} setFormId={setFormId} setLoading={setLoading} />
          </>
        )}
      </WordCountProvider>
    </>
  );
}

export default App;
