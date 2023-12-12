import { FiMoreHorizontal } from "react-icons/fi";
import { useAppSelector } from "../../../redux/hook";
import { Popover } from "antd";

export const useColumn = (handleDeleteOneAdmin) => {
  const {
    auth: { user },
  } = useAppSelector((state) => state);

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
      title: "ROLE",
      render: (item) => (
        <span className="uppercase">
          {item.role}{" "}
          {user?.userId === item?.userId && (
            <span className="font-brand__font__bold">(YOU)</span>
          )}
        </span>
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
              <button
                onClick={() => handleDeleteOneAdmin(item.id)}
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
