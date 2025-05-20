export default class HomePresenter {
    getCards() {
      return [
        { title: 'Mulai Deteksi', subtitle:'Akses Cepat Fitur Deteksi', icon:'camera', color:'primary', path:'/deteksi' },
        { title: 'Riwayat', subtitle:'Lihat Riwayat Deteksi', icon:'history', color:'white' },
        { title: 'Artikel', subtitle:'Baca Artikel', icon:'book', color:'white' },
        { title: 'Kuis Edukasi', subtitle:'Uji Pengetahuanmu', icon:'quiz', color:'white' },
        { title: 'Feedback', subtitle:'Beri Umpan Balik', icon:'feedback', color:'primary' },
      ];
    }
  }
  