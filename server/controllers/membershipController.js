const membershipService = require('../services/membershipService');
const { successResponse } = require('../utils/response');
const { ApiError } = require('../middleware/errorHandler');

class MembershipController {
  async getMemberships(req, res, next) {
    try {
      const memberships = await membershipService.getAllMemberships();
      return successResponse(res, memberships, 'Membership plans retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getMembership(req, res, next) {
    try {
      const { id } = req.params;
      const membership = await membershipService.getMembershipById(id);
      if (!membership) {
        throw new ApiError(404, `Membership plan with ID ${id} not found`);
      }
      return successResponse(res, membership, 'Membership plan retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MembershipController();
