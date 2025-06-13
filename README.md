# 🧴 assistantSkin

**assistantSkin** adalah aplikasi berbasis web untuk deteksi penyakit kulit wajah menggunakan gambar dari kamera atau upload. Aplikasi ini juga menyediakan fitur edukasi, peta lokasi fasilitas kesehatan, penyimpanan riwayat hasil deteksi, dan kolom komentar dari pengguna lain.

Dibangun menggunakan **MERN Stack** (MongoDB, Express.js, React, Node.js) dan **Tailwind CSS** untuk tampilan yang modern dan responsif. Proyek ini sudah dideploy dengan frontend menggunakan **Vercel**, dan backend menggunakan **Railway**.

---

## 🚀 Fitur Utama

* 🔐 Login dan Register (tidak wajib, tapi diperlukan untuk akses fitur lanjutan)
* 📸 Deteksi penyakit kulit dari kamera atau upload gambar
* 🗂️ Menyimpan riwayat hasil deteksi (hanya jika login)
* 💬 Komentar / feedback publik dari pengguna (hanya jika login)
* 🧭 Peta lokasi apotek dan rumah sakit terdekat
* 📚 Artikel edukatif berdasarkan hasil deteksi

---

## 💪 Teknologi yang Digunakan

* **Frontend:** React, Vite, Tailwind CSS, Redux Toolkit
* **Backend:** Express.js, MongoDB (Mongoose), JWT
* **Deployment:** Vercel (Frontend), Railway (Backend)

---

## 📦 Struktur Branch

* `main` → Branch utama untuk deployment ke Vercel
* `frontend` → Source kode pengembangan frontend
* `backend` → Source kode backend dan deployment ke Railway

---

## 📁 Konfigurasi .env (untuk Backend)

Buat file `.env` di dalam folder `backend` dengan isi sebagai berikut:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

---

## 👨‍💻 Cara Menjalankan Secara Lokal

### 1. Clone repository:

```bash
git clone https://github.com/Ilham593/asistant-kulit.git
```

### 2. Checkout ke branch `frontend` lalu jalankan frontend:

```bash
git checkout frontend
npm install
npm run dev
```

Frontend berjalan di: [http://localhost:5173](http://localhost:5173)

### 3. Checkout ke branch `backend` lalu jalankan backend:

```bash
git checkout backend
npm install
npm run start
```

Backend berjalan di: [http://localhost:5000](http://localhost:5000)

---

## 🗺️ Navigasi Halaman

* `/beranda` – Beranda aplikasi
* `/deteksi` – Deteksi penyakit kulit
* `/riwayat` – Riwayat deteksi (hanya untuk pengguna login)
* `/feedback` – Komentar dan feedback (hanya untuk pengguna login)
* `/edukasi` – Artikel edukatif tentang perawatan kulit

---

## ✨ Catatan Tambahan

* Pengguna tidak harus login, namun fitur seperti **riwayat** dan **feedback** hanya tersedia untuk pengguna yang sudah login.
* Kamera memerlukan izin akses dari browser agar bisa digunakan.
* Semua data tersimpan per akun pengguna (jika login).

---

## 🌐 Link Demo

Frontend (Vercel): [https://asistant-kulit-dbs.vercel.app/beranda](https://asistant-kulit-dbs.vercel.app/beranda)
Backend (Railway): [https://asistant-kulit-production-7ab2.up.railway.app/api-docs/](https://asistant-kulit-production-7ab2.up.railway.app/api-docs/)

---

## 🤝 Kontribusi

Pull request sangat terbuka untuk perbaikan atau pengembangan lanjutan.

---

## 📄 Lisensi

MIT License. Silakan digunakan dan dikembangkan untuk edukasi, riset, atau portofolio pribadi.
