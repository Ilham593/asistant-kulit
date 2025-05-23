export default class EduDetailPresenter {
    // nanti fetch dari API atau database dengan id
    async getArticleById(id) {
      return {
        id,
        title: 'Merawat Kulit di Musim Panas',
        date: '2025-05-20',
        imageUrl: 'https://nyoba-aja.com/400x300/800x400',
        content: `
  Musim panas bisa membuat kulit cepat kering atau berminyak tergantung jenis kulitmu. Pastikan kamu tetap menjaga kelembapan kulit dan menghindari sinar UV langsung dalam waktu lama.
  
  Gunakan sunscreen dengan minimal SPF 30 setiap hari, bahkan saat mendung. Cucilah wajah secara rutin dan gunakan produk dengan bahan alami yang lembut.
  
  Perbanyak konsumsi air putih dan hindari makanan berminyak berlebihan untuk membantu perawatan dari dalam.
        `.trim(),
      };
    }
  }
  