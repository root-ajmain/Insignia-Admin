import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import CustomModal from "../../components/common/CustomModal";
import { Divider, Form, Input, notification } from "antd";
import {
  useAddVideoMutation,
  useDeleteManyVideoMutation,
  useDeleteOneVideoMutation,
  useGetAllVideoQuery,
  useUpdateOneVideoMutation,
  useUpdateVideoVisibilityMutation,
} from "../../redux/features/video/videoApi";
import useToaster from "../../hooks/useToaster";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setEditValue } from "../../redux/features/dashboard/dashboardSlice";

const VideoScreen = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    isSelected: "",
  });
  const [form] = Form.useForm();
  const { register, handleSubmit, reset } = useForm();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addVideo, addVideoResult] = useAddVideoMutation();
  const [updateOneVideo, updateVideoResult] = useUpdateOneVideoMutation();
  const [updateVideoVisibility, updateVideoVisibilityResult] =
    useUpdateVideoVisibilityMutation();
  const [deleteOneVideo, deleteVideoResult] = useDeleteOneVideoMutation();
  const [deleteManyVideo, deleteManyVideoResult] = useDeleteManyVideoMutation();

  const { data, isLoading } = useGetAllVideoQuery(dynamicUrl);

  const { dashboard } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const closeAddModal = () => {
    form.resetFields();
    setIsAddFormOpen(false);
  };

  const closeEditModal = () => {
    dispatch(setEditValue(null));
    reset();
    setIsEditFormOpen(false);
  };

  const onChange = (values) => {
    // Create a new state object based on the current state
    setDynamicUrl((prevDynamicUrl) => {
      let newState = { ...prevDynamicUrl };

      // Reset the values
      newState.isSelected = "";

      for (const val of values) {
        if (val === "selected") {
          newState.isSelected = true;
        }
      }

      return newState;
    });
  };

  const handleAddVideo = (values) => {
    const options = {
      data: values,
    };

    addVideo(options);
    form.resetFields();
    closeAddModal();
  };

  const handleUpdateVideo = (data) => {
    data.id = dashboard?.editValue?._id;
    const options = {
      data: data,
    };
    updateOneVideo(options);
    closeEditModal();
  };

  const handleUpdateVisibility = (id) => {
    updateVideoVisibility(id);
  };

  const handleDeleteOne = (id) => {
    deleteOneVideo(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyVideo(options);
  };

  const { columns } = useColumn(
    setIsEditFormOpen,
    handleUpdateVisibility,
    handleDeleteOne
  );

  useEffect(() => {
    if (addVideoResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        addVideoResult?.data?.message
      );
    }
    if (addVideoResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        addVideoResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVideoResult]);

  useEffect(() => {
    if (updateVideoResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        updateVideoResult?.data?.message
      );
    }
    if (updateVideoResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        updateVideoResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateVideoResult]);

  useEffect(() => {
    if (updateVideoVisibilityResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        updateVideoVisibilityResult?.data?.message
      );
    }
    if (updateVideoVisibilityResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        updateVideoVisibilityResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateVideoVisibilityResult]);

  useEffect(() => {
    if (deleteVideoResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteVideoResult?.data?.message
      );
    }
    if (deleteVideoResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteVideoResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteVideoResult]);

  useEffect(() => {
    if (deleteManyVideoResult?.data?.statusCode === 200) {
      setSelectedRowKeys([]);
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteManyVideoResult?.data?.message
      );
    }
    if (deleteManyVideoResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteManyVideoResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyVideoResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text">
              Video list
            </h1>
          </div>

          <Divider />

          <div className="w-full">
            <CustomTableHeader
              handleOpen={() => setIsAddFormOpen(true)}
              onChange={onChange}
              onSearch={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  searchTerm: value,
                })
              }
              options={[
                {
                  value: "selected",
                  label: "Selected",
                },
              ]}
              placeholder="Search by title"
              hasSelected={hasSelected}
              handleDeleteMany={handleDeleteMany}
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
          open={isAddFormOpen}
          closeModal={closeAddModal}
          id="createForm"
          title="Add Video"
          btnText="Submit"
        >
          <Form id="createForm" onFinish={handleAddVideo} form={form}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input Title!",
                },
              ]}
              label="Title"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="youtubeUrl"
              rules={[
                {
                  required: true,
                  message: "Please input Url!",
                },
              ]}
              label="Url"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </CustomModal>

        <CustomModal
          open={isEditFormOpen}
          closeModal={closeEditModal}
          id="editForm"
          title="Edit FAQ"
          btnText="Update"
        >
          <form id="editForm" onSubmit={handleSubmit(handleUpdateVideo)}>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <label
                  htmlFor="title"
                  className="text-brand__font__size__base my-2 block basis-[10%]"
                >
                  Title:
                </label>
                <textarea
                  name="title"
                  id="title"
                  cols="30"
                  rows="2"
                  placeholder="Title"
                  className=" w-full p-2 basis-[90%] outline-none border rounded-md"
                  defaultValue={dashboard?.editValue?.title}
                  {...register("title")}
                />
              </div>

              <div className="flex gap-1 max-w-[1000px] w-full">
                <label
                  htmlFor="url"
                  className="text-brand__font__size__base my-2 block basis-[15%]"
                >
                  URL:
                </label>
                <textarea
                  name="youtubeUrl"
                  id="url"
                  cols="30"
                  rows="4"
                  placeholder="URL"
                  className=" w-full p-2 basis-[85%] outline-none border rounded-md"
                  defaultValue={dashboard?.editValue?.youtubeUrl}
                  {...register("youtubeUrl")}
                />
              </div>
            </div>
          </form>
        </CustomModal>
      </div>

      {contextHolder}
    </>
  );
};

export default VideoScreen;
