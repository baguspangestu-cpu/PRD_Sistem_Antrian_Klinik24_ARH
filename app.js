/**
 * SISTEM INFORMASI PENDAFTARAN & PEMANGGILAN ANTRIAN PASIEN
 * KLINIK-24 ARIEF RAHMAN HAKIM, BANDAR LAMPUNG
 * Core State Management, Audio TTS Engine & View Controller
 */

// Storage Keys
const STORAGE_KEY_QUEUES = 'klinik24_queues_v1';
const STORAGE_KEY_CURRENT_CALL = 'klinik24_current_call_v1';
const STORAGE_KEY_ROLE = 'klinik24_active_role_v1';
const STORAGE_KEY_SELECTED_DOC = 'klinik24_selected_doc_v1';
const STORAGE_KEY_MY_TICKET_ID = 'klinik24_my_ticket_id_v1';
const STORAGE_KEY_AUDIO_MUTED = 'klinik24_audio_muted_v1';

// Poliklinik Registry
const POLIKLINIK_DATA = {
  POLI_UMUM: {
    id: 'POLI_UMUM',
    code: 'A',
    name: 'Poli Umum',
    room: 'Ruang Periksa 1 (Lantai 1)',
    doctor: 'dr. Andi Wijaya',
    doctorSip: 'SIP. 446/092/Dinkes.BL/2023',
    icon: 'stethoscope',
    desc: 'Pemeriksaan kesehatan umum, demam, flu, dan keluhan umum'
  },
  POLI_GIGI: {
    id: 'POLI_GIGI',
    code: 'B',
    name: 'Poli Gigi & Mulut',
    room: 'Ruang Periksa 2 (Lantai 1)',
    doctor: 'drg. Siti Nurhaliza',
    doctorSip: 'SIP. 446/115/Dinkes.BL/2024',
    icon: 'dentistry',
    desc: 'Penambalan, pencabutan, pembersihan karang, dan perawatan gigi'
  },
  POLI_ANAK: {
    id: 'POLI_ANAK',
    code: 'C',
    name: 'Poli Anak (Pediatri)',
    room: 'Ruang Periksa 3 (Lantai 2)',
    doctor: 'dr. Budi Santoso, Sp.A',
    doctorSip: 'SIP. 446/043/Dinkes.BL/2022',
    icon: 'child_care',
    desc: 'Konsultasi tumbuh kembang anak, imunisasi, dan pediatri'
  }
};

// Initial Seed Data
const DEFAULT_INITIAL_QUEUES = [
  {
    id: 'Q-1001',
    number: 'A-001',
    poliId: 'POLI_UMUM',
    patientName: 'Bapak Hendra Gunawan',
    patientPhone: '0812-7890-1122',
    nik: '1871021901840003',
    registeredAt: '08:15',
    status: 'Selesai', // Selesai
    calledAt: '08:30',
    servedAt: '08:35',
    completedAt: '08:50',
    emr: {
      symptoms: 'Demam tinggi 3 hari disertai batuk kering dan sakit tenggorokan.',
      diagnosis: 'Faringitis Akut & Febris Hari ke-3',
      prescriptions: [
        { name: 'Amoxicillin 500 mg', dosage: '3 x 1 tablet sehari', amount: '10 tablet', note: 'Habiskan, sesudah makan' },
        { name: 'Paracetamol 500 mg', dosage: '3 x 1 tablet jika demam', amount: '10 tablet', note: 'Bila perlu sesudah makan' },
        { name: 'Dextromethorphan Syr', dosage: '3 x 1 sendok takar (5ml)', amount: '1 botol', note: 'Sesudah makan' }
      ],
      notes: 'Banyak minum air putih hangat dan istirahat tirah baring 2 hari.'
    }
  },
  {
    id: 'Q-1002',
    number: 'B-001',
    poliId: 'POLI_GIGI',
    patientName: 'Ibu Ratna Dewi',
    patientPhone: '0821-3456-7890',
    nik: '1871054902880001',
    registeredAt: '08:25',
    status: 'Selesai',
    calledAt: '08:45',
    servedAt: '08:50',
    completedAt: '09:10',
    emr: {
      symptoms: 'Nyeri berdenyut pada gigi geraham bawah kanan sejak semalam.',
      diagnosis: 'Pulpitis Reversibel Gigi 46',
      prescriptions: [
        { name: 'Asam Mefenamat 500 mg', dosage: '3 x 1 kaplet sehari', amount: '10 kaplet', note: 'Sesudah makan, bila nyeri' },
        { name: 'Amoxicillin 500 mg', dosage: '3 x 1 kaplet sehari', amount: '15 kaplet', note: 'Habiskan' }
      ],
      notes: 'Jadwalkan penambalan tetap setelah nyeri mereda (3 hari lagi).'
    }
  },
  {
    id: 'Q-1003',
    number: 'A-002',
    poliId: 'POLI_UMUM',
    patientName: 'Ibu Melati Kusuma',
    patientPhone: '0853-9081-2244',
    nik: '1871036705910002',
    registeredAt: '08:35',
    status: 'Sedang Diperiksa', // Hadir (Sedang Diperiksa)
    calledAt: '09:00',
    servedAt: '09:05',
    emr: {
      symptoms: 'Nyeri ulu hati, mual kembung terutama setelah sarapan pedas.',
      diagnosis: 'Dispepsia Fungsional / Gastritis Ringan',
      prescriptions: [
        { name: 'Antasida Doen Suspensi', dosage: '3 x 1 sendok makan', amount: '1 botol', note: '1 jam sebelum makan kunyah/kocok' },
        { name: 'Omeprazole 20 mg', dosage: '2 x 1 kapsul sehari', amount: '10 kapsul', note: '30 menit sebelum makan' }
      ],
      notes: 'Hindari makanan pedas, kopi, dan makanan asam selama seminggu.'
    }
  },
  {
    id: 'Q-1004',
    number: 'C-001',
    poliId: 'POLI_ANAK',
    patientName: 'Ananda Farhan (Anak)',
    patientPhone: '0813-8822-1919',
    nik: '1871012904190001',
    registeredAt: '08:40',
    status: 'Dipanggil', // Sedang Dipanggil
    calledAt: '09:12',
    callCount: 1
  },
  {
    id: 'Q-1005',
    number: 'A-003',
    poliId: 'POLI_UMUM',
    patientName: 'Bapak Ahmad Fauzi',
    patientPhone: '0877-2233-4455',
    nik: '1871091508820005',
    registeredAt: '08:50',
    status: 'Menunggu'
  },
  {
    id: 'Q-1006',
    number: 'A-004',
    poliId: 'POLI_UMUM',
    patientName: 'Sdri. Rina Suryani',
    patientPhone: '0896-1122-3344',
    nik: '1871085203000004',
    registeredAt: '08:55',
    status: 'Menunggu'
  },
  {
    id: 'Q-1007',
    number: 'B-002',
    poliId: 'POLI_GIGI',
    patientName: 'Bapak Wahyu Prasetyo',
    patientPhone: '0812-9988-7766',
    nik: '1871031207860007',
    registeredAt: '09:00',
    status: 'Menunggu'
  },
  {
    id: 'Q-1008',
    number: 'C-002',
    poliId: 'POLI_ANAK',
    patientName: 'Balita Alifa (dr. Budi)',
    patientPhone: '0815-4433-2211',
    nik: '1871046101230002',
    registeredAt: '09:05',
    status: 'Menunggu'
  }
];

// App State Management
class AppState {
  constructor() {
    this.queues = this.loadQueues();
    this.currentCall = this.loadCurrentCall();
    this.currentRole = localStorage.getItem(STORAGE_KEY_ROLE) || 'asisten'; // default: asisten
    this.selectedDoctorPoli = localStorage.getItem(STORAGE_KEY_SELECTED_DOC) || 'POLI_UMUM';
    this.myTicketId = localStorage.getItem(STORAGE_KEY_MY_TICKET_ID) || 'Q-1005'; // default test ticket
    this.isMuted = localStorage.getItem(STORAGE_KEY_AUDIO_MUTED) === 'true';
    this.filterPoli = 'ALL';
    this.searchKeyword = '';
  }

  loadQueues() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_QUEUES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Gagal memuat antrian lokal:', e);
    }
    this.saveQueues(DEFAULT_INITIAL_QUEUES);
    return JSON.parse(JSON.stringify(DEFAULT_INITIAL_QUEUES));
  }

  saveQueues(data) {
    this.queues = data;
    try {
      localStorage.setItem(STORAGE_KEY_QUEUES, JSON.stringify(data));
    } catch (e) {
      console.error('Penyimpanan lokal penuh / gagal:', e);
    }
  }

  loadCurrentCall() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_CALL);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading call:', e);
    }
    // Cari dari data antrian yang statusnya 'Dipanggil'
    const called = DEFAULT_INITIAL_QUEUES.find(q => q.status === 'Dipanggil');
    return called || null;
  }

  saveCurrentCall(callItem) {
    this.currentCall = callItem;
    if (callItem) {
      localStorage.setItem(STORAGE_KEY_CURRENT_CALL, JSON.stringify(callItem));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_CALL);
    }
  }

  resetToDefault() {
    this.saveQueues(JSON.parse(JSON.stringify(DEFAULT_INITIAL_QUEUES)));
    const activeCalled = this.queues.find(q => q.status === 'Dipanggil');
    this.saveCurrentCall(activeCalled || null);
    this.myTicketId = 'Q-1005';
    localStorage.setItem(STORAGE_KEY_MY_TICKET_ID, 'Q-1005');
  }

  generateTicketNumber(poliId) {
    const poli = POLIKLINIK_DATA[poliId] || POLIKLINIK_DATA.POLI_UMUM;
    const samePoli = this.queues.filter(q => q.poliId === poliId);
    const nextSeq = samePoli.length + 1;
    const padded = String(nextSeq).padStart(3, '0');
    return `${poli.code}-${padded}`;
  }
}

const state = new AppState();

// ============================================================================
// AUDIO & TEXT-TO-SPEECH (TTS) ENGINE BAHASA INDONESIA
// ============================================================================
class AudioAnnouncer {
  constructor() {
    this.synth = window.speechSynthesis;
    this.audioCtx = null;
    this.selectedVoice = null;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;
    const load = () => {
      const voices = this.synth.getVoices();
      // Prioritaskan suara Bahasa Indonesia
      this.selectedVoice = voices.find(v => v.lang.startsWith('id') || v.lang === 'id_ID' || v.lang === 'ind') ||
                           voices.find(v => v.name.toLowerCase().includes('indonesia')) ||
                           voices.find(v => v.lang.includes('en-ID')) ||
                           voices[0];
    };
    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Hospital Chime (Harmonious Dual Chime: F5 -> C5)
  playChime() {
    return new Promise((resolve) => {
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return resolve();

        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(698.46, now); // F5
        gain1.gain.setValueAtTime(0.18, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.5);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(523.25, now + 0.35); // C5
        gain2.gain.setValueAtTime(0.22, now + 0.35);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.35);
        osc2.stop(now + 1.0);

        setTimeout(() => resolve(), 950);
      } catch (e) {
        console.warn('Audio chime note error:', e);
        resolve();
      }
    });
  }

  async announceQueue(number, patientName, poliName, roomName) {
    if (state.isMuted) {
      showToast('Suara dinonaktifkan (Mode Hening)', 'info');
      return;
    }

    // Mainkan hospital chime terlebih dahulu
    await this.playChime();

    if (!this.synth) {
      showToast(`Panggilan: Nomor ${number}, ${patientName} ke ${poliName}`, 'info');
      return;
    }

    // Format pelafalan nomor antrian agar jelas (A - 0 1 5)
    const formattedNumber = number.replace('-', ' ');
    const textSentence = `Nomor antrian ${formattedNumber}, atas nama ${patientName}, dipersilakan masuk ke ${roomName || poliName}.`;

    try {
      this.synth.cancel(); // batalkan speech aktif jika ada
      const utterance = new SpeechSynthesisUtterance(textSentence);
      utterance.lang = 'id-ID';
      utterance.rate = 0.88; // kecepatan pas & tenang
      utterance.pitch = 1.05;

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onstart = () => {
        updateAudioVisualizer(true);
      };
      utterance.onend = () => {
        updateAudioVisualizer(false);
      };
      utterance.onerror = (e) => {
        console.warn('TTS error:', e);
        updateAudioVisualizer(false);
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis execution failed:', e);
    }
  }
}

const announcer = new AudioAnnouncer();

// ============================================================================
// UI CONTROLLER & RENDERERS
// ============================================================================

// Inisialisasi awal saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
  initRealtimeClock();
  initEventListeners();
  switchRole(state.currentRole);
  renderAllViews();
});

// Jam & Tanggal Indonesia
function initRealtimeClock() {
  const clockEl = document.getElementById('topbar-clock');
  const dateEl = document.getElementById('topbar-date');
  const tvClockEl = document.getElementById('tv-clock');

  const update = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
    const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
    if (tvClockEl) tvClockEl.textContent = timeStr;
  };
  update();
  setInterval(update, 1000);
}

// Visualizer indikator audio
function updateAudioVisualizer(isActive) {
  const bars = document.querySelectorAll('.sound-indicator-bar');
  bars.forEach(b => {
    if (isActive) {
      b.classList.remove('opacity-30');
      b.classList.add('animate-pulse');
    } else {
      b.classList.add('opacity-30');
      b.classList.remove('animate-pulse');
    }
  });

  const liveCallingBadges = document.querySelectorAll('.active-call-animation');
  liveCallingBadges.forEach(el => {
    if (isActive) el.classList.add('animate-call-pulse');
    else el.classList.remove('animate-call-pulse');
  });
}

// Role Switcher
function switchRole(roleName) {
  state.currentRole = roleName;
  localStorage.setItem(STORAGE_KEY_ROLE, roleName);

  // Update tabs highlight
  document.querySelectorAll('.role-nav-btn').forEach(btn => {
    const target = btn.getAttribute('data-role');
    if (target === roleName) {
      btn.classList.add('bg-[#00685F]', 'text-white', 'shadow-sm');
      btn.classList.remove('text-[#3D4947]', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-[#00685F]', 'text-white', 'shadow-sm');
      btn.classList.add('text-[#3D4947]', 'hover:bg-slate-100');
    }
  });

  // Switch View Containers
  document.querySelectorAll('.role-view').forEach(view => {
    view.classList.add('hidden');
  });

  const activeView = document.getElementById(`view-${roleName}`);
  if (activeView) {
    activeView.classList.remove('hidden');
  }

  // Jika masuk ke display TV, berikan penyesuaian navbar jika diinginkan
  const tvNotice = document.getElementById('tv-fullscreen-hint');
  if (tvNotice) {
    if (roleName === 'display') tvNotice.classList.remove('hidden');
    else tvNotice.classList.add('hidden');
  }

  renderAllViews();
}

// Render Master
function renderAllViews() {
  renderPasienView();
  renderAsistenView();
  renderDokterView();
  renderDisplayTVView();
  updateHeaderAudioBadge();
}

// ============================================================================
// 1. MODUL PASIEN (MOBILE & WEB)
// ============================================================================
function renderPasienView() {
  const container = document.getElementById('view-pasien');
  if (!container) return;

  const myTicket = state.queues.find(q => q.id === state.myTicketId);
  const poliSummary = POLIKLINIK_DATA;

  // Render Pilihan Poli Selector pada form pendaftaran
  const poliSelector = document.getElementById('patient-poli-select');
  if (poliSelector && poliSelector.children.length === 0) {
    poliSelector.innerHTML = Object.values(poliSummary).map(p => `
      <option value="${p.id}">[${p.code}] ${p.name} — ${p.doctor}</option>
    `).join('');
  }

  // Render Tiket Pasien Saat Ini
  const ticketContainer = document.getElementById('patient-active-ticket-container');
  const noTicketPlaceholder = document.getElementById('patient-no-ticket-placeholder');

  if (myTicket && (myTicket.status === 'Menunggu' || myTicket.status === 'Dipanggil' || myTicket.status === 'Sedang Diperiksa')) {
    ticketContainer.classList.remove('hidden');
    noTicketPlaceholder.classList.add('hidden');

    const poli = POLIKLINIK_DATA[myTicket.poliId] || POLIKLINIK_DATA.POLI_UMUM;
    
    // Hitung antrian di depannya
    const queuesInPoli = state.queues.filter(q => q.poliId === myTicket.poliId);
    const waitingBeforeMe = queuesInPoli.filter(q => 
      (q.status === 'Menunggu') && 
      state.queues.indexOf(q) < state.queues.indexOf(myTicket)
    ).length;

    // Nomor yang sedang dipanggil di poli yang sama
    const currentCalledInPoli = queuesInPoli.find(q => q.status === 'Dipanggil' || q.status === 'Sedang Diperiksa');

    // Status Badge
    let statusBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
    if (myTicket.status === 'Dipanggil') {
      statusBadgeColor = 'bg-[#316BF3]/10 text-[#0051D5] border-[#0051D5] animate-pulse';
    } else if (myTicket.status === 'Sedang Diperiksa') {
      statusBadgeColor = 'bg-[#00685F]/10 text-[#00685F] border-[#00685F] font-semibold';
    }

    document.getElementById('my-ticket-number').textContent = myTicket.number;
    document.getElementById('my-ticket-name').textContent = myTicket.patientName;
    document.getElementById('my-ticket-poli').textContent = poli.name;
    document.getElementById('my-ticket-doctor').textContent = poli.doctor;
    document.getElementById('my-ticket-room').textContent = poli.room;
    document.getElementById('my-ticket-regtime').textContent = myTicket.registeredAt;
    
    const statusBadgeEl = document.getElementById('my-ticket-status-badge');
    statusBadgeEl.className = `px-3 py-1 text-xs font-semibold rounded-full border ${statusBadgeColor}`;
    statusBadgeEl.textContent = myTicket.status;

    // Live Tracker Info
    document.getElementById('tracker-current-called').textContent = currentCalledInPoli ? currentCalledInPoli.number : 'Belum Ada';
    document.getElementById('tracker-waiting-count').textContent = `${waitingBeforeMe} Orang`;
    document.getElementById('tracker-est-time').textContent = `${waitingBeforeMe * 12 + 5} Menit`;

    // Alert jika giliran dipanggil
    const callAlert = document.getElementById('patient-called-alert');
    if (myTicket.status === 'Dipanggil') {
      callAlert.classList.remove('hidden');
    } else {
      callAlert.classList.add('hidden');
    }

  } else {
    ticketContainer.classList.add('hidden');
    noTicketPlaceholder.classList.remove('hidden');
  }

  // Render Riwayat Kunjungan & Resep Pasien
  const historyList = document.getElementById('patient-history-list');
  const finishedVisits = state.queues.filter(q => q.status === 'Selesai');
  if (historyList) {
    if (finishedVisits.length === 0) {
      historyList.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">Belum ada riwayat kunjungan selesai.</div>`;
    } else {
      historyList.innerHTML = finishedVisits.map(v => {
        const p = POLIKLINIK_DATA[v.poliId] || POLIKLINIK_DATA.POLI_UMUM;
        return `
          <div class="p-4 bg-white border border-[#BCC9C6]/60 rounded-xl hover:border-[#00685F] transition-all card-shadow">
            <div class="flex justify-between items-start mb-2">
              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#006947]/10 text-[#006947] mb-1">
                  Selesai Diperiksa
                </span>
                <h4 class="font-bold text-[#0B1C30] text-base">${p.name} — ${v.number}</h4>
                <p class="text-xs text-[#3D4947]">${p.doctor} • Selesai: ${v.completedAt || 'Hari Ini'}</p>
              </div>
              <button onclick="openPrescriptionModal('${v.id}')" class="px-3 py-1.5 bg-[#EFF4FF] hover:bg-[#E5EEFF] text-[#0051D5] rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-sm">prescriptions</span>
                Lihat Resep
              </button>
            </div>
            ${v.emr ? `
              <div class="mt-2.5 pt-2.5 border-t border-slate-100 text-xs">
                <p class="text-slate-500 mb-1"><strong class="text-slate-700">Diagnosa:</strong> ${v.emr.diagnosis || '-'}</p>
                <p class="text-slate-500 line-clamp-1"><strong class="text-slate-700">Resep:</strong> ${v.emr.prescriptions ? v.emr.prescriptions.map(x => x.name).join(', ') : '-'}</p>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }
  }
}

// Handler Pendaftaran Pasien Baru
function handlePatientRegister(e) {
  e.preventDefault();
  const nameInput = document.getElementById('reg-patient-name');
  const phoneInput = document.getElementById('reg-patient-phone');
  const nikInput = document.getElementById('reg-patient-nik');
  const poliInput = document.getElementById('patient-poli-select');

  const patientName = nameInput.value.trim();
  const patientPhone = phoneInput.value.trim();
  const nik = nikInput.value.trim() || '18710' + Math.floor(1000000000 + Math.random() * 9000000000);
  const poliId = poliInput.value;

  if (!patientName) {
    showToast('Silakan isi nama lengkap pasien', 'error');
    return;
  }

  const newTicketNumber = state.generateTicketNumber(poliId);
  const now = new Date();
  const regTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const newTicket = {
    id: 'Q-' + Date.now(),
    number: newTicketNumber,
    poliId: poliId,
    patientName: patientName,
    patientPhone: patientPhone || '0812-XXXX-XXXX',
    nik: nik,
    registeredAt: regTime,
    status: 'Menunggu'
  };

  const updatedQueues = [...state.queues, newTicket];
  state.saveQueues(updatedQueues);
  state.myTicketId = newTicket.id;
  localStorage.setItem(STORAGE_KEY_MY_TICKET_ID, newTicket.id);

  nameInput.value = '';
  phoneInput.value = '';
  nikInput.value = '';

  showToast(`Nomor antrian berhasil diterbitkan: ${newTicketNumber}`, 'success');
  renderAllViews();
}

// Batal Antrian Pasien
function confirmCancelMyTicket() {
  if (!confirm('Apakah Anda yakin ingin membatalkan antrian ini? Nomor Anda tidak akan dapat digunakan kembali.')) {
    return;
  }
  const ticket = state.queues.find(q => q.id === state.myTicketId);
  if (ticket) {
    ticket.status = 'Dibatalkan';
    state.saveQueues(state.queues);
    if (state.currentCall && state.currentCall.id === ticket.id) {
      state.saveCurrentCall(null);
    }
    showToast(`Antrian ${ticket.number} telah dibatalkan.`, 'info');
    renderAllViews();
  }
}

// ============================================================================
// 2. MODUL ASISTEN DOKTER (DASHBOARD & TTS CALLER)
// ============================================================================
function renderAsistenView() {
  const container = document.getElementById('view-asisten');
  if (!container) return;

  // 1. Statistik Ringkasan
  const totalTickets = state.queues.length;
  const waitingCount = state.queues.filter(q => q.status === 'Menunggu').length;
  const callingCount = state.queues.filter(q => q.status === 'Dipanggil').length;
  const servingCount = state.queues.filter(q => q.status === 'Sedang Diperiksa').length;
  const completedCount = state.queues.filter(q => q.status === 'Selesai').length;

  document.getElementById('stat-total-queue').textContent = totalTickets;
  document.getElementById('stat-waiting-queue').textContent = waitingCount;
  document.getElementById('stat-calling-queue').textContent = callingCount;
  document.getElementById('stat-serving-queue').textContent = servingCount;
  document.getElementById('stat-completed-queue').textContent = completedCount;

  // 2. Spotlight Pasien yang Sedang Dipanggil
  const activeCall = state.currentCall;
  const spotlightContainer = document.getElementById('assistant-active-call-box');
  if (activeCall && activeCall.status === 'Dipanggil') {
    const p = POLIKLINIK_DATA[activeCall.poliId] || POLIKLINIK_DATA.POLI_UMUM;
    spotlightContainer.innerHTML = `
      <div class="p-5 bg-gradient-to-r from-[#EFF4FF] to-white border-2 border-[#0051D5] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 active-call-animation card-shadow">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-[#0051D5] text-white flex flex-col items-center justify-center shadow-md">
            <span class="text-xs uppercase font-medium tracking-wider opacity-80">Antrian</span>
            <span class="text-2xl font-black font-heading leading-tight">${activeCall.number}</span>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0051D5] text-white flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">volume_up</span> Sedang Dipanggil
              </span>
              <span class="text-xs text-[#6D7A77]">Panggilan ke-${activeCall.callCount || 1} • Pukul ${activeCall.calledAt || '-'}</span>
            </div>
            <h3 class="text-xl font-bold text-[#0B1C30]">${activeCall.patientName}</h3>
            <p class="text-xs text-[#3D4947] font-medium">${p.name} • ${p.doctor} (${p.room})</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button onclick="handleAssistantRecall('${activeCall.id}')" class="flex-1 md:flex-initial px-4 py-2.5 bg-[#0051D5] hover:bg-[#316BF3] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition">
            <span class="material-symbols-outlined text-base">campaign</span>
            Panggil Ulang (TTS)
          </button>
          <button onclick="handleValidatePresence('${activeCall.id}', true)" class="flex-1 md:flex-initial px-4 py-2.5 bg-[#00685F] hover:bg-[#008378] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition">
            <span class="material-symbols-outlined text-base">check_circle</span>
            Hadir (Masuk Dokter)
          </button>
          <button onclick="handleValidatePresence('${activeCall.id}', false)" class="px-3.5 py-2.5 bg-[#FFDAD6] hover:bg-red-200 text-[#BA1A1A] rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition">
            <span class="material-symbols-outlined text-base">person_off</span>
            Tidak Hadir (Lewati)
          </button>
        </div>
      </div>
    `;
  } else {
    // Siapkan tombol panggil berikutnya otomatis
    const nextWaiting = state.queues.find(q => q.status === 'Menunggu');
    spotlightContainer.innerHTML = `
      <div class="p-5 bg-white border border-[#BCC9C6]/60 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 card-shadow">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-slate-100 text-[#6D7A77] flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl">notifications_paused</span>
          </div>
          <div>
            <h4 class="font-bold text-[#0B1C30] text-base">Tidak Ada Panggilan Aktif</h4>
            <p class="text-xs text-[#3D4947]">
              ${nextWaiting ? `Antrian berikutnya siap dipanggil: <strong class="text-[#00685F]">${nextWaiting.number} (${nextWaiting.patientName})</strong>` : 'Semua antrian telah diproses.'}
            </p>
          </div>
        </div>
        ${nextWaiting ? `
          <button onclick="handleCallPatient('${nextWaiting.id}')" class="w-full md:w-auto px-5 py-2.5 bg-[#00685F] hover:bg-[#008378] text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition">
            <span class="material-symbols-outlined text-lg">volume_up</span>
            Panggil Antrian Berikutnya (${nextWaiting.number})
          </button>
        ` : `
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">Antrian Kosong</span>
        `}
      </div>
    `;
  }

  // 3. Render Tabel Antrian
  renderAssistantTable();
}

function renderAssistantTable() {
  const tableBody = document.getElementById('assistant-queue-tbody');
  if (!tableBody) return;

  // Filter antrian
  let filtered = state.queues.filter(q => {
    if (state.filterPoli !== 'ALL' && q.poliId !== state.filterPoli) return false;
    if (state.searchKeyword) {
      const kw = state.searchKeyword.toLowerCase();
      return q.number.toLowerCase().includes(kw) || q.patientName.toLowerCase().includes(kw);
    }
    return true;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-slate-400 text-sm">
          Tidak ada data antrian sesuai filter.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(q => {
    const poli = POLIKLINIK_DATA[q.poliId] || POLIKLINIK_DATA.POLI_UMUM;
    
    // Status Badge & Action Buttons
    let statusClass = 'bg-slate-100 text-slate-700';
    if (q.status === 'Menunggu') statusClass = 'bg-amber-50 text-amber-800 border border-amber-200';
    else if (q.status === 'Dipanggil') statusClass = 'bg-[#0051D5]/10 text-[#0051D5] font-bold border border-[#0051D5]/30 animate-pulse';
    else if (q.status === 'Sedang Diperiksa') statusClass = 'bg-[#00685F]/10 text-[#00685F] font-semibold border border-[#00685F]/30';
    else if (q.status === 'Selesai') statusClass = 'bg-[#006947]/10 text-[#006947] font-semibold border border-[#006947]/30';
    else if (q.status === 'Dilewati' || q.status === 'Dibatalkan') statusClass = 'bg-[#BA1A1A]/10 text-[#BA1A1A] border border-[#BA1A1A]/30';

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50/70 transition">
        <td class="py-3 px-4">
          <span class="inline-block px-2.5 py-1 rounded-lg bg-slate-900 text-white font-black text-sm tracking-wider font-heading">
            ${q.number}
          </span>
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-[#0B1C30] text-sm">${q.patientName}</div>
          <div class="text-xs text-[#6D7A77]">NIK: ${q.nik || '-'} • HP: ${q.patientPhone || '-'}</div>
        </td>
        <td class="py-3 px-4">
          <div class="text-xs font-semibold text-[#00685F]">${poli.name}</div>
          <div class="text-xs text-slate-500">${poli.doctor}</div>
        </td>
        <td class="py-3 px-4 text-xs text-[#3D4947]">
          ${q.registeredAt || '-'}
        </td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-1 rounded-full text-xs ${statusClass}">
            ${q.status}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${q.status === 'Menunggu' || q.status === 'Dilewati' ? `
              <button onclick="handleCallPatient('${q.id}')" title="Panggil Antrian via Suara" class="p-1.5 bg-[#00685F] hover:bg-[#008378] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-base">campaign</span>
                Panggil
              </button>
            ` : ''}

            ${q.status === 'Dipanggil' ? `
              <button onclick="handleAssistantRecall('${q.id}')" title="Panggil Ulang" class="p-1.5 bg-[#0051D5] hover:bg-[#316BF3] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-base">replay</span>
              </button>
              <button onclick="handleValidatePresence('${q.id}', true)" title="Tandai Hadir" class="p-1.5 bg-[#00685F] hover:bg-[#008378] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-base">check</span>
              </button>
              <button onclick="handleValidatePresence('${q.id}', false)" title="Tidak Hadir / Lewati" class="p-1.5 bg-red-100 hover:bg-red-200 text-[#BA1A1A] rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-base">close</span>
              </button>
            ` : ''}

            ${q.status === 'Selesai' && q.emr ? `
              <button onclick="openPrescriptionModal('${q.id}')" title="Lihat Rekam Medis" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition">
                <span class="material-symbols-outlined text-base">description</span>
              </button>
            ` : ''}

            ${q.status === 'Menunggu' ? `
              <button onclick="handleCancelFromTable('${q.id}')" title="Batalkan Antrian" class="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
                <span class="material-symbols-outlined text-base">delete</span>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Handler Panggil Pasien
function handleCallPatient(ticketId) {
  const ticket = state.queues.find(q => q.id === ticketId);
  if (!ticket) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  ticket.status = 'Dipanggil';
  ticket.calledAt = timeStr;
  ticket.callCount = 1;

  state.saveCurrentCall(ticket);
  state.saveQueues(state.queues);

  const poli = POLIKLINIK_DATA[ticket.poliId] || POLIKLINIK_DATA.POLI_UMUM;
  announcer.announceQueue(ticket.number, ticket.patientName, poli.name, poli.room);

  showToast(`Memanggil nomor ${ticket.number} (${ticket.patientName})`, 'info');
  renderAllViews();
}

// Handler Panggil Ulang
function handleAssistantRecall(ticketId) {
  const ticket = state.queues.find(q => q.id === ticketId);
  if (!ticket) return;

  ticket.callCount = (ticket.callCount || 1) + 1;
  state.saveCurrentCall(ticket);
  state.saveQueues(state.queues);

  const poli = POLIKLINIK_DATA[ticket.poliId] || POLIKLINIK_DATA.POLI_UMUM;
  announcer.announceQueue(ticket.number, ticket.patientName, poli.name, poli.room);

  showToast(`Panggilan ulang ke-${ticket.callCount} untuk ${ticket.number}`, 'info');
  renderAllViews();
}

// Validasi Kehadiran Pasien
function handleValidatePresence(ticketId, isPresent) {
  const ticket = state.queues.find(q => q.id === ticketId);
  if (!ticket) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  if (isPresent) {
    ticket.status = 'Sedang Diperiksa';
    ticket.servedAt = timeStr;
    state.saveCurrentCall(null);
    showToast(`Pasien ${ticket.patientName} (${ticket.number}) divalidasi hadir dan diarahkan ke ruang dokter.`, 'success');
  } else {
    ticket.status = 'Dilewati';
    state.saveCurrentCall(null);
    showToast(`Pasien ${ticket.number} ditandai tidak hadir / dilewati.`, 'warning');
  }

  state.saveQueues(state.queues);
  renderAllViews();
}

function handleCancelFromTable(ticketId) {
  const ticket = state.queues.find(q => q.id === ticketId);
  if (!ticket) return;
  if (confirm(`Yakin membatalkan antrian ${ticket.number} atas nama ${ticket.patientName}?`)) {
    ticket.status = 'Dibatalkan';
    state.saveQueues(state.queues);
    showToast(`Antrian ${ticket.number} dibatalkan.`, 'info');
    renderAllViews();
  }
}

// ============================================================================
// 3. MODUL DOKTER (PEMERIKSAAN MEDIS & RESEP DIGITAL)
// ============================================================================
function renderDokterView() {
  const container = document.getElementById('view-dokter');
  if (!container) return;

  // Pilih Dokter Aktif
  const activePoliKey = state.selectedDoctorPoli;
  const activePoli = POLIKLINIK_DATA[activePoliKey] || POLIKLINIK_DATA.POLI_UMUM;

  document.getElementById('doctor-profile-name').textContent = activePoli.doctor;
  document.getElementById('doctor-profile-sip').textContent = activePoli.doctorSip;
  document.getElementById('doctor-profile-poli').textContent = activePoli.name;
  document.getElementById('doctor-profile-room').textContent = activePoli.room;

  // Pasien yang Sedang Diperiksa di Poli ini
  const currentPatient = state.queues.find(q => q.poliId === activePoliKey && q.status === 'Sedang Diperiksa');

  const emrFormContainer = document.getElementById('doctor-emr-form-container');
  const emptyEmrPlaceholder = document.getElementById('doctor-no-patient-placeholder');

  if (currentPatient) {
    emrFormContainer.classList.remove('hidden');
    emptyEmrPlaceholder.classList.add('hidden');

    document.getElementById('emr-patient-number').textContent = currentPatient.number;
    document.getElementById('emr-patient-name').textContent = currentPatient.patientName;
    document.getElementById('emr-patient-nik').textContent = currentPatient.nik || '-';
    document.getElementById('emr-patient-phone').textContent = currentPatient.patientPhone || '-';
    document.getElementById('emr-patient-time').textContent = `Masuk: ${currentPatient.servedAt || currentPatient.calledAt || '-'}`;

    // Simpan target pasien yang sedang di-edit
    emrFormContainer.setAttribute('data-ticket-id', currentPatient.id);

    // Isi jika sebelumnya sudah ada draft
    if (currentPatient.emr) {
      document.getElementById('emr-symptoms').value = currentPatient.emr.symptoms || '';
      document.getElementById('emr-diagnosis').value = currentPatient.emr.diagnosis || '';
      document.getElementById('emr-notes').value = currentPatient.emr.notes || '';
    } else {
      document.getElementById('emr-symptoms').value = '';
      document.getElementById('emr-diagnosis').value = '';
      document.getElementById('emr-notes').value = '';
    }
  } else {
    emrFormContainer.classList.add('hidden');
    emptyEmrPlaceholder.classList.remove('hidden');
  }

  // Antrian Menunggu untuk Poli ini
  const waitingForDoc = state.queues.filter(q => q.poliId === activePoliKey && q.status === 'Menunggu');
  const waitingListEl = document.getElementById('doctor-waiting-list');
  if (waitingListEl) {
    if (waitingForDoc.length === 0) {
      waitingListEl.innerHTML = `<li class="p-3 text-center text-slate-400 text-xs">Tidak ada antrian menunggu untuk poli ini.</li>`;
    } else {
      waitingListEl.innerHTML = waitingForDoc.map((w, idx) => `
        <li class="p-3 bg-white border border-[#BCC9C6]/50 rounded-xl flex items-center justify-between card-shadow">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#EFF4FF] text-[#0051D5] font-bold text-xs flex items-center justify-center font-heading">
              #${idx + 1}
            </span>
            <div>
              <div class="font-bold text-[#0B1C30] text-sm">${w.number} — ${w.patientName}</div>
              <div class="text-xs text-slate-400">Daftar pukul: ${w.registeredAt}</div>
            </div>
          </div>
          <span class="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full font-medium">Menunggu</span>
        </li>
      `).join('');
    }
  }

  // Riwayat Pasien Selesai oleh Dokter Ini Hari Ini
  const completedByDoc = state.queues.filter(q => q.poliId === activePoliKey && q.status === 'Selesai');
  const completedListEl = document.getElementById('doctor-completed-list');
  if (completedListEl) {
    if (completedByDoc.length === 0) {
      completedListEl.innerHTML = `<li class="p-3 text-center text-slate-400 text-xs">Belum ada pasien selesai hari ini.</li>`;
    } else {
      completedListEl.innerHTML = completedByDoc.map(c => `
        <li class="p-3 bg-white border border-[#BCC9C6]/50 rounded-xl flex items-center justify-between card-shadow">
          <div>
            <div class="font-bold text-[#0B1C30] text-sm">${c.number} — ${c.patientName}</div>
            <div class="text-xs text-[#006947] font-medium">${c.emr ? c.emr.diagnosis : 'Selesai'}</div>
          </div>
          <button onclick="openPrescriptionModal('${c.id}')" class="px-2.5 py-1.5 bg-[#EFF4FF] hover:bg-[#E5EEFF] text-[#0051D5] rounded-lg text-xs font-semibold flex items-center gap-1 transition">
            <span class="material-symbols-outlined text-sm">print</span>
            Resep
          </button>
        </li>
      `).join('');
    }
  }
}

// Tambah baris obat pada resep dinamis
function addPrescriptionRow(medName = '', dosage = '', amount = '', note = '') {
  const container = document.getElementById('doctor-prescription-items');
  if (!container) return;

  const rowId = 'rx-' + Math.random().toString(36).substr(2, 9);
  const rowHtml = `
    <div id="${rowId}" class="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col md:flex-row items-center gap-2 text-xs">
      <input type="text" placeholder="Nama Obat (mis: Paracetamol 500mg)" value="${medName}" class="rx-name flex-1 w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#00685F] outline-none" required />
      <input type="text" placeholder="Aturan (3x1 tab ssdh mkn)" value="${dosage}" class="rx-dosage w-full md:w-44 bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#00685F] outline-none" required />
      <input type="text" placeholder="Jumlah (10 tab)" value="${amount}" class="rx-amount w-full md:w-28 bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#00685F] outline-none" />
      <input type="text" placeholder="Keterangan" value="${note}" class="rx-note flex-1 w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:border-[#00685F] outline-none" />
      <button type="button" onclick="document.getElementById('${rowId}').remove()" class="p-1.5 text-slate-400 hover:text-red-600 rounded">
        <span class="material-symbols-outlined text-base">delete</span>
      </button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', rowHtml);
}

// Selesaikan Pemeriksaan Dokter
function handleFinishDoctorConsultation(e) {
  e.preventDefault();
  const formContainer = document.getElementById('doctor-emr-form-container');
  const ticketId = formContainer.getAttribute('data-ticket-id');
  const ticket = state.queues.find(q => q.id === ticketId);

  if (!ticket) {
    showToast('Tidak ada pasien aktif yang dipilih', 'error');
    return;
  }

  const symptoms = document.getElementById('emr-symptoms').value.trim();
  const diagnosis = document.getElementById('emr-diagnosis').value.trim();
  const notes = document.getElementById('emr-notes').value.trim();

  // Kumpulkan daftar resep
  const prescriptionRows = document.querySelectorAll('#doctor-prescription-items > div');
  const prescriptions = [];
  prescriptionRows.forEach(row => {
    const name = row.querySelector('.rx-name').value.trim();
    const dosage = row.querySelector('.rx-dosage').value.trim();
    const amount = row.querySelector('.rx-amount').value.trim();
    const note = row.querySelector('.rx-note').value.trim();
    if (name) {
      prescriptions.push({ name, dosage, amount, note });
    }
  });

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  ticket.status = 'Selesai';
  ticket.completedAt = timeStr;
  ticket.emr = {
    symptoms,
    diagnosis: diagnosis || 'Kunjungan Rawat Jalan',
    prescriptions,
    notes
  };

  state.saveQueues(state.queues);
  showToast(`Pemeriksaan selesai untuk ${ticket.number} (${ticket.patientName}). Rekam medis tersimpan.`, 'success');

  // Bersihkan baris obat untuk berikutnya
  document.getElementById('doctor-prescription-items').innerHTML = '';
  addPrescriptionRow();

  renderAllViews();

  // Buka modal resep otomatis untuk kenyamanan cetak
  openPrescriptionModal(ticket.id);
}

// ============================================================================
// 4. MODUL DISPLAY BOARD TV (LAYAR MONITOR RUANG TUNGGU)
// ============================================================================
function renderDisplayTVView() {
  const container = document.getElementById('view-display');
  if (!container) return;

  const activeCall = state.currentCall;
  const currentCallNumber = document.getElementById('tv-called-number');
  const currentCallName = document.getElementById('tv-called-name');
  const currentCallPoli = document.getElementById('tv-called-poli');
  const currentCallRoom = document.getElementById('tv-called-room');

  if (activeCall && activeCall.status === 'Dipanggil') {
    const poli = POLIKLINIK_DATA[activeCall.poliId] || POLIKLINIK_DATA.POLI_UMUM;
    currentCallNumber.textContent = activeCall.number;
    currentCallName.textContent = activeCall.patientName;
    currentCallPoli.textContent = `${poli.name} — ${poli.doctor}`;
    currentCallRoom.textContent = poli.room;
    document.getElementById('tv-calling-box').classList.add('animate-call-pulse');
  } else {
    currentCallNumber.textContent = '--';
    currentCallName.textContent = 'Menunggu Panggilan Berikutnya';
    currentCallPoli.textContent = 'Klinik-24 Arief Rahman Hakim';
    currentCallRoom.textContent = 'Silakan duduk tertib di ruang tunggu';
    document.getElementById('tv-calling-box').classList.remove('animate-call-pulse');
  }

  // Antrian Berikutnya (3-4 antrian yang statusnya Menunggu)
  const nextQueues = state.queues.filter(q => q.status === 'Menunggu').slice(0, 4);
  const nextQueueContainer = document.getElementById('tv-next-queue-list');
  if (nextQueueContainer) {
    if (nextQueues.length === 0) {
      nextQueueContainer.innerHTML = `<div class="p-4 bg-white/60 rounded-xl text-center text-slate-400 text-sm">Tidak ada antrian berikutnya</div>`;
    } else {
      nextQueueContainer.innerHTML = nextQueues.map(q => {
        const p = POLIKLINIK_DATA[q.poliId] || POLIKLINIK_DATA.POLI_UMUM;
        return `
          <div class="p-4 bg-white border border-[#BCC9C6]/60 rounded-xl flex items-center justify-between card-shadow">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1.5 bg-[#EFF4FF] text-[#0051D5] font-black rounded-lg text-lg font-heading">
                ${q.number}
              </span>
              <div>
                <h5 class="font-bold text-[#0B1C30] text-sm">${q.patientName}</h5>
                <p class="text-xs text-slate-500">${p.name}</p>
              </div>
            </div>
            <span class="text-xs text-[#00685F] font-semibold bg-[#00685F]/10 px-2.5 py-1 rounded-full">
              Siap
            </span>
          </div>
        `;
      }).join('');
    }
  }

  // Kartu Ringkasan Per Poliklinik
  const polySummaryGrid = document.getElementById('tv-poly-summary-grid');
  if (polySummaryGrid) {
    polySummaryGrid.innerHTML = Object.values(POLIKLINIK_DATA).map(p => {
      const currentServing = state.queues.find(q => q.poliId === p.id && (q.status === 'Dipanggil' || q.status === 'Sedang Diperiksa'));
      const waitingCount = state.queues.filter(q => q.poliId === p.id && q.status === 'Menunggu').length;

      return `
        <div class="p-4 bg-white border border-[#BCC9C6]/50 rounded-xl card-shadow">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-[#00685F]">${p.icon}</span>
            <h4 class="font-bold text-sm text-[#0B1C30]">${p.name}</h4>
          </div>
          <div class="text-xs text-slate-500 mb-3">${p.doctor}</div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <span class="text-[11px] text-slate-400 block uppercase">Sedang Dilayani</span>
              <span class="text-base font-extrabold text-[#0051D5] font-heading">${currentServing ? currentServing.number : '-'}</span>
            </div>
            <div class="text-right">
              <span class="text-[11px] text-slate-400 block uppercase">Antre</span>
              <span class="text-base font-bold text-[#00685F] font-heading">${waitingCount}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ============================================================================
// MODAL CETAK RESEP DOKTER / REKAM MEDIS
// ============================================================================
function openPrescriptionModal(ticketId) {
  const ticket = state.queues.find(q => q.id === ticketId);
  if (!ticket || !ticket.emr) {
    showToast('Rekam medis belum tersedia untuk tiket ini', 'info');
    return;
  }

  const poli = POLIKLINIK_DATA[ticket.poliId] || POLIKLINIK_DATA.POLI_UMUM;
  const modal = document.getElementById('prescription-modal');

  document.getElementById('print-doc-name').textContent = poli.doctor;
  document.getElementById('print-doc-sip').textContent = poli.doctorSip;
  document.getElementById('print-poli-name').textContent = poli.name;
  document.getElementById('print-clinic-room').textContent = poli.room;

  document.getElementById('print-ticket-number').textContent = ticket.number;
  document.getElementById('print-patient-name').textContent = ticket.patientName;
  document.getElementById('print-patient-nik').textContent = ticket.nik || '-';
  document.getElementById('print-date').textContent = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById('print-symptoms').textContent = ticket.emr.symptoms || '-';
  document.getElementById('print-diagnosis').textContent = ticket.emr.diagnosis || '-';
  document.getElementById('print-notes').textContent = ticket.emr.notes || '-';

  const rxContainer = document.getElementById('print-rx-items');
  if (ticket.emr.prescriptions && ticket.emr.prescriptions.length > 0) {
    rxContainer.innerHTML = ticket.emr.prescriptions.map((rx, idx) => `
      <div class="py-2 border-b border-dashed border-slate-300">
        <div class="flex justify-between items-baseline font-bold text-sm text-slate-900">
          <span>R/ ${rx.name}</span>
          <span class="text-xs text-slate-600">${rx.amount || ''}</span>
        </div>
        <div class="text-xs italic text-slate-700 pl-4 mt-0.5">
          S. ${rx.dosage} (${rx.note || 'Sesuai petunjuk'})
        </div>
      </div>
    `).join('');
  } else {
    rxContainer.innerHTML = `<div class="text-xs italic text-slate-400 py-2">Tidak ada resep obat (edukasi / tindakan medis non-farmakologis).</div>`;
  }

  modal.classList.remove('hidden');
}

function closePrescriptionModal() {
  const modal = document.getElementById('prescription-modal');
  if (modal) modal.classList.add('hidden');
}

// Print Handler
function triggerPrintPrescription() {
  window.print();
}

// ============================================================================
// AUDIO SETTINGS & TOAST SYSTEM
// ============================================================================
function toggleAudioMute() {
  state.isMuted = !state.isMuted;
  localStorage.setItem(STORAGE_KEY_AUDIO_MUTED, state.isMuted);
  updateHeaderAudioBadge();
  showToast(state.isMuted ? 'Suara dinonaktifkan (Mute)' : 'Suara diaktifkan (TTS Nyala)', 'info');
}

function updateHeaderAudioBadge() {
  const btn = document.getElementById('header-audio-toggle');
  if (!btn) return;
  if (state.isMuted) {
    btn.innerHTML = `<span class="material-symbols-outlined text-base">volume_off</span> <span class="hidden sm:inline">Suara Bisu</span>`;
    btn.className = `px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1.5 transition`;
  } else {
    btn.innerHTML = `<span class="material-symbols-outlined text-base text-[#00685F]">volume_up</span> <span class="hidden sm:inline">Audio Nyala</span>`;
    btn.className = `px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00685F]/10 text-[#00685F] flex items-center gap-1.5 hover:bg-[#00685F]/20 transition`;
  }
}

function testAudioTTS() {
  announcer.announceQueue('A-099', 'Bapak Pengujian Sistem', 'Poli Umum', 'Ruang Periksa 1');
  showToast('Memutar uji coba suara pemanggilan TTS...', 'info');
}

// Toast Notifikasi
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toastId = 'toast-' + Date.now();
  let bgColor = 'bg-slate-900 text-white';
  let icon = 'info';

  if (type === 'success') {
    bgColor = 'bg-[#00685F] text-white';
    icon = 'check_circle';
  } else if (type === 'error') {
    bgColor = 'bg-[#BA1A1A] text-white';
    icon = 'error';
  } else if (type === 'warning') {
    bgColor = 'bg-amber-600 text-white';
    icon = 'warning';
  }

  const toastHtml = `
    <div id="${toastId}" class="${bgColor} px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-medium transition-all transform duration-300 pointer-events-auto">
      <span class="material-symbols-outlined text-lg">${icon}</span>
      <span class="flex-1">${message}</span>
      <button onclick="document.getElementById('${toastId}').remove()" class="opacity-70 hover:opacity-100">
        <span class="material-symbols-outlined text-base">close</span>
      </button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);

  setTimeout(() => {
    const el = document.getElementById(toastId);
    if (el) el.remove();
  }, 4200);
}

// Inisialisasi event listener interaktif
function initEventListeners() {
  // Role switcher buttons
  document.querySelectorAll('.role-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      switchRole(role);
    });
  });

  // Patient registration form
  const patientForm = document.getElementById('patient-register-form');
  if (patientForm) {
    patientForm.addEventListener('submit', handlePatientRegister);
  }

  // Doctor Selector Switcher
  const docPoliSelect = document.getElementById('doctor-poli-switcher');
  if (docPoliSelect) {
    docPoliSelect.value = state.selectedDoctorPoli;
    docPoliSelect.addEventListener('change', (e) => {
      state.selectedDoctorPoli = e.target.value;
      localStorage.setItem(STORAGE_KEY_SELECTED_DOC, state.selectedDoctorPoli);
      renderDokterView();
      showToast(`Beralih ke ${POLIKLINIK_DATA[state.selectedDoctorPoli].name}`, 'info');
    });
  }

  // Assistant Filter Poli
  const filterPoliSelect = document.getElementById('assistant-filter-poli');
  if (filterPoliSelect) {
    filterPoliSelect.addEventListener('change', (e) => {
      state.filterPoli = e.target.value;
      renderAssistantTable();
    });
  }

  // Assistant Search Pasien
  const searchInput = document.getElementById('assistant-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchKeyword = e.target.value.trim();
      renderAssistantTable();
    });
  }

  // Doctor EMR form submit
  const emrForm = document.getElementById('doctor-emr-form');
  if (emrForm) {
    emrForm.addEventListener('submit', handleFinishDoctorConsultation);
  }

  // Preset diagnosa chips
  document.querySelectorAll('.diagnosis-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const diagInput = document.getElementById('emr-diagnosis');
      if (diagInput) {
        diagInput.value = chip.getAttribute('data-val');
      }
    });
  });

  // Tombol tambah baris obat
  const addRxBtn = document.getElementById('btn-add-rx-item');
  if (addRxBtn) {
    addRxBtn.addEventListener('click', () => addPrescriptionRow());
  }

  // Tambahkan 1 baris obat default
  addPrescriptionRow();
}
