# Backend

Deskripsi singkat tentang proyek ini.

## Langkah-langkah untuk Menjalankan Proyek

### 1. Jalankan Docker Compose

Pastikan Docker dan Docker Compose sudah terinstal di sistem Anda. Setelah itu, jalankan perintah berikut untuk membangun dan menjalankan container:

```bash
docker-compose up -d
### 2. Instal Dependensi Node.js

Setelah container berjalan, masuk ke dalam direktori proyek dan instal dependensi yang diperlukan menggunakan `npm`. Pastikan Anda sudah berada di dalam folder proyek yang benar sebelum menjalankan perintah berikut:

`npm install`

Perintah ini akan menginstal semua dependensi yang terdaftar dalam file `package.json`. Jika Anda melihat pesan kesalahan atau ada dependensi yang hilang, pastikan untuk memeriksa kembali file `package.json` dan jalankan ulang perintah ini.

### 3. Jalankan Seed Database

Setelah dependensi diinstal, Anda perlu menginisialisasi database dengan data awal. Gunakan perintah berikut untuk menjalankan proses seeding:

`npm run seed`

Perintah ini akan mengisi database dengan data awal yang diperlukan untuk aplikasi berjalan. Proses ini bergantung pada implementasi yang ada di dalam script `seed.js` atau yang ada pada konfigurasi seeding di proyek Anda.

### 4. Salin File `.env.example` menjadi `.env`

File `.env` berisi variabel lingkungan yang dibutuhkan oleh aplikasi. Salin file `.env.example` yang ada di dalam proyek ke file `.env` dengan perintah berikut:

`cp .env.example .env`

Setelah itu, buka file `.env` dan sesuaikan pengaturan konfigurasi yang ada sesuai dengan kebutuhan lingkungan Anda (misalnya, pengaturan database, API keys, dll).

### 5. Jalankan Proyek dalam Mode Development

Setelah melakukan semua pengaturan di atas, Anda bisa menjalankan aplikasi dalam mode development dengan perintah berikut:

`npm run dev`

Perintah ini akan menjalankan server dalam mode pengembangan. Aplikasi akan mulai berjalan dan dapat diakses melalui browser, biasanya pada port `http://localhost:8000` atau port yang ditentukan dalam file `.env`.

Jika semua langkah di atas berhasil, aplikasi Anda sekarang sudah berjalan di lingkungan pengembangan dan siap untuk digunakan.
```
