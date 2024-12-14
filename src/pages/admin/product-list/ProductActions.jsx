import {Button, Space, Popconfirm, Tooltip} from 'antd';
import {EditOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons'; // Импорт иконок

const ProductActions = ({onEdit, onDelete, onView, id}) => {
	return (
		<Space size="middle">
			<Button
				type="default"
				icon={<EditOutlined/>}
				onClick={() => onEdit(id)}
			/>
			<Tooltip title={`Посмотреть`}>
				<Button
					type="default"
					icon={<EyeOutlined/>}
					onClick={() => onView(id)}
				/>
			</Tooltip>
			<Popconfirm
				title="Вы уверены, что хотите удалить этот продукт?"
				onConfirm={() => onDelete(id)}
				okText="Да"
				cancelText="Нет"
			>
				<Button
					danger
					icon={<DeleteOutlined/>}
				/>
			</Popconfirm>
		</Space>
	);
};

export default ProductActions;
