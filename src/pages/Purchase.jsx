import React, { useContext, useState, useEffect } from "react";
import TermsOfService from "../components/TermsOfService/TOS";
import Agreement from "../components/Agreement/Agreement";
import { GlobalContext } from "../App";
import { useLocation } from "react-router-dom";
import Privacy from "../components/Privacy/Privacy";
import { useTranslation } from "react-i18next";

const Purchase = () => {
  const context = useContext(GlobalContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTOS, setShowTOS] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentReference, setPaymentReference] = useState(null);
  const { t, i18n } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const reference = queryParams.get("reference");

    if (status && reference) {
      setPaymentStatus(status);
      setPaymentReference(reference);
    }
  }, [location.search]);

  const handlePayment = async () => {
    if (!isChecked || !isAgreementChecked || !isPrivacyChecked) {
      setError(t("Lūdzu, piekrītiet noteikumiem un nosacījumiem, distances līgumam un privātuma politikai."));
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://api.balticshorts.com/createSubscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "body": {
            "email": context.currentUser.email,
            "type": "initial",
            "userprofileID": context.currentUser.id
          }}),
      });

      const data = await response.json();
      const dataBody = JSON.parse(data.body);

      if (dataBody.success && dataBody.url) {
        window.location.href = dataBody.url;
      } else {
        setError("Maksājuma apstrādes kļūda.");
      }
    } catch (err) {
      setError("Tīkla kļūda. Lūdzu, mēģiniet vēlreiz.");
    }

    setLoading(false);
  };

    useEffect(() => {
      document.title = 'Baltic Shorts - Abonēt';
    }, []);

  return (
    <div className="max-w-lg mx-auto p-6 border border-black mt-10">
      {paymentStatus === "success" && paymentReference ? (
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest text-center">{t("Maksājuma apstiprinājums")}</h2>
          <p className="mt-4">{t("Maksājums veikts veiksmīgi!")}</p>
          <p className="mb-4">{t("Maksājuma kvīts pieejama e-pastā.")}</p>
          <p>{t("Maksājuma Atsauce:")} {paymentReference}</p>
          <p>{t("Abonements līdz:")} {context.currentUser.member_until?.split('T')[0]}</p>
          <p className="mt-4 text-center font-bold cursor-pointer"><a  href={`/${i18n.language}/catalogue`}>{t("Izbaudiet īsfilmas!")}</a></p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold uppercase tracking-widest">{t("Maksājuma apstiprinājums")}</h2>
          <div className="mt-4 border-t border-black pt-4">
            {paymentStatus === "fail" && <p className="text-red-500 text-l mt-2 text-center mb-4">{t("Maksājums nav izdevies")}</p>}
            {paymentStatus === "cancel" && <p className="text-red-500 text-l mt-2 text-center mb-4">{t("Maksājums atcelts")}</p>}
            <p className="text-lg font-semibold">{t("Abonements:")} <span className="font-normal">Balticshorts</span></p>
            <p className="text-lg font-semibold">{t("Cena:")} <span className="font-normal">{t("€3.99 / mēnesī")}</span></p>
          </div>

          <div className="mt-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mt-1"
              />
              <span className="text-sm">
                {t("Es piekrītu")} <span className="underline cursor-pointer" onClick={() => setShowTOS(true)}>{t("noteikumiem un nosacījumiem")}</span>.
              </span>
            </label>
          </div>

          <div className="pt-1">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAgreementChecked}
                onChange={() => setIsAgreementChecked(!isAgreementChecked)}
                className="mt-1"
              />
              <span className="text-sm">
                {t("Es piekrītu")} <span className="underline cursor-pointer" onClick={() => setShowAgreement(true)}>{t("distances līgumam")}</span>.
              </span>
            </label>
          </div>

          <div className="pt-1">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivacyChecked}
                onChange={() => setIsPrivacyChecked(!isPrivacyChecked)}
                className="mt-1"
              />
              <span className="text-sm">
                {t("Es piekrītu")} <span className="underline cursor-pointer" onClick={() => setShowPrivacy(true)}>{t("privātuma politikai")}</span>.
              </span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`mt-4 border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-beige transition"
            }`}
          >
            {loading ? t("Gaida...") : t("Apstiprināt un maksāt")}
          </button>
        </>
      )}

      {showTOS && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50 z-10 overscroll-auto">
          <div className="w-3/5 h-3/5 px-5 pt-5 bg-beige border border-black flex-col justify-start inline-flex overflow-y-auto items-center">
            <h1 className="text-2xl font-bold">{t("Lietošanas noteikumi")}</h1>
            <TermsOfService />
            <div className="button-default relative flex items-center justify-center py-5 border border-black mb-5 cursor-pointer" onClick={() => setShowTOS(false)}>
              {t("Aizvērt")}
            </div>
          </div>
        </div>
      )}

      {showAgreement && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50 z-10 overscroll-auto">
          <div className="w-3/5 h-3/5 px-5 pt-5 bg-beige border border-black flex-col justify-start inline-flex overflow-y-auto items-center">
            <h1 className="text-2xl font-bold">{t("Distances līgums")}</h1>
            <Agreement />
            <div className="button-default relative flex items-center justify-center py-5 border border-black mb-5 cursor-pointer" onClick={() => setShowAgreement(false)}>
              {t("Aizvērt")}
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50 z-10 overscroll-auto">
          <div className="w-3/5 h-3/5 px-5 pt-5 bg-beige border border-black flex-col justify-start inline-flex overflow-y-auto items-center">
            <h1 className="text-2xl font-bold">{t("Privātuma politika")}</h1>
            <Privacy />
            <div className="button-default relative flex items-center justify-center py-5 border border-black mb-5 cursor-pointer" onClick={() => setShowPrivacy(false)}>
              {t("Aizvērt")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
