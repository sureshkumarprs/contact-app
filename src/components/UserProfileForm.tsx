import React, { useEffect, useState } from "react";
import {
  Members,
  BloodGroup,
  CommunicationPreference,
  Address,
  Gender,
  AddressType,
  FamilyDetails,
} from "../types/Users";

import AddressForm from "./AddressForm";
import DropdownSelect from "./DropdownSelect";
import GeoLocationDisplay from "./GeoLocationDisplay";
import Header from "./common/Header";
import ProfilePicUploader from "./common/ProfilePicUploader";
import FamilyDetailsDialog from "./common/FamilyDetailsDialog";
import FamilyDetailsTable from "./common/FamilyDetailsTable";
import { Member_Details } from "../types/Users_Mock";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../store/MembersSlice";
import {
  addAddress,
  AddressState,
  updateAddress,
} from "../store/AddressDetailsSlice";

const UserProfileForm: React.FC = () => {
  const [user, setUser] = useState<Members>(Member_Details);
  const [open, setOpen] = useState(false); // Maintains open/close state of Family Details Popup
  const [today, setToday] = useState("");

  const handleClose = () => setOpen(false); // Callback function to close the Family Details Popup
  const handleAddMember = () => setOpen(true); // Callback function to open the Family Details Popup

  const dispatch = useDispatch();

  const address_state: AddressState[] = useSelector(
    (state: any) => state.address_details
  );

  const family_details_state: FamilyDetails[] = useSelector(
    (state: any) => state.fmaily_members
  );

  const handleSaveMembersForm = () => {
    const present_address = address_state.find(
      (address) => address.address_type === AddressType.PresentAddress
    )?.address;

    const permanent_address = address_state.find(
      (address) => address.address_type === AddressType.PermanentAddress
    )?.address;

    const office_address = address_state.find(
      (address) => address.address_type === AddressType.OfficeAddress
    )?.address;
    if (present_address && permanent_address) {
      setUser({
        ...user,
        present_address,
        permanent_address,
        office_address,
      });
    }

    if (family_details_state && family_details_state.length) {
      setUser({
        ...user,
        family_details: family_details_state,
      });
    }
    dispatch(addMember(user));
  };

  const handleAddressChange = (addressType: AddressType, value: Address) => {
    const addressTypeFromState: AddressType[] = address_state.map(
      (address: AddressState) => address.address_type
    );

    if (addressTypeFromState.includes(addressType)) {
      dispatch(updateAddress({ address_type: addressType, address: value }));
    } else {
      dispatch(addAddress({ address_type: addressType, address: value }));
    }
  };

  // Set today's date in YYYY-MM-DD format
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setToday(formattedDate);
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Add Members" />
      <div className="p-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white">
            <div className="bg-gray-50 min-h-56 flex w-full mt-1 border items-center rounded">
              <ProfilePicUploader />
            </div>
          </div>
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={user.personal_details.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    name: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              max={today}
              placeholder="Date of Birth"
              value={user.personal_details.date_of_birth}
              onChange={(e) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    date_of_birth: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <DropdownSelect
              label="Educational Qualification"
              options={[
                "High School",
                "Higher Secondary",
                "Bachelors Degree",
                "Masters Degree",
                "PhD",
              ]}
              value={
                user.personal_details?.educational_qualification.education_level
              }
              onChange={(value) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    educational_qualification: { education_level: value },
                  },
                })
              }
            />
          </div>
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Mobile Number
            </label>
            <input
              type="email"
              placeholder="Mobile number"
              value={user.personal_details?.mobile_number}
              onChange={(e) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    mobile_number: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />

            <DropdownSelect
              label="Gender"
              options={
                ["Male", "Female", "Other", "Prefer not to say"] as Gender[]
              }
              value={user.personal_details?.gender}
              onChange={(value) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    gender: value,
                  },
                })
              }
            />

            <span className="pt-3 float-left">
              <input
                type="text"
                placeholder="Specialization"
                value={
                  user.personal_details?.educational_qualification
                    .specialization
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    personal_details: {
                      ...user.personal_details,
                      educational_qualification: {
                        specialization: e.target.value,
                      },
                    },
                  })
                }
                className="w-full p-2 border rounded mb-4 text-gray-600"
              />
            </span>
          </div>
          <div className="bg-white">
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Email ID"
              value={user.personal_details?.email_id}
              onChange={(e) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    email_id: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded mb-4 text-gray-600"
            />
            <DropdownSelect
              label="Blood Group"
              options={Object.values(BloodGroup)}
              value={user.personal_details?.blood_group}
              onChange={(value) =>
                setUser({
                  ...user,
                  personal_details: {
                    ...user.personal_details,
                    blood_group: value,
                  },
                })
              }
            />
          </div>
        </div>
        {/* Present Address Form */}
        <AddressForm
          label="Present Address"
          onAddressChange={(value) =>
            handleAddressChange(AddressType.PresentAddress, value)
          }
        />
        {/* Permanent Address Form */}
        <AddressForm
          label="Permanent Address"
          copyAddress={true}
          addressInfo={
            address_state.find(
              (address) => address.address_type === AddressType.PermanentAddress
            )?.address
          }
          onAddressChange={(value) =>
            handleAddressChange(AddressType.PermanentAddress, value)
          }
        />
        {/* Office Address Form */}
        <AddressForm
          label="Office Address"
          onAddressChange={(value) =>
            handleAddressChange(AddressType.OfficeAddress, value)
          }
        />
        <div className="p-4 border rounded-lg mt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1  text-left">
              <h2 className="text-lg font-semibold mb-4 text-gray-600">
                Family Members
              </h2>
            </div>
            <div className="flex-1 text-right">
              <button
                onClick={handleAddMember}
                className="bg-blue-600 text-white px-4 py-2 mb-2 rounded"
              >
                Add Family Member
              </button>
            </div>
          </div>

          <FamilyDetailsDialog open={open} onClose={handleClose} />
          <FamilyDetailsTable />
        </div>

        <div className="flex flex-wrap gap-4 border rounded p-4  mt-6">
          <div className="flex-1 min-w-[200px]">
            <GeoLocationDisplay geoLocation={user.geo_location} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Office Use
            </h2>
            <label className="text-gray-600 text-sm font-medium">
              Proposed by
            </label>
            <input
              type="text"
              className="p-2 border mb-3 rounded w-full text-gray-600"
            />
            <DropdownSelect
              label="Communication Preference"
              options={["In Person", "Postal"] as CommunicationPreference[]}
              value={user.communication_preference}
              onChange={(value) =>
                setUser({ ...user, communication_preference: value })
              }
            />
          </div>
        </div>
      </div>
      <div className="p-4 w-full bg-gray-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="reset"
            className="w-full sm:w-auto px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={handleSaveMembersForm}
            type="button"
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Save Member Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
