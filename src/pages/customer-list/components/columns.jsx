import { FiMoreHorizontal } from "react-icons/fi";
import { Popover, Switch } from "antd";
import { HashLink } from "react-router-hash-link";

export const useColumn = (handleDeleteOneCustomer, handleUpdateBlockStatus) => {
  const columns = [
    {
      title: "ID",
      width: 200,
      dataIndex: "userId",
    },
    {
      title: "NAME",
      render: (item) => (
        <span>
          {item.firstName} {item.lastName}
        </span>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "BLOCK STATUS",
      width: 150,
      render: (item) => (
        <Switch
          size="small"
          checked={item.blockStatus}
          onClick={() => handleUpdateBlockStatus(item.id)}
          className="bg-brand__heading__text"
        />
      ),
    },
    {
      title: "MORE",
      width: 100,
      render: (item) => (
        <Popover
          placement="leftTop"
          content={
            <>
              <HashLink
                to={`/admin/customer-detail/${item.id}`}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
              >
                View Profile
              </HashLink>
              <button
                onClick={() => handleDeleteOneCustomer(item.id)}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-danger hover:text-white gap-x-1"
              >
                Delete
              </button>
            </>
          }
        >
          <FiMoreHorizontal size={20} className=" cursor-pointer w-full" />
        </Popover>
      ),
    },
  ];

  return { columns };
};
