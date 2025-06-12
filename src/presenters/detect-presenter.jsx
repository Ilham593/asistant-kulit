import * as ort from 'onnxruntime-web';
export default class DetectPresenter {
  constructor() {
    this.sessionPromise = fetch('/models/best_skin_model.onnx')
      .then(res => {
        if (!res.ok) throw new Error(`Model load failed: ${res.status}`);
        return res.arrayBuffer();
      })
      .then(bytes => ort.InferenceSession.create(bytes));
    this.treatmentsPromise = fetch('/skincare_product/treatment.json').then(r=>r.json());
    this.categories = ["Acne","Blackheads","Dark Spots","Normal Skin","Oily Skin","Wrinkles"];
  }

  preprocess(imgEl, size = 224) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);
    const arr = new Float32Array(size * size * 3);
    for (let i = 0; i < size * size; i++) {
      arr[i*3+0] = data[i*4+0]/127.5 -1;
      arr[i*3+1] = data[i*4+1]/127.5 -1;
      arr[i*3+2] = data[i*4+2]/127.5 -1;
    }
    return new ort.Tensor('float32', arr, [1, size, size, 3]);
  }

  async detect(imageEl) {
    // tunggu model & treatments
    const [session, treatments] = await Promise.all([
      this.sessionPromise,
      this.treatmentsPromise
    ]);

    // preprocess
    const tensor = this.preprocess(imageEl);

    // run inference
    const feeds = { [session.inputNames[0]]: tensor };
    const output = await session.run(feeds);
    const outData = output[session.outputNames[0]].data;

    // cari max
    let maxIdx = 0, maxVal = outData[0];
    for (let i = 1; i < outData.length; i++) {
      if (outData[i] > maxVal) { maxVal = outData[i]; maxIdx = i; }
    }
    const disease = this.categories[maxIdx];
    const confidence = maxVal;

    // filter treatment by Tags === disease
    const recs = await Promise.all(
      treatments
        .filter(t => t.Tags.toLowerCase() === disease.toLowerCase())
        .map(async (t) => {
          const exts = ['png','jpg','webp'];
          let img = '';
          for (let e of exts) {
            const url = `/skincare_product/gambar_produk/${t.Id}.${e}`;
            try {
              const res = await fetch(url, { method: 'HEAD' });
              if (res.ok) {
                img = url;
                break;
              }
            } catch {
              // ignore fetch errors
            }
          }
          return {
            id: t.Id,
            brand: t.Brand,
            name: t["Product Name"],
            price: t.Price,
            link: t.Links,
            image: img
          };
        })
    )

    return { disease, confidence, recommendations: recs };
  }
}

  