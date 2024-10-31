import React, { useState } from 'react';
import { useTable } from 'react-table';
import { FaSearch } from 'react-icons/fa';
import ModalImage from 'react-modal-image';
import Loader from '@/lib/loader';
import { TruckLoader } from '@/lib/TruckLoader';

const DataTable = ({ data, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const columns = React.useMemo(
        () => [
            {
                Header: 'Product Name',
                accessor: 'productName',
            },
            {
                Header: 'Quantity',
                accessor: 'productQuantity',
            },
            {
                Header: 'Color',
                accessor: 'productColor',
            },
            {
                Header: 'Sale Price',
                accessor: 'salePrice',
                Cell: ({ value }) => `${value} $`,
            },
            {
                Header: 'Image',
                accessor: 'imageUrl',
                Cell: ({ value }) => (
                    <ModalImage
                        small={value}
                        large={value}
                        height={50}
                        alt="Product Image"
                        hideZoom={false}
                        hideDownload={true}
                        className='bg-slate-300 h-6 cursor-pointer'
                        style={{ height: "50px", cursor: 'pointer' }}
                    />
                ),
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(row.original)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold transition-colors duration-200"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(row.original)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold ml-2 transition-colors duration-200"
                        >
                            Delete
                        </button>

                    </div>
                ),
            },
        ],
        [onDelete, onEdit]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const filteredRows = rows.filter(row => {
        const productName = row.values.productName.toLowerCase();
        return productName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
            <div className="overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                <div className="p-4 flex items-center sticky top-3">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FaSearch />
                        </span>
                    </div>
                </div>

                <div className="p-4 text-sm text-gray-600">
                    <span className='bg-blue-50 text-blue-500 py-2 px-4 rounded-md'>
                        {filteredRows.length === 0 ? 'No products found' : `${filteredRows.length} product${filteredRows.length > 1 ? 's' : ''} found`}
                    </span>
                </div>

                <table {...getTableProps()} className="min-w-full divide-y overflow-y-scroll divide-gray-200 mt-4">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-6 py-3 text-blue-500 text-left text-xs font-bold uppercase tracking-wider">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200 text-sm">
                        {filteredRows.length > 0 ? (
                            filteredRows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className='h-6'>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="px-6 py-4 overflow-hidden whitespace-nowrap">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 text-center">
                                    <div className='w-full h flex flex-col justify-center items-center'>
                                        <TruckLoader />
                                        <p className=' font-bold text-gray-600'>Loading products ...</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;