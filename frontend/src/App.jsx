import { useState, useEffect, useRef } from 'react';

// ============================================================
// DESIGN SYSTEM: Barclays SAR — "Obsidian Intelligence" Aesthetic
// Near-black obsidian base | Icy blue accents | Crimson alerts
// Font: Space Grotesk (headings) + Inter (body) + JetBrains Mono (data)
// ============================================================

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --obs:      #0C0D0F;
    --obs-2:    #13151A;
    --obs-3:    #1A1D24;
    --obs-4:    #22262F;
    --obs-5:    #2C3140;
    --ice:      #A8D4F5;
    --ice-bright:#C8E8FF;
    --ice-dim:  #6AAAD4;
    --ice-glow: #7EC8F0;
    --red:      #E05555;
    --red-dim:  #B03A3A;
    --white:    #EDF2F7;
    --muted:    #5A6478;
    --muted2:   #7A8699;
    --border:   rgba(168,212,245,0.10);
    --border2:  rgba(255,255,255,0.05);
  }

  body { background: var(--obs); color: var(--white); font-family: 'Inter', sans-serif; }

  .mono   { font-family: 'JetBrains Mono', monospace; }
  .grotesk{ font-family: 'Space Grotesk', sans-serif; }

  /* Scrollbars */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: var(--obs-2); }
  ::-webkit-scrollbar-thumb { background: var(--obs-5); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--ice-dim); }

  /* Noise texture */
  .noise::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; border-radius: inherit;
  }

  /* Ice glowing line */
  .glow-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--ice-glow), transparent);
    opacity: 0.5;
  }

  /* Scanline */
  .scanline {
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,212,245,0.012) 2px, rgba(168,212,245,0.012) 4px);
    pointer-events: none;
  }

  /* Animations */
  @keyframes ping    { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(2.4);opacity:0} }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
  @keyframes iceShimmer {
    0%   { box-shadow: 0 0 6px rgba(168,212,245,0.15); }
    50%  { box-shadow: 0 0 18px rgba(168,212,245,0.35); }
    100% { box-shadow: 0 0 6px rgba(168,212,245,0.15); }
  }

  .fade-up  { animation: fadeUp 0.35s ease forwards; }
  .slide-in { animation: slideIn 0.3s ease forwards; }

  /* Inputs */
  .sar-input {
    width: 100%; background: var(--obs-3); border: 1px solid rgba(168,212,245,0.12);
    border-radius: 5px; padding: 10px 14px; color: var(--white); font-size: 13px;
    font-family: 'Inter', sans-serif; transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .sar-input:focus {
    border-color: var(--ice-glow);
    box-shadow: 0 0 0 3px rgba(168,212,245,0.08), 0 0 12px rgba(126,200,240,0.12);
  }
  .sar-input::placeholder { color: var(--muted); }
  .sar-input option { background: var(--obs-3); }

  /* Buttons */
  .btn-primary {
    background: var(--ice-glow); color: #080A0E; font-weight: 700;
    font-size: 12px; letter-spacing: 0.07em; text-transform: uppercase;
    border: none; border-radius: 5px; padding: 10px 20px;
    cursor: pointer; transition: all 0.2s; font-family: 'Space Grotesk', sans-serif;
  }
  .btn-primary:hover {
    background: var(--ice-bright);
    box-shadow: 0 4px 24px rgba(168,212,245,0.30);
    transform: translateY(-1px);
  }
  .btn-primary:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

  .btn-ghost {
    background: transparent; color: var(--muted2); font-weight: 600;
    font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
    border: 1px solid rgba(168,212,245,0.14); border-radius: 5px; padding: 8px 14px;
    cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
  }
  .btn-ghost:hover { color: var(--ice); border-color: rgba(168,212,245,0.35); }

  /* Card */
  .card {
    background: var(--obs-2); border: 1px solid var(--border2);
    border-radius: 10px; overflow: hidden;
  }
  .card-header {
    padding: 13px 18px; border-bottom: 1px solid var(--border2);
    background: rgba(255,255,255,0.018);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-header-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.13em;
    text-transform: uppercase; color: var(--muted2);
    font-family: 'Space Grotesk', sans-serif;
  }

  /* Risk badge */
  .risk-badge {
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 3px 8px; border-radius: 4px;
    display: inline-flex; align-items: center; gap: 5px;
    font-family: 'Space Grotesk', sans-serif;
  }

  /* Policy snippet */
  .policy-snippet {
    background: var(--obs); border-left: 2px solid var(--ice-glow);
    padding: 10px 14px; border-radius: 0 5px 5px 0;
    font-size: 11px; color: #6A8FAE; line-height: 1.75;
    font-family: 'JetBrains Mono', monospace; margin-top: 8px;
    animation: fadeUp 0.25s ease;
  }

  /* Narrative textarea */
  .nar-textarea {
    width: 100%; background: transparent; border: 1px solid transparent;
    color: #8AA4BE; font-size: 13px; line-height: 1.8;
    font-family: 'Inter', sans-serif; resize: vertical;
    min-height: 80px; padding: 8px 12px; border-radius: 5px;
    outline: none; transition: all 0.2s;
  }
  .nar-textarea:hover { border-color: rgba(168,212,245,0.14); background: rgba(255,255,255,0.018); }
  .nar-textarea:focus { border-color: var(--ice-glow); background: rgba(168,212,245,0.03); }

  /* Sidebar nav item */
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 6px; font-size: 13px;
    font-weight: 500; cursor: pointer; transition: all 0.15s;
    color: var(--muted2); border: 1px solid transparent;
    text-decoration: none; font-family: 'Inter', sans-serif;
  }
  .nav-item.active {
    background: rgba(168,212,245,0.08); color: var(--ice);
    border-color: rgba(168,212,245,0.18);
    animation: iceShimmer 3s ease-in-out infinite;
  }
  .nav-item:hover:not(.active) { background: rgba(255,255,255,0.04); color: var(--white); }

  /* Progress bar */
  .progress-track { height: 2px; background: var(--obs-5); border-radius: 2px; overflow: hidden; }
  .progress-fill  { height: 100%; border-radius: 2px; transition: width 1.1s ease; }

  /* Toggle */
  .toggle-wrap { display:flex; background:var(--obs-3); border-radius:6px; padding:3px; border:1px solid var(--border2); }
  .toggle-btn {
    flex:1; padding:8px 0; font-size:11px; font-weight:700; letter-spacing:0.08em;
    text-transform:uppercase; border:none; border-radius:4px; cursor:pointer;
    transition:all 0.2s; font-family:'Space Grotesk',sans-serif;
  }
  .toggle-btn.on  { background: var(--ice-glow); color: #080A0E; }
  .toggle-btn.off { background:transparent; color:var(--muted2); }
  .toggle-btn.off:hover { color: var(--white); }

  /* Tx row */
  .tx-row {
    display:flex; align-items:center; gap:8px;
    background:var(--obs-3); border:1px solid var(--border2);
    border-radius:6px; padding:10px 12px; transition: border-color 0.2s;
  }
  .tx-row:hover { border-color: rgba(168,212,245,0.18); }
  .tx-input {
    background:var(--obs-2); border:1px solid rgba(168,212,245,0.10);
    border-radius:4px; padding:6px 10px; color:var(--white);
    font-size:12px; font-family:'Inter',sans-serif; outline:none;
    transition: border-color 0.2s;
  }
  .tx-input:focus { border-color: var(--ice-glow); }
  .tx-input::placeholder { color: var(--muted); }

  /* Details/summary */
  details > summary { list-style: none; }
  details > summary::-webkit-details-marker { display: none; }

  /* Auth dot grid */
  .dot-grid {
    background-image: radial-gradient(circle, rgba(168,212,245,0.14) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  /* Pulse dot */
  .pulse-dot::after {
    content:''; position:absolute; inset:0; border-radius:50%;
    background: inherit; animation: ping 1.6s ease-out infinite;
  }
`;

// ============================================================
// ICONS (inline SVG components)
// ============================================================
const Icon = ({ d, size = 16, stroke = 'currentColor', fill = 'none', sw = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const Icons = {
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  file: ['M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  search: ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0'],
  trash: ['M3 6h18', 'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2'],
  plus: 'M12 5v14M5 12h14',
  logout: ['M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  chevron: 'M9 18l6-6-6-6',
  lock: ['M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z', 'M7 11V7a5 5 0 0110 0v4'],
  user: ['M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', 'M12 3a4 4 0 100 8 4 4 0 000-8z'],
  clock: ['M12 2a10 10 0 100 20A10 10 0 0012 2z', 'M12 6v6l4 2'],
  eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 9a3 3 0 100 6 3 3 0 000-6z'],
};

// ============================================================
// AUTH SCREEN
// ============================================================
function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) { alert('Account provisioned. Please log in.'); setIsLogin(true); }
    else { onLogin(); }
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ display: 'flex', height: '100vh', background: 'var(--obs)', overflow: 'hidden' }}>
        
        {/* LEFT — Brand panel */}
        <div style={{ width: '45%', background: 'var(--obs-2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', position: 'relative', overflow: 'hidden' }} className="noise dot-grid">
          
          {/* Glow orbs */}
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 320, height: 320, background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 280, height: 280, background: 'radial-gradient(circle, rgba(224,85,85,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 64 }}>
              <div style={{ width: 36, height: 36, background: 'var(--ice-glow)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon d={Icons.shield} size={18} stroke="var(--obs)" sw={2.5} />
              </div>
              <div>
                <div className="syne" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.15em', color: 'var(--white)' }}>BARCLAYS</div>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--ice-glow)', textTransform: 'uppercase', fontWeight: 600 }}>Compliance Engine</div>
              </div>
            </div>

            <h1 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.2, color: 'var(--white)', marginBottom: 16 }}>
              Next-Gen<br />
              <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, var(--ice-glow), #E8B84D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Financial Crime
              </span><br />
              Intelligence
            </h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 340 }}>
              Automate SAR generation, map transaction ledgers to Barclays Financial Crime Policy, and detect multi-pillar violations in seconds.
            </p>
          </div>

          {/* Stats */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="glow-line" style={{ marginBottom: 24 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              {[['98.7%', 'Detection Rate'], ['< 2s', 'Analysis Time'], ['Multi-Pillar', 'Risk Mapping']].map(([val, label]) => (
                <div key={label}>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 500, color: 'var(--ice-glow)', marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
              {['AES-256 Encrypted', 'SOC 2 Type II', 'GDPR Compliant'].map(tag => (
                <span key={tag} style={{ fontSize: 9, padding: '4px 8px', background: 'rgba(168,212,245,0.06)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: 3, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: 'var(--obs)' }}>
          <div style={{ width: '100%', maxWidth: 400, opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease' }}>
            
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                {isLogin ? 'Secure Access' : 'Create Account'}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                {isLogin ? 'Authenticate to access the SAR command centre.' : 'Provision your compliance workspace.'}
              </p>
            </div>

            {/* Toggle */}
            <div className="toggle-wrap" style={{ marginBottom: 28 }}>
              <button className={`toggle-btn ${isLogin ? 'on' : 'off'}`} onClick={() => setIsLogin(true)}>Log In</button>
              <button className={`toggle-btn ${!isLogin ? 'on' : 'off'}`} onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {!isLogin && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Clearance Role</label>
                    <select className="sar-input">
                      <option>Analyst</option>
                      <option>Investigator</option>
                      <option>Compliance Head</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Full Name</label>
                    <input required type="text" placeholder="Full name" className="sar-input" />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Corporate Email</label>
                <input required type="email" placeholder="name@barclays.com" className="sar-input" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Password</label>
                  {isLogin && <a href="#" style={{ fontSize: 11, color: 'var(--ice-glow)', textDecoration: 'none' }}>Forgot?</a>}
                </div>
                <input required type="password" placeholder="••••••••••" className="sar-input" />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: '13px 0', fontSize: 13 }}>
                {isLogin ? '→ Authenticate' : '→ Create Workspace'}
              </button>
            </form>

            <p style={{ fontSize: 10, color: '#3A5470', lineHeight: 1.8, textAlign: 'center', marginTop: 28 }}>
              By accessing this system, you agree to the Barclays Financial Crime Policy. All activity is monitored for audit purposes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ onLogout }) {
  return (
    <aside style={{ width: 220, background: 'var(--obs-2)', borderRight: '1px solid var(--border2)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      
      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--border2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, background: 'var(--ice-glow)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon d={Icons.shield} size={15} stroke="var(--obs)" sw={2.5} />
          </div>
          <div>
            <div className="syne" style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', color: 'var(--white)' }}>BARCLAYS</div>
            <div style={{ fontSize: 8, letterSpacing: '0.16em', color: 'var(--ice-glow)', textTransform: 'uppercase', fontWeight: 600 }}>SAR Engine v2</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2A4A6A', padding: '6px 8px', marginBottom: 4 }}>Modules</div>
        {[
          { icon: Icons.file, label: 'Active Investigations', active: true },
          { icon: Icons.alert, label: 'Alert Queue' },
          { icon: Icons.search, label: 'Entity Lookup' },
          { icon: Icons.clock, label: 'Audit Trail' },
        ].map(({ icon, label, active }) => (
          <a key={label} href="#" className={`nav-item ${active ? 'active' : ''}`}>
            <Icon d={icon} size={15} stroke="currentColor" sw={2} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      {/* User + logout */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid var(--border2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--obs-4)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon d={Icons.user} size={13} stroke="var(--muted)" sw={2} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--white)' }}>Analyst</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>name@barclays.com</div>
          </div>
        </div>
        <button className="nav-item" onClick={onLogout} style={{ width: '100%', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 12 }}>
          <Icon d={Icons.logout} size={14} stroke="currentColor" sw={2} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ============================================================
// RISK BADGE
// ============================================================
function RiskBadge({ rating }) {
  const isCritical = rating.includes('CRITICAL');
  const isHigh = rating.includes('HIGH');
  const color = isCritical ? 'var(--red)' : isHigh ? '#F59E0B' : '#22C55E';
  const bg = isCritical ? 'rgba(224,85,85,0.1)' : isHigh ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';
  return (
    <span className="risk-badge" style={{ background: bg, border: `1px solid ${color}30`, color }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, position: 'relative', flexShrink: 0 }} className="pulse-dot" />
      {rating}
    </span>
  );
}

// ============================================================
// LOADING OVERLAY
// ============================================================
function LoadingState() {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <div style={{ width: 48, height: 48, border: '2px solid var(--obs-4)', borderTop: "2px solid var(--ice-glow)", borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ice-glow)', textAlign: 'center', marginBottom: 6 }}>
          Running Multi-Pillar AI Models{'.'.repeat(dots)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>Mapping transactions to Barclays Financial Crime Policy</div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION HEADER
// ============================================================
function SectionHeader({ label, children }) {
  return (
    <div className="card-header">
      <span className="card-header-label">{label}</span>
      {children}
    </div>
  );
}

// ============================================================
// CASE INTAKE FORM
// ============================================================
function CaseIntakeForm({ alertInput, onInputChange, onTxChange, onAddTx, onRemoveTx }) {
  return (
    <div className="card fade-up" style={{ flex: 1 }}>
      <SectionHeader label="Case Intake">
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>Configure alert & build transaction ledger</span>
      </SectionHeader>
      <div style={{ padding: 24 }}>
        
        {/* Grid: Name + Alert ID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Subject Name</label>
            <input type="text" name="customer_name" value={alertInput.customer_name} onChange={onInputChange} className="sar-input" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Alert ID</label>
            <input type="text" name="alert_id" value={alertInput.alert_id} onChange={onInputChange} className="sar-input mono" />
          </div>
        </div>

        {/* Risk Rating */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Risk Rating</label>
          <select name="risk_rating" value={alertInput.risk_rating} onChange={onInputChange} className="sar-input">
            <option value="LOW RISK">Low Risk</option>
            <option value="MEDIUM RISK">Medium Risk</option>
            <option value="HIGH RISK">High Risk</option>
            <option value="CRITICAL RISK">Critical Risk</option>
          </select>
        </div>

        {/* Trigger Event */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>Trigger Event Summary</label>
          <textarea name="trigger_event" value={alertInput.trigger_event} onChange={onInputChange} className="sar-input" style={{ resize: 'none', height: 72 }} />
        </div>

        {/* Transaction Builder */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Transaction Ledger</label>
            <button onClick={onAddTx} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon d={Icons.plus} size={12} stroke="currentColor" sw={2.5} />
              Add Row
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alertInput.transactions.map((tx, index) => (
              <div key={index} className="tx-row">
                <input type="date" value={tx.date} onChange={e => onTxChange(index, 'date', e.target.value)} className="tx-input" style={{ width: 130 }} />
                <input type="text" placeholder="Type (e.g. Wire)" value={tx.type} onChange={e => onTxChange(index, 'type', e.target.value)} className="tx-input" style={{ width: '20%' }} />
                <input type="text" placeholder="Destination / Origin" value={tx.destination_origin} onChange={e => onTxChange(index, 'destination_origin', e.target.value)} className="tx-input" style={{ flex: 1 }} />
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 12 }}>$</span>
                  <input type="number" placeholder="0" value={tx.amount} onChange={e => onTxChange(index, 'amount', e.target.value)} className="tx-input mono" style={{ width: 110, paddingLeft: 20, textAlign: 'right' }} />
                </div>
                <button onClick={() => onRemoveTx(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '2px 4px', borderRadius: 3, transition: 'color 0.15s' }} onMouseEnter={e => e.target.style.color = 'var(--red)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
                  <Icon d={Icons.trash} size={14} stroke="currentColor" sw={2} />
                </button>
              </div>
            ))}
            {alertInput.transactions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '28px 0', border: '1px dashed var(--border)', borderRadius: 6, color: 'var(--muted)', fontSize: 12 }}>
                No transactions added yet. Click "Add Row" to build the ledger.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RISK BREAKDOWN CARD
// ============================================================
function RiskBreakdown({ riskBreakdown }) {
  const [active, setActive] = useState(null);
  const explanations = {
    "OFAC/OFSI Sanctions List Match": "Beneficiary strictly matches HM Treasury (OFSI) and US Treasury (OFAC) consolidated watchlists.",
    "Politically Exposed Person (PEP) Connection": "Recipient identified as a Foreign Public Official, triggering Anti-Bribery & Corruption protocols.",
    "High-Risk Third Country (AML)": "Funds routed through non-cooperative jurisdictions matching FATF/UK watchlists.",
    "Opaque Offshore Trust Routing (ATEF)": "Complex offshore corporate structures indicative of deliberate tax evasion facilitation."
  };

  return (
    <div className="card fade-up" style={{ borderLeft: '3px solid var(--red)' }}>
      <SectionHeader label="Multi-Pillar Risk Breakdown" />
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--red)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>98%</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Risk Score</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 9, padding: '3px 8px', background: 'rgba(224,85,85,0.1)', border: '1px solid rgba(224,85,85,0.2)', borderRadius: 3, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>CRITICAL</span>
          <span style={{ fontSize: 9, padding: '3px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border2)', borderRadius: 3, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>THRESHOLD: 75%</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {riskBreakdown?.map((risk, idx) => (
            <div key={idx} onClick={() => setActive(active === idx ? null : idx)} style={{ padding: '8px 10px', borderRadius: 5, cursor: 'pointer', background: active === idx ? 'rgba(212,168,67,0.05)' : 'transparent', border: `1px solid ${active === idx ? 'rgba(212,168,67,0.15)' : 'transparent'}`, transition: 'all 0.15s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: active === idx ? 8 : 0 }}>
                <span style={{ fontSize: 12, color: 'var(--white)', borderBottom: '1px dashed rgba(110,140,170,0.4)', paddingBottom: 1 }}>{risk.factor}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)' }}>+{risk.contribution_percentage}%</span>
              </div>
              {active === idx && (
                <div style={{ fontSize: 11, color: '#7A9AB8', lineHeight: 1.7, borderLeft: '2px solid var(--ice-glow)', paddingLeft: 10, animation: 'fadeUp 0.2s ease' }}>
                  {explanations[risk.factor] || 'Pattern identified via behavioral baseline deviation.'}
                </div>
              )}
              {/* Progress bar */}
              <div className="progress-track" style={{ marginTop: active === idx ? 8 : 4 }}>
                <div className="progress-fill" style={{ width: `${risk.contribution_percentage}%`, background: 'linear-gradient(90deg, var(--red-dim), var(--red))' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RECOMMENDATION CARD
// ============================================================
function RecommendationCard({ recommendation }) {
  return (
    <div className="card fade-up" style={{ background: 'linear-gradient(135deg, #08101C 0%, #0E1A28 100%)', border: '1px solid rgba(224,85,85,0.25)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(224,85,85,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <SectionHeader label="System Recommendation">
        <Icon d={Icons.alert} size={14} stroke="var(--red)" sw={2} />
      </SectionHeader>
      <div style={{ padding: '20px 18px', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--white)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 14 }}>
          {recommendation?.action}
        </div>
        <p style={{ fontSize: 12, color: '#A8C8E0', lineHeight: 1.75, borderLeft: '2px solid var(--red)', paddingLeft: 12 }}>
          {recommendation?.reasoning}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// SAR NARRATIVE WORKSPACE
// ============================================================
function NarrativeWorkspace({ narrative }) {
  const [showTrace, setShowTrace] = useState(false);
  const sections = [
    { key: 'background', label: 'Background' },
    { key: 'timeline', label: 'Transaction Timeline' },
    { key: 'indicators', label: 'Suspicion Indicators' },
    { key: 'conclusion', label: 'Conclusion' },
  ];

  return (
    <div className="card fade-up" style={{ flex: 1 }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, var(--obs-3), var(--obs-2))', borderBottom: '1px solid var(--border)' }}>
        <span className="card-header-label" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--white)' }}>
          <Icon d={Icons.zap} size={14} stroke="var(--ice-glow)" sw={2} />
          Structured SAR Narrative
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>AI-generated · Editable</span>
      </div>
      <div style={{ padding: '8px 0' }}>
        {sections.map((sec, i) => (
          <details key={sec.key} open style={{ borderBottom: '1px solid var(--border2)' }}>
            <summary style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ fontSize: 10, color: 'var(--ice-glow)', fontWeight: 700 }}>0{i + 1}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', flex: 1 }}>{sec.label}</span>
              {sec.key === 'indicators' && (
                <button onClick={e => { e.preventDefault(); setShowTrace(!showTrace); }} style={{ fontSize: 10, padding: '3px 10px', background: showTrace ? 'rgba(168,212,245,0.08)' : 'transparent', border: '1px solid rgba(168,212,245,0.16)', borderRadius: 3, color: 'var(--ice-glow)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
                  {showTrace ? 'Hide' : 'Show'} Trace Evidence
                </button>
              )}
            </summary>
            <div style={{ padding: '0 18px 12px' }}>
              <textarea className="nar-textarea" defaultValue={narrative?.[sec.key]} style={{ width: '100%' }} />
              {sec.key === 'indicators' && showTrace && (
                <div style={{ marginTop: 12, background: 'var(--obs-3)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: 6, padding: 16, animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ice-glow)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon d={Icons.search} size={12} stroke="var(--ice-glow)" sw={2} />
                    AI Traceability Evidence
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { title: 'Supporting Transactions', content: <><div className="mono" style={{ color: 'var(--red)', fontSize: 12, fontWeight: 600 }}>TX-9982-B & TX-9983-C</div><div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Targeted entities identified.</div></> },
                      { title: 'Risk Drivers', content: [['Sanctions Match', '40%'], ['PEP (ABC)', '25%'], ['Offshore (ATEF)', '15%']].map(([l, v]) => (<div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}><span style={{ color: 'var(--muted)' }}>{l}</span><span style={{ color: 'var(--red)', fontWeight: 700 }}>{v}</span></div>)) },
                      { title: 'Policy Reference', content: <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.7 }}>UK Bribery Act (PEP), UK Criminal Finances Act (ATEF), and OFAC Sanctions — immediate escalation required.</div> }
                    ].map(block => (
                      <div key={block.title} style={{ background: 'var(--obs-2)', border: '1px solid var(--border2)', borderRadius: 5, padding: 12 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>{block.title}</div>
                        {block.content}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// POLICY MAPPING CARD
// ============================================================
function PolicyMapping({ findings }) {
  const [activeSnippet, setActiveSnippet] = useState(null);
  return (
    <div className="card fade-up">
      <SectionHeader label="Global Policy Mapping" />
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {findings?.map((finding, idx) => (
          <div key={idx} style={{ background: 'var(--obs-3)', border: '1px solid var(--border2)', borderRadius: 6, padding: 14, transition: 'border-color 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--white)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{finding.rule}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', paddingLeft: 14, marginBottom: 10, lineHeight: 1.6 }}>{finding.detail}</p>
            <div style={{ paddingLeft: 14 }}>
              <button onClick={() => setActiveSnippet(activeSnippet === idx ? null : idx)} style={{ fontSize: 10, padding: '4px 10px', background: 'rgba(168,212,245,0.06)', border: '1px solid rgba(168,212,245,0.16)', borderRadius: 3, color: 'var(--ice-glow)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', transition: 'all 0.15s', letterSpacing: '0.04em' }}>
                ↳ {finding.policy}
              </button>
            </div>
            {activeSnippet === idx && (
              <div className="policy-snippet">{finding.policy_snippet}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// AUDIT TIMELINE CARD
// ============================================================
function AuditTimeline({ logs }) {
  return (
    <div className="card fade-up">
      <SectionHeader label="Investigation Timeline">
        <Icon d={Icons.clock} size={14} stroke="var(--muted)" sw={2} />
      </SectionHeader>
      <div style={{ padding: '20px 18px', overflowY: 'auto', maxHeight: 300 }}>
        <div style={{ position: 'relative', borderLeft: '1px solid var(--border)', paddingLeft: 20 }}>
          {logs?.map((log, idx) => (
            <div key={idx} style={{ marginBottom: 20, position: 'relative', animation: `fadeUp 0.4s ${idx * 0.08}s ease both` }}>
              <div style={{ position: 'absolute', left: -24, top: 2, width: 8, height: 8, borderRadius: '50%', background: 'var(--ice-glow)', boxShadow: '0 0 8px rgba(212,168,67,0.5)' }} />
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3 }}>{new Date(log.timestamp).toLocaleTimeString()}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', marginBottom: 3 }}>{log.action}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>{log.details}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

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

  const processAlert = async () => {
    setLoading(true);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlertInput(prev => ({ ...prev, [name]: value }));
  };

  const handleTxChange = (index, field, value) => {
    const newTx = [...alertInput.transactions];
    newTx[index][field] = field === 'amount' ? Number(value) : value;
    setAlertInput({ ...alertInput, transactions: newTx });
  };

  const addTransaction = () => {
    setAlertInput({
      ...alertInput,
      transactions: [...alertInput.transactions, { date: "2026-02-14", type: "", amount: 0, destination_origin: "", tx_id: `TX-${Math.floor(1000 + Math.random() * 9000)}-X` }]
    });
  };

  const removeTransaction = (index) => {
    const newTx = [...alertInput.transactions];
    newTx.splice(index, 1);
    setAlertInput({ ...alertInput, transactions: newTx });
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const totalAmount = alertInput.transactions.reduce((s, tx) => s + Number(tx.amount), 0);

  return (
    <>
      <style>{styles}</style>
      <div style={{ display: 'flex', height: '100vh', background: 'var(--obs)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
        
        <Sidebar onLogout={() => setIsAuthenticated(false)} />

        {/* MAIN */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* TOP BAR */}
          <header style={{ background: 'var(--obs-2)', borderBottom: '1px solid var(--border2)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(168,212,245,0.16)', borderRadius: 3, color: 'var(--ice-glow)', letterSpacing: '0.1em' }}>CASE REF</span>
                <h1 className="mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--white)' }}>{alertInput.alert_id}</h1>
                <RiskBadge rating={alertInput.risk_rating} />
              </div>
              <p style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Multi-Pillar Automated Alert Review</p>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {reportData && (
                <button onClick={() => setReportData(null)} className="btn-ghost">
                  ← Back to Intake
                </button>
              )}
              <button onClick={processAlert} disabled={loading || alertInput.transactions.length === 0} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px' }}>
                <Icon d={Icons.zap} size={14} stroke="var(--obs)" sw={2.5} fill="none" />
                {loading ? 'Executing...' : 'Run AI SAR'}
              </button>
            </div>
          </header>

          {/* CONTENT */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, maxWidth: 1600, margin: '0 auto' }}>
              
              {/* LEFT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {/* Entity Profile */}
                <div className="card">
                  <SectionHeader label="Entity Profile">
                    <RiskBadge rating={alertInput.risk_rating} />
                  </SectionHeader>
                  <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 5 }}>Subject</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)' }}>{alertInput.customer_name}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 5 }}>Trigger Event</div>
                      <div style={{ fontSize: 12, color: '#8BA8C4', lineHeight: 1.7 }}>{alertInput.trigger_event}</div>
                    </div>
                  </div>
                </div>

                {/* Transaction Ledger */}
                <div className="card" style={{ flex: 1 }}>
                  <SectionHeader label="Transaction Ledger">
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>${totalAmount.toLocaleString()}</span>
                  </SectionHeader>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border2)' }}>
                          {['Details', 'Amount'].map(h => (
                            <th key={h} style={{ padding: '8px 14px', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: h === 'Amount' ? 'right' : 'left' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {alertInput.transactions.map((tx, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border2)', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={{ padding: '12px 14px' }}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--white)', marginBottom: 2 }}>{tx.type || 'New Transaction'}</div>
                              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{tx.destination_origin || '—'}</div>
                              <div className="mono" style={{ fontSize: 10, color: '#3A5470', marginTop: 2 }}>{tx.tx_id}</div>
                            </td>
                            <td className="mono" style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: 'var(--white)', textAlign: 'right', verticalAlign: 'top' }}>
                              ${Number(tx.amount).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                
                {loading && <LoadingState />}

                {!reportData && !loading && (
                  <CaseIntakeForm
                    alertInput={alertInput}
                    onInputChange={handleInputChange}
                    onTxChange={handleTxChange}
                    onAddTx={addTransaction}
                    onRemoveTx={removeTransaction}
                  />
                )}

                {reportData && !loading && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <RiskBreakdown riskBreakdown={reportData.ai_analysis?.risk_breakdown} />
                      <RecommendationCard recommendation={reportData.ai_analysis?.recommendation} />
                    </div>
                    <NarrativeWorkspace narrative={reportData.ai_analysis?.narrative} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <PolicyMapping findings={reportData.ai_analysis?.findings} />
                      <AuditTimeline logs={reportData.audit_logs} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
