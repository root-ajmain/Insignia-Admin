import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";
import { Avatar, Tag, Rate, Switch, Popover } from "antd";

export const useColumn = (
  setEditOpen,
  handleDeleteOne,
  handleUpdateVisibility
) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "AVATAR",
      width: 100,
      render: (item) =>
        item?.photoUrl ? (
          <img
            src={item?.photoUrl}
            className="w-10 h-10 rounded-full object-cover inline-block"
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            size="large"
            gap={4}
          >
            {item?.photoUrl}
          </Avatar>
        ),
    },
    {
      title: "NAME",
      dataIndex: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "RATING",
      width: 350,
      render: (item) => <Rate allowHalf disabled defaultValue={item?.rate} />,
    },
    {
      title: "SELECTED",
      width: 100,
      render: (item) => (
        <Switch
          size="small"
          checked={item.isSelected}
          onClick={() => handleUpdateVisibility(item.id)}
          className="bg-brand__heading__text"
        />
      ),
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
