import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const SearchBox = () => {
  const { logout, auth } = useContext(AuthContext);

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="sunil"
          style={{width: "30px", height: "30px", display: "inline-block"}}
        />
        <h4 style={{marginLeft: "10px"}} >{auth.name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button onClick={logout} className="btn text-danger">
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};
