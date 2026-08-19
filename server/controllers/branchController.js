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
      let branch;
      if (isNaN(Number(id))) {
        branch = await branchService.getBranchBySlug(id);
      } else {
        branch = await branchService.getBranchById(parseInt(id, 10));
      }
      
      if (!branch) {
        throw new ApiError(404, `Branch with identifier '${id}' not found`);
      }
      return successResponse(res, branch, 'Branch retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BranchController();
