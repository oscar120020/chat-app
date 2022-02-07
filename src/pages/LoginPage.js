import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useForm } from "../hooks/useForm";
import Swal from 'sweetalert2';

export const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const [form, handleChange, setForm] = useForm({
    email: "test1@test.com",
    password: "123456",
    rememberme: false,
  });

  useEffect(()=>{
    const email = localStorage.getItem("email")
    if(email){
      setForm( (form) => ({
        ...form,
        email,
        rememberme: true
      }))
    }
  },[setForm])

  const togglecheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rememberme){
      localStorage.setItem("email", form.email)
    }else{
      localStorage.removeItem("email")
    }

    const { email, password } = form;

    login(email, password).then(res => {
      if(!res.ok){
        Swal.fire("Error", res.msg, "error")
      }
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login100-form validate-form flex-sb flex-w"
    >
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
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
        <div className="col" onClick={togglecheck}>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            checked={form.rememberme}
            readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to="/auth/register" className="txt1">
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button disabled={!form.email || !form.password} className="login100-form-btn" type="submit">Ingresar</button>
      </div>
    </form>
  );
};
