export default class HomePresenter {
    getCards() {
      return [
        { title: 'Mulai Deteksi', subtitle:'Akses Cepat Fitur Deteksi', icon:'camera', color:'primary', path:'/deteksi' },
        { title: 'Riwayat', subtitle:'Lihat Riwayat Deteksi', icon:'history', color:'white' },
        { title: 'Artikel Edukasi', subtitle:'Baca Artikel Edukasi', icon:'book', color:'white', path:'/edukasi' },
        { title: 'Kuis Edukasi', subtitle:'Uji Pengetahuanmu', icon:'quiz', color:'white' },
        { title: 'Feedback', subtitle:'Berikan Feedback', icon:'feedback', color:'primary', path:'/feedback' },
      ];
    }
  }
  