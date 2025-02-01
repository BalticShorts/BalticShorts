import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Auth } from "aws-amplify";
import { Footer } from "../modified-ui-components/Footer";
import { getUserProfile } from "../graphql/queries";
import { updateUserProfile } from "../graphql/mutations";
import { FaCog } from "react-icons/fa";

const fetchProfile = async (id) => {
  const profileData = await API.graphql({
    query: getUserProfile,
    variables: { id },
    authMode: "AWS_IAM",
  });
  return profileData.data.getUserProfile;
};

function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      if (!id) return;
      try {
        const data = await fetchProfile(id);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, [id]);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setEmailMessage("");
    if (newEmail !== confirmNewEmail) {
      setEmailMessage("Emails do not match.");
      return;
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: newEmail });
      setEmailMessage("Email update initiated. Please check your new email for a confirmation link.");
    } catch (error) {
      console.error("Error updating email:", error);
      setEmailMessage(`Error: ${error.message}`);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMessage("");
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, oldPassword, newPassword);
      setPasswordMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordMessage(`Error: ${error.message}`);
    }
  };

  const handleSubscribe = async () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    try {
      const updated = await API.graphql({
        query: updateUserProfile,
        variables: {
          input: { id: profile.id, is_member: true, member_untill: oneMonthFromNow },
        },
        authMode: "AWS_IAM",
      });
      setProfile(updated.data.updateUserProfile);
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  if (loading) {
    return <div className="bg-beige p-4">Loading...</div>;
  }

  return (
    <>
      <div className="bg-beige w-full min-h-screen p-4 relative">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="absolute top-4 right-4 text-black"
        >
          <FaCog size={28} />
        </button>

        <div className="w-5/6 mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Mans Profils</h1>
          <div className="p-4">
            <p className="text-xl">
              <strong>Vārds:</strong> {profile.name}
            </p>
            <p className="text-xl">
              <strong>Uzvards:</strong> {profile.surname}
            </p>
            <p className="text-xl">
              <strong>E-pasts:</strong> {profile.email}
            </p>
          </div>
        </div>

        <div className="w-5/6 mx-auto mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Abonements</h2>
          {profile.is_member ? (
            <div>
                <p className="text-green-700 font-bold">Abonements aktīvs!</p>
                <p className="text-green-700 font-bold">Abonets līdz {profile.member_untill}</p>
            </div>
        ) : (
            <div>
                <p className="text-green-700 font-bold">Abonēt!</p>
                <button
                onClick={handleSubscribe}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                Subscribe
                </button>
            </div>
          )}
        </div>
      </div>

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Settings</h2>

            <div className="mb-6">
              <div
                onClick={() => setShowEmailSection(!showEmailSection)}
                className="cursor-pointer text-blue-500 underline text-lg mb-2"
              >
                Change Email
              </div>
              {showEmailSection && (
                <form onSubmit={handleEmailUpdate}>
                  <div className="mb-4">
                    <label className="block text-lg mb-1" htmlFor="modalNewEmail">
                      New Email
                    </label>
                    <input
                      id="modalNewEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full p-2"
                      placeholder="Enter new email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg mb-1" htmlFor="modalConfirmNewEmail">
                      Confirm New Email
                    </label>
                    <input
                      id="modalConfirmNewEmail"
                      type="email"
                      value={confirmNewEmail}
                      onChange={(e) => setConfirmNewEmail(e.target.value)}
                      className="w-full p-2"
                      placeholder="Confirm new email"
                    />
                  </div>
                  {emailMessage && <p className="text-red-600 mb-2">{emailMessage}</p>}
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Email
                  </button>
                </form>
              )}
            </div>

            <div>
              <div
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                className="cursor-pointer text-blue-500 underline text-lg mb-2"
              >
                Change Password
              </div>
              {showPasswordSection && (
                <form onSubmit={handlePasswordUpdate}>
                  <div className="mb-4">
                    <label className="block text-lg mb-1" htmlFor="oldPassword">
                      Old Password
                    </label>
                    <input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-2"
                      placeholder="Enter old password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg mb-1" htmlFor="modalNewPassword">
                      New Password
                    </label>
                    <input
                      id="modalNewPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg mb-1" htmlFor="modalConfirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      id="modalConfirmNewPassword"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full p-2"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {passwordMessage && (
                    <p className="text-red-600 mb-2">{passwordMessage}</p>
                  )}
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Password
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default UserProfile;
