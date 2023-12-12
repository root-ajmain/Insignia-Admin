import { Divider, notification } from "antd";
import { useEffect, useState } from "react";
import CustomTableHeader from "../../components/common/CustomTable/CustomTableHeader";
import {
  useDeleteManyCustomerMutation,
  useDeleteOneCustomerMutation,
  useGetCustomerListQuery,
  useUpdateBlockStatusMutation,
} from "../../redux/features/customer/customerApi";
import CustomTable from "../../components/common/CustomTable";
import { useColumn } from "./components/columns";
import useToaster from "../../hooks/useToaster";

const CustomerList = () => {
  const [dynamicUrl, setDynamicUrl] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    blockStatus: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [updateBlockStatus, blockStatusResult] = useUpdateBlockStatusMutation();
  const [deleteOneCustomer, deleteOneResult] = useDeleteOneCustomerMutation();
  const [deleteManyCustomer, deleteManyResult] =
    useDeleteManyCustomerMutation();

  const { data, isLoading } = useGetCustomerListQuery(dynamicUrl);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onChange = (values) => {
    // Create a new state object based on the current state
    setDynamicUrl((prevDynamicUrl) => {
      let newState = { ...prevDynamicUrl };

      // Reset the values
      newState.blockStatus = "";

      for (const val of values) {
        newState.blockStatus = val;
      }

      return newState;
    });
  };

  const handleDeleteOneCustomer = (id) => {
    deleteOneCustomer(id);
  };

  const handleDeleteMany = () => {
    const options = {
      data: selectedRowKeys,
    };
    deleteManyCustomer(options);
  };

  const handleUpdateBlockStatus = (id) => {
    updateBlockStatus(id);
  };

  const { columns } = useColumn(
    handleDeleteOneCustomer,
    handleUpdateBlockStatus
  );

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

  useEffect(() => {
    if (blockStatusResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        blockStatusResult?.data?.message
      );
    }
    if (blockStatusResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        blockStatusResult?.error?.data?.errorMessages[0]?.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockStatusResult]);

  return (
    <>
      <div className="bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="w-full">
          <div>
            <h1 className="text-brand__font__size__xl text-brand__detail__text">
              Customer List
            </h1>
          </div>
          <Divider />
          <div className="w-full">
            <CustomTableHeader
              onChange={onChange}
              onSearch={(value) =>
                setDynamicUrl({
                  ...dynamicUrl,
                  searchTerm: value,
                })
              }
              options={[
                {
                  value: true,
                  label: "Blocked",
                },
                {
                  value: false,
                  label: "Unlocked",
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

        {/* <CustomModal
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
    </CustomModal> */}

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

export default CustomerList;
