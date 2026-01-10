import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class EmailClient:
    def __init__(self):
        self.smtp_host = settings.SMTP_HOST
        self.smtp_port = settings.SMTP_PORT
        self.smtp_user = settings.SMTP_USER
        self.smtp_password = settings.SMTP_PASSWORD
    
    async def send_email(
        self,
        to_email: str,
        subject: str,
        body: str,
        html: bool = False
    ):
        """Send email via SMTP"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'html' if html else 'plain'))
            
            # Use synchronous SMTP for now, could be made async with aiosmtplib
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"Email sent to {to_email}: {subject}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    async def send_order_confirmation(self, to_email: str, order_number: str):
        """Send order confirmation email"""
        subject = f"Order Confirmation - {order_number}"
        body = f"""
        Dear Customer,
        
        Your order {order_number} has been successfully placed.
        
        You can track your order status on the OMPOI platform.
        
        Best regards,
        OMPOI Team
        """
        return await self.send_email(to_email, subject, body)

# Global instance
email_client = EmailClient()
