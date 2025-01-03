import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Authentication setup
const auth = getAuth();

// Setup reCAPTCHA Enterprise
const recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha-container',  // ID dari elemen di HTML
  {
    size: 'normal',        // Bisa juga 'invisible' jika ingin reCAPTCHA tersembunyi
    callback: (response) => {
      console.log("reCAPTCHA Verified");
    }
  },
  auth
);

recaptchaVerifier.render();

// Kirim OTP
document.getElementById('sendCode').addEventListener('click', () => {
  const phoneNumber = document.getElementById('phone').value;
  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("Kode OTP berhasil dikirim!");
    })
    .catch((error) => {
      console.error("Error sending code", error);
      alert("Gagal mengirim kode OTP.");
    });
});

// Verifikasi OTP
document.getElementById('verifyCode').addEventListener('click', () => {
  const code = document.getElementById('otp').value;
  window.confirmationResult
    .confirm(code)
    .then((result) => {
      alert("Login berhasil!");
      window.location.href = "chat.html";
    })
    .catch((error) => {
      console.error("Error verifying code", error);
      alert("Kode OTP salah.");
    });
});
