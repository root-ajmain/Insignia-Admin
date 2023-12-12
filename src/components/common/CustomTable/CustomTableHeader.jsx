/* eslint-disable react/prop-types */
import { AutoComplete, Button, Select } from "antd";

const CustomTableHeader = ({
  handleOpen,
  onChange,
  options,
  onSearch,
  placeholder,
  hasSelected,
  handleDeleteMany,
  needAddButton = true,
}) => {
  return (
    <div className="h-full md:h-[80px] flex flex-col md:flex-row items-center justify-between py-2 gap-2">
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-fit">
        {needAddButton && (
          <div className="flex-1">
            <Button
              onClick={handleOpen}
              type="primary"
              className="bg-primary md:max-w-[150px] w-full uppercase"
            >
              Add new
            </Button>
          </div>
        )}

        <div className="flex-1">
          <Button
            onClick={handleDeleteMany}
            type="primary"
            className="md:max-w-[150px] w-full uppercase"
            danger
            disabled={!hasSelected}
          >
            Delete All
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full justify-end">
        <div className="w-full md:max-w-[200px]">
          <Select
            className="w-full"
            placeholder="Filter"
            optionFilterProp="children"
            onChange={onChange}
            allowClear
            mode="multiple"
            options={options}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <AutoComplete
            // style={{
            //   width: 200,
            // }}
            className="w-full"
            onSearch={onSearch}
            allowClear
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomTableHeader;
