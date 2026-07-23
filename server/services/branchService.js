const branchRepository = require('../repositories/branchRepository');

class BranchService {
  async getAllBranches() {
    return await branchRepository.findAll();
  }

  async getBranchById(id) {
    return await branchRepository.findById(id);
  }
}

module.exports = new BranchService();
