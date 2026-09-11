export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, inquiryType, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'Server misconfigured.' });
  }

  const htmlBody = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${inquiryType ? `<p><strong>Inquiry type:</strong> ${inquiryType}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'Portfolio Contact Form', email: 'noreply@nabil.is-a.dev' },
        to: [{ email: 'nabeelismailabdulkadir15@gmail.com', name: 'Nabeel Ismail' }],
        replyTo: { email, name },
        subject: `[Portfolio] ${inquiryType || 'General'} — ${name}`,
        htmlContent: htmlBody,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Brevo error:', response.status, err);
      return res.status(502).json({ ok: false, error: 'Email service error.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: 'Server error.' });
  }
}
