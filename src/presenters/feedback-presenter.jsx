export default class FeedbackPresenter {
    constructor(view) {
      this.view = view; 
    }
  
    async submitFeedback(rating, comment, email) {
      // Simulasi pengiriman data ke server
      try {
        console.log('Mengirim feedback:', { rating, comment, email });
  
        if (this.view && typeof this.view.onSubmitSuccess === 'function') {
          this.view.onSubmitSuccess();
        }
      } catch (err) {
        console.error('Gagal mengirim feedback:', err);
        if (this.view && typeof this.view.onSubmitError === 'function') {
          this.view.onSubmitError(err);
        }
      }
    }
  }
  