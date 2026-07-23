/**
 * Centralized Email Templates Factory
 * Provides modular, future-ready email template generators.
 */

const emailTemplates = {
  /**
   * Generates owner notification email for new website enquiries.
   */
  ownerEnquiryNotification: (enquiryData, senderEmail, adminRecipients) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();

    return {
      from: `"PML GYM" <${senderEmail}>`,
      to: adminRecipients,
      subject: 'New Website Enquiry - PML GYM',
      text: `New enquiry received.

Name:
${enquiryData.name}

Email:
${enquiryData.email}

Phone:
${enquiryData.phone}

Subject:
${enquiryData.subject}

Message:
${enquiryData.message}

Date:
${dateStr}

Time:
${timeStr}
${enquiryData.ip ? `\nIP Address:\n${enquiryData.ip}` : ''}
`,
    };
  },

  /**
   * Generates customer auto-reply confirmation email.
   */
  customerAutoReply: (customerEmail, senderEmail) => {
    return {
      from: `"PML GYM" <${senderEmail}>`,
      to: customerEmail,
      subject: 'Thank you for contacting PML GYM',
      text: `Thank you for contacting PML GYM.

We have successfully received your enquiry.

Our team will contact you shortly.

Regards,
PML GYM
`,
    };
  },

  /**
   * Future-Ready Template: Membership Confirmation (Extensible)
   */
  membershipConfirmation: (customerEmail, senderEmail, planDetails) => {
    return {
      from: `"PML GYM" <${senderEmail}>`,
      to: customerEmail,
      subject: 'Welcome to PML GYM - Membership Confirmation',
      text: `Thank you for joining PML GYM! Your ${planDetails.name} membership has been activated.\n\nRegards,\nPML GYM`,
    };
  },

  /**
   * Future-Ready Template: Password Reset Request (Extensible)
   */
  passwordReset: (customerEmail, senderEmail, resetUrl) => {
    return {
      from: `"PML GYM Security" <${senderEmail}>`,
      to: customerEmail,
      subject: 'Password Reset Request - PML GYM',
      text: `Click the link to reset your account password: ${resetUrl}\n\nIf you did not request this, please ignore this email.`,
    };
  },
};

module.exports = emailTemplates;
