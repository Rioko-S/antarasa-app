import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export default function App() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStores() {
      // Mengambil data toko dari tabel 'stores'
      const { data, error } = await supabase.from('stores').select('*')
      if (error) {
        console.error('Error fetching stores:', error)
      } else {
        setStores(data || [])
      }
      setLoading(false)
    }

    fetchStores()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-extrabold text-amber-600">AntarRasa</h1>
        <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
          Web Dinamis Active
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Daftar Toko UMKM</h2>

        {loading ? (
          <p className="text-gray-500">Memuat data dari Supabase...</p>
        ) : stores.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border-2 border-dashed border-gray-200">
            <p className="font-semibold text-gray-700 text-lg mb-1">Belum Ada Toko</p>
            <p className="text-gray-500 text-sm">
              Koneksi ke Supabase berhasil! Silakan isi data di tabel <code className="bg-gray-100 px-2 py-1 rounded">stores</code> via Dashboard Supabase.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stores.map((store) => (
              <div key={store.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900">{store.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{store.description || 'Tidak ada deskripsi'}</p>
                <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>{store.address || 'Alamat belum diatur'}</span>
                  <span className={`px-2 py-0.5 rounded font-semibold ${store.is_open ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {store.is_open ? 'Buka' : 'Tutup'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}