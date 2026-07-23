const membershipRepository = require('../repositories/membershipRepository');

class MembershipService {
  async getAllMemberships() {
    return await membershipRepository.findAll();
  }

  async getMembershipById(id) {
    return await membershipRepository.findById(id);
  }
}

module.exports = new MembershipService();
