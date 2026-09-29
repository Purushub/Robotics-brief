/**
 * CCIS ROBOTICS LAB EVALUATION - APPLICATION LOGIC
 * Clean, Simple, Reliable Logic for Director's Portal
 */

document.addEventListener('DOMContentLoaded', () => {
  initMainTabs();
  initCompanySubtabs();
  initCalculator();
  initPrintButton();
});

// Format numbers into Indian Lakhs or plain INR
function formatINR(val) {
  if (isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}

function formatLakhs(val) {
  if (isNaN(val)) return '₹0';
  const inLakhs = (val / 100000).toFixed(2);
  return `₹${inLakhs} Lakhs`;
}

// 1. MAIN TAB SWITCHING
function initMainTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        window.scrollTo({ top: 160, behavior: 'smooth' });
      }
    });
  });
}

// Helper to switch main tab and subtab
function switchTab(mainTabId, subTabId) {
  const mainBtn = document.querySelector(`.tab-btn[data-tab="${mainTabId}"]`);
  if (mainBtn) mainBtn.click();

  if (subTabId) {
    setTimeout(() => {
      const subBtn = document.querySelector(`.selector-btn[data-subtab="${subTabId}"]`);
      if (subBtn) subBtn.click();
    }, 80);
  }
}

// 2. COMPANY DEEP-DIVE SUBTABS
function initCompanySubtabs() {
  const selectorButtons = document.querySelectorAll('.selector-btn');
  const subPanels = document.querySelectorAll('.subtab-content');

  selectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSub = btn.getAttribute('data-subtab');

      selectorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      subPanels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(targetSub);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// 3. FINANCIAL CALCULATOR
function initCalculator() {
  const studentSlider = document.getElementById('studentSlider');
  const feeSlider = document.getElementById('feeSlider');
  const shareSlider = document.getElementById('shareSlider');
  const monthRadios = document.querySelectorAll('input[name="months"]');

  const studentVal = document.getElementById('studentVal');
  const feeVal = document.getElementById('feeVal');
  const shareVal = document.getElementById('shareVal');

  const projGross = document.getElementById('projGross');
  const projGrossSub = document.getElementById('projGrossSub');
  const projSchoolNet = document.getElementById('projSchoolNet');
  const projSchoolSub = document.getElementById('projSchoolSub');
  const projPartner = document.getElementById('projPartner');
  const proj2Year = document.getElementById('proj2Year');
  const compStudentCount = document.getElementById('compStudentCount');
  const uwrNetLabel = document.getElementById('uwrNetLabel');
  const rflCostLabel = document.getElementById('rflCostLabel');

  if (!studentSlider) return;

  function calculate() {
    const students = parseInt(studentSlider.value, 10);
    const monthlyFee = parseInt(feeSlider.value, 10);
    const schoolSharePct = parseInt(shareSlider.value, 10) / 100;
    const partnerSharePct = 1 - schoolSharePct;

    let months = 10;
    monthRadios.forEach(r => {
      if (r.checked) months = parseInt(r.value, 10);
    });

    // Update slider badges
    studentVal.textContent = `${students} Students`;
    feeVal.textContent = `₹${monthlyFee.toLocaleString('en-IN')} / month`;
    shareVal.textContent = `${Math.round(schoolSharePct * 100)}% School / ${Math.round(partnerSharePct * 100)}% Partner`;

    // Calculate figures
    const annualPerStudent = monthlyFee * months;
    const grossRevenue = students * annualPerStudent;
    const schoolNetAnnual = grossRevenue * schoolSharePct;
    const partnerAnnual = grossRevenue * partnerSharePct;
    const twoYearContractProfit = schoolNetAnnual * 2;

    // Display figures
    projGross.textContent = formatINR(grossRevenue);
    projGrossSub.textContent = `${students} students × ₹${annualPerStudent.toLocaleString('en-IN')}/year (${months} months)`;

    projSchoolNet.textContent = formatINR(schoolNetAnnual);
    projSchoolSub.textContent = `${Math.round(schoolSharePct * 100)}% retained by CCIS (${formatLakhs(schoolNetAnnual)} / yr)`;

    projPartner.textContent = formatINR(partnerAnnual);
    proj2Year.textContent = formatINR(twoYearContractProfit);

    // Update comparison block
    compStudentCount.textContent = students;
    uwrNetLabel.textContent = `+${formatLakhs(schoolNetAnnual)} Profit to CCIS`;

    // Robofun Lab Mass AI comparison (₹199 per learner/year)
    const rflTotal = students * 199;
    rflCostLabel.textContent = `Total School Cost: ₹${rflTotal.toLocaleString('en-IN')} / yr`;
  }

  studentSlider.addEventListener('input', calculate);
  feeSlider.addEventListener('input', calculate);
  shareSlider.addEventListener('input', calculate);
  monthRadios.forEach(r => r.addEventListener('change', calculate));

  calculate();
}

// 4. PRINT / PDF EXPORT
function initPrintButton() {
  const printBtn = document.getElementById('printReportBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// 5. MODAL DATA & FUNCTIONS (Simple, factual language)
const collateralData = {
  uwr: {
    title: 'Unique World Robotics (UWR) — Discussion Notes & Excel Data',
    html: `
      <div style="font-size: 0.9rem; line-height: 1.6;">
        <h4 style="color: #059669; margin-bottom: 6px;">1. Who They Are & Their Presence</h4>
        <p><strong>CEO:</strong> Bansan Thomas George (International Robotics Competition Judge, NASA Space apps partner). Partner coordinator: Anu Kanth / Kartik.</p>
        <p><strong>Footprint:</strong> Founded in Dubai (2019), expanded to India in 2021. Active in <strong>26 schools across 6 states</strong> with <strong>62 trainers</strong>.</p>

        <h4 style="color: #059669; margin-top: 14px; margin-bottom: 6px;">2. The 50:50 Financial Breakdown (from their spreadsheet)</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 0.85rem;">
          <tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Item</th><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Value</th></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Target Students</td><td style="padding: 6px; border: 1px solid #cbd5e1;">850 Students (Grades 1 to 8)</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Monthly Fee Charged</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹2,250 per month</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Months Billed</td><td style="padding: 6px; border: 1px solid #cbd5e1;">10 Months / academic year</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Total Collected per Student</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹22,500 / year</td></tr>
          <tr style="background: #ecfdf5; font-weight: bold;"><td style="padding: 6px; border: 1px solid #cbd5e1;">Total Annual Collection</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹1,91,25,000 (1.91 Crores)</td></tr>
          <tr style="background: #d1fae5; font-weight: bold; color: #065f46;"><td style="padding: 6px; border: 1px solid #cbd5e1;">School Net Profit (50%)</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹95,62,500 / year</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">UWR Share (50%)</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹95,62,500 (covers all trainers, kits, 3D printers, maintenance)</td></tr>
        </table>

        <h4 style="color: #059669; margin-top: 14px; margin-bottom: 6px;">3. NASA Space Apps Hackathon (Free in Jaipur)</h4>
        <p>They are hosting a free hackathon in Jaipur on <strong>November 14</strong>. We can send our Cambridge Court students to participate for free to test their mentors before signing anything.</p>
      </div>
    `
  },
  rfl: {
    title: 'Robofun Lab (Ashwin Shah) — Proposal Excerpts (Dated 11 Sept 2026)',
    html: `
      <div style="font-size: 0.9rem; line-height: 1.6;">
        <h4 style="color: #2563eb; margin-bottom: 6px;">1. Company Pedigree & Leadership</h4>
        <p><strong>Cofounder & CEO:</strong> Ashwin Shah. Founded in 2016. Trained 30,000+ school students.</p>
        <p><strong>Achievements:</strong> First Indian team to win the FIRST Impact Award. Teams reached FIRST World Championship in Houston. Alumni studying at Caltech, Carnegie Mellon, NYU, and Purdue.</p>

        <h4 style="color: #2563eb; margin-top: 14px; margin-bottom: 6px;">2. The 4 Commercial Proposals They Submitted to CCIS</h4>
        <ul style="padding-left: 18px;">
          <li><strong>Proposal A — Personal Inventions (Grades 9–12):</strong> ₹600/hr mentoring (min 50 hours = ₹30k/project). Kids build real patents & inventions.</li>
          <li><strong>Proposal B — FIRST Tech Challenge (FTC) Pilot:</strong> ₹1,25,000 coaching fee per student + ₹95,000 team registration split among 10–12 students.</li>
          <li><strong>Proposal C — School of AI with Computational Thinking:</strong> ₹199 per learner per year (online LMS) or ₹499 with physical book. Covers Grades 3 to 8 (90 total sessions).</li>
          <li><strong>Proposal D — Robotics as a Service (RaaS):</strong> 3-year term for Grades 1 to 8 with progressive hardware (LEGO to ESP32 IoT).</li>
        </ul>

        <h4 style="color: #2563eb; margin-top: 14px; margin-bottom: 6px;">3. Proof in Jaipur (JPIS School)</h4>
        <p>They already run classes at Jayshree Periwal International School (JPIS) in Jaipur. Their students created pressure-balancing flight earplugs (IRIS National Fair) and biometric vehicle security.</p>
      </div>
    `
  },
  myequation: {
    title: 'My Equation (Tech Analogy) — Proposal & Meeting Dialogue',
    html: `
      <div style="font-size: 0.9rem; line-height: 1.6;">
        <h4 style="color: #7c3aed; margin-bottom: 6px;">1. Commercial Quotation for Cambridge Court High School</h4>
        <ul style="padding-left: 18px;">
          <li><strong>Target Batch:</strong> 80 Students in Grades 8 to 10 (Ages 13 to 16).</li>
          <li><strong>Training Fee:</strong> ₹7,500 per student = ₹6,00,000 + 18% GST (₹1,08,000) = <strong>₹7,08,000 Total</strong>.</li>
          <li><strong>Hardware Handover:</strong> 16 to 18 sets worth <strong>₹10–12 Lakhs</strong> handed over permanently to our school at the end of the course.</li>
        </ul>

        <h4 style="color: #7c3aed; margin-top: 14px; margin-bottom: 6px;">2. Key Conversation Dialogue (from Meeting Transcript)</h4>
        <div style="background: #f8fafc; border-left: 3px solid #7c3aed; padding: 10px; font-size: 0.85rem; margin-top: 6px;">
          <p><strong>Puru Soni:</strong> <em>"We have three branches currently, but we want the lab setup in our newest branch as of now... total between 5,000 to 10,000 students across branches, mix of CBSE and IB..."</em></p>
          <p style="margin-top: 6px;"><strong>Ratik Gupta:</strong> <em>"For you, we'll be giving a tailored program in a closed environment for Cambridge Court International School, Jaipur. It includes a 1-week faculty development program, an LMS with recorded class videos and attendance, and students assembling real operational robots."</em></p>
        </div>
      </div>
    `
  },
  cubotics: {
    title: 'Cubotics (Kunal Sadarangani) — LEGO Kit Quotation',
    html: `
      <div style="font-size: 0.9rem; line-height: 1.6;">
        <h4 style="color: #d97706; margin-bottom: 6px;">1. The Kit Bundle Quotation (Page 22 of their Proposal)</h4>
        <p>Quotation for a 40-student classroom (2 students per kit = 20 kits per level):</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 0.85rem;">
          <tr style="background: #f1f5f9;"><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Kit Level</th><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Grades</th><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Qty</th><th style="padding: 6px; border: 1px solid #cbd5e1; text-align: left;">Price</th></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Early Simple Machines (ESM)</td><td style="padding: 6px; border: 1px solid #cbd5e1;">Sr KG – 2nd</td><td style="padding: 6px; border: 1px solid #cbd5e1;">20</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹5,00,000</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">LEGO WeDo 2.0</td><td style="padding: 6px; border: 1px solid #cbd5e1;">3rd – 8th</td><td style="padding: 6px; border: 1px solid #cbd5e1;">20</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹7,00,000</td></tr>
          <tr><td style="padding: 6px; border: 1px solid #cbd5e1;">Simple & Powered Machines</td><td style="padding: 6px; border: 1px solid #cbd5e1;">3rd – 8th</td><td style="padding: 6px; border: 1px solid #cbd5e1;">20</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹5,00,000</td></tr>
          <tr style="background: #fef3c7; font-weight: bold;"><td colspan="3" style="padding: 6px; border: 1px solid #cbd5e1;">Total 60 Kits Purchase</td><td style="padding: 6px; border: 1px solid #cbd5e1;">₹17,00,000</td></tr>
        </table>

        <h4 style="color: #d97706; margin-top: 14px; margin-bottom: 6px;">2. Pedagogy & Curriculum</h4>
        <p>Aligned with NCF 2023 & NEP 2020. 32 lesson plans per grade. Scratch 3.0 for primary students, basic Python for secondary.</p>
      </div>
    `
  }
};

function openTranscriptModal(companyKey) {
  const modal = document.getElementById('collateralModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const data = collateralData[companyKey];
  if (data) {
    title.textContent = data.title;
    body.innerHTML = data.html;
    modal.classList.add('active');
  }
}

function closeTranscriptModal() {
  const modal = document.getElementById('collateralModal');
  modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('collateralModal');
  if (e.target === modal) {
    closeTranscriptModal();
  }
});
