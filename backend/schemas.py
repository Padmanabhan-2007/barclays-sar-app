from pydantic import BaseModel
from typing import List

class Transaction(BaseModel):
    date: str
    type: str
    amount: float
    destination_origin: str

class AlertData(BaseModel):
    alert_id: str
    customer_name: str
    risk_rating: str
    trigger_event: str
    transactions: List[Transaction]