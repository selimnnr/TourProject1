import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const API_URL = "https://localhost:7022/api/tours"; 

  // --- STATE (DURUM) YÖNETİMİ ---
  const [tours, setTours] = useState([]); // Turları tutacak liste
  const [form, setForm] = useState({      // Form verilerini tutacak obje
    title: "",
    price: 0,
    startDate: "",
    finishDate: ""
  });

  // --- SAYFA YÜKLENİNCE ÇALIŞACAK KOD ---
  useEffect(() => {
    fetchTours();
  }, []);

  // --- FONKSİYONLAR ---

  // 1. Turları Backend'den Çek (GET)
  const fetchTours = async () => {
    try {
      const response = await axios.get(API_URL);
      setTours(response.data);
    } catch (error) {
      console.error("Veri çekilemedi:", error);
      alert("API'ye bağlanılamadı. Backend çalışıyor mu? Port doğru mu?");
    }
  };

  // 2. Yeni Tur Ekle (POST)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle

    // Basit validasyon
    if (!form.title || form.price <= 0) {
      alert("Lütfen geçerli bir başlık ve fiyat giriniz.");
      return;
    }

    try {
      await axios.post(API_URL, {
        ...form,
        // Tarihleri API'nin istediği formata çevirmek gerekebilir, 
        // şimdilik direkt gönderiyoruz, backend DateTime algılar.
      });
      alert("Tur başarıyla eklendi!");
      fetchTours(); // Listeyi güncelle
      // Formu temizle
      setForm({ title: "", price: 0, startDate: "", finishDate: "" });
    } catch (error) {
      console.error("Ekleme hatası:", error);
      alert("Ekleme başarısız.");
    }
  };

  // 3. Tur Sil (DELETE)
  const handleDelete = async (id) => {
    if(!window.confirm("Bu turu silmek istediğinize emin misiniz?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTours(); // Listeyi güncelle
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  // Form elemanları değişince state'i güncelle
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>🌍 Tur Yönetim Paneli</h1>

      {/* --- EKLEME FORMU --- */}
      <div className="card">
        <h3>Yeni Tur Ekle</h3>
        <form onSubmit={handleSubmit} className="tour-form">
          <input 
            type="text" name="title" placeholder="Tur Başlığı" 
            value={form.title} onChange={handleChange} required 
          />
          <input 
            type="number" name="price" placeholder="Fiyat" 
            value={form.price} onChange={handleChange} required 
          />
          <div className="date-group">
            <label>Başlangıç:</label>
            <input 
              type="datetime-local" name="startDate" 
              value={form.startDate} onChange={handleChange} required 
            />
          </div>
          <div className="date-group">
            <label>Bitiş:</label>
            <input 
              type="datetime-local" name="finishDate" 
              value={form.finishDate} onChange={handleChange} required 
            />
          </div>
          <button type="submit" className="btn-add">Kaydet</button>
        </form>
      </div>

      {/* --- LİSTELEME TABLOSU --- */}
      <div className="list-area">
        <h3>Mevcut Turlar ({tours.length})</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Başlık</th>
              <th>Fiyat</th>
              <th>Tarihler</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.id}</td>
                <td>{tour.title}</td>
                <td>{tour.price} ₺</td>
                <td>
                  {new Date(tour.startDate).toLocaleDateString()} - <br/>
                  {new Date(tour.finishDate).toLocaleDateString()}
                </td>
                <td>
                  <button onClick={() => handleDelete(tour.id)} className="btn-delete">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;