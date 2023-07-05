import React, { useState } from "react";
import CryptoJS from "crypto-js";
import "./App.css";

function encryptPrivateKey(privateKey, password) {
  const encryptSalt = CryptoJS.lib.WordArray.random(128 / 8).toString(
    CryptoJS.enc.Hex
  );
  const encryptIV = CryptoJS.lib.WordArray.random(128 / 8).toString(
    CryptoJS.enc.Hex
  );

  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(encryptSalt), {
    keySize: 256 / 32,
    iterations: 1000,
  });

  const encrypted = CryptoJS.AES.encrypt(privateKey, key, {
    iv: CryptoJS.enc.Hex.parse(encryptIV),
  });

  return {
    encryptedPrivateKey: encrypted.toString(),
    encryptSalt,
    encryptIV,
  };
}

function decryptPrivateKey(
  encryptedPrivateKey,
  password,
  decryptSalt,
  decryptIV
) {
  const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(decryptSalt), {
    keySize: 256 / 32,
    iterations: 1000,
  });

  const decrypted = CryptoJS.AES.decrypt(encryptedPrivateKey, key, {
    iv: CryptoJS.enc.Hex.parse(decryptIV),
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

function Sud0Wallet() {
  const [privateKey, setPrivateKey] = useState("");
  const [encryptPassword, setEncryptPassword] = useState("");
  const [decryptPassword, setDecryptPassword] = useState("");
  const [encryptedPrivateKey, setEncryptedPrivateKey] = useState("");
  const [encryptSalt, setEncryptSalt] = useState("");
  const [encryptIV, setEncryptIV] = useState("");
  const [decryptedPrivateKey, setDecryptedPrivateKey] = useState("");
  const [decryptSalt, setDecryptSalt] = useState("");
  const [decryptIV, setDecryptIV] = useState("");
  const [decryptEncryptedPrivateKey, setDecryptEncryptedPrivateKey] =
    useState("");

  const handleEncrypt = () => {
    const { encryptedPrivateKey, encryptSalt, encryptIV } = encryptPrivateKey(
      privateKey,
      encryptPassword
    );

    setEncryptedPrivateKey(encryptedPrivateKey);
    setEncryptSalt(encryptSalt);
    setEncryptIV(encryptIV);
  };

  const handleDecrypt = () => {
    const decrypted = decryptPrivateKey(
      encryptedPrivateKey,
      decryptPassword,
      decryptSalt,
      decryptIV
    );
    setDecryptedPrivateKey(decrypted);
  };

  return (
    <div className="container">
      <h1 className="title">Wallet Key Encryption Playground</h1>
      <div className="flex-container">
        <div className="encrypt-container">
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
            <label htmlFor="encryptPassword" className="input-label">
              Encryption Password:
            </label>
            <input
              type="password"
              id="encryptPassword"
              value={encryptPassword}
              onChange={(e) => setEncryptPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button onClick={handleEncrypt} className="action-button">
            Encrypt
          </button>
          {encryptedPrivateKey && (
            <div className="result-container">
              <h3 className="result-title">Encrypted Private Key:</h3>
              <p className="result-text">{encryptedPrivateKey}</p>
              {encryptSalt && encryptIV && (
                <div>
                  <div className="input-container">
                    <label htmlFor="encryptSalt" className="input-label">
                      Encryption Salt:
                    </label>
                    <input
                      type="text"
                      id="encryptSalt"
                      value={encryptSalt}
                      readOnly
                      className="input-field"
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="encryptIV" className="input-label">
                      Encryption IV:
                    </label>
                    <input
                      type="text"
                      id="encryptIV"
                      value={encryptIV}
                      readOnly
                      className="input-field"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="decrypt-container">
          <h2 className="section-title">Decrypt</h2>
          <div className="input-container">
            <label htmlFor="decryptEncryptedPrivateKey" className="input-label">
              Encrypted Private Key:
            </label>
            <input
              type="text"
              id="decryptEncryptedPrivateKey"
              value={decryptEncryptedPrivateKey}
              onChange={(e) => setDecryptEncryptedPrivateKey(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="decryptPassword" className="input-label">
              Decryption Password:
            </label>
            <input
              type="password"
              id="decryptPassword"
              value={decryptPassword}
              onChange={(e) => setDecryptPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="decryptSalt" className="input-label">
              Decryption Salt:
            </label>
            <input
              type="text"
              id="decryptSalt"
              value={decryptSalt}
              onChange={(e) => setDecryptSalt(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="decryptIV" className="input-label">
              Decryption IV:
            </label>
            <input
              type="text"
              id="decryptIV"
              value={decryptIV}
              onChange={(e) => setDecryptIV(e.target.value)}
              className="input-field"
            />
          </div>
          <button onClick={handleDecrypt} className="action-button">
            Decrypt
          </button>
          {decryptedPrivateKey && (
            <div className="result-container">
              <h3 className="result-title">Decrypted Private Key:</h3>
              <p className="result-text">{decryptedPrivateKey}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sud0Wallet;
