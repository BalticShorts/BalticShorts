import { useRef } from "react";
import { useContext } from "react";
import { GlobalContext } from "../App";
import TermsOfService from "../components/TermsOfService/TOS";
import Agreement from "../components/Agreement/Agreement";
import Privacy from "../components/Privacy/Privacy";

const Buj = () => {
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const termsRef = useRef(null);
  const privacyRef = useRef(null);
  const agreementRef = useRef(null);

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

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 h-screen">
        <aside className="hidden md:block w-64 border-r p-4 sticky top-0 h-screen">
          <nav>
            <ul className="space-y-2">
              <li className="font-bold">PALĪDZĪBA</li>
              {/* <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => scrollToSection(faqRef)}
              >
                Bieži uzdotie jautājumi
              </li> */}
              <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => scrollToSection(contactRef)}
              >
                Saziņa
              </li>
              <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => scrollToSection(termsRef)}
              >
                Lietošanas noteikumi
              </li>
              <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => scrollToSection(privacyRef)}
              >
                Privātuma politika
              </li>
              <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => scrollToSection(agreementRef)}
              >
                Distances līgums
              </li>
              <li
                className="text-gray-700 hover:text-black cursor-pointer"
                onClick={() => signOut()}
              >
                Iziet
              </li>
            </ul>
          </nav>
        </aside>
    
        
        <main className="flex-1 p-6">
          {/* <section ref={faqRef} className="mb-12">
            <h2 className="text-xl font-semibold">BIEŽI UZDOTIE JAUTĀJUMI</h2>
            <ul className="space-y-2 mt-4">
              <li className="border-b pb-2 font-medium">► Lorem ipsum dolor sit amet?</li>
              <li className="border-b pb-2 font-medium">► Nunc molestie felis velit?</li>
              <li className="border-b pb-2 font-medium">► Integer pellentesque metus?</li>
            </ul>
          </section> */}
    
          <section ref={contactRef} className="mb-12">
            <h2 className="text-xl font-semibold">SAZIŅA</h2>
            <p className="text-gray-600 mt-2 ml-6 px-6">
              Lai saņemtu papildu informāciju par Pakalpojuma izmantošanu vai iesniegtu sūdzības un komentārus, Klienti var sazināties ar SIA "Neonorma" elektroniski, rakstot uz e-pastu {" "}
                <a href="mailto:info@balticshorts.com" className="text-blue-500">info@balticshorts.com</a>
            </p>
          </section>
    
          <section ref={termsRef} className="mb-12">
            <h2 className="text-xl font-semibold">LIETOŠANAS NOTEIKUMI</h2>
            <TermsOfService />
          </section>
    
          <section ref={privacyRef} className="mb-12">
            <Privacy />
          </section>
          <section className="mb-12" ref={agreementRef}>
            <Agreement />
          </section>
        </main>
      </div>
    </div>
  );
  

  
};

export default Buj;
