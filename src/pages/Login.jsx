import styles from "../module/Login.module.css";
import Logo from "../img/AppHeaderImg/Vector.png";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.login_section}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img style={{ height: "24px", width: "24px" }} src={Logo} alt="" />
            <h3
              style={{
                color: "orange",
                fontWeight: "600",
                fontSize: "16px",
                letterSpacing: "1.25px",
              }}
            >
              MovieSPACE
            </h3>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "35px",
              alignItems: "center",
            }}
          >
            <input
              className={styles.input_auth}
              placeholder="Email or username"
              type="text"
              id="text"
              name="text_input"
              required
            />
            <input
              className={styles.input_auth}
              placeholder="Password"
              type="password"
              id="password"
              name="password_input"
              required
            />

            <button className={styles.button_submit} type="submit">
              Login
            </button>
            <p style={{ color: "orange" }}>
              NEW USER?{" "}
              <Link
                style={{
                  color: "orange",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
                to="/Register"
              >
                REGISTER HERE
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
