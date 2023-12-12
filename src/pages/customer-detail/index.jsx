import { useEffect, useState } from "react";
import {
  useDeleteOneCustomerMutation,
  useGetOneCustomerQuery,
  useUpdateBlockStatusMutation,
  useUpdateUserMutation,
} from "../../redux/features/customer/customerApi";
import { Button, Divider, Image, Spin, Switch, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import default__profile__photo from "../../assets/images/profile/profile.png";
import { BiEdit } from "react-icons/bi";
import CustomModal from "../../components/common/CustomModal";
import { useForm } from "react-hook-form";
import useToaster from "../../hooks/useToaster";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useToaster(api);
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [updateBlockStatus, blockStatusResult] = useUpdateBlockStatusMutation();
  const [deleteOneCustomer, deleteOneResult] = useDeleteOneCustomerMutation();
  const { data, isLoading } = useGetOneCustomerQuery(id);

  const closeEditModal = () => {
    reset();
    setIsEditFormOpen(false);
  };

  const handleUpdateUser = (userData) => {
    const options = {
      id: id,
      data: userData,
    };
    updateUser(options);
    closeEditModal();
  };

  useEffect(() => {
    if (updateUserResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        updateUserResult?.data?.message
      );
    }
    if (updateUserResult?.error?.status === 400) {
      openNotificationWithIcon(
        "error",
        "FAILED",
        updateUserResult?.error?.data?.errorMessages[0]?.message
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserResult]);

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

  useEffect(() => {
    if (deleteOneResult?.data?.statusCode === 200) {
      openNotificationWithIcon(
        "success",
        "SUCCESS",
        deleteOneResult?.data?.message
      );
      navigate("/admin/customer-list");
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

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center border justify-center">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />
      </div>
    );
  }
  return (
    <>
      <div className="bg-white p-4 rounded-md max-w-screen-xl mx-auto w-full shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 py-2">
          <div className="flex gap-2 items-center">
            <div className="rounded-full flex items-center justify-center border-2 shadow-md w-[60px] h-[60px]">
              <Image
                className="rounded-full object-cover"
                width={60}
                height={60}
                src={
                  data?.data?.photo?.cloudinaryUrl
                    ? data?.data?.photo?.cloudinaryUrl
                    : default__profile__photo
                }
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <h1 className="text-brand__font__size__xl font-brand__font__semibold">
                {data?.data?.email}
              </h1>
              <h2 className="font-brand__font__semibold">
                <span>ID:</span>{" "}
                <span className="bg-[#E2E3E5] px-2 py-0.5 rounded-xl">
                  {data?.data?.userId}
                </span>
              </h2>
            </div>
          </div>

          <div>
            <div className="flex gap-1">
              <Button
                onClick={() => setIsEditFormOpen(true)}
                className="text-primary flex items-center gap-x-1"
              >
                <BiEdit size={20} />{" "}
                <span className="text-brand__font__size__md font-brand__font__semibold">
                  Edit
                </span>
              </Button>

              <Button
                onClick={() => deleteOneCustomer(id)}
                type="primary"
                className="md:max-w-[150px] w-full uppercase"
                danger
              >
                Delete
              </Button>
            </div>
            <div className="w-fit ml-auto mt-1.5 flex items-center gap-x-2">
              <span className="font-brand__font__semibold uppercase">
                {data?.data?.blockStatus ? "Unblock" : "Block"}
              </span>
              <Switch
                size="small"
                className="bg-brand__heading__text"
                checked={data?.data?.blockStatus}
                onClick={() => updateBlockStatus(id)}
              />
            </div>
          </div>
        </div>

        <Divider />

        <div className="w-full">
          <h1 className="text-brand__font__size__md font-brand__font__semibold mb-3">
            Basic Details
          </h1>

          <div>
            <div className="py-2 capitalize">
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Name</span>
                </div>
                <div className="flex-1 font-brand__font__semibold flex gap-x-1">
                  <span>
                    {data?.data?.firstName ? data?.data?.firstName : "N/A"}
                  </span>
                  <span>
                    {data?.data?.lastName ? data?.data?.lastName : ""}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Gender</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>{data?.data?.gender ? data?.data?.gender : "N/A"}</span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Present Address</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.presentAddress
                      ? data?.data?.presentAddress
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Permanent Address</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.permanentAddress
                      ? data?.data?.permanentAddress
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Marital Status</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.martialStatus
                      ? data?.data?.martialStatus
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Date of Birth</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.dateOfBirth ? data?.data?.dateOfBirth : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Passport Number</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.passportNumber
                      ? data?.data?.passportNumber
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Passport Expiry Date</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.passportExpiryDate
                      ? data?.data?.passportExpiryDate
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>National ID</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.nationalID ? data?.data?.nationalID : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4 border-b">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Emergency Contact</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.emergencyContact
                      ? data?.data?.emergencyContact
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex px-1 py-4">
                <div className="max-w-[200px] w-full font-brand__font__light text-brand__detail__text">
                  <span>Religion</span>
                </div>
                <div className="flex-1 font-brand__font__semibold">
                  <span>
                    {data?.data?.religion ? data?.data?.religion : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <h1 className="text-brand__font__size__md font-brand__font__semibold mb-3">
            Bookings
          </h1>
          <br />
          <br />
          <br />
        </div>
      </div>
      <br />

      <CustomModal
        open={isEditFormOpen}
        closeModal={closeEditModal}
        id="editForm"
        title="Edit User"
        btnText="Update"
      >
        <form id="editForm" onSubmit={handleSubmit(handleUpdateUser)}>
          <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
            <div className="w-full">
              <label
                htmlFor="first-name"
                className="w-32 text-right text-brand__font__size__sm"
              >
                First Name
              </label>
              <div className="flex-1">
                <input
                  defaultValue={data?.data?.firstName}
                  type="text"
                  id="first-name"
                  name="firstName"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register("firstName")}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="last-name"
                className="w-32 text-right text-brand__font__size__sm"
              >
                Last Name
              </label>
              <div className="flex-1">
                <input
                  defaultValue={data?.data?.lastName}
                  type="text"
                  id="last-name"
                  name="lastName"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register("lastName")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
            <div className="w-full">
              <label
                htmlFor="date"
                className="w-32 text-right text-brand__font__size__sm"
              >
                Date of Birth
              </label>
              <div className="flex-1">
                <input
                  defaultValue={data?.data?.dateOfBirth}
                  type="date"
                  id="date"
                  name="dateOfBirth"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register("dateOfBirth")}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="nid"
                className="w-32 text-right text-brand__font__size__sm"
              >
                National ID
              </label>
              <div className="flex-1">
                <input
                  defaultValue={data?.data?.nationalID}
                  type="text"
                  id="nid"
                  name="nationalID"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  {...register("nationalID")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
            <div className="w-full">
              <label
                htmlFor="gender"
                className="w-32 text-right text-brand__font__size__sm"
              >
                Gender
              </label>
              <div className="flex-1">
                <select
                  defaultValue={data?.data?.gender}
                  id="gender"
                  name="gender"
                  autoComplete="true"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent capitalize"
                  {...register("gender")}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="martial-status"
                className="w-32 text-right text-brand__font__size__sm"
              >
                Marital Status
              </label>
              <div className="flex-1">
                <select
                  defaultValue={data?.data?.martialStatus}
                  id="martial-status"
                  name="martialStatus"
                  autoComplete="true"
                  className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent capitalize"
                  {...register("martialStatus")}
                >
                  <option value="">Select</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                </select>
              </div>
            </div>
          </div>

          <br />

          <div>
            <div className="mb-2">
              <h2 className="text-brand__font__size__md text-brand__detail__text">
                Address
              </h2>
            </div>

            <div>
              <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
                <div className="w-full">
                  <div className="flex-1">
                    <label
                      htmlFor="present-address"
                      className="w-32 text-right text-brand__font__size__sm"
                    >
                      Present Address
                    </label>
                    <textarea
                      defaultValue={data?.data?.presentAddress}
                      rows={2}
                      type="text"
                      id="present-address"
                      name="presentAddress"
                      className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      {...register("presentAddress")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
                <div className="w-full">
                  <div className="flex-1">
                    <label
                      htmlFor="permanent-address"
                      className="w-32 text-right text-brand__font__size__sm"
                    >
                      Permanent Address
                    </label>
                    <textarea
                      defaultValue={data?.data?.permanentAddress}
                      rows={2}
                      type="text"
                      id="permanent-address"
                      name="permanentAddress"
                      className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      {...register("permanentAddress")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div>
            <div className="mb-2">
              <h2 className="text-brand__font__size__md text-brand__detail__text">
                Passport & Others
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
              <div className="w-full">
                <label
                  htmlFor="password-number"
                  className="w-32 text-right text-brand__font__size__sm"
                >
                  Passport Number
                </label>
                <div className="flex-1">
                  <input
                    defaultValue={data?.data?.passportNumber}
                    type="text"
                    id="password-number"
                    name="passportNumber"
                    className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...register("passportNumber")}
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="passport-expiry-date"
                  className="w-32 text-right text-brand__font__size__sm"
                >
                  Passport Expiry Date
                </label>
                <div className="flex-1">
                  <input
                    defaultValue={data?.data?.passportExpiryDate}
                    type="date"
                    id="passport-expiry-date"
                    name="passportExpiryDate"
                    className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...register("passportExpiryDate")}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-3 my-3">
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="w-32 text-right text-brand__font__size__sm"
                >
                  Phone
                </label>
                <div className="flex-1">
                  <input
                    defaultValue={data?.data?.emergencyContact}
                    type="text"
                    id="phone"
                    name="emergencyContact"
                    className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...register("emergencyContact")}
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="religion"
                  className="w-32 text-right text-brand__font__size__sm"
                >
                  Religion
                </label>
                <div className="flex-1">
                  <input
                    defaultValue={data?.data?.religion}
                    type="text"
                    id="religion"
                    name="religion"
                    className="w-full rounded-md appearance-none border border-gray-300 py-2 px-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    {...register("religion")}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CustomModal>

      {contextHolder}
    </>
  );
};

export default CustomerDetail;
