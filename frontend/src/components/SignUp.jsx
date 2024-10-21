import React, { useState } from "react";
import logo from "../images/logo.png";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Google from "../images/Google_Play.png";
import MSFT from "../images/Microsoft_Badge.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { toast } from "react-toastify";
import pic1 from "../images/Pic1.png";
import pic2 from "../images/pic2.png";
import pic3 from "../images/pic3.png";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Add this line for eye icons

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Toast
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    // Email Checking
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    } else if (!passwordRegex.test(password)) {
      notifyA("Password must be at least 8 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character.");
      return;
    }

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if (data.error) {
        notifyA(data.error);
      } else {
        notifyB(data.message);
        navigate("/signin");
      }
      console.log(data);
    });
  };

  return (
    <>
      <div className="containersshome">
        <div className='part1'>
          <div className="image-stack">
            <img src={pic1} className='Image_Home1' alt="Image 1" />
            <img src={pic2} className='Image_Home1' alt="Image 2" />
            <img src={pic3} className='Image_Home1' alt="Image 2" />
          </div>
        </div>
        <div className='part2'>
          <div className='signUp'>
            <div className="form-container">
              <div className="form">
                <img className="signUpLogo" src={logo} alt="" />
                <p className="loginPara">
                  Sign up to see photos and videos <br /> from your friends.
                </p>

                <a href="https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26locale%3Den_US%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B%2522fbLoginKey%2522%253A%2522qh7xvdftx1w12pddq21mdxvqf1fikgi47xi2ph1js0msf1uxu1hl%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%2522%257D%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3Dd842afd7-bf06-4218-bfc9-0fb70225fb1d%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B%2522fbLoginKey%2522%253A%2522qh7xvdftx1w12pddq21mdxvqf1fikgi47xi2ph1js0msf1uxu1hl%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%2522%257D%23_%3D_&display=page&locale=en_GB&pl_dbl=0">
                  <button className="submit-btn1" id="submit-btn1">
                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" color="white" />
                    <span> Login with Facebook</span>
                  </button>
                </a>
                <br />
                <div className="or-line">OR</div>
                <br />
                <div>
                  <input className="Emailss" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Mobile Number or Email" />
                </div>
                <div>
                  <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Full Name" />
                </div>
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => { setUserName(e.target.value) }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 0,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      marginTop:"5px"
                    }}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <p
                  className="loginPara"
                  style={{ fontSize: "12px", margin: "15px 0px", fontWeight: "normal" }}
                >
                  People who use our service may have uploaded <br />your contact information to Instagram.
                  <a target="_blank" className="Anchors" href="https://www.facebook.com/help/instagram/261704639352628">Learn<br /> More</a>
                </p>
                <p
                  className="loginPara"
                  style={{ fontSize: "12px", margin: "15px 0px", fontWeight: "normal" }}
                >
                  By signing up, you agree to our
                  <a target="_blank" className="Anchors" href="https://help.instagram.com/581066165581870/?locale=en_US"> Terms , Privacy<br /> Policy and Cookies Policy .</a>
                </p>
                <input type="submit" id="submit-btnup" onClick={() => { postData() }} value="Sign Up" />
              </div>
              <div className="form2">
                Have an account ?
                <Link className="Linss" to="/signin">
                  <span className="Hells"> Log in</span>
                </Link>
              </div>

              <div className="form3">
                Get the app.
                <br />
                <div className="image-container">
                  <a target="_blank" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DABD2B1FC-AEA2-4C37-ADC4-E5D2670C96BD%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.google.com%252F">
                    <img className="Glemst1" src={Google} alt="Google Play Store" />
                  </a>
                  <a target="_blank" href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1080">
                    <img className="Glemst2" src={MSFT} alt="Microsoft Store" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
