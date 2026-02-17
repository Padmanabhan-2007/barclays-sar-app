import datetime

class AuditLogger:
    def __init__(self):
        # In a real app, this connects to a database. For the demo, we use a list.
        self.logs = []

    def log_event(self, action: str, user: str, details: str):
        event = {
            "timestamp": datetime.datetime.now().isoformat(),
            "action": action,
            "user": user,
            "details": details
        }
        self.logs.append(event)
        return event

    def get_logs(self):
        return self.logs

# Create a single instance to be used across the app
logger_instance = AuditLogger()