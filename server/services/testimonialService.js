const testimonialRepository = require('../repositories/testimonialRepository');

class TestimonialService {
  async getAllTestimonials() {
    return await testimonialRepository.findAll();
  }

  async getFeaturedTestimonials() {
    return await testimonialRepository.findFeatured();
  }
}

module.exports = new TestimonialService();
