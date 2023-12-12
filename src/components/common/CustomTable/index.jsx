/* eslint-disable react/prop-types */
import { Table } from "antd";

const CustomTable = ({
  columns,
  data,
  isLoading,
  pagination,
  onChange,
  rowSelection,
}) => {
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      pagination={pagination}
      loading={isLoading}
      onChange={onChange}
      scroll={{
        x: "max-content",
        y: 600,
      }}
      rowKey='_id'
    />
  );
};

export default CustomTable;
