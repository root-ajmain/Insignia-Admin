import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";
import { Popover, Tag } from "antd";

export const useColumn = (setEditOpen, handleDeleteOne) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
    },

    {
      title: "EMAIL OR PHONE",
      dataIndex: "emailOrPhone",
    },
    {
      title: "VIEW",
      render: (item) =>
        item?.isRead ? (
          <Tag color="success">seen</Tag>
        ) : (
          <Tag color="processing">unseen</Tag>
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
                onClick={() => {
                  dispatch(setEditValue(item));
                  setEditOpen(true);
                }}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
              >
                View
              </button>
              <button
                onClick={() => handleDeleteOne(item.id)}
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
