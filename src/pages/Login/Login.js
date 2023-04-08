import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import { db, auth } from '../../Firebase/Firebase';

import '../../index.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then( async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                console.log(user);
               
                console.log(user.uid);


                  // const userDoc = await auth.getUser(user.uid);
              


                   await db.collection('users').doc(user.uid).get().then((res)=>{
                    console.log(res.data())
                  });

                  // console.log(userDoc);
                  // const user = userDoc.toJSON();

                 
                // localStorage.setItem('isLogged', true);
                // localStorage.setItem('user',JSON.stringify(user))
                // console.log(JSON.stringify(user));

                // navigate('/dashboard');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };


    // const getUserById = async (userId) => {
    //   const userDoc = await auth.getUser(userId);
    //   const user = userDoc.toJSON();
    //   return user;
    // };

  // let isLogged = localStorage.getItem('isLogged');

  // useEffect(() => {
  //   if(isLogged){
  //     navigate("/dashboard")
  //   }
  // }, [isLogged]);

return(
<>

    <div className="container" dir="rtl">
      <div className="row m-4 bg-light">

        <div className='aside-right col-md-6 p-3 bg-white pt-5'>
          <h2 className="title text-center text-black fw-bold mt-5">تسجيل الدخول</h2>
            <form onSubmit={handleSubmit}>
              <label for="floatingEmail" className="p-2">البريد الألكتروني</label>
              <br />
              <div className="form-floating">
                <input
                  required
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="البريد الألكتروني"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <label for="floatingPassword " className="p-2">كلمة السر </label>
              <div className="form-floating">
                <input  
                  required
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="d-flex p-2 m-2 justify-content-between">
                <div>
                  <input className="form-check-input" type="checkbox" id="checkbox" />
                  تذكرني
                </div>
              
                <Link to='/forgetpassword' type="button"
                  className="text-decoration-none text-success">هل نسيت كلمة السر ؟</Link>
              </div>

              <button type="submit" 
              className="btn bg-success text-white w-100 mt-2">
              دخول
              </button>

            </form>
          </div>

        <div className="aside-left col-md-6">
          <img
            src="https://kafiil.com/modules/base/img/static/login.svg"
            alt="imagelogin"
            className="w-100" />
        </div>
        
      </div>
    </div>
</>
    );
}

export default Login;


// {"uid":"IbLCLW7rMAVbOwchyMFRkc84tT33",
// "email":"omima@gmail.com",
// "emailVerified":false,
// "displayName":"اميمة مختار",
// "isAnonymous":false,
// "photoURL":"https://kafiil.com/modules/user/images/user.svg",

// "providerData":[{"providerId":"password",
// "uid":"omima@gmail.com",
// "displayName":"اميمة مختار",
// "email":"omima@gmail.com",
// "phoneNumber":null,
// "photoURL":"https://kafiil.com/modules/user/images/user.svg"}]
// }