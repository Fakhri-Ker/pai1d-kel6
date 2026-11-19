# Website Etika di Era Teknologi Informasi — Kelompok 6 (PAI 1D)

Website statis responsif untuk media pembelajaran dan dapat dijalankan secara lokal atau dipublikasikan melalui GitHub Pages.

## Isi website
- Beranda dan lima halaman materi, ditambah halaman Tentang Kami.
- Materi utama mengikuti urutan PDF Pertemuan 06: Cyberethics, prinsip/dimensi etika, perkembangan cyberspace, Real Space = Cyber Space, serta kasus dan penanganan.
- Setiap subbab berisi uraian penjelasan, contoh atau penerapan bila relevan, rujukan halaman PDF, dan kotak **Kesimpulan Subbab**.
- Materi dilengkapi referensi akademik, kode etik ACM, peraturan Indonesia, panduan BSSN, dan contoh kasus dari pemberitaan resmi kepolisian.
- Data statistik internet pada slide 24 PDF berasal dari 2011–2012 dan tidak disajikan sebagai statistik terkini.

## Struktur
- `index.html`: Beranda.
- `cyberethics.html`: Cyberethics dan sistem moral.
- `prinsip-etika.html`: Prinsip dan lima dimensi moral.
- `perkembangan-cyberspace.html`: Perkembangan cyberspace dan transformasi sosial-budaya.
- `real-space-cyber-space.html`: Kesinambungan norma dunia nyata dan dunia maya.
- `kasus-kesimpulan.html`: Kejahatan komputer, contoh kasus, penanganan, bukti digital, dan referensi.
- `tentang-kami.html`: Profil lima anggota.
- `css/` dan `js/`: gaya dan interaksi website.

## Data yang masih perlu diisi oleh kelompok
1. Ganti `Nama Anggota 1` sampai `Nama Anggota 5` dan NIM di `tentang-kami.html`.
2. Isi kontribusi aktual masing-masing anggota di halaman Tentang Kami.
3. Letakkan logo kelompok bernama `logo pai1d.png` di `assets/foto/`.
4. Letakkan video pengenalan bernama `video-pengenalan.mp4` di `assets/video/`.

Nama anggota, NIM, logo, dan video sengaja tidak dibuat-buat. Placeholder tersebut perlu diganti dengan data dan aset asli sebelum publikasi final.

## Welcome Screen
- Welcome Screen muncul saat kunjungan pertama atau setelah enam jam tanpa aktivitas di website.
- Setelah tombol **Masuk ke Website** ditekan, penanda sesi disimpan menggunakan `sessionStorage`, sehingga perpindahan antarhalaman dalam tab yang sama tidak memunculkan Welcome Screen berulang kali.
- Waktu aktivitas terakhir disimpan menggunakan `localStorage`, sehingga kunjungan berikutnya tetap dapat diperiksa setelah tab/browser ditutup.
- Untuk pengujian lokal, jalankan melalui Live Server atau server lokal, bukan dengan membuka setiap file HTML secara terpisah melalui `file://`.

## Menjalankan website
- Buka folder proyek menggunakan VS Code.
- Jalankan `index.html` melalui ekstensi Live Server atau server web statis.
- Untuk GitHub Pages, unggah isi folder proyek ke root repository, lalu pilih Settings → Pages → Deploy from a branch → branch utama → `/ (root)`.

## Catatan akademik
- PDF Pertemuan 06 menjadi sumber utama dan urutan pokok bahasan.
- Penjelasan tambahan diberi rujukan pada bagian terkait dan daftar referensi di halaman terakhir.
- Bagian contoh kasus dan langkah penanganan merupakan pengayaan agar topik “Kasus dan Penanganan” lebih aplikatif; bagian tersebut dibedakan dari isi asli slide.
- Uraian hukum disediakan untuk tujuan pembelajaran, bukan sebagai nasihat hukum.

## Transisi halaman
Setiap navigasi internal antarhalaman menampilkan skeleton loading singkat sebelum konten halaman tujuan muncul. Tautan anchor dalam halaman yang sama dan tautan eksternal tidak menampilkan skeleton.

## Versi 0.4
- Menambahkan skeleton loading pada navigasi internal antarhalaman.
- Skeleton tidak muncul untuk tautan anchor pada halaman yang sama atau tautan eksternal.
- Navigasi halaman tetap menggunakan HTML biasa, sehingga kompatibel dengan GitHub Pages.


## Welcome Screen
- Welcome Screen tampil pada kunjungan pertama atau setelah 6 jam tanpa aktivitas.
- Setelah tombol Masuk ditekan, perpindahan antarhalaman di tab yang sama tidak memunculkan Welcome Screen lagi.
- Status disimpan melalui localStorage/sessionStorage, dengan fallback `window.name` untuk preview lokal `file://`.
- Untuk pengujian yang paling konsisten, jalankan folder melalui VS Code Live Server atau deploy ke GitHub Pages.


## Pembaruan UX (v0.6)
- Scroll progress bar di bagian atas halaman.
- Scroll reveal ringan pada elemen penting.
- Penanda subbab aktif mengikuti posisi scroll.
- Micro-interactions dan fokus keyboard yang lebih jelas.
- Pemisah subbab dengan aksen Emerald–Gold.
- **Khusus HP (maksimal 620px):** subbab dipindahkan ke menu hamburger dalam bentuk accordion. Bab yang sedang dibuka otomatis menampilkan subbabnya; bab lain tertutup dan dapat dibuka manual melalui tombol panah.
- **Desktop/laptop:** daftar subbab tetap berada di sidebar kiri seperti sebelumnya.
- Pengaturan `prefers-reduced-motion` dihormati agar animasi tidak mengganggu pengguna yang memilih gerakan minimal.


## Video pengenalan YouTube
- Beranda menggunakan video YouTube dengan ID `QDia3e12czc`.
- Video ditampilkan melalui YouTube privacy-enhanced embed (`youtube-nocookie.com`).
- Iframe baru dimuat setelah Welcome Screen dilewati atau tombol Masuk ditekan.
- Autoplay dicoba dalam keadaan mute karena browser umumnya membatasi autoplay dengan suara.
- Pengunjung dapat mengaktifkan suara melalui kontrol pemutar YouTube.
- Video tetap responsif dengan rasio 16:9 dan tidak memerlukan file MP4 di `assets/video/`.


## Pengaturan autoplay video dengan suara (v0.8)
- Parameter mute dihapus agar pemutar YouTube mencoba memulai dengan suara aktif.
- Iframe dimuat setelah tombol Masuk ditekan pada Welcome Screen.
- Browser tetap dapat membatasi autoplay bersuara. Jika diblokir, pengunjung perlu menekan tombol putar atau kontrol suara pada pemutar.
- Pada kunjungan yang melewati Welcome Screen secara otomatis (misalnya masih dalam jangka 6 jam), browser mungkin tidak mengizinkan autoplay bersuara karena tidak ada interaksi baru.
