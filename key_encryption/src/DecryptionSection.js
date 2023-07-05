function DecryptionSection({ onDecrypt }) {
  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [salt, setSalt] = useState("");
  const [iv, setIV] = useState("");

  const handleDecrypt = () => {
    onDecrypt(encryptedPrivateKey, password, salt, iv);
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Decrypt</h2>
      <div className="input-container">
        <label htmlFor="encryptedPrivateKey" className="input-label">
          Encrypted Private Key:
        </label>
        <input
          type="text"
          id="encryptedPrivateKey"
          value={encryptedPrivateKey}
          onChange={(e) => setEncryptedPrivateKey(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password" className="input-label">
          Decryption Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="salt" className="input-label">
          Decryption Salt:
        </label>
        <input
          type="text"
          id="salt"
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="iv" className="input-label">
          Decryption IV:
        </label>
        <input
          type="text"
          id="iv"
          value={iv}
          onChange={(e) => setIV(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleDecrypt} className="action-button">
        Decrypt
      </button>
    </div>
  );
}
export default DecryptionSection;
