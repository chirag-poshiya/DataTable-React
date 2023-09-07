
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { CustomerService } from './CustomerService';
import '../../../src/index.css'
import { addLocale } from 'primereact/api';
import { ProductService } from './Products';



export default function CustomersDemo() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [datedata, setDatedata] = useState(null);
  const [products, setProducts] = useState([]);
  const [rowData, setrowData] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then(data => setProducts(data));
    console.log('first')
  }, []);

  const rowClass = (rowData) => {
    return {
      'bg-yellow': rowData.country.name === 'Egypt',
      'bg-yellow-2': rowData.country.name === 'Algeria',
      'bg-yellow-1': rowData.country.name === 'Panama',
      'bg-red-1': rowData.country.name === 'South Africa',
      'bg-red': rowData.country.name === 'Slovenia'
    };
  };



  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
  });
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [representatives] = useState([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
  ]);
  const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

  const getSeverity = (status) => {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  };

  useEffect(() => {
    CustomerService.getCustomersLarge().then((data) => setCustomers(getCustomers(data)));
    // name
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="w-full flex flex-wrap gap-2 justify-between align-items-center">
        <h4 className="m-0">Customers</h4>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} /> */}
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative;

    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
        <span>{representative.name}</span>
      </div>
    );
  };

  const representativeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Agent Picker</div>
        <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
        <span>{option.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
  };

  const balanceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.balance);
  };

  const balanceFilterTemplate = (options) => {
    return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
  };

  const statusBodyTemplate = (options , rowData) => {
    return <InputText
      className='border-0 calender-datatable'
      value={options.id}
      onChange={(e) => {
        let _data = [...customers];
        console.log(_data);
        _data[rowData.rowIndex].id = e.target.value
        setProducts(_data);
        console.log(e.target.value, rowData)
        console.log(customers)
        // options.editorCallback(e.value)
      }} />;
  };

  const statusFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const activityBodyTemplate = (rowData) => {
    return <Calendar className='!border-0 calender-datatable' value={rowData.date} onChange={(e) => setDatedata(e.value)} locale="es" />;
  };

  const activityFilterTemplate = (options) => {
    return (
      <>
        <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </>
    );
  };

  const actionBodyTemplate = (options, rowData) => {
    return <>
      {/* {console.log('first', rowData)} */}
      {/* <InputText className='border-0 calender-datatable' value={rowData.company} onChange={
        (e) => {
          console.log(e, a)
          let updatedRec = [...customers];
          updatedRec[a.rowIndex]['company'] = e.target.value;
          setCustomers(customers)
          console.log(customers, updatedRec)
        }
      } /> */}
      <InputText
        className='border-0 calender-datatable'
        value={options.company}
        onChange={(e) => {
          let _data = [...customers];
          console.log(_data);
          _data[rowData.rowIndex].company = e.target.value
          setProducts(_data);
          console.log(e.target.value, rowData)
          console.log(customers)
          // options.editorCallback(e.value)
        }} />
    </>
  };

  const onRowEditComplete = (e) => {
    let _products = [...customers];
    let { newData, index } = e;
    console.log(index, newData)
    _products[index] = newData;

    // setCustomers(_products);
  };

  const textEditor = (options) => {
    return <Calendar className='!border-0 calender-datatable' value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  };

  const statusEditor = (options) => {
    return (
      <InputText className='border-0 calender-datatable' value={options.value} />
    );
  };

  const priceEditor = (options) => {
    return <InputText className='calender-datatable' value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />;
  };

  const header = renderHeader();

  return (<div>


    <div className="data-table ">
      <DataTable editMode="row" onRowEditComplete={onRowEditComplete} rowClassName={rowClass} value={customers} paginator header={header} rows={5}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]} dataKey="id" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
        filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
        emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
        <Column headerStyle={{ width: '3rem' }}></Column>
        <Column field="name" header="Wk" sortable filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
        <Column field="country.name" header="CDA" filterField="country.name" style={{ minWidth: '14rem' }} body={countryBodyTemplate} filterPlaceholder="Search by country" />
        <Column header="Material" sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filterElement={representativeFilterTemplate} />
        <Column field="date" header="Description" filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filterElement={dateFilterTemplate} />
        <Column field="balance" header="..." dataType="numeric" style={{ minWidth: '12rem' }} body={balanceBodyTemplate} filterElement={balanceFilterTemplate} />
        <Column editor={(options) => priceEditor(options)} field="status" header="Exp Quanity" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate} />
        <Column editor={(options) => textEditor(options)} field="activity" header="Exp delivery date" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filterElement={activityFilterTemplate} />
        <Column editor={(options) => statusEditor(options)} header='Note' headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
      </DataTable>

      <DataTable value={customers} rows={5} paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        <Column headerStyle={{ width: '3rem' }}></Column>
        <Column field="name" filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
        <Column field="country.name" filterField="country.name" style={{ minWidth: '14rem' }} body={countryBodyTemplate} filterPlaceholder="Search by country" />
        <Column sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filterElement={representativeFilterTemplate} />
        <Column field="date" filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filterElement={dateFilterTemplate} />
        <Column field="balance" dataType="numeric" style={{ minWidth: '12rem' }} body={balanceBodyTemplate} filterElement={balanceFilterTemplate} />
        <Column field="status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filterElement={statusFilterTemplate} />
        <Column field="activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filterElement={activityFilterTemplate} />
        <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
      </DataTable>
    </div>
  </div>
  );
}
