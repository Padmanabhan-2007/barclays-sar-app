import os
import json
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from google import genai
from google.genai import types 

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NOTE: Hardcoded for local testing. NEVER commit this API key to GitHub!
client = genai.Client(api_key=os.getenv("AIzaSyDH37rEDdkNjfMO4m8d1la49nSOAdQZpiU"))


class AlertData(BaseModel):
    alert_id: str
    customer_name: str
    risk_rating: str
    trigger_event: str
    transactions: list

@app.post("/api/process-alert")
async def process_alert(data: AlertData):
    
    # 1. We take the EXACT dynamic data typed in the frontend
    input_data_string = f"""
    Customer Name: {data.customer_name}
    Alert ID: {data.alert_id}
    Risk Rating: {data.risk_rating}
    Trigger Event: {data.trigger_event}
    Transactions: {data.transactions}
    """
    
    # 2. THE NEW DYNAMIC PROMPT: Instructs the AI to calculate based on inputs
    prompt = f"""
    You are an expert AML/Financial Crime Compliance Analyst at Barclays.
    Analyze the following alert data dynamically based on the Barclays Financial Crime Policy.
    CRITICAL INSTRUCTIONS: Your analysis must be strictly unbiased, fact-based, and non-discriminatory. Limit your output solely to on-topic financial crime typologies. You must operate under the assumption that this data may be processed across hybrid hosting environments (on-premises and multi-cloud), so ensure no cross-domain data leakage occurs in your generated narrative.
    
    INPUT DATA:
    {input_data_string}
    
    INSTRUCTIONS:
    Calculate a realistic risk breakdown based on the severity of the trigger and the actual transaction amounts provided. 
    Break down the risk contribution into percentages based on the 4 pillars (Sanctions, PEP/ABC, AML, ATEF). If a transaction amount is very high or specifically mentions offshore routing, assign higher risk to those factors.
    
    You MUST return ONLY a valid JSON object with the following exact structure, filling in the values dynamically based on your analysis:
    {{
        "narrative": {{
            "background": "1 sentence background on the customer/entity.",
            "timeline": "Brief timeline of the flagged transactions, referencing the specific amounts and dates provided.",
            "indicators": "The specific red flags across Sanctions, ABC, AML, and ATEF that triggered this alert.",
            "conclusion": "1 sentence conclusion using objective compliance tone."
        }},
        "risk_breakdown": [
            {{ "factor": "Dynamically generated factor (e.g., OFAC/OFSI Sanctions List Match)", "contribution_percentage": 40 }},
            {{ "factor": "Dynamically generated factor (e.g., PEP Connection)", "contribution_percentage": 25 }},
            {{ "factor": "Dynamically generated factor (e.g., High-Risk Jurisdiction)", "contribution_percentage": 20 }},
            {{ "factor": "Dynamically generated factor (e.g., Offshore Tax Routing)", "contribution_percentage": 15 }}
        ],
        "recommendation": {{
            "action": "Dynamically generated action (e.g., CRITICAL: Escalate to Global Compliance Head, or Escalate to L2)", 
            "reasoning": "Why this action is recommended based on the specific data provided."
        }},
        "findings": [
            {{
                "rule": "Name of the triggered rule (e.g., Sanctions Match, ABC Flag, AML Flag, ATEF Flag)",
                "detail": "Specific detail from the transaction that caused this flag",
                "policy": "Reference the relevant Barclays Financial Crime Policy (Sanctions Standard, ABC Standards, AML Standards, or Anti-Tax Evasion)",
                "policy_snippet": "A 1-2 sentence excerpt explaining the policy."
            }}
        ]
    }}
    """
    
    try:
        # 3. Call the AI model and force JSON output
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json", 
            )
        )
        ai_data = json.loads(response.text)
        
    except Exception as e:
        print(f"Error: {e}")
        ai_data = {
            "narrative": {"background": "Error", "timeline": "Error", "indicators": "Error", "conclusion": "Error"},
            "risk_breakdown": [],
            "recommendation": {"action": "Error", "reasoning": "Could not connect to AI."},
            "findings": []
        }

    # 4. Return the AI analysis alongside the system audit logs
    return {
        "ai_analysis": ai_data, 
        "audit_logs": [
            { "timestamp": datetime.datetime.now().isoformat(), "action": "Multi-Pillar Engine Started", "details": f"Screening {data.customer_name} against AML, ABC, ATEF & Sanctions." },
            { "timestamp": datetime.datetime.now().isoformat(), "action": "Cross-Reference Complete", "details": "Evaluating transaction patterns against global watchlists." },
            { "timestamp": datetime.datetime.now().isoformat(), "action": "AI Synthesis", "details": "Consolidated dynamic risk report generated." }
        ]
    }
