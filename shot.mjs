import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = 'http://localhost:5173'
const OUT = decodeURIComponent(new URL('./docs/', import.meta.url).pathname).replace(
  /^\/([A-Za-z]:)/,
  '$1',
)

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

const shot = async (name) => {
  await page.waitForTimeout(350)
  await page.screenshot({ path: `${OUT}${name}.png` })
  console.log('saved', name)
}

// 1. daftar tugas
await page.goto(BASE, { waitUntil: 'networkidle' })
await shot('01-daftar-tugas')

// 2. modal tambah
await page.getByRole('button', { name: 'Tambah Todo' }).click()
await shot('02-modal-tambah')
await page.getByRole('button', { name: 'Batal' }).click()

// 3. isi form tambah lalu submit
await page.getByRole('button', { name: 'Tambah Todo' }).click()
await page.fill('#title', 'Belajar React Router')
await page.fill('#description', 'Mempelajari routing pada aplikasi React')
await page.selectOption('#status', 'to-do')
await page.selectOption('#priority', 'medium')
await page.fill('#deadline', '2026-11-30')
await page.getByRole('button', { name: 'Tambah', exact: true }).click()
await shot('03-tambah-berhasil')
await page.waitForTimeout(2600) // tunggu toast hilang sebelum pindah halaman

// 4. detail tugas
await page.locator('button.view').first().click()
await page.waitForURL('**/todo/**')
await shot('04-detail-tugas')

// 5. modal update
await page.getByRole('button', { name: 'Update' }).click()
await shot('05-modal-update')
await page.getByRole('button', { name: 'Batal' }).click()

// 6. konfirmasi hapus
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.locator('button.delete').first().click()
await shot('06-konfirmasi-hapus')
await page.getByRole('button', { name: 'Batal' }).click()

// 7. hapus berhasil + toast
await page.locator('button.delete').first().click()
await page.getByRole('button', { name: 'Hapus', exact: true }).click()
await shot('07-hapus-berhasil')

await browser.close()
console.log('done')
