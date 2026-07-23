const facilityRepository = require('../repositories/facilityRepository');

class FacilityService {
  async getAllFacilities() {
    return await facilityRepository.findAll();
  }

  async getFacilitiesByCategory(category) {
    return await facilityRepository.findByCategory(category);
  }
}

module.exports = new FacilityService();
