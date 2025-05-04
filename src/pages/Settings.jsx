import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, Auth } from "aws-amplify";
import { getUserProfile } from "../graphql/queries";
import { updateUserProfile } from "../graphql/mutations";
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

function SettingsPage() {
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
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseMessage, setPauseMessage] = useState("");

  const profileRef = useRef(null);
  const abonetRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  const handlePauseSubscription = async () => {
    try {
      const updated = await API.graphql({
        query: updateUserProfile,
        variables: {
          input: { id: profile.id, continues_payment: false },
        },
        authMode: "AWS_IAM",
      });
      setProfile(updated.data.updateUserProfile);
      setPauseMessage("Abonements ir atcelts, varat lietot mājaslapu līdz abonementa termiņa beigām.");
    } catch (error) {
      console.error("Error pausing subscription:", error);
    }
  };

  useEffect(() => {
    document.title = 'Baltic Shorts - Uzstādījumi';
  }, []);

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
            <button onClick={handleEmailUpdate} className="mt-4 px-4 py-2 bg-neutral-600 text-beige ">Atjaunot e-pastu</button>
            {emailMessage && <p className="text-red-500 mt-2">{emailMessage}</p>}
          </section>

          <hr />

          <section className="mt-8 pb-10">
            <h2 className="text-lg font-bold">MAINĪT PAROLI</h2>
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Vecā parole" onChange={(e) => setOldPassword(e.target.value)} />
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Jaunā parole" onChange={(e) => setNewPassword(e.target.value)} />
            <input type="password" className="border w-full p-2 mt-1 bg-beige" placeholder="Apstiprināt jauno paroli" onChange={(e) => setConfirmNewPassword(e.target.value)} />
            <button onClick={handlePasswordUpdate} className="mt-4 px-4 py-2 bg-neutral-600 text-beige">Mainīt paroli</button>
            {passwordMessage && <p className="text-red-500 mt-2">{passwordMessage}</p>}
          </section>

          <hr />

          <section className="mt-8 pb-10" ref={abonetRef}>
            <h2 className="text-lg font-bold">ABONEMENTS</h2>
            {profile.is_member ? (
              <>
                <p className="mt-2">Abonements aktīvs līdz: {profile.member_until?.split('T')[0]}</p>
                <p className="mt-2">Abonements tiek turpināts: {profile.continues_payment ? 'Jā' : 'Nē'}</p>
                {profile.continues_payment && (<button onClick={() => setShowPauseModal(true)} className="mt-4 px-4 py-2 bg-beige text-black border border-black">Apturēt abonementu</button>)}
              </>
            ) : (
              <button onClick={handleSubscribe} className="mt-4 px-4 py-2 bg-green-600 border border-black">Abonēt</button>
            )}
          </section>
        </main>
      </div>

      {showPauseModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-beige p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Vai tiešām vēlaties apturēt abonementu?</h2>
            <button
              className="bg-beige text-black px-4 py-2 rounded hover:bg-red-700 transition mx-2 border border-black"
              onClick={() => {
                handlePauseSubscription();
                setShowPauseModal(false);
              }}
            >
              Jā
            </button>
            <button
              className="bg-beige text-black px-4 py-2 rounded hover:bg-gray-400 transition mx-2 border border-black"
              onClick={() => setShowPauseModal(false)}
            >
              Nē
            </button>
          </div>
        </div>
      )}

      {pauseMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-beige p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">{pauseMessage}</h2>
            <button
              className="bg-beige text-black px-4 py-2 rounded hover:bg-gray-400 transition mx-2 border border-black"
              onClick={() => setPauseMessage("")}
            >
              Aizvērt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
