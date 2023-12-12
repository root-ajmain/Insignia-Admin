import { FiMoreHorizontal } from "react-icons/fi";
import { useAppDispatch } from "../../../redux/hook";
import { setEditValue } from "../../../redux/features/dashboard/dashboardSlice";
import { Avatar, Image, Popover, Switch } from "antd";

export const useColumn = (
  setIsPhotoModalOpen,
  handleDeleteOne,
  handleUpdateVisibility
) => {
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "PREVIEW",
      width: 200,
      render: (item) =>
        item?.photo?.cloudinaryUrl ? (
          <Image
            className="w-28 h-20 shadow-md border-2 rounded-md object-cover inline-block"
            width={112}
            height={80}
            src={item?.photo?.cloudinaryUrl}
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
      title: "PLACE",
      dataIndex: "place",
    },
    {
      title: "DATE",
      dataIndex: "date",
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
                  setIsPhotoModalOpen(true);
                }}
                className="flex w-full items-center duration-300 px-4 py-0.5 text-sm capitalize hover:bg-primary hover:text-white gap-x-1 mb-2"
              >
                View Photo
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
