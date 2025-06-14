export default class HomePresenter {
    getCards() {
      return [
        { title: 'Mulai Deteksi', subtitle:'Akses Cepat Fitur Deteksi', icon:'camera', color:'primary', path:'/deteksi' },
        { title: 'Riwayat', subtitle:'Lihat Riwayat Deteksi', icon:'history', color:'secondary', path:'/riwayat' },
        { title: 'Artikel Edukasi', subtitle:'Baca Artikel Edukasi', icon:'book', color:'primary', path:'/edukasi' },
        { title: 'Feedback', subtitle:'Berikan Feedback', icon:'feedback', color:'secondary', path:'/feedback' },
      ];
    }
  }
  