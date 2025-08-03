// /app/api/email/verify/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


const domain = process.env.NEXT_PUBLIC_APP_URL;

const SMTP_SERVER_HOST = process.env.EMAIL_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.EMAIL_SERVER_USER;
const SMTP_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.EMAIL_MAIL_RECIEVER;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return NextResponse.json(
      { message: "Missing email or token" },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_SERVER_HOST,
      port: 465,
      secure: true,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
      },
    });

    const link = `${domain}/verify?email=${email}&token=${token}`;

    await transporter.sendMail({
      from: '"WKT3" <no-reply@yourdomain.com>',
      to: email||SITE_MAIL_RECIEVER,
      subject: "Verify your email",
      html: `
        <h3>Verify your WKT3 account</h3>
        <p>Click the button below to verify your account:</p>
        <a href="${link}" style="padding:10px 20px;background:#0D9488;color:white;text-decoration:none;border-radius:5px;">Verify Account</a>
        <p>This link will expire in 15 minutes.</p>
      `, 
    });

    return NextResponse.json({ message: "Verification email sent." });
  } catch {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
