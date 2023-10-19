const ForgotPassword = () => {
  const handleChange = () => {};
  return (
    <div className="login-wrapper">
      <div className="login-content">
        {/* title */}
        <div className="title-container">
          <div className="title">
            <p>LOG IN</p>
          </div>
        </div>
        {authError && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <ErrorComp error={authError} />
          </div>
        )}
        <div className="input-wrapper">
          <div className="input-group">
            <span>
              <FontAwesomeIcon color="gray" icon={faEnvelope} />
            </span>
            <input
              onChange={handleChange("email")}
              type="text"
              placeholder="Enter your email"
            />
          </div>
          {emailError && <ErrorComp error={emailError} />}
        </div>

        <div className="login-btn">
          <button onClick={handleClick}>send reset link</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
