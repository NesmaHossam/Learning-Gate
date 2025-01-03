import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Welcome Back, Login"
      image={loginImg}
      formType="login"
    />
  )
}

export default Login