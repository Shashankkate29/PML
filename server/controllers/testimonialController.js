const testimonialService = require('../services/testimonialService');
const { successResponse } = require('../utils/response');

class TestimonialController {
  async getTestimonials(req, res, next) {
    try {
      const { featured } = req.query;
      let testimonials;
      if (featured === 'true') {
        testimonials = await testimonialService.getFeaturedTestimonials();
      } else {
        testimonials = await testimonialService.getAllTestimonials();
      }
      return successResponse(res, testimonials, 'Testimonials retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TestimonialController();
