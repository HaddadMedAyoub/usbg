// src/app/actions/sendEmail.ts
"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  await resend.emails.send({
    from: "onboarding@resend.dev", // replace with your domain later
    to: "your@email.com",          // where you receive messages
    subject: `رسالة جديدة من ${name}`,
    html: `
      <p><strong>الاسم:</strong> ${name}</p>
      <p><strong>البريد:</strong> ${email}</p>
      <p><strong>الرسالة:</strong> ${message}</p>
    `,
  });
}
