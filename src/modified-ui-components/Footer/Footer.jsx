import { useTranslation } from "react-i18next";
import gifAnimation from "../../assets/images/bs_logo_animation.gif";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <footer className="border-t border-black py-4 px-4 text-sm bg-beige mt-auto h-50">
      <div className="max-w-6xl mx-auto flex flex-col justify-between items-center">
        <div className="flex space-x-6 mb-2 typography-body-small">
          <span className='mobile:hidden'>© {new Date().getFullYear()}</span>
          <a href={`/${i18n.language}/about`} className="link-body-small link-hover">{t("Par Projektu")}</a>
          <a href={`/${i18n.language}/about#contact`} className="link-body-small link-hover">{t("Kontakti")}</a>
          <a href={`/${i18n.language}/faq`} className="link-body-small link-hover">{t("Lietošanas noteikumi")}</a>
        </div>

        <div className="flex space-x-6">
          <a href="https://www.instagram.com" className="link-body-small link-hover">Instagram</a>
          <a href="https://www.facebook.com" className="link-body-small link-hover">Facebook</a>
        </div>
      </div>
      <div className="flex flex-col justify-center my-4 gap-10 desktop:hidden pb-10">
          <img
              src= {gifAnimation}
              alt="Baltic Shorts"
              className="!w-[210px] h-20 cursor-pointer mx-auto"
              onClick={() => navigate(`/${i18n.language}/`)}
          />
          <span className='text-center text-h2-small font-semibold'>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
