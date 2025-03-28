import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        // scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return(
        <>
        <div className="ParBalticShorts w-full h-fit relative bg-beige mt-50 max-w-[1100px] m-auto flex flex-col items-center">
                <div className="LogoContainer w-full h-fit flex flex-col items-center justify-center">
                    <div className="Logo w-80 h-48 relative flex flex-col items-center mb-50">
                        <img className="w-full h-full" src={require("./static/Logo.png")} alt="Baltic shorts logo" />
                    </div>
                </div>
            
            
            <div className="ParProjektu items-center flex flex-col justify-center mb-100">
                <div className="w-full relative typography-h2 mb-50 text-center">PAR PROJEKTU</div>
                <div className="w-3/5 relative text-justify typography-body-large">
                    <p>Baltic Shorts ir digitāla straumēšanas platforma, kas fokusējas uz Baltijas valstīs (Latvija, Lietuva, Igaunija) radītu īsfilmu izrādīšanu.
                    Projekta mērķis ir radīt un uzturēt ērti lietojamu plaša satura mājaslapu, kas attīsta īsfilmu formas pieejamību un to autoru atpazīstamību plašākā tirgū.</p>
                    <br/>
                    <p>Daļa darbu tiek augšupielādēti no pašas platformas uzturētāju puses, sadarbībā Baltijas filmu producēšanas studijām un filmu augstskolām.
                        Savukārt platformas dalībniekiem tiek piedāvāta iespēja pašiem augšupielādēt savus darbus, tādējādi radot plašu īsfilmu katalogu.
                        Platformas darbību veicina tās kurators, regulāri izceļot un veidojot filmu izlases ar jauniem un senāk radītiem darbiem.</p>
                    </div>
            </div>

            <div className="items-center flex flex-col mb-100 w-full">
                <div className="w-full relative typography-h2 mb-50 text-center">KOMANDA</div>
                <div className="w-full relative justify-between items-center gap-25 inline-flex">
                    <div className="w-full text-center">
                        <span className="typography-body-small">PROJEKTA VADĪTĀJS<br/></span>
                        <span className="typography-body !font-bold">Emīls Alps</span>
                    </div>
                    <div className="w-full text-center">
                        <span className="typography-body-small">GALVENAIS KURATORS<br/></span>
                        <span className="typography-body !font-bold">Rūdolfs Deinats</span>
                    </div>
                    <div className="w-full text-center">
                        <span className="typography-body-small">DIZAINS<br/></span>
                        <span className="typography-body !font-bold">Dans Jirgensons</span>
                    	</div>
                </div>
                <div className="relative justify-between items-center inline-flex mt-10">
                    <div className="w-full text-center">
                        <span className="typography-body-small">LAPAS IZSTRĀDE<br/></span>
                        <span className="typography-body !font-bold">Dāvis Jankevics</span>
                    </div>
                </div>
            </div>

            <div className="items-center flex flex-col mb-100 w-full">
                <div className="w-full relative typography-h2 mb-50 text-center">ATBALSTĪTĀJI</div>
                <div className="w-full relative justify-between items-center gap-25 inline-flex">
                    <div className="w-full text-center">
                        <span className="typography-body !font-bold">Latvijas Valsts Kultūrkapitālfonds<br/></span>
                    </div>
                    <div className="w-full text-center">
                        <span className="typography-body !font-bold">Latvijas Kultūras Akadēmija</span>
                    </div>
                    <div className="w-full text-center">
                        <span className="typography-body !font-bold">Latvijas Mākslas Akadēmija</span>
                    	</div>
                </div>
                <div className="relative justify-start items-start gap-6 inline-flex mt-10">
                    <div className="w-full text-center">
                        <span className="typography-body !font-bold">Citas Baltijas filmu skolas</span>
                    </div>
                </div>
            </div>
            <div className="items-center flex flex-col mb-100 w-full">
                <div className="w-full relative typography-h2 mb-50 text-center">Sazinies ar mums</div>
                <div id="contact" className="w-fit text-center relative button-default typography-body border border-black !font-normal">info@balticshorts.com</div>
            </div>
        </div>
        </>
    );
}


export default About;