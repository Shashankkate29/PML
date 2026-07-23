const branchService = require('../services/branchService');
const { successResponse } = require('../utils/response');
const { ApiError } = require('../middleware/errorHandler');

class BranchController {
  async getBranches(req, res, next) {
    try {
      const branches = await branchService.getAllBranches();
      return successResponse(res, branches, 'Branches retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getBranch(req, res, next) {
    try {
      const { id } = req.params;
      const branch = await branchService.getBranchById(id);
      if (!branch) {
        throw new ApiError(404, `Branch with ID ${id} not found`);
      }
      return successResponse(res, branch, 'Branch retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BranchController();
