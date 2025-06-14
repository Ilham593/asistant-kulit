export default class EduListPresenter {
    // nanti bisa diganti fetch() ke API atau ambil dari database
    async getArticles() {
      return [
        {
          id: '1',
          title: 'Merawat Kulit di Musim Panas',
          date: '2025-05-20',
          excerpt: 'Pelajari langkah-langkah efektif untuk Merawat Kulit di Musim Panas',
          imageUrl: 'https://nyoba-aja.com/400x300',
        },
        {
          id: '2',
          title: 'Mengenal Jenis Kulit',
          date: '2025-05-21',
          excerpt: 'Pahami perbedaan jenis kulit dan cara merawatnya',
          imageUrl: 'https://nyoba-aja.com/400x300',
        },
      ];
    }
  }
  