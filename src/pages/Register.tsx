import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../module/Login.module.css";
import Logo from "../img/AppHeaderImg/Vector.png";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register(email, password);
      navigate("/"); // или куда ты хочешь после логина
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register error");
    } finally {
      setIsSubmitting(false);
    }
  };
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
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "35px",
              alignItems: "center",
            }}
          >
            <input
              className={styles.input_auth}
              placeholder="Email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.input_auth}
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p
                style={{
                  color: "#ff7b7b",
                  marginTop: "-20px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button
              className={styles.button_submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Registation"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
