# Design Skill — Sistem Informasi Antrian Klinik

## 1. Tujuan Skill
Skill ini menjadi panduan desain UI/UX untuk mengembangkan antarmuka **Sistem Informasi Antrian Klinik** berdasarkan kode HTML, Tailwind CSS, dan konfigurasi desain yang diberikan. Fokusnya adalah tampilan yang profesional, bersih, mudah dipindai, dan mendukung pekerjaan operasional klinik.

Gunakan skill ini saat membuat halaman baru, memperbaiki tampilan yang ada, atau menjaga konsistensi desain antarhalaman.

## 2. Karakter Desain
- **Gaya:** modern, profesional, bersih, dan berorientasi pada layanan kesehatan.
- **Kesan:** aman, tepercaya, teratur, dan efisien.
- **Bahasa antarmuka:** Bahasa Indonesia.
- **Prioritas:** keterbacaan data pasien, status antrian yang jelas, dan akses cepat untuk tindakan utama.
- **Pendekatan layout:** dashboard dengan sidebar, top bar, kartu ringkasan, kartu poliklinik, tabel data, serta halaman login terpusat.
- **Hindari:** dekorasi berlebihan, warna neon yang dominan, terlalu banyak jenis tombol, dan teks kecil untuk informasi penting.

## 3. Teknologi dan Dependensi yang Terlihat pada Kode
- HTML5 dengan `lang="id"`.
- Tailwind CSS melalui CDN.
- Konfigurasi tema khusus Tailwind.
- Google Fonts: **Inter** dan **Plus Jakarta Sans**.
- Material Symbols Outlined untuk ikon.
- JavaScript sederhana untuk interaksi seperti menampilkan kata sandi, memilih kredensial demo, dan menangani banner pesan.

Jika proyek produksi menggunakan build system, pindahkan konfigurasi Tailwind ke konfigurasi proyek daripada bergantung pada CDN.

## 4. Sistem Warna

Gunakan palet berikut sebagai token desain utama. Nama token berasal dari konfigurasi Tailwind pada kode.

| Token | Hex | Penggunaan |
|---|---|---|
| `primary` | `#00685F` | Tombol utama, identitas klinik, indikator aktif |
| `primary-container` | `#008378` | Navigasi aktif dan tombol primer saat hover |
| `on-primary` | `#FFFFFF` | Teks atau ikon di atas warna primer |
| `secondary` | `#0051D5` | Informasi sekunder, status dipanggil, aksen alternatif |
| `secondary-container` | `#316BF3` | Variasi latar sekunder |
| `tertiary` | `#006947` | Status berhasil, tersedia, atau selesai |
| `background` / `surface` | `#F8F9FF` | Latar halaman |
| `surface-container-low` | `#EFF4FF` | Latar input dan area sekunder |
| `surface-container` | `#E5EEFF` | Panel dan elemen pendukung |
| `surface-container-high` | `#DCE9FF` | Sorotan permukaan dan kartu tertentu |
| `surface-container-lowest` | `#FFFFFF` | Kartu utama dan panel |
| `on-surface` | `#0B1C30` | Teks utama |
| `on-surface-variant` | `#3D4947` | Teks pendukung |
| `outline` | `#6D7A77` | Ikon dan teks dengan penekanan rendah |
| `outline-variant` | `#BCC9C6` | Garis pembatas |
| `error` | `#BA1A1A` | Kesalahan dan tindakan berisiko |
| `error-container` | `#FFDAD6` | Latar pesan kesalahan |

### Aturan warna
1. Gunakan hijau teal sebagai warna identitas dan tindakan utama.
2. Gunakan biru untuk aksen sekunder atau informasi pemanggilan.
3. Gunakan hijau untuk status berhasil/selesai dan merah untuk kesalahan atau pembatalan.
4. Gunakan latar terang dan kartu putih agar data tetap mudah dibaca.
5. Jangan menyampaikan status hanya melalui warna; sertakan label teks dan, jika sesuai, ikon.

## 5. Tipografi

### Font
- **Plus Jakarta Sans:** judul, angka antrian, nama bagian, dan label yang perlu terlihat kuat.
- **Inter:** isi, keterangan, formulir, tabel, dan teks pendukung.

### Skala tipografi acuan
| Peran | Ukuran | Line-height | Bobot |
|---|---:|---:|---:|
| Angka antrian/display | 56 px | 64 px | 800 |
| Judul besar | 36 px | 44 px | 700 |
| Judul utama | 28 px | 36 px | 700 |
| Judul bagian | 20 px | 28 px | 600 |
| Subjudul | 16 px | 24 px | 600 |
| Isi standar | 14 px | 20 px | 400 |
| Isi kecil | 12 px | 18 px | 400 |
| Label kecil | 11 px | 14 px | 700 |

Untuk layar kecil, judul utama dapat diturunkan menjadi sekitar 22–28 px sesuai kepadatan konten. Angka nomor antrian harus mudah terlihat dari jarak penggunaan yang wajar.

## 6. Spasi, Bentuk, dan Elevasi
Gunakan skala spasi yang konsisten:
- `space-xs`: 4 px
- `space-sm`: 8 px
- `space-md`: 16 px
- `space-lg`: 24 px
- `space-xl`: 32 px
- Gutter umum: 24 px; pada layar sempit, sekitar 16 px.

### Radius
- `rounded-lg`: 8 px untuk input, tombol kecil, dan panel ringkas.
- `rounded-xl`: 12 px untuk kartu dan panel utama.
- `rounded-full`: badge status, chip filter, dan indikator berbentuk pil.

### Bayangan
- Gunakan bayangan tipis untuk memisahkan kartu dari latar.
- Bayangan lebih jelas boleh dipakai pada kartu login atau tombol aksi utama.
- Jangan memberi bayangan berat pada semua elemen sekaligus.

## 7. Pola Komponen

### 7.1 Halaman Login Petugas dan Dokter
- Pusatkan panel login secara horizontal dan vertikal.
- Gunakan latar terang dengan aksen dekoratif lembut di belakang panel.
- Tampilkan badge keamanan, logo, nama klinik, dan deskripsi sistem.
- Letakkan pesan kesalahan dekat bagian atas formulir dan sediakan tombol tutup.
- Setiap input harus memiliki label yang jelas, ikon pendukung, dan status fokus yang terlihat.
- Sediakan kontrol tampil/sembunyikan kata sandi.
- Tampilkan opsi “Ingat sesi saya” bila fitur tersebut benar-benar didukung.
- Kredensial demo ditampilkan sebagai pilihan cepat yang mudah dibedakan dari tombol login utama.
- Informasi koneksi dan versi sistem dapat ditempatkan di footer panel.

**Catatan:** jangan menampilkan kata sandi nyata atau menyimpan kredensial sensitif sebagai nilai bawaan di lingkungan produksi. Pesan kegagalan autentikasi harus berasal dari hasil autentikasi sebenarnya.

### 7.2 Sidebar Dashboard
- Lebar desktop acuan sekitar 256 px.
- Gunakan latar putih dan posisi tetap di sisi kiri pada desktop.
- Kelompokkan navigasi berdasarkan konteks, misalnya operasional klinis dan manajemen.
- Item navigasi terdiri dari ikon dan label.
- Tandai halaman aktif dengan latar `primary-container`, teks kontras, dan sudut membulat.
- Informasi status server dan versi aplikasi dapat ditempatkan di bagian bawah sidebar.
- Pada layar kecil, ubah sidebar menjadi drawer/menu yang dapat dibuka dan ditutup.

### 7.3 Top Bar
- Tinggi acuan sekitar 64 px.
- Tempatkan tanggal/waktu dan status audio di sisi kiri jika relevan.
- Tempatkan ringkasan jumlah antrian dan identitas pengguna di sisi kanan.
- Gunakan latar putih dengan pemisah atau bayangan tipis.
- Jangan biarkan top bar menutupi konten; beri offset/padding pada area utama.

### 7.4 Tombol Aksi Utama
- Tombol utama seperti **Buat Nomor Antrian** harus paling mudah ditemukan.
- Gunakan warna primer, label eksplisit, ikon yang relevan, dan area klik yang memadai.
- Jika shortcut keyboard ditampilkan, pastikan shortcut benar-benar berfungsi.
- Berikan state hover, focus, active, disabled, dan loading jika diperlukan.
- Tindakan berisiko seperti membatalkan antrian harus menggunakan gaya peringatan dan konfirmasi yang sesuai.

### 7.5 Kartu Ringkasan Statistik
- Gunakan kartu ringkas untuk total tiket, menunggu, dilayani, selesai, dan dibatalkan.
- Tampilkan label kecil, angka besar, dan satuan bila diperlukan.
- Gunakan warna status secara konsisten.
- Susun dalam grid responsif; jumlah kolom berkurang pada layar sempit.

### 7.6 Kartu Poliklinik
Setiap kartu poliklinik dapat berisi:
- Nama dan lokasi poli.
- Status buka/tutup.
- Jumlah pasien yang menunggu.
- Nomor antrian yang sedang dilayani.
- Nomor antrian berikutnya.
- Perkiraan waktu tunggu.
- Tautan atau tombol untuk melihat detail.

Gunakan garis aksen atas atau aksen warna untuk membedakan kategori, tetapi pastikan informasi tetap dapat dipahami tanpa mengandalkan warna saja.

### 7.7 Tabel Antrian Pasien
- Letakkan judul, deskripsi, pencarian, filter, dan ekspor di area kepala tabel.
- Kolom yang tampak pada contoh meliputi nomor antrian, identitas pasien/nomor rekam medis, poli, waktu pengambilan, penjamin, status, dan aksi.
- Nomor antrian harus tampil menonjol dalam badge.
- Nama pasien menjadi teks utama; metadata pasien menjadi teks pendukung.
- Status ditampilkan sebagai badge dengan label dan indikator visual.
- Aksi per baris harus menggunakan ikon yang memiliki label aksesibel atau tooltip.
- Gunakan garis pemisah halus dan sorotan hover yang ringan.
- Pada layar kecil, izinkan tabel bergulir horizontal atau ubah menjadi tampilan kartu yang lebih sesuai.

### 7.8 Formulir dan Input
- Selalu sediakan label yang terhubung dengan input.
- Gunakan latar input yang sedikit berbeda dari kartu.
- Tampilkan state fokus yang jelas.
- Placeholder hanya sebagai contoh, bukan pengganti label.
- Berikan pesan validasi di dekat bidang yang bermasalah.
- Bedakan kontrol yang wajib diisi secara jelas.

### 7.9 Badge Status
Gunakan label status yang konsisten, misalnya:
- **Menunggu:** netral.
- **Dipanggil:** aksen biru.
- **Dilayani:** primer/teal.
- **Selesai:** hijau.
- **Dibatalkan:** merah.

Warna di atas mengikuti pola visual yang tampak pada kode dan dapat disesuaikan dengan pedoman aksesibilitas proyek.

### 7.10 Alert / Banner
- Pesan kesalahan menggunakan latar merah muda lembut, ikon kesalahan, judul singkat, penjelasan, dan tombol tutup.
- Pesan sukses atau informasi harus memiliki warna dan ikon yang sesuai.
- Jangan mengandalkan animasi saja untuk menyampaikan perubahan status.

## 8. Ikon dan Aset
- Gunakan **Material Symbols Outlined** sebagai keluarga ikon utama karena kode sudah memakainya.
- Gunakan ikon yang konsisten dengan tindakan, misalnya registrasi, dokter, monitor, pencarian, pengaturan, unduh, dan status.
- Hindari mencampur banyak keluarga ikon dengan gaya yang berbeda.
- Logo harus menggunakan aset resmi klinik bila tersedia; jangan menganggap gambar contoh sebagai logo final tanpa konfirmasi.

## 9. Layout Responsif
### Desktop
- Sidebar tetap di kiri.
- Top bar mengikuti area konten di sebelah sidebar.
- Gunakan grid statistik dan kartu poli.
- Tabel dapat memanfaatkan lebar layar.

### Tablet
- Kurangi padding horizontal.
- Pastikan sidebar tidak mengambil ruang konten secara berlebihan.
- Susun ulang statistik dan kartu sesuai ruang yang tersedia.

### Mobile
- Jadikan navigasi sebagai drawer atau menu ringkas.
- Susun kartu dalam satu kolom atau grid sempit.
- Izinkan kontrol filter membungkus ke baris baru.
- Hindari tombol atau input yang terlalu kecil.
- Pastikan tabel memiliki alternatif tampilan atau gulir horizontal yang jelas.
- Periksa agar teks, badge, dan tombol tidak saling bertumpuk.

## 10. Aksesibilitas dan Kemudahan Penggunaan
- Jaga kontras teks dan latar yang memadai.
- Pastikan semua kontrol bisa digunakan dengan keyboard.
- Sediakan indikator fokus yang terlihat.
- Beri label aksesibel pada tombol ikon.
- Gunakan elemen HTML semantik seperti `header`, `nav`, `main`, `form`, `label`, dan `button`.
- Jangan memakai warna sebagai satu-satunya penanda status.
- Berikan konfirmasi untuk tindakan yang dapat mengubah atau menghapus data pasien.
- Tampilkan waktu, status, dan nomor antrian dalam format yang konsisten.

## 11. Prinsip Interaksi
- Beri respons visual segera setelah pengguna melakukan tindakan.
- Gunakan pesan keberhasilan/kegagalan yang singkat dan mudah dipahami.
- Hindari tombol yang tampak aktif tetapi tidak menjalankan fungsi.
- Pembaruan otomatis harus menampilkan waktu atau indikator pembaruan yang masuk akal.
- Jika pemanggilan menggunakan audio, sediakan indikator status dan kontrol yang jelas.
- Jika jaringan atau server terputus, tampilkan status yang benar dan jangan berpura-pura data sudah tersimpan.
- Data contoh harus dibedakan dari data operasional nyata.

## 12. Konsistensi Konten
- Gunakan Bahasa Indonesia yang ringkas dan baku.
- Gunakan istilah yang konsisten: “Nomor Antrian”, “Menunggu”, “Dipanggil”, “Dilayani”, “Selesai”, dan “Dibatalkan”.
- Hindari singkatan yang tidak dikenal pengguna.
- Angka statistik harus memiliki konteks, misalnya jumlah pasien atau tiket.
- Gunakan data pasien fiktif untuk prototipe atau dokumentasi.

## 13. Batasan yang Terlihat pada Kode Contoh
Kode yang diberikan memperlihatkan struktur visual dan beberapa interaksi JavaScript, tetapi tidak membuktikan bahwa seluruh fungsi sistem sudah terhubung ke backend. Dalam pengembangan lanjutan:
- Pastikan login terhubung ke autentikasi yang aman.
- Pastikan tombol pembuatan nomor antrian benar-benar membuat data.
- Pastikan pencarian, filter, ekspor, navigasi, dan aksi tabel berfungsi.
- Pastikan angka dashboard berasal dari data yang konsisten.
- Pastikan integrasi SIMRS/BPJS hanya ditampilkan sebagai fitur terintegrasi jika memang sudah tersedia dan teruji.
- Hindari menampilkan IP server, kredensial demo, atau detail internal pada antarmuka produksi kecuali memang diperlukan dan aman.

## 14. Checklist Sebelum Menyelesaikan Desain
- [ ] Palet warna dan tipografi konsisten.
- [ ] Tombol utama mudah ditemukan.
- [ ] Status antrian jelas dan tidak hanya dibedakan dengan warna.
- [ ] Formulir memiliki label dan validasi.
- [ ] Sidebar menunjukkan menu aktif.
- [ ] Kartu statistik dan kartu poli tersusun rapi.
- [ ] Tabel dapat digunakan pada layar kecil.
- [ ] Semua ikon memiliki fungsi atau label yang jelas.
- [ ] State hover, focus, disabled, loading, error, dan empty dipertimbangkan.
- [ ] Data sensitif dan kredensial tidak terekspos.
- [ ] Semua tindakan yang ditampilkan benar-benar berfungsi.
- [ ] Tampilan diuji pada desktop, tablet, dan mobile.

## 15. Instruksi Ringkas untuk AI Desain
Saat membuat atau mengubah UI untuk sistem ini, ikuti panduan berikut:

> Rancang antarmuka Sistem Informasi Antrian Klinik yang modern, profesional, bersih, dan mudah digunakan oleh petugas klinik serta tenaga medis. Gunakan palet teal sebagai warna primer, biru sebagai aksen sekunder, latar biru-putih yang sangat terang, kartu putih dengan radius sekitar 12 px, bayangan lembut, Inter untuk isi, Plus Jakarta Sans untuk judul dan angka antrian, serta Material Symbols Outlined untuk ikon. Pertahankan hierarki informasi yang jelas: navigasi, ringkasan statistik, informasi poliklinik, tabel antrian, dan tindakan utama. Gunakan Bahasa Indonesia, status antrian yang eksplisit, formulir yang aksesibel, serta layout responsif untuk desktop, tablet, dan mobile. Jangan menambahkan fitur yang tidak diminta, jangan menampilkan data sensitif, dan jangan membuat kontrol yang hanya dekoratif tanpa fungsi.
