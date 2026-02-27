// Dropdown.jsx
import { useContext } from "react";
import { GlobalContext } from "../../../App";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import { ReactComponent as X } from "../../../assets/images/x.svg";
import { ReactComponent as SearchB } from "../../../assets/images/search.svg";

export const Dropdown = ({ variant = "desktop", onClose, onSearch }) => {
  const context = useContext(GlobalContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang) => {
    if (i18n.language === lang) return;

    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);

    const pathParts = location.pathname.split("/").filter(Boolean);

    if (pathParts.length > 0 && ["lv", "en", "lt", "ee"].includes(pathParts[0])) {
      pathParts[0] = lang;
    } else {
      pathParts.unshift(lang);
    }

    const newPath = "/" + pathParts.join("/");
    navigate(newPath + location.search);
  };

  const signOut = async () => {
    try {
      await context.auth.signOut();
      context.setLoggedIn(false);
      context.setCurrentUser({});
      window.location.reload(true);
    } catch (error) {
      console.log("error on logging out: " + error);
    }
  };

  const languages = [
    { code: "lv", label: "LV" },
    { code: "lt", label: "LT" },
    { code: "ee", label: "EE" },
    { code: "en", label: "EN" },
  ];

  // ---------- MOBILE VARIANT ----------
  if (variant === "mobile") {
  return (
    <div className="w-full bg-beige border-b border-black rounded-t-[20px]">
      {/* Top row */}
      <div className="h-[60px] flex items-center justify-between px-15 border-b border-black">
        <button type="button" onClick={onClose} className="p-2 -ml-2" aria-label="Close">
          <X className="w-20 h-20" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            if (onSearch) onSearch();
          }}
          className="flex items-center gap-10 mr-15"
          aria-label="Search"
        >
          <SearchB className="w-20 h-20" />
          <span className="typography-body-small uppercase">{t("Meklēt")}</span>
        </button>
      </div>

      <div className="px-20 py-20 typography-body-small uppercase flex flex-col gap-10">
        {context.loggedIn && (<a href={`/${i18n.language}/user/${context.currentUser?.id}`}>{t("Mans profils")}</a>)}
        {context.loggedIn && context.currentUser?.is_admin && (<a href={`/${i18n.language}/upload`}>{t("Pieteikt darbu")}</a>)}
        <a href={`/${i18n.language}/`}>{t("Sākums")}</a>
        <a href={`/${i18n.language}/catalogue`}>{t("Katalogs")}</a>

      </div>

      <div className="border-b border-black" />

      <div className="px-20 py-20 typography-body-small uppercase flex flex-col gap-10">
        <a href={`/${i18n.language}/about`}>{t("Par mums")}</a>
        <a href={`/${i18n.language}/faq`}>{t("Palīdzība")}</a>
        {/* {context.loggedIn && <div className="cursor-pointer" onClick={signOut}>{t("Iziet")}</div>} */}
        {/* {!context.loggedIn && <div className="cursor-pointer" onClick={() => context.setLoggedInModal(true)}>{t("Ienākt")}</div>} */}
      </div>

      <div className="border-b border-black" />

      <div className="h-[60px] flex items-center justify-center gap-20 typography-body-small uppercase">
        {languages.map((lang, idx) => (
          <div key={lang.code} className="flex items-center">
            <button
              type="button"
              onClick={() => changeLanguage(lang.code)}
              className={i18n.language === lang.code ? "font-bold" : ""}
            >
              {lang.label}
            </button>
            {idx !== languages.length - 1 && <span className="mx-10">|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}


  // ---------- DESKTOP VARIANT  ----------
  return (
    <div className="w-36 h-fit justify-start inline-flex z-20 bg-beige border border-black">
      <div className="h-full w-full flex flex-col justify-center items-start gap-3 flex z-20 my-10">
        <div className="flex flex-col ml-2 text-black typography-technical-12 uppercase gap-2">
          <div>
            <a className="cursor-pointer" href={`/${i18n.language}/`}>{t("Sākums")}</a>
          </div>

          {context.loggedIn && (
            <>
              <div>
                <a className="cursor-pointer" href={`/${i18n.language}/user/${context.currentUser.id}`}>
                  {t("Mans profils")}
                </a>
              </div>
              {context.currentUser.is_admin && (
                <div>
                  <a className="cursor-pointer" href={`/${i18n.language}/upload`}>{t("Pieteikt darbu")}</a>
                </div>
              )}
            </>
          )}

          <div>
            <a className="cursor-pointer" href={`/${i18n.language}/catalogue`}>{t("Katalogs")}</a>
          </div>
        </div>

        <div className="w-full border-b border-black" />

        <div className="flex flex-col ml-2 text-black typography-technical-12 uppercase gap-2">
          <div>
            <a className="cursor-pointer" href={`/${i18n.language}/about`}>{t("Par mums")}</a>
          </div>

          {context.loggedIn && (
            <div>
              <a className="cursor-pointer" href={`/${i18n.language}/settings/${context.currentUser.id}`}>
                {t("Uzstādījumi")}
              </a>
            </div>
          )}

          <div>
            <a className="cursor-pointer" href={`/${i18n.language}/faq`}>{t("Palīdzība")}</a>
          </div>

          {context.loggedIn && (
            <div onClick={signOut}>{t("Iziet")}</div>
          )}
        </div>

        <div className="w-full justify-center items-center inline-flex gap-2 typography-technical-12">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`text-xs uppercase cursor-pointer ${
                i18n.language === lang.code ? "font-bold underline" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
