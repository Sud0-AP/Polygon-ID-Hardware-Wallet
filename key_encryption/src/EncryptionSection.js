function EncryptionSection({ onEncrypt }) {
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");

  const handleEncrypt = () => {
    onEncrypt(privateKey, password);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Encrypt</h2>
      <div className="input-container">
        <label htmlFor="privateKey" className="input-label">
          Private Key:
        </label>
        <input
          type="text"
          id="privateKey"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          Encryption Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleEncrypt} className="action-button">
        Encrypt
      </button>
    </div>
  );
}

export default EncryptionSection;
