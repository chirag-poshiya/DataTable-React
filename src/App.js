
import './App.css';
import IndexDataTable from './Componets/DataTable/IndexDataTable_';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import HeaderDataTable from './Componets/layout/HeaderDataTable';
import { WordCountProvider } from './Context/WordCountContext';
import UserLogin from './Componets/UserLogin';
import { useState } from 'react';
import Spinner from './Componets/Spinner.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultPage from './Componets/ResultPage';



function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <WordCountProvider>
        <BrowserRouter>
          <Spinner loading={loading} />
          <Routes>
            <Route exact path="/:id" element={<ResultPage setLoading={setLoading} />} />
          </Routes>
          {/* {formId === null ? (
            <UserLogin setFormId={setFormId} setLoading={setLoading} setError={setError} />
            // <ErrorModal error={error} />
          ) : (
            <>
              <HeaderDataTable />
              <IndexDataTable formId={formId} setFormId={setFormId} setLoading={setLoading} setError={setError} />
            </>
          )} */}
        </BrowserRouter>
      </WordCountProvider>
    </>
  );
}

export default App;
