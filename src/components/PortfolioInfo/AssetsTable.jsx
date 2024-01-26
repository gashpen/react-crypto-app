import { Table } from 'antd';
import { useSelector } from 'react-redux';

const AssetsTable = () => {

    const assets = useSelector(state => state.crypto.userCrypto);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Price, $',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
    ];
   
    const data = assets.map(a =>{
        return(
            {
                key: a.id,
                name: a.id,
                price: a.price,
                amount: a.amount
            }
        )
    })
    return (
        <Table pagination={false} columns={columns} dataSource={data} />
    );
}

export default AssetsTable;