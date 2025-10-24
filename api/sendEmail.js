import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"기러기 알림" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Gmail 전송 성공 → ${to}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(`❌ Gmail 전송 실패 → ${to}`, error);
    res.status(500).json({ error: error.message });
  }
}
