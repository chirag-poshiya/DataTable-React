import React from 'react'

import IndexDataTable from './DataTable/IndexDataTable_';
import HeaderDataTable from './layout/HeaderDataTable';
import { useParams } from 'react-router-dom';


export default function ResultPage({setLoading, setError}) {
    const {id} = useParams();
    return (
    <div>
      <HeaderDataTable />
      <IndexDataTable formId={id} setLoading={setLoading} setError={setError}/>
    </div>
  )
}
