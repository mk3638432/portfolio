import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    console.log(name, email, message);
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "mk3638432@gmail.com",
        pass: "evnrfbsucxwgvrus",
      },
    });

    const mailOptions = {
      from: `<${email}>`,
      to: "mk3638432@gmail.com",
      subject: "New Contact Form Submission From Portfolio",
      text: "Hello world?", // plain text body,
    };
    console.log("Message sent: %s", mailOptions.messageId);
    console.log(mailOptions);

    try {
      const result = await transporter.sendMail(mailOptions);
      console.log(result);

      // Log success
      console.log("Email sent successfully!");

      // Respond with a more detailed success message
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);

      // Respond with a more detailed error message
      res.status(500).json({ success: false, error: "Failed to send email." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed." });
  }
}
