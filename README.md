# Digital Solusi Nusantara

Website company profile untuk PT Digital Solusi Nusantara, lengkap dengan dashboard admin untuk mengelola konten (profil, produk, layanan, artikel, galeri, dll).

## Struktur Proyek

```
digital_solusi_nusantara/
├── backend/     → REST API (Express + MySQL)
└── frontend/    → Website + dashboard admin (React + Vite)
```

## Yang Perlu Disiapkan

- [Node.js](https://nodejs.org/) (v18 ke atas disarankan)
- MySQL/MariaDB (bisa lewat XAMPP, Laragon, atau instalasi MySQL biasa)
- npm (biasanya sudah termasuk saat install Node.js)

## 1. Clone & Install

```bash
git clone <url-repo-ini>
cd digital_solusi_nusantara
```

Install dependency di kedua folder:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 2. Setup Database

Buat database baru bernama `pt_digital_solusi`, lalu jalankan skrip berikut untuk membuat seluruh tabel yang dibutuhkan.

<details>
<summary>Klik untuk lihat skrip SQL lengkap</summary>

```sql
CREATE DATABASE IF NOT EXISTS pt_digital_solusi;
USE pt_digital_solusi;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `statement` varchar(30) NOT NULL,
  `description` varchar(500) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `missions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(4) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(300) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `core_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `summary` varchar(300) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `youtube` varchar(100) NOT NULL,
  `tiktok` varchar(100) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

</details>

> Tabel `contact` dan `vision` sebaiknya diisi tepat satu baris data saja, karena dashboard admin memperlakukan keduanya sebagai data tunggal (bukan daftar).

## 3. Konfigurasi Environment (Backend)

Buat file `.env` di dalam folder `backend/`:

```dotenv
JWT_SECRET=isi_dengan_string_acak_yang_panjang

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pt_digital_solusi
DB_PORT=4600
```

> Sesuaikan `DB_PORT` dengan port MySQL di komputer kamu — defaultnya biasanya **3306** (XAMPP/Laragon standar). Sesuaikan juga `DB_USER`/`DB_PASSWORD` kalau MySQL kamu tidak pakai `root` tanpa password.

## 4. Buat Akun Admin

Dari dalam folder `backend/`, jalankan:

```bash
node seed/createAdmin.js
```

Ini akan membuat satu akun admin dengan kredensial berikut (bisa diubah langsung di file `createAdmin.js` sebelum dijalankan):

- **Email:** `digisolunusanadmin@solusidigital.co.id`
- **Password:** `Rakan1811`

## 5. Menjalankan Proyek

Buka dua terminal terpisah.

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```
Backend akan berjalan di `http://localhost:3000`.

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di `http://localhost:5173`.

## 6. Mencoba Website

| Halaman | URL |
|---|---|
| Beranda | `http://localhost:5173/` |
| Profil | `http://localhost:5173/profil` |
| Produk & Layanan | `http://localhost:5173/produklayanan` |
| Artikel | `http://localhost:5173/artikel` |
| Gallery | `http://localhost:5173/gallery` |
| Contact | `http://localhost:5173/contact` |
| **Login Admin** | `http://localhost:5173/admin/login` |

Login ke dashboard admin menggunakan akun yang dibuat di langkah 4, lalu coba:
- Pilih kategori data dari dropdown (Visi, Misi, Sejarah, Produk, dst.)
- Klik salah satu data di daftar untuk melihat/mengedit isinya
- Klik **Toggle Tambah/Edit Data** untuk beralih ke mode tambah data baru
- Untuk data yang punya gambar (Produk, Layanan, Artikel, Galeri), pilih file gambar sebelum menyimpan

## Troubleshooting Umum

**`Host 'localhost' is not allowed to connect to this MariaDB server`**
User MySQL belum punya izin akses dari host tersebut. Coba ganti `DB_HOST` di `.env` menjadi `127.0.0.1`, atau jalankan:
```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

**Gambar tidak muncul setelah upload**
Pastikan folder `frontend/public/images/<nama-folder>/` (misalnya `products`, `gallery`) sudah ada. Backend akan otomatis membuatnya jika belum ada, tapi jika masih gagal, buat manual.

**Tidak bisa login / sesi tiba-tiba habis**
Token login berlaku 1 jam. Login ulang lewat halaman `/admin/login` jika sesi habis.
