# Product Requirements Document (PRD)
# Sistem Pendaftaran Antrian Pasien — Klinik-24 Arief Rahman Hakim, Bandar Lampung

**Versi:** 1.0
**Tanggal:** 22 September 2026
**Status:** Draft
**Pemilik Produk:** Manajemen Klinik-24 Arief Rahman Hakim

---

## 1. Latar Belakang

Klinik-24 Arief Rahman Hakim Bandar Lampung melayani pasien setiap hari dengan proses antrian yang saat ini dilakukan secara manual, sehingga rentan menimbulkan penumpukan pasien di ruang tunggu, waktu tunggu yang tidak transparan, dan proses panggilan pasien yang kurang efisien. Untuk meningkatkan kualitas layanan, klinik membutuhkan sebuah sistem pendaftaran antrian digital yang memungkinkan pasien mendaftar dari aplikasi, mendapatkan nomor antrian secara otomatis, dan dipanggil melalui pengeras suara berbasis teks-ke-suara (text-to-speech) dalam Bahasa Indonesia. Sistem ini juga akan mendukung alur kerja asisten dokter dalam memvalidasi kehadiran pasien serta mendukung dokter dalam melakukan pemeriksaan, mencatat diagnosa, dan menulis resep secara digital.

## 2. Tujuan Produk

1. Mempercepat dan mempermudah proses pendaftaran pasien melalui aplikasi mobile/web.
2. Mengurangi antrian fisik dan kerumunan di ruang tunggu klinik.
3. Memberikan transparansi nomor antrian dan estimasi waktu tunggu kepada pasien.
4. Mempermudah asisten dokter dalam memanggil dan memvalidasi kehadiran pasien.
5. Mendukung dokter dalam mencatat gejala, diagnosa, dan resep obat secara digital dan terdokumentasi (mendukung rekam medis elektronik sederhana).
6. Meningkatkan efisiensi operasional klinik secara keseluruhan.

## 3. Target Pengguna & Peran (Roles)

| Peran | Deskripsi | Akses Utama |
|---|---|---|
| **Pasien** | Masyarakat yang ingin berobat di klinik | Aplikasi pasien (mobile/web) |
| **Asisten Dokter** | Petugas yang memvalidasi kehadiran dan memanggil pasien | Dashboard asisten dokter |
| **Dokter** | Tenaga medis yang memeriksa pasien | Dashboard dokter (pemeriksaan, diagnosa, resep) |
| **Admin Klinik** *(opsional, disarankan)* | Mengelola master data poli, dokter, jadwal | Dashboard admin |

## 4. Ruang Lingkup (Scope)

### 4.1 Termasuk dalam Scope
- Pendaftaran antrian oleh pasien via aplikasi
- Pemberian nomor antrian otomatis
- Validasi kehadiran pasien oleh asisten dokter (tombol "Panggil")
- Pemanggilan nomor antrian & nama pasien via suara (text-to-speech) Bahasa Indonesia
- Layar tampilan antrian (display board) di ruang tunggu
- Modul pemeriksaan dokter: input gejala, diagnosa, resep obat
- Riwayat kunjungan pasien (rekam medis dasar)
- Notifikasi status antrian ke pasien (in-app/push notification)

### 4.2 Di Luar Scope (Out of Scope) — Fase 1
- Pembayaran online / billing
- Integrasi BPJS/asuransi
- Farmasi otomatis (penebusan resep online)
- Telemedicine/konsultasi jarak jauh
- Integrasi laboratorium

## 5. Alur Proses Utama (User Flow)

### 5.1 Alur Pasien
1. Pasien membuka aplikasi dan login/registrasi akun.
2. Pasien memilih poli/dokter tujuan (jika lebih dari satu).
3. Pasien menekan tombol **"Daftar Antrian"**.
4. Sistem menerbitkan **nomor antrian** dan menampilkan estimasi posisi/waktu tunggu.
5. Pasien menunggu (bisa di klinik atau di luar) dan memantau status antrian secara real-time di aplikasi.
6. Saat mendekati giliran, pasien menerima notifikasi untuk hadir di klinik.
7. Saat nomor dipanggil, pasien menuju ruang periksa.

### 5.2 Alur Asisten Dokter
1. Asisten dokter login ke dashboard.
2. Melihat daftar antrian pasien yang menunggu (urut nomor & waktu daftar).
3. Menekan tombol **"Panggil"** pada nomor antrian berikutnya.
4. Sistem mengeluarkan suara otomatis (TTS) dalam Bahasa Indonesia, contoh:
   > *"Nomor antrian 015, atas nama Budi Santoso, dipersilakan masuk."*
5. Asisten dokter memvalidasi kehadiran pasien (hadir/tidak hadir) di sistem.
   - Jika **hadir** → status berubah menjadi "Sedang Diperiksa", pasien diarahkan ke ruang dokter.
   - Jika **tidak hadir** setelah dipanggil 2–3 kali (dapat dikonfigurasi) → status "Dilewati", nomor selanjutnya dipanggil.
6. Data pasien diteruskan ke dashboard dokter.

### 5.3 Alur Dokter
1. Dokter login ke dashboard dan melihat pasien yang telah divalidasi hadir.
2. Dokter membuka data pasien (identitas & riwayat kunjungan jika ada).
3. Dokter menanyakan dan mencatat **gejala/keluhan pasien**.
4. Dokter melakukan pemeriksaan dan mengisi **diagnosa**.
5. Dokter menulis **resep obat** (nama obat, dosis, aturan pakai).
6. Dokter menyelesaikan pemeriksaan → status pasien menjadi "Selesai".
7. Sistem menyimpan data ke riwayat rekam medis pasien; resep dapat dicetak atau ditampilkan di aplikasi pasien.

## 6. Kebutuhan Fungsional (Functional Requirements)

### 6.1 Modul Pasien
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-P1 | Pasien dapat mendaftar/login menggunakan No. HP/email | Must |
| F-P2 | Pasien dapat memilih poli/dokter (jika tersedia lebih dari satu) | Must |
| F-P3 | Pasien dapat mendaftar antrian dan menerima nomor antrian otomatis | Must |
| F-P4 | Pasien dapat melihat posisi antrian & estimasi waktu tunggu secara real-time | Should |
| F-P5 | Pasien menerima notifikasi saat antrian mendekati giliran | Should |
| F-P6 | Pasien dapat melihat riwayat kunjungan & resep sebelumnya | Could |
| F-P7 | Pasien dapat membatalkan pendaftaran antrian | Should |

### 6.2 Modul Asisten Dokter
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-A1 | Asisten dokter dapat melihat daftar antrian secara real-time | Must |
| F-A2 | Asisten dokter dapat memanggil nomor antrian via tombol "Panggil" | Must |
| F-A3 | Sistem mengeluarkan suara (TTS) memanggil nomor antrian dan nama pasien dalam Bahasa Indonesia | Must |
| F-A4 | Asisten dokter dapat menandai status kehadiran pasien (Hadir/Tidak Hadir/Dilewati) | Must |
| F-A5 | Asisten dokter dapat memanggil ulang nomor yang sama | Should |
| F-A6 | Sistem mencatat waktu panggil dan waktu validasi kehadiran | Should |

### 6.3 Modul Dokter
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-D1 | Dokter dapat melihat data pasien yang telah divalidasi hadir | Must |
| F-D2 | Dokter dapat menginput/mencatat keluhan/gejala pasien | Must |
| F-D3 | Dokter dapat mengisi diagnosa pasien | Must |
| F-D4 | Dokter dapat menulis resep obat (nama, dosis, frekuensi, durasi) | Must |
| F-D5 | Dokter dapat menandai pemeriksaan selesai | Must |
| F-D6 | Sistem menyimpan hasil pemeriksaan ke riwayat rekam medis pasien | Must |
| F-D7 | Dokter dapat mencetak/mengirim resep ke aplikasi pasien | Should |

### 6.4 Modul Tampilan Antrian (Display Board)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| F-B1 | Layar menampilkan nomor antrian yang sedang dipanggil | Must |
| F-B2 | Layar menampilkan daftar antrian berikutnya | Should |
| F-B3 | Suara panggilan terintegrasi dengan tampilan layar | Must |

## 7. Kebutuhan Non-Fungsional (Non-Functional Requirements)

| Kategori | Kebutuhan |
|---|---|
| **Bahasa** | Seluruh antarmuka dan suara sistem menggunakan Bahasa Indonesia |
| **Performansi** | Nomor antrian harus terbit dalam < 2 detik setelah pasien menekan tombol daftar |
| **Ketersediaan** | Sistem tersedia 24 jam (mengikuti nama "Klinik-24"), uptime minimal 99% |
| **Keamanan** | Data pasien (identitas, diagnosa, resep) terenkripsi dan sesuai regulasi perlindungan data kesehatan |
| **Skalabilitas** | Sistem mampu menangani minimal 200 pendaftaran antrian per hari |
| **Kompatibilitas** | Aplikasi pasien tersedia di Android, iOS, dan web responsif |
| **Audio** | Suara panggilan (TTS) jelas, dengan pelafalan nama & angka Bahasa Indonesia yang natural |
| **Auditability** | Setiap aksi (panggil, validasi, diagnosa, resep) tercatat log waktu & pelaku |

## 8. Contoh Kalimat Panggilan Otomatis (TTS)

```
"Nomor antrian 015, atas nama Budi Santoso, dipersilakan masuk."
```

Format dapat dikonfigurasi, misalnya menyertakan nama poli/dokter:
```
"Nomor antrian 015, atas nama Budi Santoso, dipersilakan masuk ke ruang periksa dr. Andi."
```

## 9. Status Antrian (State Machine)

```
Terdaftar → Menunggu → Dipanggil → Hadir (Sedang Diperiksa) → Selesai
                              ↘ Tidak Hadir → Dilewati
```

## 10. Metrik Keberhasilan (Success Metrics)

- Rata-rata waktu tunggu pasien berkurang minimal 30% dibanding proses manual.
- 90% pasien berhasil mendaftar antrian secara mandiri tanpa bantuan petugas.
- Tingkat error panggilan suara (salah nomor/nama) < 1%.
- Waktu proses validasi kehadiran oleh asisten dokter rata-rata < 15 detik per pasien.
- Kepuasan pasien terhadap sistem antrian meningkat (diukur via survei) minimal 80% puas.

## 11. Asumsi

- Klinik memiliki koneksi internet stabil dan perangkat (tablet/PC + speaker) di lokasi asisten dokter dan ruang tunggu.
- Pasien memiliki akses ke smartphone untuk mendaftar via aplikasi (perlu disediakan opsi pendaftaran manual/kiosk untuk pasien tanpa smartphone — lihat Risiko).
- Satu dokter dapat memiliki lebih dari satu asisten dokter, namun satu antrian hanya diproses oleh satu dokter pada satu waktu.

## 12. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Pasien lansia/tidak memiliki smartphone tidak dapat mendaftar via aplikasi | Sediakan kios pendaftaran mandiri (self-service kiosk) atau bantuan petugas front office |
| Gangguan koneksi internet menghambat pemanggilan suara | Sediakan mode offline/lokal untuk fitur panggilan dasar |
| Kesalahan pelafalan nama pasien oleh TTS | Sediakan opsi override manual (asisten dokter memanggil via mic jika TTS gagal) |
| Data medis (diagnosa, resep) bersifat sensitif | Terapkan enkripsi data dan kontrol akses berbasis peran (role-based access control) |

## 13. Rencana Rilis (Milestone) — Usulan

| Fase | Cakupan | Estimasi |
|---|---|---|
| Fase 1 (MVP) | Pendaftaran antrian, panggilan TTS, validasi kehadiran, input diagnosa & resep dasar | 6–8 minggu |
| Fase 2 | Notifikasi real-time, riwayat rekam medis, display board | 4 minggu |
| Fase 3 | Cetak resep, laporan statistik klinik, integrasi lanjutan | 4 minggu |

## 14. Lampiran: Glosarium

- **Antrian**: urutan nomor yang diberikan kepada pasien sesuai waktu pendaftaran.
- **TTS (Text-to-Speech)**: teknologi yang mengubah teks menjadi suara.
- **Validasi Kehadiran**: proses konfirmasi bahwa pasien yang dipanggil benar-benar hadir di klinik.
- **Rekam Medis**: catatan riwayat pemeriksaan, diagnosa, dan resep pasien.

---
*Dokumen ini adalah draft awal dan dapat direvisi sesuai kebutuhan bisnis serta masukan dari pihak Klinik-24 Arief Rahman Hakim.*
