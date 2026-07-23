const trainerRepository = require('../repositories/trainerRepository');

class TrainerService {
  async getAllTrainers() {
    return await trainerRepository.findAll();
  }

  async getTrainerById(id) {
    return await trainerRepository.findById(id);
  }
}

module.exports = new TrainerService();
