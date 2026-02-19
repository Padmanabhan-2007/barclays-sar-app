import { useState } from 'react';

// --- NEW AUTHENTICATION SCREEN COMPONENT ---
function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [tier, setTier] = useState('premium');

const handleSubmit = (e) => {
  e.preventDefault();

  if (!isLogin) {
    alert("Enterprise account provisioned! Please log in with your new credentials.");
    setIsLogin(true);
  } else {
    onLogin();
  }
};

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-[#00AEEF] selection:text-white">
      
      {/* Left Panel - Branding & Value Prop */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 bg-[#002B4D] text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00AEEF] opacity-10 rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D03027] opacity-10 rounded-tr-full blur-3xl"></div>
        
        <div className="z-10">
          <div className="font-bold text-3xl tracking-widest mb-2">BARCLAYS</div>
          <div className="text-sm font-semibold tracking-wider text-[#00AEEF] uppercase mb-12">Global Compliance Engine</div>
          
          <h1 className="text-4xl font-light leading-tight mb-6">
            Next-Generation <br/><span className="font-bold">Financial Crime Analysis</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-md">
            Automate SAR generation, map complex transaction ledgers to the Barclays Financial Crime Policy, and dynamically detect multi-pillar violations in seconds.
          </p>
        </div>

        <div className="z-10 border-t border-white/10 pt-6">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-3">Enterprise Security</div>
          <div className="flex gap-4">
            <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/5">AES-256 Encryption</span>
            <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/5">SOC 2 Type II</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login/Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="max-w-md w-full">
          
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#00395D] mb-2">
              {isLogin ? 'Access Secure Workspace' : 'Create Compliance Account'}
            </h2>
            <p className="text-sm text-slate-500">
              {isLogin ? 'Enter your credentials to access the SAR engine.' : 'Select your licensing tier to begin.'}
            </p>
          </div>

          {/* Toggle Login / Sign Up */}
          <div className="flex bg-slate-100 p-1 rounded-sm mb-8 border border-slate-200">
            <button 
              onClick={() => setIsLogin(true)} 
              className={`flex-1 text-xs font-bold py-2.5 uppercase tracking-wide rounded-sm transition-all ${isLogin ? 'bg-white text-[#00395D] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`flex-1 text-xs font-bold py-2.5 uppercase tracking-wide rounded-sm transition-all ${!isLogin ? 'bg-white text-[#00395D] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
           {/* Clearance Role Selector (RBAC) */}
{!isLogin && (
  <div className="mb-6">
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
      Clearance Role
    </label>
    <select className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] bg-white">
      <option>Analyst</option>
      <option>Investigator</option>
      <option>Compliance Head</option>
    </select>
  </div>
)}


            {/* Inputs */}
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input required type="text" placeholder="Analyst Name" className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]" />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Email</label>
              <input required type="email" placeholder="name@barclays.com" className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                {isLogin && <a href="#" className="text-[10px] text-[#00AEEF] hover:underline">Forgot?</a>}
              </div>
              <input required type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]" />
            </div>

            <button type="submit" className="w-full bg-[#00395D] hover:bg-[#002B4D] text-white font-bold text-sm py-3 rounded-sm transition-colors mt-4 shadow-sm">
              {isLogin ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Compliance Disclaimer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-[9px] text-slate-400 leading-relaxed max-w-xs mx-auto">
              By accessing this system, you agree to the Barclays Financial Crime Policy and acknowledge that all activity is monitored for security and audit purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---
function App() {
  // NEW: Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [caseStatus, setCaseStatus] = useState('OPEN');
  
  const [activePolicySnippet, setActivePolicySnippet] = useState(null);
  const [activeRiskFactor, setActiveRiskFactor] = useState(null);
  const [showTrace, setShowTrace] = useState(false);

  // DYNAMIC STATE
  const [alertInput, setAlertInput] = useState({
    alert_id: "ALT-2026-9042",
    customer_name: "Mr. John Doe",
    risk_rating: "CRITICAL RISK",
    trigger_event: "Multi-Pillar Violation: Sanctions match, PEP involvement, and offshore tax-haven routing.",
    transactions: [
      { date: "2026-02-12", type: "Inbound Wire", amount: 250000, destination_origin: "Local Bank A", tx_id: "TX-9981-A" },
      { date: "2026-02-13", type: "Offshore Transfer", amount: 150000, destination_origin: "Opaque Trust (Tax Haven)", tx_id: "TX-9982-B" }
    ]
  });

  const getRiskExplanation = (factor) => {
    const explanations = {
      "OFAC/OFSI Sanctions List Match": "Beneficiary name and/or address strictly matches entries on HM Treasury (OFSI) and US Treasury (OFAC) consolidated watchlists.",
      "Politically Exposed Person (PEP) Connection": "Recipient identified as a Foreign Public Official or a closely connected individual, triggering Anti-Bribery & Corruption (ABC) protocols.",
      "High-Risk Third Country (AML)": "Funds routed through historically non-cooperative jurisdictions matching FATF/UK watchlists.",
      "Opaque Offshore Trust Routing (ATEF)": "Use of complex offshore corporate structures indicative of deliberate tax evasion facilitation."
    };
    return explanations[factor] || "Pattern identified via behavioral baseline deviation.";
  };

  const processAlert = async () => {
    setLoading(true);
    setShowTrace(false); 
    
    try {
      const response = await fetch("https://barclays-sar-app.onrender.com/api/process-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertInput),
      });
      
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Failed to connect", error);
      alert("Error: Make sure your Python backend is running!");
    }
    setLoading(false);
  };

  // Main Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertInput(prev => ({ ...prev, [name]: value }));
  };

  // Dynamic Transaction Row Handlers
  const handleTxChange = (index, field, value) => {
    const newTx = [...alertInput.transactions];
    newTx[index][field] = field === 'amount' ? Number(value) : value;
    setAlertInput({ ...alertInput, transactions: newTx });
  };

  const addTransaction = () => {
    setAlertInput({
      ...alertInput,
      transactions: [
        ...alertInput.transactions, 
        { date: "2026-02-14", type: "", amount: 0, destination_origin: "", tx_id: `TX-${Math.floor(1000 + Math.random() * 9000)}-X` }
      ]
    });
  };

  const removeTransaction = (index) => {
    const newTx = [...alertInput.transactions];
    newTx.splice(index, 1);
    setAlertInput({ ...alertInput, transactions: newTx });
  };

  // NEW: If not authenticated, show the login screen!
  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  // If they ARE authenticated, return the normal dashboard
  return (
    <div className="flex h-screen bg-[#F9FAFB] text-slate-800 font-sans overflow-hidden selection:bg-[#00AEEF] selection:text-white">
      
      {/* ENTERPRISE SIDEBAR */}
      <aside className="w-64 bg-[#00395D] text-slate-300 flex flex-col border-r border-[#002B4D] z-20">
        <div className="p-5 border-b border-white/10 bg-[#002B4D]">
          <div className="font-bold text-xl tracking-widest text-white mb-1">BARCLAYS</div>
          <div className="text-xs font-semibold tracking-wider text-[#00AEEF] uppercase">Global Compliance</div>
        </div>
        <div className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Modules</div>
        <nav className="flex-1 px-2 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-[#00AEEF]/10 text-[#00AEEF] rounded-sm border-l-2 border-[#00AEEF] text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Active Investigations
          </a>
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Control Bar */}
        <header className="bg-[#FFFFFF] px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0 z-10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">CASE REF</span>
              <h1 className="text-xl font-bold text-[#00395D] font-mono">{alertInput.alert_id}</h1>
              {caseStatus !== 'OPEN' && (
                <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider text-white ${caseStatus === 'ESCALATED' ? 'bg-orange-500' : caseStatus === 'CLOSED' ? 'bg-slate-500' : 'bg-emerald-500'}`}>
                  {caseStatus}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Multi-Pillar Automated Alert Review</p>
          </div>
          
          <div className="flex gap-2 items-center bg-slate-50 p-1 rounded-sm border border-slate-200">
            {reportData && (
              <button onClick={() => setReportData(null)} className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-white hover:text-[#00AEEF] rounded-sm transition-colors border border-transparent hover:border-slate-300">
                ← Back to Input Form
              </button>
            )}
            <div className="w-px h-6 bg-slate-300 mx-1"></div>
            <button 
              onClick={processAlert} 
              disabled={loading || alertInput.transactions.length === 0}
              className={`px-4 py-1.5 rounded-sm font-bold text-white text-xs transition-all flex items-center gap-2 shadow-sm ${loading ? 'bg-[#00395D]/70 cursor-wait' : 'bg-[#00395D] hover:bg-[#002B4D]'}`}
            >
              {loading ? 'EXECUTING...' : 'RUN AI SAR'}
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              className="ml-2 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
            
            {/* LEFT COLUMN - Entity Profile & Ledger */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#FFFFFF] border border-slate-200 rounded-sm shadow-sm">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Entity Profile</h2>
                  <span className={`${alertInput.risk_rating.includes('CRITICAL') || alertInput.risk_rating.includes('HIGH') ? 'bg-[#D03027]' : 'bg-orange-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> {alertInput.risk_rating}
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Subject Name</div>
                    <div className="text-base font-medium text-slate-900">{alertInput.customer_name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Trigger Event</div>
                    <div className="text-xs font-medium text-slate-700 leading-relaxed">{alertInput.trigger_event}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFFFF] border border-slate-200 rounded-sm shadow-sm flex-1">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Transaction Ledger</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                      <tr><th className="px-4 py-2 font-bold">Details</th><th className="px-4 py-2 font-bold text-right">Amount</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {alertInput.transactions.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-medium text-slate-800 text-xs">{tx.type || 'New Tx'}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{tx.destination_origin || '---'}</div>
                            <div className="text-[9px] font-mono text-slate-400 mt-0.5">{tx.tx_id}</div>
                          </td>
                          <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-900 text-right align-top">
                            ${Number(tx.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Analysis or Intake Form */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* THE NEW DYNAMIC CASE INTAKE FORM */}
              {!reportData && !loading && (
                <div className="flex-1 bg-white border border-slate-200 rounded-sm shadow-sm p-8">
                  <div className="border-b border-slate-200 pb-4 mb-6">
                    <h2 className="text-lg font-bold text-[#00395D] flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      Manual Case Intake
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Configure the alert details and build the transaction ledger to run the AI engine.</p>
                  </div>

                  {/* Basic Details */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Subject Name</label>
                      <input type="text" name="customer_name" value={alertInput.customer_name} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Alert ID</label>
                      <input type="text" name="alert_id" value={alertInput.alert_id} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] font-mono" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Risk Rating</label>
                    <select name="risk_rating" value={alertInput.risk_rating} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] bg-white">
                      <option value="LOW RISK">Low Risk</option>
                      <option value="MEDIUM RISK">Medium Risk</option>
                      <option value="HIGH RISK">High Risk</option>
                      <option value="CRITICAL RISK">Critical Risk</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Trigger Event Summary</label>
                    <textarea name="trigger_event" value={alertInput.trigger_event} onChange={handleInputChange} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] h-16 resize-none"></textarea>
                  </div>

                  {/* DYNAMIC TRANSACTION BUILDER */}
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Transaction Ledger Builder</label>
                      <button onClick={addTransaction} className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-[#00395D] px-2 py-1 rounded-sm flex items-center gap-1 transition-colors">
                        <span>+</span> Add Row
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {alertInput.transactions.map((tx, index) => (
                        <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-sm border border-slate-200 relative group">
                          <input 
                            type="date" 
                            value={tx.date} 
                            onChange={(e) => handleTxChange(index, 'date', e.target.value)}
                            className="w-32 text-xs border border-slate-300 rounded-sm px-2 py-1.5 focus:outline-none focus:border-[#00AEEF]" 
                          />
                          <input 
                            type="text" 
                            placeholder="Type (e.g. Wire)" 
                            value={tx.type} 
                            onChange={(e) => handleTxChange(index, 'type', e.target.value)}
                            className="w-1/4 text-xs border border-slate-300 rounded-sm px-2 py-1.5 focus:outline-none focus:border-[#00AEEF]" 
                          />
                          <input 
                            type="text" 
                            placeholder="Destination / Origin" 
                            value={tx.destination_origin} 
                            onChange={(e) => handleTxChange(index, 'destination_origin', e.target.value)}
                            className="flex-1 text-xs border border-slate-300 rounded-sm px-2 py-1.5 focus:outline-none focus:border-[#00AEEF]" 
                          />
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-xs text-slate-400">$</span>
                            <input 
                              type="number" 
                              placeholder="Amount" 
                              value={tx.amount} 
                              onChange={(e) => handleTxChange(index, 'amount', e.target.value)}
                              className="w-28 text-xs border border-slate-300 rounded-sm pl-5 pr-2 py-1.5 focus:outline-none focus:border-[#00AEEF] text-right font-mono" 
                            />
                          </div>
                          <button 
                            onClick={() => removeTransaction(index)}
                            className="text-red-400 hover:text-red-600 transition-colors opacity-50 group-hover:opacity-100 px-1"
                            title="Remove Transaction"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      ))}
                      {alertInput.transactions.length === 0 && (
                        <div className="text-center p-6 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-sm">
                          No transactions added. Click "+ Add Row" to build the ledger.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                  <div className="w-8 h-8 border-4 border-[#00AEEF] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold tracking-widest uppercase text-xs animate-pulse">Running Multi-Pillar AI Models...</p>
                </div>
              )}

              {/* The AI Output */}
              {reportData && !loading && (
                <>
                  {/* Intelligence & Recommendation Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                    
                    {/* Risk Score Panel */}
                    <div className="bg-[#FFFFFF] border-l-4 border-l-[#D03027] border-y border-r border-slate-200 rounded-sm shadow-sm p-4 flex flex-col max-h-[250px]">
                      <h3 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 flex justify-between items-center">
                        Multi-Pillar Risk Contribution Breakdown
                      </h3>
                      
                      <div className="flex items-end gap-3 mb-2">
                        <span className="text-4xl font-bold text-[#D03027]">98%</span>
                        <span className="text-xs text-slate-600 mb-1 font-semibold uppercase">Total Risk Score</span>
                      </div>
                      <div className="flex gap-2 mb-4 text-[10px] font-bold">
                        <span className="bg-[#D03027]/10 text-[#D03027] px-2 py-0.5 rounded-sm border border-[#D03027]/20 tracking-wide">CLASSIFICATION: CRITICAL</span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-sm border border-slate-200 tracking-wide">THRESHOLD: 75%</span>
                      </div>

                      <div className="space-y-1 mt-2 flex-1 overflow-y-auto pr-2">

                        {reportData.ai_analysis.risk_breakdown?.map((risk, idx) => (
                           <div 
                             key={idx} 
                             onClick={() => setActiveRiskFactor(activeRiskFactor === idx ? null : idx)}
                             className="group cursor-pointer hover:bg-slate-50 p-1.5 -mx-1.5 rounded-sm transition-colors"
                           >
                             <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-700 border-b border-dashed border-slate-300 group-hover:border-[#00AEEF] transition-colors">
                                 {risk.factor}
                               </span>
                               <span className="font-bold text-[#D03027]">+{risk.contribution_percentage}%</span>
                             </div>
                             
                             {activeRiskFactor === idx && (
                               <div className="mt-2 text-[10px] bg-slate-100 text-slate-600 p-2 rounded-sm border-l-2 border-[#00AEEF] leading-relaxed">
                                 <span className="font-bold text-slate-700 mr-1">Pattern Detected:</span> 
                                 {getRiskExplanation(risk.factor)}
                               </div>
                             )}
                           </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recommendation Badge */}
                    <div className="bg-[#D03027] border-2 border-red-800 rounded-sm shadow-sm p-5 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-600 to-transparent opacity-40 rounded-bl-full"></div>
                      <h3 className="text-[10px] text-red-100 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 z-10">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        System Recommendation
                      </h3>
                      <div className="text-2xl font-black text-white mb-3 uppercase tracking-wide z-10 drop-shadow-sm">
                        {reportData.ai_analysis.recommendation.action}
                      </div>
                      <p className="text-xs text-white leading-relaxed border-l-[3px] border-red-400 pl-3 bg-red-900/40 p-2.5 rounded-r-sm z-10 font-medium">
                        {reportData.ai_analysis.recommendation.reasoning}
                      </p>
                    </div>
                  </div>

                  {/* Collapsible SAR Narrative Workspace */}
                  <div className="bg-[#FFFFFF] border border-slate-200 rounded-sm shadow-sm flex flex-col flex-1">
                    <div className="px-4 py-3 border-b border-slate-200 bg-[#00395D] text-white flex justify-between items-center">
                      <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Structured SAR Narrative
                      </h2>
                    </div>
                    
                    <div className="p-2 flex-1 bg-white">
                      <details className="group border-b border-slate-100 pb-2 mb-2 p-2" open>
                        <summary className="text-sm font-bold text-[#00395D] cursor-pointer hover:text-[#00AEEF] list-none flex items-center gap-2">
                           <span className="text-xs">▶</span> Background
                        </summary>
                        <textarea 
                          className="w-full text-sm text-slate-700 mt-2 pl-5 py-2 leading-relaxed bg-transparent border border-transparent hover:border-slate-200 focus:outline-none focus:border-[#00AEEF] focus:bg-white rounded-sm resize-y min-h-[80px]" 
                          defaultValue={reportData.ai_analysis.narrative.background} 
                        />
                      </details>
                      
                      <details className="group border-b border-slate-100 pb-2 mb-2 p-2" open>
                        <summary className="text-sm font-bold text-[#00395D] cursor-pointer hover:text-[#00AEEF] list-none flex items-center gap-2">
                           <span className="text-xs">▶</span> Transaction Timeline
                        </summary>
                        <textarea 
                          className="w-full text-sm text-slate-700 mt-2 pl-5 py-2 leading-relaxed bg-transparent border border-transparent hover:border-slate-200 focus:outline-none focus:border-[#00AEEF] focus:bg-white rounded-sm resize-y min-h-[80px]" 
                          defaultValue={reportData.ai_analysis.narrative.timeline} 
                        />
                      </details>

                      <details className="group border-b border-slate-100 pb-2 mb-2 p-2" open>
                        <summary className="text-sm font-bold text-[#00395D] cursor-pointer hover:text-[#00AEEF] list-none flex items-center gap-2">
                           <span className="text-xs">▶</span> Suspicion Indicators <span className="text-[10px] font-normal text-slate-400 ml-2">(Click panel to trace evidence)</span>
                        </summary>
                        
                        <div 
                          className={`mt-2 ml-5 p-2 rounded-sm cursor-pointer transition-all ${showTrace ? 'bg-[#00AEEF]/10 border-l-[3px] border-[#00AEEF]' : 'hover:bg-slate-50 border-l-[3px] border-transparent'}`}
                          onClick={() => setShowTrace(!showTrace)}
                        >
                          <textarea 
                            className="w-full text-sm text-slate-700 leading-relaxed bg-transparent border border-transparent hover:border-slate-200 focus:outline-none focus:border-[#00AEEF] focus:bg-white rounded-sm resize-y min-h-[80px] p-1"
                            defaultValue={reportData.ai_analysis.narrative.indicators}
                            onClick={(e) => e.stopPropagation()} 
                          />
                        </div>

                        {showTrace && (
                          <div className="mt-4 ml-5 border border-[#00AEEF]/30 bg-[#F4F9FD] rounded-sm p-4 shadow-inner">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00395D] mb-3 flex items-center gap-2">
                               <svg className="w-4 h-4 text-[#00AEEF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                               AI Traceability Evidence (Multi-Pillar Match)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                               <div className="bg-white p-3 rounded-sm border border-slate-200">
                                 <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Supporting Transactions</div>
                                 <div className="text-xs font-mono text-[#D03027] font-bold">TX-9982-B & TX-9983-C</div>
                                 <div className="text-[11px] text-slate-800 mt-1 font-medium">Targeted Entities identified.</div>
                               </div>
                               
                               <div className="bg-white p-3 rounded-sm border border-slate-200">
                                 <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Triggered Risk Drivers</div>
                                 <div className="flex justify-between items-center text-[11px] mb-1">
                                   <span className="font-semibold text-slate-700">Sanctions Match</span>
                                   <span className="font-bold text-[#D03027]">40%</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[11px] mb-1">
                                   <span className="font-semibold text-slate-700">PEP Connection (ABC)</span>
                                   <span className="font-bold text-[#D03027]">25%</span>
                                 </div>
                                 <div className="flex justify-between items-center text-[11px]">
                                   <span className="font-semibold text-slate-700">Offshore Tax Routing (ATEF)</span>
                                   <span className="font-bold text-[#D03027]">15%</span>
                                 </div>
                               </div>

                               <div className="bg-white p-3 rounded-sm border border-slate-200">
                                 <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Policy Implementation</div>
                                 <div className="text-[11px] font-semibold text-[#00395D] mb-1">Barclays Consolidated Standards</div>
                                 <div className="text-[10px] text-slate-600 leading-tight">
                                   Immediate escalation required for contraventions of UK Bribery Act (PEP), UK Criminal Finances Act (ATEF), and OFAC Sanctions.
                                 </div>
                               </div>
                            </div>
                          </div>
                        )}
                      </details>

                      <details className="group p-2" open>
                        <summary className="text-sm font-bold text-[#00395D] cursor-pointer hover:text-[#00AEEF] list-none flex items-center gap-2">
                           <span className="text-xs">▶</span> Conclusion
                        </summary>
                        <textarea 
                          className="w-full text-sm text-slate-700 mt-2 pl-5 py-2 leading-relaxed font-semibold bg-transparent border border-transparent hover:border-slate-200 focus:outline-none focus:border-[#00AEEF] focus:bg-white rounded-sm resize-y min-h-[60px]" 
                          defaultValue={reportData.ai_analysis.narrative.conclusion} 
                        />
                      </details>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Interactive Policy Mapping */}
                    <div className="bg-[#FFFFFF] border border-slate-200 rounded-sm shadow-sm">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Global Policy Mapping Engine</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {reportData.ai_analysis.findings?.map((finding, idx) => (
                          <div key={idx} className="flex flex-col text-xs text-slate-700 bg-white border border-slate-200 p-3 rounded-sm shadow-sm relative">
                            <div className="flex gap-2 items-center mb-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#D03027]"></span>
                              <span className="font-bold uppercase">{finding.rule}</span>
                            </div>
                            <div className="pl-4 text-[11px] text-slate-500 mb-2">{finding.detail}</div>
                            
                            <div className="pl-4 border-l-2 border-[#00AEEF] ml-1">
                              <button 
                                onClick={() => setActivePolicySnippet(activePolicySnippet === idx ? null : idx)}
                                className="text-[10px] font-mono text-[#00395D] bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded-sm border border-blue-200 uppercase transition-colors text-left"
                              >
                                ↳ View {finding.policy}
                              </button>
                            </div>

                            {activePolicySnippet === idx && (
                               <div className="mt-2 ml-4 p-2 bg-slate-800 text-white text-[10px] rounded-sm leading-relaxed border-l-4 border-[#00AEEF]">
                                 {finding.policy_snippet}
                               </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vertical Timeline */}
                    <div className="bg-[#FFFFFF] border border-slate-200 rounded-sm shadow-sm flex flex-col h-[320px]">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Investigation Timeline</h3>
                      </div>
                      <div className="p-6 overflow-y-auto flex-1 bg-white">
                        <div className="relative border-l-2 border-slate-200 ml-2 space-y-6">
                          {reportData.audit_logs?.map((log, idx) => (
                            <div key={idx} className="relative pl-6">
                              <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full ring-4 ring-white bg-[#00AEEF]"></div>
                              <div className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </div>
                              <div className="text-xs font-bold text-[#00395D]">{log.action}</div>
                              <div className="text-[11px] text-slate-500 mt-1">{log.details}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;