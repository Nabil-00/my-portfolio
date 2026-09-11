import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, inquiryType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  const smtpUser = process.env.BREVO_SMTP_USER;
  const smtpPass = process.env.BREVO_SMTP_KEY;
  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ ok: false, error: 'Server misconfigured.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: 'nabeelismailabdulkadir15@gmail.com',
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${inquiryType || 'General'} — ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${inquiryType ? `<p><strong>Inquiry type:</strong> ${inquiryType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: 'Email service error.' });
  }
}
