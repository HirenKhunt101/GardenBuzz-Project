// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {

//     const [name, setName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

// async function registerUser(event) {
//     event.preventDefault()

//     const response = await fetch('http://localhost:4200/user_registration', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             name,
//             email,
//             password,
//         }),
//     })

//     const data = await response.json()

//     if (data.status === 'ok') {
//         console.log("Data Add successfully");
//         // history.push('/Register')
//     }
// }

//     return (
//     <div>
//     <h1>Register</h1>
//     <form onSubmit={registerUser}>
//         <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Name"
//         />
//         <br />
//         <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="Email"
//         />
//         <br />
//         <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Password"
//         />
//         <br />
//         <input type="submit" value="Register" />
//     </form>
// </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../Login/login.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [nurseryname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactnumber, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    if(password != ConfirmPassword) {
      window.alert("Password should be same!");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/gardenbuzz/user_registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nurseryname,
          email,
          contactnumber,
          address,
          pincode,
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      console.log("Data Add successfully");
      alert(data.message);
      // window.location.href = '/login';
      navigate("/login"); 
    }
    else {
      alert(data.message)
    }
  }

  return (
    <>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1,
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>GardenBuzz</h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">
                    Register your account
                  </span>
                  <form onSubmit={registerUser} id="stripe-login">
                    <div className="loginp1">
                      <div className="field padding-bottom--24">
                        {/* <label htmlFor="name">Nursery Name:</label>
                        <input
                          value={nurseryname}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Nursery Name"
                          required
                        /> */}

                        <label htmlFor="email">Email:</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="email"
                          required
                        />

                        <label htmlFor="contactnumber">Contact Number:</label>
                        <input
                          value={contactnumber}
                          onChange={(e) => setContact(e.target.value)}
                          type="tel"
                          placeholder="contact number"
                          required
                        />

                        <label htmlFor="password">Address:</label>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          type="text"
                          placeholder="address"
                          rows="3"
                        />

                        <label htmlFor="pincode">Pincode:</label>
                        <input
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          type="text"
                          placeholder="pincode"
                          pattern="[0-9]{6}"
                          maxLength="6"
                        />

                        {/* <label htmlFor="username">Username:</label>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          placeholder="username"
                        /> */}

                        <label htmlFor="password">Password:</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="password"
                        />

                        <label htmlFor="password">Confirm Password:</label>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                          placeholder="password"
                        />
                        <div className="reset-pass">
                          <Link to="/Login">Login?</Link>
                        </div>
                      </div>
                    </div>

                    <div className="field padding-bottom--24">
                      <input
                        type="submit"
                        name="submit"
                        value="Register"
                        required
                      />
                    </div>
                    {/* <div className="field">
                      <Link className="ssolink" to="#">
                        Use single sign-on (Google) instead
                      </Link>
                    </div> */}
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                {/* <span>
                  Don't have an account? <Link to="">Sign up</Link>
                </span> */}
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                  <span>
                    <Link to="#">© Stackfindover</Link>
                  </span>
                  <span>
                    <Link to="#">Contact</Link>
                  </span>
                  <span>
                    <Link to="#">Privacy & terms</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
