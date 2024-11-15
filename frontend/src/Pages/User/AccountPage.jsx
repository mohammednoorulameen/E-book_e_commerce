import React from "react";
import Account from "../../Components/layout/User/Account/Account";
import EditProfile from "../../Components/layout/User/Account/EditProfile";
import ChangePassword from "../../Components/layout/User/Account/ChangePassword";
import ManageAddress from "../../Components/layout/User/Account/ManageAddress";
import OrderHistory from "../../Components/layout/User/Account/OrderHistory";
import Setting from "../../Components/layout/User/Account/Settings";

const AccountPage = () => {
  return (
    <div>
      <Account />
    </div>
  );
};

const EditProfilePage = () => {
  return (
    <div>
      <EditProfile />
    </div>
  );
};

const ChangePasswordPage = () => {
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

const ManageAddressPage = () => {
  return (
    <div>
      <ManageAddress />
    </div>
  );
};

const OrderHistoryPage = () => {
  return (
    <div>
      <OrderHistory />
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div>
      <Setting />
    </div>
  );
};
export {
  AccountPage,
  EditProfilePage,
  ChangePasswordPage,
  ManageAddressPage,
  OrderHistoryPage,
  SettingsPage,
};
