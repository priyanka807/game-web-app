"use client"
import { useFormik} from "formik";
import '../login/login.css'
import * as Yup from 'yup';
import axios  from "axios";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const loginSchemas =  Yup.object({
  username:Yup.string().min(3).required("please enter   your  valid username"),
  password:Yup.string().min(6).required("please enter your  password"),

})

const initialValues = {
  username: "",
  password: "",
};



const Login = () => {
  const router = useRouter()
  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,

      validationSchema:loginSchemas,
      
      
      onSubmit: (values) => {  
        let payload = {
          id:values.username,
          username:values.username,
          password:values.password
        }
            axios.post('https://game-web-app-mu.vercel.app/api/json',payload)
            .then((res) => {
             
            if(payload.username&&payload.password){
              localStorage.setItem('newUser',payload.username );
              toast.success("Logged in successfully !")
              router.push("/")
              payload.username=""
              payload.password=""
            }
                   
            })
            .catch((error) => {
              console.log(error,'error')
              toast.error("Invalid login credentials. Please check and try again ")

            });
      },
    });

  return (
    <>
 
      <div className="form-container">
        <div className="" >
          <form onSubmit={handleSubmit}>
          <h2 className=' font-bold'>Sign In</h2>
<p >Please enter your username & password to continue.</p>
            <div className="mb-3   ">
              <label htmlFor="email" className="input-label">
               Username
              </label>
              <input
                type="text"
                placeholder="...username"
                name="username"
                autoComplete="on"
                className="input-box"
                id="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
            
              />
              {touched.username && errors.username ? (
                <h6
                  className="  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.username}
                </h6>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="...password"
                name="password"
                autoComplete="on"
                className="input-box"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
               
              />
              {touched.password && errors.password ? (
                <h6
                  className="  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.password}
                </h6>
              ) : null}
            </div>
            <button
              type="submit"
              className="continue mt-4"
           
            >
              {" "}
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
