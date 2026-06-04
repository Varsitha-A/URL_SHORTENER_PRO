const QRCode = require("qrcode");

const generateQRCode = async (url) => {
  try {
    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  } catch (error) {
    throw new Error("QR Code generation failed");
  }
};

module.exports = generateQRCode;