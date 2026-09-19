# FJ RentCar — Railway Production Starter

**Deployment target: Railway.** The old Vercel instructions in the historical notes below are not required for this package.

# FJ RentCar — Production Stage

Aplikasi production-ready starter FJ RentCar dengan Next.js, PostgreSQL, Prisma, Auth.js dan Midtrans Snap. Pastikan environment dan database production dikonfigurasi sebelum menerima transaksi nyata.

## Sudah tersedia
- Customer register/login
- Fleet FJ RentCar seeded
- Booking dengan driver/self-drive
- Perhitungan harga dari database server
- Proteksi booking berdasarkan session customer
- Pemeriksaan bentrok waktu kendaraan
- Customer dashboard
- Midtrans Snap Sandbox
- Webhook Midtrans + SHA512 signature verification
- Idempotent payment record berdasarkan orderId
- Status PAID/CONFIRMED dari webhook server
- Admin dashboard
- Admin update status booking
- Admin tambah kendaraan
- Soft-delete kendaraan
- Invoice PDF
- Quotation PDF
- Tombol konfirmasi WhatsApp
- Security headers dasar

## Setup
1. `npm install`
2. Salin `.env.example` menjadi `.env`.
3. Isi `DATABASE_URL`, `AUTH_SECRET`, dan kredensial Midtrans Sandbox.
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run db:seed`
7. `npm run dev`

Admin default: `admin@fjrentcar.id`. Password mengikuti `ADMIN_PASSWORD`; jika tidak diisi, seed memakai `CHANGE_ME_ADMIN_PASSWORD`. **Wajib diganti sebelum deployment.**

## Midtrans
Notification URL Sandbox:
`https://DOMAIN-ANDA/api/payments/webhook`

Endpoint harus publik. Gunakan HTTPS pada deployment. Webhook memverifikasi `SHA512(order_id + status_code + gross_amount + ServerKey)` dan hanya menganggap `settlement`/`capture` sebagai pembayaran sukses sesuai status/fraud yang diterima.

## Production checklist
- Gunakan PostgreSQL managed.
- Set `MIDTRANS_IS_PRODUCTION=true` hanya setelah akun/credential production siap.
- Gunakan Client Key di frontend dan simpan Server Key hanya di server.
- Set Notification URL HTTPS.
- Ganti ADMIN_PASSWORD.
- Tambahkan rate limiting/WAF pada deployment.
- Backup database.
- Uji booking overlap, pembayaran pending/expire/cancel, refund, dan webhook duplicate.
- Untuk anti-double-booking tingkat database, gunakan PostgreSQL exclusion constraint/serializable strategy bila kebutuhan transaksi meningkat.

## Data bisnis FJ RentCar
WhatsApp: 081211048253
Email: fjrentcar1@gmail.com
Alamat: Apartemen Bassura City, Tower H, RT.11/RW.8, Cipinang Besar Selatan, Jatinegara, Jakarta Timur, DKI Jakarta 13410


## Deploy Vercel
1. Push folder `fjwork` ke repository Git.
2. Import repository ke Vercel.
3. Set semua variable dari `.env.example` di Project Settings → Environment Variables.
4. Jalankan build `npm run build`.
5. Setelah domain aktif, set Notification URL Midtrans ke `https://fjrentcar.id/api/payments/webhook`.
6. Jalankan migration/seed dari environment database yang benar sebelum membuka booking untuk publik.

## Production notes
- `MIDTRANS_SERVER_KEY` hanya server-side.
- `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` boleh dikirim ke browser.
- `NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION` harus konsisten dengan `MIDTRANS_IS_PRODUCTION`.
- Tarif default booking dibatasi maksimal 12 jam sesuai price list FJ RentCar.
- Uji webhook duplicate, cancel, expire, pending, settlement/capture sebelum live.


## Vercel deployment
Framework: Next.js. Root Directory: `./`. The build command runs `prisma generate && next build`. Configure `DATABASE_URL` and authentication/payment variables in Vercel before enabling booking/payment features.


Build fixes in v5: explicit NextAuthResult typing for Auth.js exports and Next.js upgraded to 15.5.24, a patched 15.5 maintenance release.

## Build fix v6
The Auth.js `NextAuthResult` type export was removed from `auth.ts`. The app now uses the supported inferred pattern `export const { handlers, auth, signIn, signOut } = NextAuth({...})`, compatible with next-auth 5.0.0-beta.29.


Build fix v7: next-auth upgraded to 5.0.0-beta.32; TypeScript config aligned with Next.js/Auth.js bundler settings; auth.ts uses a named config object before NextAuth initialization.

## Authentication note (v8)
Auth.js/NextAuth was removed from this deployment build because the current beta package was causing a Vercel TypeScript compatibility failure in `auth.ts`. The app now uses a small signed, HttpOnly cookie session with Node's built-in HMAC crypto and bcryptjs. Set `AUTH_SECRET` (a long random value) in Vercel Environment Variables before using login/admin/booking APIs.

## Railway deployment
This package is prepared for Railway instead of Vercel.

1. Create a Railway project.
2. Add PostgreSQL from + New -> Database -> PostgreSQL.
3. Deploy this repository/ZIP as the web service.
4. Service Settings -> Build:
   - Build Command: `npm run build`
5. Service Settings -> Deploy:
   - Pre-Deploy Command: `npx prisma migrate deploy`
   - Start Command: `npm run start`
   - Healthcheck Path: `/api/health`
6. Add `DATABASE_URL` to the web service as `${{Postgres.DATABASE_URL}}`.
7. Add `AUTH_SECRET`, `ADMIN_PASSWORD`, and Midtrans variables from `.env.example`.
8. After the first successful deployment, run `npm run db:seed` once from the Railway service shell.
9. Generate a Railway domain and test `/api/health`.
10. Add `fjrentcar.id` as the custom domain and configure the CNAME/TXT records Railway provides.

Railway's managed PostgreSQL exposes `DATABASE_URL`, and Railway recommends a pre-deploy `prisma migrate deploy` for Prisma migrations. The app uses Next.js standalone output for a smaller production runtime.
