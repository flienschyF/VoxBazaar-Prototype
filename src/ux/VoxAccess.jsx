
import React, { useState } from "react";
import "./voxBazaarUX.css";

function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  );
}

function useNavigate() {
  return (path) => {
    window.location.hash = `#${path}`;
  };
}
import "./voxBazaarUX.css";

const PROFILE_KEY = "voxbazaar-preview-profile";
const SESSION_KEY = "voxbazaar-preview-session";

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="vx-auth-page">
      <div className="vx-auth-shell">
        <aside className="vx-auth-aside">
          <Link to="/" className="vx-auth-brand">VoxBazaar</Link>
          <div className="vx-auth-aside-content">
            <span className="vx-eyebrow">GLOBAL HANDMADE MARKETPLACE</span>
            <h1>Every craft has a story.</h1>
            <p>
              Discover independent makers, explore handmade goods,
              and build your own digital booth.
            </p>
          </div>
          <span className="vx-auth-caption">
            Made for independent creators worldwide.
          </span>
        </aside>

        <section className="vx-auth-content">
          <Link to="/" className="vx-back-link">← Back to marketplace</Link>
          <div className="vx-auth-form-wrap">
            <div className="vx-auth-heading">
              <span className="vx-eyebrow">VOXBAZAAR ACCOUNT</span>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>

            {children}

            <p className="vx-demo-note">
              Prototype preview — authentication is not connected
              to a live server.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, id, ...props }) {
  return (
    <div className="vx-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="vx-input" {...props} />
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      const profile = JSON.parse(
        sessionStorage.getItem(PROFILE_KEY) || "null"
      );

      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          email: email.trim(),
          name: profile?.email === email.trim()
            ? profile.name
            : "Preview User",
          preview: true
        })
      );

      navigate("/account");
    } catch {
      setError("Unable to start the preview session.");
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to explore your account and vendor workspace."
    >
      <form onSubmit={handleSubmit} className="vx-auth-form">
        {error && <div className="vx-error" role="alert">{error}</div>}

        <Field
          label="Email address"
          id="vx-login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <div className="vx-field">
          <div className="vx-field-top">
            <label htmlFor="vx-login-password">Password</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className="vx-password-wrap">
            <input
              id="vx-login-password"
              className="vx-input"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="vx-password-toggle"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button className="vx-button vx-button-primary" type="submit">
          Sign In to VoxBazaar
        </button>
      </form>

      <p className="vx-auth-switch">
        New to VoxBazaar? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accepted) {
      setError("Please accept the terms to continue.");
      return;
    }

    // Preview only: passwords are deliberately NOT stored.
    sessionStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim()
      })
    );

    navigate("/verify-email");
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join VoxBazaar to discover makers and build your own booth."
    >
      <form onSubmit={handleSubmit} className="vx-auth-form">
        {error && <div className="vx-error" role="alert">{error}</div>}

        <Field
          label="Full name"
          id="vx-register-name"
          autoComplete="name"
          placeholder="Your full name"
          value={form.name}
          onChange={e => update("name", e.target.value)}
          required
        />

        <Field
          label="Email address"
          id="vx-register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={e => update("email", e.target.value)}
          required
        />

        <Field
          label="Password"
          id="vx-register-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          placeholder="Minimum 8 characters"
          value={form.password}
          onChange={e => update("password", e.target.value)}
          required
        />

        <Field
          label="Confirm password"
          id="vx-register-confirm"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={e => update("confirmPassword", e.target.value)}
          required
        />

        <label className="vx-check">
          <input
            type="checkbox"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
          <span>I agree to the platform terms and privacy policy.</span>
        </label>

        <button className="vx-button vx-button-primary" type="submit">
          Create Account
        </button>
      </form>

      <p className="vx-auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address to continue."
    >
      {submitted ? (
        <div className="vx-message" role="status">
          <strong>Password recovery preview</strong>
          <p>
            The request for {email} has been recorded for this demo.
            No email was sent. Email delivery will be available
            after backend integration.
          </p>
          <Link className="vx-button vx-button-primary" to="/login">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form className="vx-auth-form" onSubmit={handleSubmit}>
          <Field
            label="Email address"
            id="vx-reset-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="vx-button vx-button-primary">
            Continue
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

export function VerifyEmailPage() {
  let profile = null;

  try {
    profile = JSON.parse(sessionStorage.getItem(PROFILE_KEY) || "null");
  } catch {
    profile = null;
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Email verification will be enabled with backend integration."
    >
      <div className="vx-message">
        <strong>Account preview created</strong>
        <p>
          {profile?.email || "Your email address"} is ready for
          the next step of the prototype.
        </p>
        <p>No verification email has been sent.</p>
        <Link className="vx-button vx-button-primary" to="/login">
          Continue to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
