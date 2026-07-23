const trainerService = require('../services/trainerService');
const { successResponse } = require('../utils/response');
const { ApiError } = require('../middleware/errorHandler');

class TrainerController {
  async getTrainers(req, res, next) {
    try {
      const trainers = await trainerService.getAllTrainers();
      return successResponse(res, trainers, 'Trainers retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getTrainer(req, res, next) {
    try {
      const { id } = req.params;
      const trainer = await trainerService.getTrainerById(id);
      if (!trainer) {
        throw new ApiError(404, `Trainer with ID ${id} not found`);
      }
      return successResponse(res, trainer, 'Trainer retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TrainerController();
