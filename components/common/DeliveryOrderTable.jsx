// DeliveryOrderTable.js
import React from 'react';
import { useTable } from 'react-table';

const DeliveryOrderTable = ({ orders }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Tracking Number',
                accessor: 'trackingNumber',
            },
            {
                Header: 'Delivery Status',
                accessor: 'deliveryStatus',
            },
            {
                Header: 'Shipping Fee',
                accessor: 'shippingFee',
            },
            {
                Header: 'Invoice URL',
                accessor: 'invoiceURL',
                Cell: ({ value }) => (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View Invoice
                    </a>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: orders });

    return (
        <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryOrderTable;
