import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

export default function OldIndexDataTable() {
    const Columns = [
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,   
            style: {
                background: "orange",
              },          
        },
        {
            name: 'Email',
            selector: row => row.Email,
            sortable: true,
            style: {
                background: "orange",
              },
        
        },
        {
            name: 'Age',
            selector: row => row.Age,
            sortable: true,
            style: {
                background: "orange",
              },
        
        },
    ]

    const Data =[
            {
              id: 1,
              name: "Leanne Graham",
              username: "Bret",
              Email: "Sincere@april.biz",
              Age: '12',
              address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
              }

            },
            {
              id: 2,
              name: "Ervin Howell",
              username: "Antonette",
              Email: "Shanna@melissa.tv",
              Age: '12',
              address: {
                street: "Victor Plains",
                suite: "Suite 879",
                city: "Wisokyburgh",
                zipcode: "90566-7771",
              }
            },
            {
              id: 3,
              name: "Clementine Bauch",
              username: "Samantha",
              Email: "Nathan@yesenia.net",
              Age: '12',
              address: {
                street: "Douglas Extension",
                suite: "Suite 847",
                city: "McKenziehaven",
                zipcode: "59590-4157",
              }
            },
            {
              id: 4,
              name: "Patricia Lebsack",
              username: "Karianne",
              Email: "Julianne.OConner@kory.org",
              Age: '12',
              address: {
                street: "Hoeger Mall",
                suite: "Apt. 692",
                city: "South Elvis",
                zipcode: "53919-4257",
              }
            },
            {
              id: 5,
              name: "Chelsey Dietrich",
              username: "Kamren",
              Email: "Lucio_Hettinger@annie.ca",
              Age: '12',
              address: {
                street: "Skiles Walks",
                suite: "Suite 351",
                city: "Roscoeview",
                zipcode: "33263",
              }
            },
            {
              id: 6,
              name: "Mrs. Dennis Schulist",
              username: "Leopoldo_Corkery",
              Email: "Karley_Dach@jasper.info",
              Age: '12',
              address: {
                street: "Norberto Crossing",
                suite: "Apt. 950",
                city: "South Christy",
                zipcode: "23505-1337",
              }
            },
            {
              id: 7,
              name: "Kurtis Weissnat",
              username: "Elwyn.Skiles",
              Email: "Telly.Hoeger@billy.biz",
              Age: '12',
              address: {
                street: "Rex Trail",
                suite: "Suite 280",
                city: "Howemouth",
                zipcode: "58804-1099",
              }
            },
            {
              id: 8,
              name: "Nicholas Runolfsdottir V",
              username: "Maxime_Nienow",
              Email: "Sherwood@rosamond.me",
              Age: '12',
              address: {
                street: "Ellsworth Summit",
                suite: "Suite 729",
                city: "Aliyaview",
                zipcode: "45169",
              }
            },
            {
              id: 9,
              name: "Glenna Reichert",
              username: "Delphine",
              Email: "Chaim_McDermott@dana.io",
              Age: '12',
              address: {
                street: "Dayna Park",
                suite: "Suite 449",
                city: "Bartholomebury",
                zipcode: "76495-3109",
              }
            },
            {
              id: 10,
              name: "Clementina DuBuque",
              username: "Moriah.Stanton",
              Email: "Rey.Padberg@karina.biz",
              Age: '12',
              address: {
                street: "Kattie Turnpike",
                suite: "Suite 198",
                city: "Lebsackbury",
                zipcode: "31428-2261",
              }
            }
          ]

    
    const [records , setRecords] = useState(Data);
    
    const HandleFilter = (event) => {
        const newData = Data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData);
    }

    return (
        <div className='max-w-[600px] py-[100px] mx-auto'>
            <div className='flex justify-end '>

                <form>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={HandleFilter}  placeholder="Search..." required />
                    </div>
                </form>

            </div>
            <DataTable
                columns={Columns}
                data={Data}
                selectableRows
                fixedHeader
                pagination
            >
            </DataTable>
        </div>
    )
}
