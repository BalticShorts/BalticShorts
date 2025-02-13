import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, Auth } from "aws-amplify";
import { getUserProfile } from "../graphql/queries";
import { updateUserProfile } from "../graphql/mutations";
import { Footer } from "../modified-ui-components/Footer";
import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";

const fetchProfile = async (id) => {
  try {
    const profileData = await API.graphql({
      query: getUserProfile,
      variables: { id },
      authMode: "AWS_IAM",
    });
    return profileData.data.getUserProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

function UserProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const profileRef = useRef(null);
  const abonetRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const context = useContext(GlobalContext);

  const signOut = async () => {
    try {
      await context.auth.signOut();
      context.setLoggedIn(false);
    } catch (error) {
      console.log("error on logging out: " + error);
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      if (!id) return;
      try {
        const data = await fetchProfile(id);
        setProfile(data);
        console.log("Profile data:", data);
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
    return <div className="bg-gray-100 p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="min-h-screen bg-beige text-black flex">
        {/* Sidebar */}
        <aside className="w-1/6 p-6 border-r border-gray-300">
          <h2 className="text-lg font-bold mb-4">UZSTĀDĪJUMI</h2>
          <ul className="space-y-2">
            <li className="text-gray-700 hover:text-black cursor-pointer" onClick={() => scrollToSection(profileRef)}>Profils</li>
            <li className="text-gray-700 hover:text-black cursor-pointer" onClick={() => scrollToSection(abonetRef)}>Abonements</li>
            {/* <li className="text-gray-600">Skatīšanās uzstādījumi</li>
            <li className="text-gray-600">Pievienotās filmas</li>
            <li className="text-gray-600">Baltic Shorts vēstkopā</li> */}
            <li className="text-gray-700 hover:text-black cursor-pointer" onClick={signOut}>Iziet</li>
          </ul>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex justify-between items-center">
          </div>

          <section className="mb-8" ref={profileRef}>
            <h2 className="text-lg font-bold">INFORMĀCIJA</h2>
            <p className="mt-2">Vārds: {profile.name}</p>
            <p>Uzvārds: {profile.surname}</p>
            <p>Bio: {profile.bio || "Nav apraksta"}</p>
          </section>

          <hr />

          <section className="mt-8 pb-10">
            <h2 className="text-lg font-bold">MAINĪT E-PASTU</h2>
            <input type="email" className="border w-full p-2 mt-1 bg-beige" placeholder="Jaunais e-pasts" onChange={(e) => setNewEmail(e.target.value)} />
            <input type="email" className="border w-full p-2 mt-1 bg-beige" placeholder="Apstiprināt jauno e-pastu" onChange={(e) => setConfirmNewEmail(e.target.value)} />
            <button onClick={handleEmailUpdate} className="mt-4 px-4 py-2 bg-neutral-600 text-white ">Atjaunot e-pastu</button>
            {emailMessage && <p className="text-red-500 mt-2">{emailMessage}</p>}
          </section>

          <hr />

          <section className="mt-8 pb-10">
            <h2 className="text-lg font-bold">MAINĪT PAROLI</h2>
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Vecā parole" onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Jaunā parole" onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Apstiprināt jauno paroli" onChange={(e) => setConfirmNewPassword(e.target.value)} />
            <button onClick={handlePasswordUpdate} className="mt-4 px-4 py-2 bg-neutral-600 text-white">Mainīt paroli</button>
            {passwordMessage && <p className="text-red-500 mt-2">{passwordMessage}</p>}
          </section>

          <hr />

          <section className="mt-8 pb-10" ref={abonetRef}>
            <h2 className="text-lg font-bold">ABONET</h2>
            <button onClick={handleSubscribe} className="mt-6 px-6 py-2 bg-green-600 text-white rounded">Abonēt</button>
          </section>
        </main>
      </div>
      <div id="footer" className="relative w-full">
        <Footer />
      </div>
    </div>
  );
}

export default UserProfile;
