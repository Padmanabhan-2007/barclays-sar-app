from schemas import AlertData
from services.audit_logger import logger_instance

def analyze_risk(alert: AlertData) -> list:
    logger_instance.log_event("Risk Engine Started", "System", f"Analyzing {len(alert.transactions)} transactions.")
    
    findings = []
    outbound_total = 0

    for tx in alert.transactions:
        # Rule 1: High-Risk Locations
        if "High-Risk" in tx.destination_origin or "Country X" in tx.destination_origin:
            findings.append(f"Flagged location detected: {tx.destination_origin} for £{tx.amount}")
        
        # Rule 2: Structuring / Rapid Dispersal
        if tx.type == "Outbound Transfer":
            outbound_total += tx.amount

    if outbound_total >= 40000:
        findings.append(f"Rapid dispersal of funds detected. Total outbound: £{outbound_total}")

    logger_instance.log_event("Risk Engine Completed", "System", f"Found {len(findings)} risk factors.")
    return findings