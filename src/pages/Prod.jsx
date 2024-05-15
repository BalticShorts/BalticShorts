import React, { useState, useEffect } from "react";
import logo from './static/logo_small.svg';
import video_src from './static/prod_vid.mp4';
import mobileBackground from './static/mobile_background.jpg';
import { API, Amplify } from "aws-amplify";
import awsExports from '../aws-exports';
import { createWaitlistEmail } from "../graphql/mutations";
import { waitlistEmailByEmail } from "../graphql/queries";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

Amplify.configure(awsExports);

const Prod = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleJoinWaitlist = async () => {
    if (!email.match(emailRegex)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      const existingEmail = await API.graphql({
        query: waitlistEmailByEmail,
        variables: { email },
        authMode: 'AWS_IAM',
      });

      if (existingEmail.data.waitlistEmailByEmail.items.length > 0) {
        setMessage('This email is already on the waitlist.');
      } else {
        await API.graphql({
          query: createWaitlistEmail,
          authMode: 'AWS_IAM',
          variables: {
            input: { email },
          },
        });

        console.log('Email submitted:', email);
        setMessage('Thank you for joining the waitlist!');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      setMessage('Failed to join the waitlist. Please try again.');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen font-['SchoolBook']">
        <div className="w-full h-screen overflow-hidden brightness-75">
          {isMobile ? (
            <img src={mobileBackground} alt="Mobile Background" className="w-full h-screen object-cover -z-10" />
          ) : (
            <video className='videoTag w-full h-screen overflow-hidden object-cover -z-10' autoPlay loop muted>
              <source src={video_src} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute top-2.5">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="absolute justify-center items-center h-screen flex flex-col select-none">
          <div className="py-5 text-center">
            <div className={`font-bold text-white uppercase font-['SchoolBook'] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
              Šeit no jauna top{isMobile && <br/>} Baltijas īsfilmu<br/></div>
            <div className={`font-bold text-white uppercase font-['SchoolBook'] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
              straumēšanas{isMobile && <br/>} platforma</div>
          </div>
          <div className={`text-center text-white p-2 font-['SchoolBook'] ${isMobile ? 'text-lg' : 'text-xl'}`}>
            A streaming platform for Baltic short films{isMobile && <br/>} is going to be here soon
          </div>
          <div className="mt-8 opacity-70 border border-white">
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={handleEmailChange}
              className="p-2 text-black"
            />
            <button
              onClick={handleJoinWaitlist}
              className="p-2 bg-white text-black font-bold"
            >
              Join the Waitlist
            </button>
          </div>
          {message && <div className="mt-4 text-white">{message}</div>}
        </div>
      </div>
    </>
  );
}

export default Prod;
