# Image Resizer
Resize image secara dinamis dengan nodejs
## Development
1. Install dependency beserte dev dependency
  ```
  pnpm install
  ```
2. Jalankan aplikasi ini dalam watch mode
  ```
  pnpm dev
  ```
## Deploy ke Production
1. Install dependency untuk persiapan build project
  ```
  pnpm install
  ```
2. Build project ini dengan perintah
  ```
  pnpm build
  ```
  > Note: pastikan project ini dibuild di dalam arsitektur yang sama dengan arsitektur server di mana project ini akan diserve. Misal arsitektur server adalah arm64 maka project harus dibuild di arsitektur arm64

3. Hapus dev dependency yang tidak terpakai di production
  ```
  pnpm install --production
  ```
4. Upload folder `dist`, `node_modules`, dan file `package.json` ke server
5. Jalankan aplikasi di server
  ```
  pnpm start
  ```
  > Note: untuk sementara aplikasi akan berjalan di port 8000. Kedepannya akan dibuat custom port yang bisa disetting dari .env

## Penggunaan
1. Setelah aplikasi berjalan, misal di `localhost:8000`, pastikan mengakses `localhost:8000` dan tampil 
  ```
  Image Resizer Service is running
  ```
2. Akses url untuk meresize gambar dengan struktrur sebagai berikut
    ```
    localhost:8000/{originalExtension}/{width}/{namaGambar}.webp/?domain={domainGambar}
    ```
    misal kita akan resize gambar dari https://site.s3.amazonaws.com/product/abcde.jpg
  
    maka url untuk meresize gambar menjadi webp dengan width 100px adalah
   ```
   localhost:8000/jpg/100/product+abcde.web/?domain=site.s3.amazonaws.com
   ```
    > Note: perhatikan bahwa nama gambar dengan backslash `/` direplace dengan `+`

