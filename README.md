# Digital Solusi Nusantara - Company Profile

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Deskripsi Proyek

Digital Solusi Nusantara adalah aplikasi website company profile dinamis berbasis arsitektur Monorepo yang dikembangkan untuk memenuhi persyaratan Sertifikasi Kompetensi Web Developer. Proyek ini mendemonstrasikan kemampuan pengembangan full-stack menggunakan ekosistem JavaScript (Node.js & Vite), manajemen database relasional, serta penerapan praktik keamanan dan clean code.

Sistem ini memisahkan logika backend (API) dan frontend (Client) dalam satu repositori terpadu, memungkinkan manajemen dependensi yang efisien dan deployment yang terkoordinasi.

## Tujuan Sertifikasi

Proyek ini dibangun untuk memvalidasi unit kompetensi berikut:
- [x] Merancang arsitektur RESTful API menggunakan Node.js dan Express
- [x] Mengimplementasikan koneksi dan query database MySQL yang aman
- [x] Membangun antarmuka pengguna dinamis menggunakan Vite dan JavaScript Modern
- [x] Menerapkan mekanisme autentikasi (JWT) dan otorisasi berbasis peran
- [x] Melakukan validasi input dan penanganan error (Error Handling)
- [x] Mengelola environment variables dan konfigurasi deployment

## Fitur Utama

### Backend (API Server)
- **RESTful Architecture:** Endpoint terstruktur untuk layanan, portofolio, tim, dan testimoni.
- **Authentication & Authorization:** Implementasi JSON Web Token (JWT).
- **Database Seeding:** Skrip otomatis (`seed/createAdmin.js`) untuk inisialisasi data awal dan akun administrator.

### Frontend (Client Application)
- **Dynamic Rendering:** Pengambilan data real-time dari API backend tanpa reload halaman penuh.
- **Build Optimization:** Menggunakan Vite untuk Hot Module Replacement (HMR) saat development dan bundling optimal saat production.
- **Responsive Layout:** Desain adaptif untuk desktop, tablet, dan mobile.
- **Code Quality:** Integrasi ESLint untuk menjaga konsistensi gaya kode JavaScript.

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **Runtime** | Node.js v20+ |
| **Backend Framework** | Express.js |
| **Database** | MySQL 8.0 (Driver: mysql2) |
| **Frontend Build Tool** | Vite |
| **Frontend Language** | JavaScript (ES6+) |
| **Linting** | ESLint |
| **Environment** | dotenv |

## Struktur Direktori

Proyek menggunakan struktur monorepo sebagai berikut:

```text
digital_solusi_nusantara/
├── backend/                 # Server-side application
│   ├── config/              # Konfigurasi database (db.js)
│   ├── routes/              # Definisi endpoint API
│   ├── seed/                # Script seeding data (createAdmin.js)
│   ├── .env                 # Environment variables (tidak masuk version control)
│   ├── server.js            # Entry point aplikasi backend
│   └── package.json         # Dependensi backend
├── frontend/                # Client-side application
│   ├── public/              # Aset statis
│   ├── src/                 # Source code komponen dan logika UI
│   ├── index.html           # Entry point HTML
│   ├── vite.config.js       # Konfigurasi build tool
│   ├── eslint.config.js     # Aturan linting
│   └── package.json         # Dependensi frontend
└── README.md                # Dokumentasi proyek
