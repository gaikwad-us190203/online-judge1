import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setToken } from "../../slices/authSlice";
import { useNavigate } from 'react-router-dom';

const { SIGNUP_API, LOGIN_API, GETPROBLEMS_API, CREATEPROB_API, GETPROBLEMBYID_API,UPDATEPROBLEMID_API,DELETEPROBLEM_API,RESETPASS_API} = endpoints;

export function signUp(signupdata, navigate) {
  const { firstName, lastName, email, password, confirmPassword, accountType } =
    signupdata;
  return async (dispatch) => {
  
    // const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      // navigate("/signup")
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  };
}

export function login(logindata, navigate) {
  const { email, password } = logindata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      },
      "include",true);

      console.log("login API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Login Successful");
      console.log("login ka token:-->",response.data.token);
      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log("login API ERROR............", error);
      toast.error("login Failed");
      navigate("/signup");
    }
  };
}

export async function getProblems() {
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR ALL PROBELMS");
    const response = await apiConnector("GET", GETPROBLEMS_API);
    console.log("AFTER Calling BACKEND API FOR ALL PROBELMS");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.problems;
    // console.log(result);
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }

  return result;
}

export function createProblem(createproblemdata, navigate) {
  const {
    title,
    description,
    difficulty,
    inputformat,
    outputformat,
    sampleinput1,
    sampleoutput1,
  } = createproblemdata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    // console.log(createproblemdata);

    try {
      const response = await apiConnector("POST", CREATEPROB_API, {
        title,
        description,
        difficulty,
        inputformat,
        outputformat,
        sampleinput1,
        sampleoutput1,
      });

      // console.log("create API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      toast.success("Problem created Successfully");
      navigate("/dashboard");
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error);
      toast.error("problem not create");
      // navigate("/signup")
    }
    // dispatch(setLoading(false))
    // toast.dismiss(toastId)
  };
}

export async function getProblembyid(id) {
  let result = null;
  const url = `${GETPROBLEMBYID_API}/${id}`;

  try {
    console.log("BEFORE Calling BACKEND API FOR problembyid");

    const response = await apiConnector("GET", url);
    console.log("AFTER Calling BACKEND API FOR ALL problembyid");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response;
    console.log(result)
    toast("Here You Go TO PROBLEM!!!")
  } catch (error) {
    console.log("API ERROR............", error);
    toast.error("Could Not Get problem");
  }

  return result;
}




export function updateProblemById(id,data,navigate){
  const {
    title,
        description,
        difficulty,
        inputformat,
        outputformat,
        sampleinput1,
        sampleoutput1,
                           } =data
  
  return async (dispatch) => {
   
    // const toastId = toast.loading("Loading...")
    // console.log(createproblemdata);

    try {
      const url = `${UPDATEPROBLEMID_API}/${id}`;
      console.log("url:",url);
      console.log("data",data)
      const response = await apiConnector("PUT", url, 
        {
          title,
        description,
        difficulty,
        inputformat,
        outputformat,
        sampleinput1,
        sampleoutput1,
        });
        console.log("holoo");
        console.log("responsee::->",response);

     

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // console.log("login error")
      //console.log("helli");
      toast.success("Problem updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      
      toast.error("problem not updated");
      
    }
    
  };
}

export async function deleteProblem(id, navigate) {
  const url = `${DELETEPROBLEM_API}/${id}`;

  try {
    const response = await apiConnector("DELETE", url);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Problem deleted Successfully");
    navigate("/dashboard");
    return response;
  } catch (error) {
    toast.error("Problem not deleted");
    throw error;
  }
}


export function resetPassword(formdata,navigate) {
  const { email, password,confirmPassword } = formdata;
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")

    try {
      const response = await apiConnector("POST", RESETPASS_API, {
        email,
        password,
        confirmPassword,
      });

      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      toast.success("PASSWORD RESET SUCCESSFULLY!!!!");
     
      // dispatch(setToken(response.data.token));

      // localStorage.setItem("token", JSON.stringify(response.data.token));
      // localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      
      toast.error("reset password failed");
      navigate("/login");
    }
  };
}