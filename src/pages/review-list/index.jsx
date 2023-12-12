import { useEffect, useState } from "react";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import {
  useDeleteManyReviewMutation,
  useDeleteOneReviewMutation,
  useGetAllReviewQuery,
  useUpdateReviewVisibilityMutation,
} from "../../redux/features/review/reviewApi";
import { Divider, notification } from "antd";
import CustomModal from "../../components/common/CustomModal";
import ViewReview from "./components/ViewReview";
import { useAppDispatch } from "../../redux/hook";
import { setEditValue } from "../../redux/features/dashboard/dashboardSlice";
import useToaster from "../../hooks/useToaster";

const Reviews = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isRead: "",
    isSelected: "",
  });

  const [isReadFormOpen, setIsReadFormOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [deleteOneReview, deleteOneResult] = useDeleteOneReviewMutation();
  const [deleteManyReview, deleteManyResult] = useDeleteManyReviewMutation();
  const [updateReviewVisibility, updateReviewVisibilityResult] =
    useUpdateReviewVisibilityMutation();

  const { data, isLoading } = useGetAllReviewQuery(dynamicUrl, {
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
      newState.isSelected = "";

      for (const val of values) {
        if (val === "read") {
          newState.isRead = true;
        } else if (val === "unread") {
          newState.isRead = false;
        } else if (val === "selected") {
          newState.isSelected = true;
        }
      }

      return newState;
    });
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleUpdateVisibility = (id) => {
    updateReviewVisibility(id);
  };

  const handleDeleteOne = (id) => {
    deleteOneReview(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyReview(options);
  };

  const { columns } = useColumn(
    setIsReadFormOpen,
    handleDeleteOne,
    handleUpdateVisibility
  );

  useEffect(() => {
    if (updateReviewVisibilityResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        updateReviewVisibilityResult?.data?.message
      );
    }
    if (updateReviewVisibilityResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        updateReviewVisibilityResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateReviewVisibilityResult]);

  useEffect(() => {
    if (deleteOneResult?.data?.statusCode === 200) {
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
              Customer&rsquo;s Reviews
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
                  value: "read",
                  label: "Read",
                },
                {
                  value: "unread",
                  label: "Unread",
                },
                {
                  value: "selected",
                  label: "Selected",
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
          title="Customer Review"
          modalType="view"
        >
          <ViewReview />
        </CustomModal>
      </div>

      {contextHolder}
    </>
  );
};

export default Reviews;
