const facilityService = require('../services/facilityService');
const { successResponse } = require('../utils/response');

class FacilityController {
  async getFacilities(req, res, next) {
    try {
      const { category } = req.query;
      let facilities;
      if (category) {
        facilities = await facilityService.getFacilitiesByCategory(category);
      } else {
        facilities = await facilityService.getAllFacilities();
      }
      return successResponse(res, facilities, 'Facilities retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FacilityController();
