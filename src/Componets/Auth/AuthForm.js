import React, { useRef } from "react";
import './AuthForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../Store";

const AuthForm =()=>{

  const dispatch = useDispatch();
  
  // const authCtx = useContext(AuthContext);
  const emailInputRef =  useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  // const [isLogin, setIsLogin] = useState(true);
  const isLogin = useSelector(state => state.auth.isLoggedIn)
  const history = useHistory();


  const switchAuthModeHandler = () => {
    // setIsLogin((prevState) => !prevState);
    dispatch(authActions.toggleMode());
  };

  const submitHandler =(event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    if (!isLogin && confirmPasswordInputRef.current) {
        const enteredConfirmPassword = confirmPasswordInputRef.current.value;

        if (enteredPassword !== enteredConfirmPassword) {
            alert('Passwords do not match');
            return; // Do not proceed further
        }
    }


    if(isLogin){
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfN_rvlQLuGfWZLKBXkJs5O1sGGMUVxwo';
      fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response =>{
          // setIsLoading(false);
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data)=>{
              let errorMessage = 'Authentication failed...';
              throw new Error(errorMessage);
            })
          }
        }
      ).then(data=>{
        alert("Logged In Successfully");
        // authCtx.login(data.idToken);
        // console.log(data.email);
        dispatch(authActions.login({ token: data.email }));
        history.replace('/mailbox');
      }).catch(err=>{
        alert(err.message);
      })
    }
    else{
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfN_rvlQLuGfWZLKBXkJs5O1sGGMUVxwo';
      fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response =>{
          // setIsLoading(false);
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data)=>{
              let errorMessage = 'Authentication failed...';
              
              throw new Error(errorMessage);
            })
          }
        }
      ).then(data=>{
        console.log("User has successfully signed up.....");
        // history.replace('/');
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordInputRef.current.value = '';
      }).catch(err=>{
        alert(err.message);
      })
    }
  }

  const forgotHandler = () => {
    const email = emailInputRef.current.value;
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfN_rvlQLuGfWZLKBXkJs5O1sGGMUVxwo';
    fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            requestType:"PASSWORD_RESET",
            email: email
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response =>{
          // setIsLoading(false);
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data)=>{
              let errorMessage = 'Something went wrong...';
              throw new Error(errorMessage);
            })
          }
        }
      ).then(data=>{
        alert("Reset link shared, please check the email...");
      }).catch(err=>{
        alert(err.message);
      })
  }
    return(
        <>
            <section className='auth'>
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={submitHandler}>
                    <div className='control'>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email' required ref={emailInputRef} placeholder="Email" />
                    </div>
                    <div className='control'>
                        <label htmlFor='password'>Your Password</label>
                        <input
                            type='password'
                            id='password'
                            // required
                            ref={passwordInputRef}
                            placeholder="Password"
                        />
                    </div>
                    {!isLogin && (<div className='control'>
                        <label htmlFor='password'>Confirm Password</label>
                        <input
                            type='password'
                            id='password'
                            required
                            ref={confirmPasswordInputRef}
                            placeholder="Confirm Password"
                        />
                    </div>)}
                    <div className='actions'>
                        <button type='submit'>{isLogin? 'Login' : 'Create Account'}</button>
                        {/* {isLoading && <p style={{color: 'white'}}>Sending request....</p>} */}
                        { isLogin && (<button className='toggle' type="button" onClick={forgotHandler}>Forgot Password</button>)}
                    </div>
                </form>
            </section>
            <section className='sec-auth'>
                <div className='sec-actions'>
                        <button
                            type='button'
                            className='toggle'
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin ? 'Create new account' : 'Login with existing account'}
                        </button>
                </div>
            </section>
        </>
    )
}

export default AuthForm;