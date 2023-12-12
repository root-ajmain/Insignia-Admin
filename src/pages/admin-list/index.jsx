import { useEffect, useState } from "react";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import { Divider, Form, Input, notification } from "antd";
import {
  useCreateAdminMutation,
  useDeleteManyAdminMutation,
  useDeleteOneAdminMutation,
  useGetAdminListQuery,
} from "../../redux/features/admin/adminApi";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import CustomModal from "../../components/common/CustomModal";
import useToaster from "../../hooks/useToaster";

const AdminList = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    role: "",
  });
  const [form] = Form.useForm();
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [createAdmin, createAdminResult] = useCreateAdminMutation();
  const [deleteOneAdmin, deleteOneAdminResult] = useDeleteOneAdminMutation();
  const [deleteManyAdmin, deleteManyAdminResult] = useDeleteManyAdminMutation();

  const { data, isLoading } = useGetAdminListQuery(dynamicUrl);

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

  const onChange = (values) => {
    // Create a new state object based on the current state
    setDynamicUrl((prevDynamicUrl) => {
      let newState = { ...prevDynamicUrl };

      // Reset the values
      newState.role = "";

      for (const val of values) {
        newState.role = val;
      }

      return newState;
    });
  };

  const handleCreateAdmin = (values) => {
    const options = {
      data: values,
    };
    createAdmin(options);
    form.resetFields();
    closeAddModal();
  };

  const handleDeleteOneAdmin = (id) => {
    deleteOneAdmin(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyAdmin(options);
  };

  const { columns } = useColumn(handleDeleteOneAdmin);

  useEffect(() => {
    if (createAdminResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        createAdminResult?.data?.message
      );
    }
    if (createAdminResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        createAdminResult?.error?.data?.errorMessages[0]?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAdminResult]);

  useEffect(() => {
    if (deleteOneAdminResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteOneAdminResult?.data?.message
      );
    }
    if (deleteOneAdminResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteOneAdminResult?.error?.data?.errorMessages[0]?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOneAdminResult]);

  useEffect(() => {
    if (deleteManyAdminResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteManyAdminResult?.data?.message
      );
    }
    if (deleteManyAdminResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        deleteManyAdminResult?.error?.data?.errorMessages[0]?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteManyAdminResult]);

  return (
    <>
      <div className=" bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text">
              Admin List
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
                  value: "admin",
                  label: "Admin",
                },
                {
                  value: "super_admin",
                  label: "Super admin",
                },
              ]}
              placeholder="Search by"
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
          title="Create Admin"
          btnText="Submit"
        >
          <Form
            id="createForm"
            onFinish={handleCreateAdmin}
            form={form}
            labelCol={{
              flex: "90px",
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
              flex: 1,
            }}
            colon
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input first name!",
                },
              ]}
              label="First name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input place last name!",
                },
              ]}
              label="Last name"
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email!",
                },
              ]}
              label="Email"
            >
              <Input />
            </Form.Item>
          </Form>
        </CustomModal>

        {/* <CustomModal
          open={isPhotoModalOpen}
          closeModal={closePhotoModal}
          title="Gallery Photo"
          modalType="view"
        >
          <ViewPhoto />
        </CustomModal> */}
      </div>

      {contextHolder}
    </>
  );
};

export default AdminList;
