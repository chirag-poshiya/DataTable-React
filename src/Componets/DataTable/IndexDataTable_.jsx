
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
import 'primeicons/primeicons.css';

import axios from 'axios';
import { useWordCount } from '../../Context/WordCountContext';
import ActionRequir from '../ActionRequir';
import NoActionRequir from '../NoActionRequir';




export default function CustomersDemo({ formId, setFormId, setLoading }) {

  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [datedata, setDatedata] = useState(null);
  const [products, setProducts] = useState([]);
  // const [rowData, setrowData] = useState([]);

  useEffect(() => {
    ProductService.getProductsMini().then(data => setProducts(data));
  }, []);

  const rowClass = (data) => {
    return {
      'bg-yellow-3': data.priority === 3,
      // 'bg-yellow-2': data.part_number === 'x5Bq5hcILd',
      // 'bg-yellow': data.part_number === 'aeePO3owJo',
      '': data.priority === 1,
    };
  };




  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
    // return value.toLocaleDateString('en-US', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric'
    // });
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
      <div className="w-full flex flex-wrap gap-2 justify-between items-center">
        <h4 className="m-0 text-[1.5rem]">Customers</h4>
        <span className="p-input-icon-left relative">
          <span className="pi pi-search absolute top-[50%] translate-y-[-50%] left-3" style={{ color: '#9ca3afb0' }}></span>
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '1.5rem' }} />
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

  const statusBodyTemplate = (options, rowData) => {
    return <InputText
      className='border-0 calender-datatable'
      onChange={(e) => {
        let _data = [...customers];
        _data[rowData.rowIndex].id = e.target.value
        setProducts(_data);
        // options.editorCallback(e.value)
        handleInputChange(e)
      }}
    />;
  };

  const statusFilterTemplate = (options) => {
    return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" />;
  };
  const disableBodyTemplate = (options) => {
    return <InputText disabled className="p-column-filter my-2" />;
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const activityBodyTemplate = (rowData) => {
    return <Calendar className='!border-0 calender-datatable'
      value={rowData.date}
      locale="es"
      onChange={(e) => {
        setDatedata(e.value)
        // handleInputChange(e)
      }}
    />;
  };
  const desableBodyTemplate = (rowData) => {
    return <Calendar disabled className='calender-datatable w-[8rem]' locale="es" />;
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


  // Axois-API
  const [tableData, setTableData] = useState([]);
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const { updateWordCount, apiData } = useWordCount();


  const getData = () => {
    if (formId !== null) {
      setLoading(true);
      axios.get(`https://wmf-test.free.mockoapp.net/form/${formId}`)
        .then((res) => {
          return res.data.table_data;
        })
        .then((tblData) => {
          setTableData(tblData);
          setTable1Data(tblData.filter(t => t.priority !== 1));
          setTable2Data(tblData.filter(tb => tb.priority === 1));
          setLoading(false);

        }).catch((err) => {
          setFormId(null)
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the data fetch is complete (including errors)
        });
    }

  }
  useEffect(() => {
    console.log('object')
    getData();
  },[]);


  // Edit row count


  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const words = e.target.value.trim().split(/\s+/);
    const wordCount = words.filter((word) => word !== '').length;
    updateWordCount(wordCount);

  };

  return (
    <>
      <div>
        <div className=" data-table pb-[1.875rem]">
          <div className='border-t'>
            <div className=''>
              {table1Data &&
                <div className='flex gap-4 w-full mt-[.625rem] px-[1.875rem]'>
                  <ActionRequir />
                  <div className='w-[calc(100%_-_6.875rem)]'>
                    <DataTable id="first-table" rowClassName={rowClass} editMode="row" onRowEditComplete={onRowEditComplete} value={table1Data} header={header}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      rowsPerPageOptions={[10, 25, 50]} dataKey="id" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                      filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                      emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                      <Column className="whitespace-nowrap" field="part_number" header="Part Number" filterPlaceholder="Search by number" style={{ minWidth: '129px' }} />
                      <Column className="whitespace-nowrap" field="material_description" header="Material Description" sortable filterPlaceholder="Search by name" style={{ minWidth: '210px' }} />
                      <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterElement={representativeFilterTemplate} style={{ minWidth: '114px' }} />
                      <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" filterField="country.name" filterPlaceholder="Search by country" style={{ minWidth: '217px' }} />
                      <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" dataType="numeric" body={balanceBodyTemplate} filterElement={balanceFilterTemplate} style={{ minWidth: '117px' }} />
                      <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '324px' }} />
                      <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '184px' }} />
                      <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '229px' }} />
                      <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '242px' }} />
                      <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '97px' }} />
                      <Column className="whitespace-nowrap" field="w" header="W" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '69px' }} />
                      <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '226px' }} />
                      <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '164px' }} />
                      <Column className="whitespace-nowrap" field="balance" header="Balance" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '90px' }} />
                      <Column className="whitespace-nowrap hidden" field="priority" header="Priority" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '104px' }} />
                      <Column editor={(options) => priceEditor(options)} className="whitespace-nowrap" field="status" header="Exp Quanity" body={statusBodyTemplate} filterElement={statusFilterTemplate} />
                      <Column editor={(options) => textEditor(options)} className="whitespace-nowrap" field="activity" header="Exp delivery date" showFilterMatchModes={false} body={activityBodyTemplate} filterElement={activityFilterTemplate} />
                      <Column editor={(options) => statusEditor(options)} header='Note' headerStyle={{ width: '80px', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                    </DataTable>
                  </div>
                </div>
              }
              {table2Data &&
                <div className='flex gap-4 w-full px-[1.875rem]'>
                  <NoActionRequir />
                  <div className='w-[calc(100%_-_6.875rem)]'>
                    <DataTable id="second-table" rowClassName={rowClass} editMode="row" onRowEditComplete={onRowEditComplete} value={table2Data}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      rowsPerPageOptions={[10, 25, 50]} dataKey="id" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                      filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                      emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                      <Column className="whitespace-nowrap" field="part_number" header="Part Number" filterPlaceholder="Search by number" style={{ minWidth: '129px' }} />
                      <Column className="whitespace-nowrap" field="material_description" header="Material Description" sortable filterPlaceholder="Search by name" style={{ minWidth: '210px' }} />
                      <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterElement={representativeFilterTemplate} style={{ minWidth: '114px' }} />
                      <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" filterField="country.name" filterPlaceholder="Search by country" style={{ minWidth: '217px' }} />
                      <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" dataType="numeric" body={balanceBodyTemplate} filterElement={balanceFilterTemplate} style={{ minWidth: '117px' }} />
                      <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '324px' }} />
                      <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '184px' }} />
                      <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '229px' }} />
                      <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '242px' }} />
                      <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '97px' }} />
                      <Column className="whitespace-nowrap" field="w" header="W" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '84px' }} />
                      <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '69px' }} />
                      <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '226px' }} />
                      <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '164px' }} />
                      <Column className="whitespace-nowrap" field="balance" header="Balance" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '90px' }} />
                      <Column className="whitespace-nowrap hidden" field="priority" header="Priority" filterField="date" dataType="date" filterElement={dateFilterTemplate} style={{ minWidth: '104px' }} />
                      <Column className="whitespace-nowrap" field="" editor={(options) => priceEditor(options)} body={disableBodyTemplate} filterElement={statusFilterTemplate} />
                      <Column className="whitespace-nowrap" field="" editor={(options) => textEditor(options)} showFilterMatchModes={false} filterElement={activityFilterTemplate} body={desableBodyTemplate} />
                      <Column className="whitespace-nowrap" field="" editor={(options) => statusEditor(options)} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={disableBodyTemplate} />
                    </DataTable>
                  </div>
                </div>

              }
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
