
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from './CustomerService';
import '../../../src/index.css'
import { addLocale } from 'primereact/api';

import 'primeicons/primeicons.css';

import axios from 'axios';
import { useWordCount } from '../../Context/WordCountContext';
import ActionRequir from '../ActionRequir';
import NoActionRequir from '../NoActionRequir';
import { useLocation } from 'react-router-dom';




export default function CustomersDemo({ formId, setLoading, setError }) {

   const [customers, setCustomers] = useState([]);
   const [selectedCustomers, setSelectedCustomers] = useState([]);
   const [updatedProducts, setUpdatedProducts] = useState([]);
   const rowClass = (data) => {
      return {
         'bg-yellow-3': data.priority === 3,
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
   }, []);

   const getCustomers = (data) => {
      return [...(data || [])].map((d) => {
         d.date = new Date(d.date);

         return d;
      });
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
            {/* <span className="p-input-icon-left relative">
               <span className="pi pi-search absolute top-[50%] translate-y-[-50%] left-3" style={{ color: '#9ca3afb0' }}></span>
               <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span> */}
         </div>
      );
   };



   const disableBodyTemplate = (options) => {
      return <InputText disabled className="p-column-filter my-2" />;
   };


   const desableBodyTemplate = (rowData) => {
      return <Calendar disabled className='calender-datatable w-[8rem]' locale="es" />;
   };

   const onRowEditComplete = (e) => {
      let _products = [...customers];
      let { newData, index } = e;

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
   const { updateWordCount, updateRecordsCount, apiData } = useWordCount();
   let location = useLocation();

   const getData = () => {
      if (formId !== null) {
         setLoading(true);
         axios.get(`https://wmf-test.free.mockoapp.net/form/${formId}`)
            .then((res) => {
               return res.data.table_data;
            })
            .then( async (tblData) => {
               setTableData(tblData);
            // await updateRecordsCount(table1Data.length);

            })
            // .then(() => {

            //    setTable1Data(tableData.filter(t => t.priority !== 1));
            //    // console.log(tableData)

            // }).then(() => {
            //    console.log('tableData')
            //    // console.log(tableData)
            //    setTable2Data(tableData.filter(tb => tb.priority === 1));

            // }).then(() => {

            //    setLoading(false);
            //    // console.log('table1Datass')
            //    // console.log(table1Data.length, table1Data, tblData);

            // }).catch((err) => {

            // })
            .finally(() => {
               setLoading(false); // Set loading to false when the data fetch is complete (including errors)
            });
      }

   }
   useEffect(() => {
      setTable1Data(tableData.filter(t => t.priority !== 1));
      setTable2Data(tableData.filter(t => t.priority === 1));
      updateRecordsCount(table1Data.length);
      setLoading(false)
   }, [tableData]);


   // const getData = async () => {
   //    if (formId !== null) {
   //       setLoading(true);

   //       try {
   //          const response = await axios.get(`https://wmf-test.free.mockoapp.net/form/${formId}`);
   //          const tblData = response.data.table_data;

   //          setTableData(tblData);
   //          updateRecordsCount(table1Data.length);
   //          setTable1Data(tableData.filter(t => t.priority !== 1));
   //          // console.log('tableData');
   //          // console.log(tableData);
   //          // console.log("table1Data");
   //          // console.log(table1Data);
   //          // console.log("table2Data");
   //          // console.log(table2Data);
   //          setTable2Data(tableData.filter(tb => tb.priority === 1));
   //       } catch (error) {
   //          // Handle errors here
   //          console.error(error);
   //       } finally {
   //          setLoading(false);
   //       }
   //    }
   // };
   useEffect(() => {

      getData();
   }, [location]);


   // Edit row count


   const [inputValue, setInputValue] = useState('');
   const { wordCount, recordCount } = useWordCount();
   const isDisabled = wordCount > 5;


   const exQtyBodyTemplate = (options) => {
      // first input
      return <InputText
         // disabled={isDisabled}
         aria-disabled='false'
         className='border-0 calender-datatable disabled'
         onChange={(e) => {
            handleInputChange(e, options.id)
         }}
      />;
   };

   const exDateBodyTemplate = (options, rowData) => {
      // second input
      return <Calendar className='!border-0 calender-datatable'
         // disabled={isDisabled}
         value={rowData.date}
         locale="es"
         onChange={(e) => {
            updateRecordCount(options.id)
         }}
      />;
   };

   const noteBodyTemplate = (options) => {
      // third input
      return <>
         <InputText
            // disabled={isDisabled}
            className='border-0 calender-datatable'
            onChange={(e) => {
               updateRecordCount(options.id)
            }} />
      </>
   };

   const functionArray = [exQtyBodyTemplate, exDateBodyTemplate, noteBodyTemplate]

   const handleInputChange = (e, id) => {
      setInputValue(e.target.value);
      updateRecordCount(id);
   };

   const updateRecordCount = (id) => {
      const index = updatedProducts.findIndex(object => object === id);
      if (index === -1) {
         setUpdatedProducts(updatedProducts => [...updatedProducts, id]);
         updateWordCount(wordCount + 1);
      }
   }

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
                                 <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" sortField="representative.name" filterField="representative" showFilterMatchModes={false} style={{ minWidth: '114px' }} />
                                 <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" filterField="country.name" filterPlaceholder="Search by country" style={{ minWidth: '217px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" dataType="numeric" style={{ minWidth: '117px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" filterField="date" dataType="date" style={{ minWidth: '324px' }} />
                                 <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" filterField="date" dataType="date" style={{ minWidth: '184px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" filterField="date" dataType="date" style={{ minWidth: '229px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" filterField="date" dataType="date" style={{ minWidth: '242px' }} />
                                 <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" filterField="date" dataType="date" style={{ minWidth: '97px' }} />
                                 <Column className="whitespace-nowrap" field="w" header="W" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" filterField="date" dataType="date" style={{ minWidth: '69px' }} />
                                 <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" filterField="date" dataType="date" style={{ minWidth: '226px' }} />
                                 <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" filterField="date" dataType="date" style={{ minWidth: '164px' }} />
                                 <Column className="whitespace-nowrap" field="balance" header="Balance" filterField="date" dataType="date" style={{ minWidth: '90px' }} />
                                 <Column className="whitespace-nowrap hidden" field="priority" header="Priority" filterField="date" dataType="date" style={{ minWidth: '104px' }} />
                                 <Column editor={(options) => priceEditor(options)} className="whitespace-nowrap" header="Exp Quanity" body={exQtyBodyTemplate} />
                                 <Column editor={(options) => textEditor(options)} className="whitespace-nowrap" header="Exp delivery date" body={exDateBodyTemplate} />
                                 <Column editor={(options) => statusEditor(options)} header='Note' headerStyle={{ width: '80px', textAlign: 'center' }} body={noteBodyTemplate} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
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
                                 <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" sortField="representative.name" filterField="representative" showFilterMatchModes={false} style={{ minWidth: '114px' }} />
                                 <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" filterField="country.name" filterPlaceholder="Search by country" style={{ minWidth: '217px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" dataType="numeric" style={{ minWidth: '117px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" filterField="date" dataType="date" style={{ minWidth: '324px' }} />
                                 <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" filterField="date" dataType="date" style={{ minWidth: '184px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" filterField="date" dataType="date" style={{ minWidth: '229px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" filterField="date" dataType="date" style={{ minWidth: '242px' }} />
                                 <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" filterField="date" dataType="date" style={{ minWidth: '97px' }} />
                                 <Column className="whitespace-nowrap" field="w" header="W" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" filterField="date" dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" filterField="date" dataType="date" style={{ minWidth: '69px' }} />
                                 <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" filterField="date" dataType="date" style={{ minWidth: '226px' }} />
                                 <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" filterField="date" dataType="date" style={{ minWidth: '164px' }} />
                                 <Column className="whitespace-nowrap" field="balance" header="Balance" filterField="date" dataType="date" style={{ minWidth: '90px' }} />
                                 <Column className="whitespace-nowrap hidden" field="priority" header="Priority" filterField="date" dataType="date" style={{ minWidth: '104px' }} />
                                 <Column className="whitespace-nowrap" field="" editor={(options) => priceEditor(options)} body={disableBodyTemplate} />
                                 <Column className="whitespace-nowrap" field="" editor={(options) => textEditor(options)} showFilterMatchModes={false} body={desableBodyTemplate} />
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
