import { Table, Tag } from 'antd';
import ProductActions from './ProductActions';

const ProductTable = ({ products, handleEdit, handleDelete, handleView }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      render: (text) => <span>{text.slice(0, 100)}...</span>,
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} ⊆`,
      width: '10%',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'В наличии',
      dataIndex: 'stock',
      key: 'stock',
      width: '10%',
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock > 0 ? 'В наличии' : 'Нет в наличии'}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <ProductActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          id={record.id}
        />
      ),
      width: '10%',
    },
  ];
  
  return (
    <div className="overflow-x-auto max-w-full">
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 30 }}
        bordered
      />
    </div>
  );
};

export default ProductTable;
