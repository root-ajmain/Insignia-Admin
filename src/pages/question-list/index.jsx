import { useEffect, useState } from "react";
import {
  useDeleteManyQuestionMutation,
  useDeleteOneQuestionMutation,
  useGetAllQuestionQuery,
} from "../../redux/features/question/questionApi";
import CustomModal from "../../components/common/CustomModal";
import { useAppDispatch } from "../../redux/hook";
import { setEditValue } from "../../redux/features/dashboard/dashboardSlice";
import ViewQuestion from "./components/ViewQuestion";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import useToaster from "../../hooks/useToaster";
import { Divider, notification } from "antd";

const Questions = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isRead: "",
  });

  const [isReadFormOpen, setIsReadFormOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [deleteOneQuestion, deleteOneResult] = useDeleteOneQuestionMutation();
  const [deleteManyQuestion, deleteManyResult] =
    useDeleteManyQuestionMutation();
  const { data, isLoading } = useGetAllQuestionQuery(dynamicUrl, {
    pollingInterval: 60000,
  });

  const dispatch = useAppDispatch();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const closeQuestionReadModal = () => {
    dispatch(setEditValue(null));
    setIsReadFormOpen(false);
  };

  const onChange = (values) => {
    // Create a new state object based on the current state
    setDynamicUrl((prevDynamicUrl) => {
      let newState = { ...prevDynamicUrl };

      // Reset the values
      newState.isRead = "";

      for (const val of values) {
        if (val === "true") {
          newState.isRead = true;
        } else if (val === "false") {
          newState.isRead = false;
        }
      }

      return newState;
    });
  };

  const handleDeleteOne = (id) => {
    deleteOneQuestion(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyQuestion(options);
  };

  const { columns } = useColumn(setIsReadFormOpen, handleDeleteOne);

  useEffect(() => {
    if (deleteOneResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteOneResult?.data?.message
      );
    }
    if (deleteOneResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteOneResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOneResult]);

  useEffect(() => {
    if (deleteManyResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteManyResult?.data?.message
      );
    }
    if (deleteManyResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteManyResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text">
              Customer&rsquo;s Queries
            </h1>
          </div>

          <Divider />

          <div className="w-full">
            <CustomTableHeader
              handleOpen={() => setIsReadFormOpen(true)}
              onChange={onChange}
              onSearch={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  searchTerm: value,
                })
              }
              options={[
                {
                  value: "true",
                  label: "Read",
                },
                {
                  value: "false",
                  label: "Unread",
                },
              ]}
              placeholder="Search by"
              hasSelected={hasSelected}
              handleDeleteMany={handleDeleteMany}
              needAddButton={false}
            />

            <CustomTable
              columns={columns}
              data={data?.data}
              pagination={{
                dynamicUrl,
                total: data?.meta?.total,
              }}
              isLoading={isLoading}
              onChange={({ current, pageSize }) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  page: current,
                  limit: pageSize,
                })
              }
              rowSelection={rowSelection}
            />
          </div>
        </div>

        <CustomModal
          open={isReadFormOpen}
          closeModal={closeQuestionReadModal}
          title="Customer Question"
          modalType="view"
        >
          <ViewQuestion />
        </CustomModal>
      </div>

      {contextHolder}
    </>
  );
};

export default Questions;
