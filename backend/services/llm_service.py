import os
from openai import OpenAI
from dotenv import load_dotenv
from schemas import AlertData
from services.audit_logger import logger_instance

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_sar(alert: AlertData, findings: list) -> str:
    logger_instance.log_event("LLM Prompted", "System", "Generating SAR narrative.")
    
    findings_text = "\n".join([f"- {f}" for f in findings])
    
    prompt = f"""
    You are an expert Anti-Money Laundering (AML) Investigator at Barclays.
    Draft a formal Suspicious Activity Report (SAR) narrative based on these facts:
    
    Customer: {alert.customer_name}
    Trigger: {alert.trigger_event}
    
    Findings:
    {findings_text}
    
    Structure the report strictly into:
    1. Customer Profile
    2. Suspicious Activity Details
    3. Conclusion
    Keep it objective, professional, and factual.
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o", # Or whichever model you have access to
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2
        )
        narrative = response.choices[0].message.content
        logger_instance.log_event("LLM Generation Complete", "System", "SAR drafted successfully.")
        return narrative
    except Exception as e:
        logger_instance.log_event("LLM Error", "System", str(e))
        return "Error generating SAR narrative."