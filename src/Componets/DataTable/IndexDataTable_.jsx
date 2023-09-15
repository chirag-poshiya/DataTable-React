
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator, addLocale } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import '../../../src/index.css'
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

   const renderHeader = () => {
      return (
         <div className="w-full flex flex-wrap gap-2 justify-between items-center">
            <h4 className="m-0 text-[1.5rem]">Customers</h4>
         </div>
      );
   };

   const disableBodyTemplate = () => {
      return <InputText disabled className="p-column-filter my-2" />;
   };

   const desableBodyTemplate = () => {
      return <Calendar disabled className='calender-datatable w-[8rem]' locale="es" />;
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
            .then(async (tblData) => {
               setTableData(tblData);
            })
            .finally(() => {
               setLoading(false);
            });
      }

   }

   useEffect(() => {
      setTable1Data(tableData.filter(t => t.priority !== 1));
      setTable2Data(tableData.filter(t => t.priority === 1));
      updateRecordsCount(table1Data.length);
      setLoading(false)
   }, [tableData]);

   useEffect(() => {
      getData();
   }, [location]);


   // Edit row count
   const [inputValue, setInputValue] = useState('');
   const { wordCount, recordCount } = useWordCount();
   const isDisabled = wordCount > 5;
   const [postData, setPostData] = useState([]);

   const exQtyBodyTemplate = (options) => {
      // first input
      return <InputText
         aria-disabled='false'
         className='border-0 calender-datatable disabled'
         onChange={(e) => {
            updateRecordCount(options.id);
            updatePostData('qty', e.target.value, options.id);
         }}
      />;
   };

   const exDateBodyTemplate = (options, rowData) => {
      // second input
      return <Calendar className='!border-0 calender-datatable'
         value={rowData.date}
         locale="es"
         onChange={(e) => {
            updateRecordCount(options.id)
            updatePostData('date', e.target.value, options.id);
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
               updatePostData('note', e.target.value, options.id);
            }} />
      </>
   };

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
   const updatePostData = async (field, val, id) => {
      // console.log(field, val);
      // console.log('postData first', postData);
      
      let curData = postData.filter(p => p.id === id);
      console.log('curData length', curData.length, curData, postData)
      
      if (curData.length) {
         // console.log('present', curData, postData)
         let curData_ = postData.filter(p => p.id === id)
         // let curData_ = curData
         .map(  (d) => {
            if(d.id === id){
               // console.log('in map ', d, field, val)
               return  {...d, [field]: val}
            }
            return d;
         })
         setPostData(curData_);
         // console.log('after', curData_, postData)
         // curData = {...curData, [field]:val}
      } else {
         // console.log('else', postData)
         let newCurData = { ...curData, id: id, [field]:val }
         setPostData(postData => [...postData, newCurData]);
      }
      

      // console.log('curData out', postData);
      
      
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
                              <DataTable id="first-table" rowClassName={rowClass} editMode="row" value={table1Data} header={header}
                                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                 rowsPerPageOptions={[10, 25, 50]} dataKey="id" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                                 filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                                 emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                                 <Column className="whitespace-nowrap" field="part_number" header="Part Number" sortable style={{ minWidth: '129px' }} />
                                 <Column editor={(options) => priceEditor(options)} className="whitespace-nowrap" header="Exp Quanity" body={exQtyBodyTemplate} />
                                 <Column editor={(options) => textEditor(options)} className="whitespace-nowrap" header="Exp delivery date" body={exDateBodyTemplate} />
                                 <Column editor={(options) => statusEditor(options)} header='Note' headerStyle={{ width: '80px', textAlign: 'center' }} body={noteBodyTemplate} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} />
                                 <Column className="whitespace-nowrap" field="material_description" header="Material Description" sortable style={{ minWidth: '210px' }} />
                                 <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" sortable showFilterMatchModes={false} style={{ minWidth: '114px' }} />
                                 <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" sortable style={{ minWidth: '217px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" sortable style={{ minWidth: '117px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" sortable dataType="date" style={{ minWidth: '324px' }} />
                                 <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" sortable dataType="date" style={{ minWidth: '184px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" sortable dataType="date" style={{ minWidth: '229px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" sortable dataType="date" style={{ minWidth: '242px' }} />
                                 <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" sortable dataType="date" style={{ minWidth: '97px' }} />
                                 <Column className="whitespace-nowrap" field="w" header="W" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" sortable dataType="date" style={{ minWidth: '69px' }} />
                                 <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" sortable dataType="date" style={{ minWidth: '226px' }} />
                                 <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" sortable dataType="date" style={{ minWidth: '164px' }} />
                                 <Column className="whitespace-nowrap" field="balance" header="Balance" sortable dataType="date" style={{ minWidth: '90px' }} />
                                 <Column className="whitespace-nowrap hidden" field="priority" header="Priority" sortable dataType="date" style={{ minWidth: '104px' }} />
                              </DataTable>
                           </div>
                        </div>
                     }
                     {table2Data &&
                        <div className='flex gap-4 w-full px-[1.875rem]'>
                           <NoActionRequir />
                           <div className='w-[calc(100%_-_6.875rem)]'>
                              <DataTable id="second-table" rowClassName={rowClass} editMode="row" value={table2Data}
                                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                 rowsPerPageOptions={[10, 25, 50]} dataKey="id" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                                 filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                                 emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" >
                                 <Column className="whitespace-nowrap" field="part_number" header="Part Number" style={{ minWidth: '129px' }} />
                                 <Column className="whitespace-nowrap" field="material_description" header="Material Description" sortable style={{ minWidth: '210px' }} />
                                 <Column className="whitespace-nowrap" field="plant_code" header="Plant Code" style={{ minWidth: '114px' }} />
                                 <Column className="whitespace-nowrap" field="plant_name" header="Plant Name" sortable style={{ minWidth: '217px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_sap_code" header="Sap Code" sortable style={{ minWidth: '117px' }} />
                                 <Column className="whitespace-nowrap" field="supplier_name" header="Supplier Name" sortable dataType="date" style={{ minWidth: '324px' }} />
                                 <Column className="whitespace-nowrap" field="last_receipt_packlist" header="Last Receipt Packlist" sortable dataType="date" style={{ minWidth: '184px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_received_by_cfs" header="Tot, Cum, Received by CFS" sortable dataType="date" style={{ minWidth: '229px' }} />
                                 <Column className="whitespace-nowrap" field="tot_cum_required_at_day_1" header="Tot, Cum, Required at day-1" sortable dataType="date" style={{ minWidth: '242px' }} />
                                 <Column className="whitespace-nowrap" field="firm_qty" header="Firm Qty" sortable dataType="date" style={{ minWidth: '97px' }} />
                                 <Column className="whitespace-nowrap" field="w" header="W" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_1" header="W+1" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_2" header="W+2" sortable dataType="date" style={{ minWidth: '84px' }} />
                                 <Column className="whitespace-nowrap" field="w_plus_3" header="W+3" sortable dataType="date" style={{ minWidth: '69px' }} />
                                 <Column className="whitespace-nowrap" field="balance_without_promise" header="Balance without Promises" sortable dataType="date" style={{ minWidth: '226px' }} />
                                 <Column className="whitespace-nowrap" field="current_week_no" header="Current Week NO" sortable dataType="date" style={{ minWidth: '164px' }} />
                                 <Column className="whitespace-nowrap" field="balance" header="Balance" sortable dataType="date" style={{ minWidth: '90px' }} />
                                 <Column className="whitespace-nowrap hidden" field="priority" header="Priority" sortable dataType="date" style={{ minWidth: '104px' }} />
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
