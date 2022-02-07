import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2';

export const RegisterPage = () => {

  const {register} = useContext(AuthContext);

  const [ form, handleChange ] = useForm({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    register(name, email, password).then(res => {
      if(!res.ok){
        Swal.fire("Error", res.msg, "error")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input className="input100" type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input className="input100" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password} 
          onChange={handleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to="/auth/login" className="txt1">
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button disabled={!form.name || !form.email || !form.password} type="submit" className="login100-form-btn">Crear cuenta</button>
      </div>
    </form>
  );
};
