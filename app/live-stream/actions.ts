"use server";

import nodemailer from "nodemailer";

const ZOOM = {
  title: "Thursday Community Breathwork",
  when: "Every Thursday at 8:00 PM PST",
  link: "https://us06web.zoom.us/j/88211332041?pwd=NFca6hy43x431iR7NXv4cqaBK9cnyT.1",
  meetingId: "882 1133 2041",
  passcode: "295538",
};

type ReserveResult = { ok: true } | { ok: false; error: string };

export async function reserveSpot(formData: FormData): Promise<ReserveResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const contribution = String(formData.get("contribution") ?? "").trim();
  const waiverAcceptedAt = String(formData.get("waiverAcceptedAt") ?? "").trim();

  if (!name || !email) {
    return { ok: false, error: "Please provide your name and email." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (!waiverAcceptedAt) {
    return {
      ok: false,
      error: "Please review and agree to the waiver to reserve your spot.",
    };
  }

  // Human-readable acceptance timestamp for the records in each email.
  const waiverAcceptedLabel = new Date(waiverAcceptedAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });

  const user = process.env.GMAIL_USER?.trim();
  // Google displays App Passwords with spaces (e.g. "abcd efgh ijkl mnop"),
  // but SMTP auth needs the 16 characters with no spaces.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    return {
      ok: false,
      error: "Email is not configured yet. Please try again later.",
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const participantHtml = `
    <div style="font-family: Georgia, serif; color: #2a2620; line-height: 1.6; max-width: 540px;">
      <h2 style="font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">You're in ✺</h2>
      <p>Hi ${name},</p>
      <p>Your spot for <strong>${ZOOM.title}</strong> is reserved. ${ZOOM.when}.</p>
      <p>Find a quiet spot where you can enjoy your breath, and log on a few minutes early.</p>
      <div style="border:1px solid #2a2620; border-radius:4px; padding:18px 20px; margin:24px 0;">
        <p style="margin:0 0 8px;"><strong>Join Zoom Meeting</strong></p>
        <p style="margin:0 0 8px;"><a href="${ZOOM.link}" style="color:#b06a72;">${ZOOM.link}</a></p>
        <p style="margin:0 0 4px;">Meeting ID: ${ZOOM.meetingId}</p>
        <p style="margin:0;">Passcode: ${ZOOM.passcode}</p>
      </div>
      <p>This is a donation-based session — give what you can, when you can. No one is ever turned away for lack of funds.</p>
      <p>See you Thursday,<br/>Caitlyne</p>
      <p style="font-size:12px; color:#8a8074; margin-top:24px;">You agreed to the Release, Waiver of Liability, and Indemnity Agreement on ${waiverAcceptedLabel} (PT).</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #2a2620; line-height: 1.6;">
      <h3>New Thursday breathwork reservation</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contribution selected:</strong> ${contribution || "Not specified"}</p>
      <p><strong>Waiver accepted:</strong> ${waiverAcceptedLabel} (PT)</p>
    </div>
  `;

  try {
    await Promise.all([
      transporter.sendMail({
        from: `Caitlyne Corry <${user}>`,
        to: email,
        subject: `You're in — ${ZOOM.title}`,
        html: participantHtml,
      }),
      transporter.sendMail({
        from: `Breathwork Reservations <${user}>`,
        to: user,
        replyTo: email,
        subject: `New reservation — ${name}`,
        html: adminHtml,
      }),
    ]);
    return { ok: true };
  } catch (err) {
    console.log("[v0] reservation email error:", (err as Error).message);
    return {
      ok: false,
      error: "Something went wrong sending your confirmation. Please try again.",
    };
  }
}
