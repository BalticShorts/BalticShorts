import { useRef, useState, useEffect, useContext } from "react";
import { GlobalContext } from "../App";
import TermsOfService from "../components/TermsOfService/TOS";
import Agreement from "../components/Agreement/Agreement";
import Privacy from "../components/Privacy/Privacy";
import { useTranslation } from "react-i18next";

const Buj = () => {
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const agreementRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: contactRef, id: "contact" },
        { ref: termsRef, id: "terms" },
        { ref: privacyRef, id: "privacy" },
        { ref: agreementRef, id: "agreement" },
      ];

      const currentSection = sections.find(({ ref }) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect && rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    document.title = `Baltic Shorts - ${t("BUJ")}`;
  }, []);

  return (
    <div className="flex flex-col max-w-[1100px] m-auto bg-beige overflow-auto">
      <div className="flex flex-1 h-screen">
        <aside className="w-64 h-screen mobile:hidden"/>
        <aside className="mobile:hidden desktop:block w-64 h-screen fixed left-1/2 -translate-x-[550px] overflow-y-auto">
          <nav>
            <ul className="space-y-2 pl-2">
              <li className="typography-h2 my-50 uppercase">{t("Palīdzība")}</li>
              <li
                className={`typography-body border-b border-b-black pb-2 cursor-pointer ${
                  activeSection === "contact" ? "!font-bold" : ""
                }`}
                onClick={() => scrollToSection(contactRef)}
              >
                {t("Saziņa")}
              </li>
              <li
                className={`typography-body border-b border-b-black pb-2 cursor-pointer ${
                  activeSection === "terms" ? "!font-bold" : ""
                }`}
                onClick={() => scrollToSection(termsRef)}
              >
                {t("Lietošanas noteikumi")}
              </li>
              <li
                className={`typography-body border-b border-b-black pb-2 cursor-pointer ${
                  activeSection === "privacy" ? "!font-bold" : ""
                }`}
                onClick={() => scrollToSection(privacyRef)}
              >
                {t("Privātuma politika")}
              </li>
              <li
                className={`typography-body border-b border-b-black pb-2 cursor-pointer ${
                  activeSection === "agreement" ? "!font-bold" : ""
                }`}
                onClick={() => scrollToSection(agreementRef)}
              >
                {t("Distances līgums")}
              </li>
              <li
                className="typography-body border-b border-b-black pb-2 cursor-pointer"
                onClick={() => signOut()}
              >
                {t("Iziet")}
              </li>
            </ul>
          </nav>
        </aside>
    
        
        <main className="flex-1">
          {/* <section ref={faqRef} className="mb-12">
            <h2 className="text-xl font-semibold">BIEŽI UZDOTIE JAUTĀJUMI</h2>
            <ul className="space-y-2 mt-4">
              <li className="border-b pb-2 font-medium">► Lorem ipsum dolor sit amet?</li>
              <li className="border-b pb-2 font-medium">► Nunc molestie felis velit?</li>
              <li className="border-b pb-2 font-medium">► Integer pellentesque metus?</li>
            </ul>
          </section> */}
    
          <section ref={contactRef} className="my-50 border-b border-b-black">
            <h2 className="typography-h2 mb-50 pl-6 uppercase">{t("Saziņa")}</h2>
            <p className="text-gray-600 mt-2 ml-6 px-6 mb-50">
              Lai saņemtu papildu informāciju par Pakalpojuma izmantošanu vai iesniegtu sūdzības un komentārus, Klienti var sazināties ar SIA "Neonorma" elektroniski, rakstot uz e-pastu {" "}
                <a href="mailto:info@balticshorts.com" className="text-blue-500 cursor-pointer">info@balticshorts.com</a>
            </p>
          </section>
    
          <section ref={termsRef} className="mb-50 border-b border-b-black">
            <h2 className="typography-h2 mb-50 pl-6 uppercase">{t("Lietošanas noteikumi")}</h2>
            <TermsOfService />
            <div className="mb-50"/>
          </section>
    
          <section ref={privacyRef} className="mb-50 border-b border-b-black">
            <Privacy />
            <div className="mb-50"/>
          </section>
          <section className="mb-50" ref={agreementRef}>
            <Agreement />
            <div className="mb-50"/>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Buj;
