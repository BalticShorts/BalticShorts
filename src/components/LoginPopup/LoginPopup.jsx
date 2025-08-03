import { useContext, useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from "../../App";
import { createMoviePlaylist, createUserProfile } from "../../graphql/mutations";
import { API } from "aws-amplify";
import { checkPersonExists } from "../../custom-queries/queries";
import TermsOfService from "../TermsOfService/TOS";
import Agreement from "../Agreement/Agreement";
import Privacy from "../Privacy/Privacy";
import { ReactComponent as Info } from "../../assets/images/info.svg";
import { ReactComponent as X } from "../../assets/images/x.svg";
import { ReactComponent as Logo } from "../../assets/images/bs_logo.svg";
import { useNavigate } from "react-router-dom";

export const LoginPopup = () => {
    const context = useContext(GlobalContext)
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(context.loggedInModal);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [piekrituTicked, setPiekrituTicked] = useState(false);
    const [fastLogin, setFastLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState({})
    const [page, setPage] = useState('login');
    const [confirmationStage, setConfirmationStage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [forgetEmail, setForgetEmail] = useState('');
    const [restorePassword, setRestorePassword] = useState(false);
    const [showTOS, setShowTOS] = useState(false);
    const [tosRead, setTosRead] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const Auth = context.auth

    useEffect(() => {
        setShowModal(context.loggedInModal);
    }, [context.loggedInModal])

    function errorParser(error) {
        let errorMessage;
        setError({ });
        switch (error.code) {
            case 'UserNotFoundException':
            errorMessage = 'Lietotājs nav atrasts. Reģistrējies vai pārbaudi e-pastu.';
            break;
            case 'NotAuthorizedException':
            errorMessage = 'Nepareiza parole. Mēģini vēlreiz.';
            break;
            case 'PasswordResetRequiredException':
            errorMessage = 'Parole jāmaina. Atjauno to.';
            break;
            case 'UserNotConfirmedException':
            errorMessage = 'Lietotājs nav apstiprināts. Pārbaudi e-pastu.';
            break;
            case 'CodeMismatchException':
            errorMessage = 'Kods nesakrīt. Pārbaudi ievadīto.';
            break;
            case 'ExpiredCodeException':
            errorMessage = 'Kods ir beidzies. Pieprasiet jaunu kodu.';
            break;
            case 'InvalidParameterException':
            errorMessage = 'Nederīgs parametrs. Pārbaudi ievadīto.';
            break;
            case 'InvalidPasswordException':
            errorMessage = 'Nederīga parole. Parolei jābūt vismaz 6 rakstzīmes garai.';
            break;
            case 'TooManyFailedAttemptsException':
            errorMessage = 'Pārāk daudz neveiksmīgu mēģinājumu. Mēģini vēlāk.';
            break;
            case 'TooManyRequestsException':
            errorMessage = 'Pārāk daudz pieprasījumu. Mēģini vēlāk.';
            break;
            case 'LimitExceededException':
            errorMessage = 'Pārsniegts ierobežojums. Mēģini vēlāk.';
            break;
            default: errorMessage = 'Nezināma kļūda. Mēģini vēlreiz.';
        }
        setError({ "code": error.code, "message": errorMessage });
    }

    const logIn = async () => {
        try {
            await Auth.signIn(email, password);
            context.setLoggedIn(true);
            setShowModal(false);
            resetModal();
            const currentUser = await Auth.currentAuthenticatedUser();
            console.log("currentUser", currentUser);
            context.setCurrentUser({'id' : currentUser.username, 'name': currentUser.attributes.given_name, 'surname': currentUser.attributes.family_name, 'email': currentUser.attributes.email});
            await context.assessLoggedInState();
            await context.forceReload();
            navigate('/');
        } catch (error) {
            errorParser(error);
        }
    }

    async function handleSignUp() {
        setError({});
        try {
            if(name === "" || surname === ""){
                throw new Error("Vārds un uzvārds nevar būt tukši!")
            }
            await Auth.signUp({
                username: email,
                password: password,

                attributes: {
                    given_name : name,
                    family_name: surname
                },
                autoSignIn: true
            });

          setConfirmationStage(true);

        } catch (error) {
            errorParser(error);
        }
    }

    async function handleCodeConfirmatation(){
        try {
            const username = email;
            const code = confirmationCode;
            await Auth.confirmSignUp(username, code)
            setError({});
            setConfirmationStage(false);
            await logIn();
            await createProfile();
            setShowModal(false);
        } catch (error) {
            errorParser(error);
        }
    }

    async function resendCode(){
        try {
            const username = email;
            await Auth.resendSignUp(username);
        } catch (error) {
            
        }
    }

    async function handleForgetPassword(){
        try {
            const username = forgetEmail;
            await Auth.forgotPassword(username);
            setRestorePassword(true);
            setConfirmationCode('');
        } catch (error) {
            errorParser(error);
        }
    }

    async function handleNewPassword(){
        try {
            const username = forgetEmail;
            const code = confirmationCode;
            const newPassword = password;
            const checkNewPassword = checkPassword;
            if (newPassword !== checkNewPassword)
                throw new Error("Paroles nesakrīt")
            await Auth.forgotPasswordSubmit(username, code, newPassword);
            setRestorePassword(false);
            setPage('login');
            setError({"code":'PasswordChange', "message": 'Parole nomainīta'})
        } catch (error) {
            errorParser(error);
        }
    }

    async function createProfile() {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const name = user.attributes.given_name;
            const surname = user.attributes.family_name;
            const email = user.attributes.email;
            const id = user.username;
            const exists = await API.graphql({
                query: checkPersonExists,
                variables : {
                    email: email
                },
                authMode: 'AWS_IAM'
            });
            if(exists.data.listUserProfiles.items.length === 0){
                const userId = await API.graphql({
                    query : createUserProfile,
                    variables : {
                    input : {
                        name: name,
                        surname: surname,
                        email: email,
                        user_id: id,
                        is_member: false,
                        is_admin: false,
                        continues_payment: false,
                    }},
                    authMode: 'AWS_IAM'
                });
                await API.graphql({
                    query: createMoviePlaylist.replaceAll("__typename", ""),
                    variables: {
                    input: {
                        creator: name + " " + surname,
                        title: "Watch Later",
                        description: "Watch Later playlist",
                        is_public: false,
                        userprofileID: userId.data.createUserProfile.id,
                        size: 0
                    }
                    },
                    authMode: 'AWS_IAM'
                });
            }
        } catch (error) {
            console.log("error creating profile", error)
        }
    }

    function changePage(page){
        setEmail('');
        setPassword('');
        setPage(page);
        setError({});
    }

    function resetModal(){
        setShowModal(false);
        setError({});
        setConfirmationCode('');
        setConfirmationStage(false);
        setRestorePassword(false);
        setForgetEmail('');
        setPiekrituTicked(false);
        context.setLoggedInModal(false);
        setPage('login');
    }

    useEffect(() => {
        if(context.showModal){
            setError({});
            createProfile();
        }
    }, [page])

    const handleAcceptRulesClick = () => {
        setPiekrituTicked(!piekrituTicked);
    };

    return(
        <>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-10 overscroll-auto !modal-size">
                    <div className="modal-size p-20 bg-beige border border-black flex-col justify-start inline-flex">
                        <div className="w-full h-fit relative flex items-left justify-between mb-5">
                            <Logo className="w-[60px]"/>
                            <div className="flex items-end">
                                <X className="cursor-pointer" onClick={() => resetModal()} />
                            </div>
                        </div>



                    {page === 'login' && (
                    <>
                    <div className="my-auto self-stretch flex flex-col justify-between items-center inline-flex">
                        <div className="w-full justify-center items-center flex flex-col typography-technical mb-2 !text-red-700">{error.message}</div>
                        <div className="w-full justify-center items-center flex flex-col text-lg my-10">
                            <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setEmail(e.target.value)} ></input>
                            <div className="w-full h-px relative border-b border-black"></div>
                        </div>
                        <div className="w-full justify-center items-center flex flex-col text-lg">
                            <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setPassword(e.target.value)}></input>
                            <div className="w-full h-px relative border-b border-black"></div>
                        </div>
                        <div className="w-full justify-between items-center inline-flex mt-10 cursor-pointer">
                            <div className="typography-technical" onClick={() => setFastLogin(!fastLogin)}>
                                <span id="rememberMe">{fastLogin ? <>[&#x2713;] </> : <>[  ] </>}</span>
                                Atcerēties mani
                            </div>

                            <div className="typography-technical cursor-pointer" onClick={() => changePage('forget')}>Aizmirsi paroli?</div>
                        </div>
                        <div type="submit" className="flex button-default button-white mt-25 !font-normal cursor-pointer !text-center !items-center !justify-center" onClick={() => logIn()}>Ieiet</div>
                    </div>
                    </>
                    )}
                    {page === 'register' && (
                        <>
                        {confirmationStage ? (
                        <div className="flex flex-col justify-start items-center my-auto">
                            <div className="w-full justify-center items-center flex flex-col typography-technical mb-20 !text-red-700">{error.message}</div>
                            <div className="w-full justify-center items-center flex flex-col typography-technical mb-20 !text-red-700"> Kods nosūtīts uz epastu!</div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border border-black">
                                <input id="code" type="text" placeholder="Code" value={confirmationCode} className="bg-beige text-center border-none outline-none typography-body-large" onChange={e => setConfirmationCode(e.target.value)} ></input>
                            </div>
                            <div className="mt-25 justify-start items-start flex flex-row gap-6">
                                <div type="submit" className="flex !text-center !items-center !justify-center button-default button-white !font-normal cursor-pointer" onClick={() => handleCodeConfirmatation()}>Reģistrēties</div>
                                <div className="flex !text-center !items-center !justify-center button-default button-white !font-normal cursor-pointer" onClick={() => resendCode()}>Pārsūtīt kodu</div>
                            </div>
                        </div>
                        ):(
                        <>
                        <div className="flex flex-col justify-start items-center my-auto">
                            <div className="w-full justify-center items-center flex flex-col typography-technical mb-20 !text-red-700">{error.message}</div>
                            <div className="w-full justify-center items-center flex flex-row text-lg mb-0 border border-black">
                                <input id="name" type="text" placeholder="Vārds" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setName(e.target.value)} ></input>
                                <div className="h-full w-0 border-r border-black "></div>
                                <input id="surname" type="text" placeholder="Uzvards" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setSurname(e.target.value)} ></input>
                            </div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border-x border-black">
                                <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setEmail(e.target.value)} ></input>
                            </div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border border-black">
                                <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none typography-body-large w-full" onChange={e => setPassword(e.target.value)}></input>
                            </div>
                            <div className="w-full mt-20 justify-between items-center inline-row">
                                <div className="text-center typography-technical"><span id="acceptRules" className="cursor-pointer" onClick={handleAcceptRulesClick}>{piekrituTicked ? <>[&#x2713;] </> : <>[  ] </>}</span>Piekrītu <span className="text-center flex-row font-bold cursor-pointer" onClick={() => setShowTOS(true)}>noteikumiem</span></div>
                            </div>
                            <div type="submit" className="flex !text-center !items-center !justify-center button-default button-white mt-25 !font-normal cursor-pointer" onClick={() => {piekrituTicked ? handleSignUp() : setError({"code":'AcceptRules', "message": 'Jāpiekrīt noteikumiem!'})}}>Reģistrēties</div>

                        </div>
                        </>
                        )}
                    </>)
                    }
                    {page === 'forget' && (
                        <>
                        {restorePassword ?
                            <div className="flex flex-col justify-start items-center my-auto">
                                <div className="flex-col justify-center items-center gap-2.5 flex">
                                    <div className="w-full text-center typography-body">
                                        Ievadiet kodu un jauno paroli.
                                    </div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col typography-technical mb-20 !text-red-700">{error.message}</div>
                                <div className="w-full justify-center items-center flex flex-col text-lg my-4">
                                    <input id="forgetEmail" type="text" placeholder="Email" className="bg-beige text-center border-none outline-none typography-body-large" readOnly value={forgetEmail}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="forgetCode" type="text" placeholder="Kods" className="bg-beige text-center border-none outline-none typography-body-large" onChange={e => setConfirmationCode(e.target.value)} value={confirmationCode} ></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none typography-body-large" onChange={e => setPassword(e.target.value)}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="checkPassword" type="password" placeholder="Parole atkārtoti" className="bg-beige text-center border-none outline-none typography-body-large" onChange={e => setCheckPassword(e.target.value)}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div type="submit" className="flex !text-center !items-center !justify-center button-default button-white mt-25 !font-normal cursor-pointer" onClick={() => handleNewPassword()}>Nomainīt</div>

                            </div>
                            : 
                            <div className="flex flex-col justify-start items-center my-auto">
                                <div className="flex-col justify-center items-center flex">
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="w-full flex-col justify-center items-center flex">
                                            <div className="w-full text-center typography-body-large">Aizmirsi paroli?</div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-center items-center gap-2.5 flex">
                                        <div className="w-full text-center typography-body">
                                            Ievadi zemāk e-pastu ar kuru reģistrējies. <br/>Uz to nosūtīsim kodu, lai atjaunotu paroli.
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col typography-technical mb-5 !text-red-700">{error.message}</div>

                                <div className="w-full justify-center items-center flex flex-col text-lg">
                                    <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none typography-body-large" onChange={e => setForgetEmail(e.target.value)} ></input>
                                    <div className="w-full relative border border-black"></div>
                                </div>
                                <div type="submit" className="flex !text-center !items-center !justify-center button-default button-white mt-25 !font-normal cursor-pointer" onClick={() => handleForgetPassword()}>Sūtīt</div>

                            </div>
                        }
                        </>
                    )}
                    <div className="w-full h-fit flex mt-auto felx-row justify-between items-center">
                        <Info className="!h-[18px] !w-[18px] cursor-pointer hover:bg-black hover:text-white border border-black" onClick={() => {setShowInfo(true)}}/>
                        <div className="w-full justify-center items-center inline-flex text-base">
                            <div className="inline-flex items-center cursor-pointer" onClick={() => {page !== 'login' ? changePage('login') : changePage('register')}}>
                                {page !== 'login' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                                        <path d="M5.36661e-08 4.99965L7 0.500069L7 9.50007L5.36661e-08 4.99965Z" fill="black"/>
                                    </svg>
                                )}
                                <div className="m-1 h-fit text-center typography-body-small">{page !== 'login' ? 'Pieslēgties' : 'Reģistrēties'}</div>
                                {page === 'login' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                                        <path d="M7.5 5.00035L0.5 9.49993L0.5 0.499931L7.5 5.00035Z" fill="black"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showTOS && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-10 overscroll-auto">
                        <div className="modal-size px-5 pt-5 bg-beige border border-black flex-col justify-start inline-flex overflow-y-auto items-center text-start">
                            <h2 className="typography-h2 my-25 pl-6 text-start w-full">LIETOŠANAS NOTEIKUMI</h2>
                            <TermsOfService />
                            <Agreement />
                            <Privacy />
                            <div className="button-default relative flex items-center justify-center py-5 border border-black mb-5 cursor-pointer" onClick={() => { setShowTOS(false); setTosRead(true); }}>
                                Aizvērt
                            </div>
                        </div>
                    </div>
                )}
                {showInfo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-10 overscroll-auto -mt-[270px]">
                        <div className="modal-size !h-fit p-20 bg-beige border border-black flex-col justify-start inline-flex overflow-y-auto items-center text-start">
                            <div className="w-full flex flex-row items-left justify-between mb-10">
                                <h2 className="typography-body-large text-center w-full">Kādēļ man vajadzīgs profils?</h2>
                                <X className="cursor-pointer" onClick={() => {setShowInfo(false)}}/>
                            </div>
                            <div className="w-full border-b border-black"/>
                            <p className="typography-body text-center my-25">Ar Baltic Shorts profilu tu vari skatīties filmas (abonējot platformu), pievienot darbus skatīšanai vēlāk, veidot darbu sarakstus.</p>
                            <p className="typography-body text-center">Ja piedalies īsfilmu veidošanā – vari savu darbu komandās pieminēto vārdu sasaistīt ar savu profilu, tādejādi veidojot savu automātiski atjaunoto Baltic Shorts personas profilu. Kā arī iesūtīt darbus pievienošanai platformai.</p>
                        </div>
                    </div>
                )}
            </div>
            )}
        </>
    )
}