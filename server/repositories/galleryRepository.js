const db = require('../config/db');
const branchRepository = require('./branchRepository');

class GalleryRepository {
  async findAll() {
    try {
      // 1. Fetch metadata from database
      const dbItems = await db.query('SELECT * FROM gallery ORDER BY id ASC');
      
      // 2. Fetch Branch 1 (Barshi) and Branch 2 (Shivaji Nagar) photos dynamically
      const branch1Items = await branchRepository.getBranchGallery(1);
      const branch2Items = await branchRepository.getBranchGallery(2);

      // 3. Map categories and labels for Branch 1
      const mappedBranch1 = branch1Items.map((item, idx) => {
        let category = 'Equipment';
        if (item.image_url.includes('04.jpeg') || item.image_url.includes('06.jpeg')) {
          category = 'Training';
        }
        return {
          id: 2000 + idx,
          title: `Branch 1 - ${item.title}`,
          description: item.description,
          image_url: item.image_url,
          category: category
        };
      });

      // 4. Map categories and labels for Branch 2
      const mappedBranch2 = branch2Items.map((item, idx) => {
        let category = 'Equipment';
        if (item.image_url.includes('0.6.jpeg')) {
          category = 'Training';
        }
        return {
          id: 3000 + idx,
          title: `Branch 2 - ${item.title}`,
          description: item.description,
          image_url: item.image_url,
          category: category
        };
      });

      return [...dbItems, ...mappedBranch1, ...mappedBranch2];
    } catch (err) {
      console.error('[GalleryRepository] Failed to query gallery:', err.message);
      try {
        return await db.query('SELECT * FROM gallery ORDER BY id ASC');
      } catch {
        return [];
      }
    }
  }

  async findByCategory(category) {
    const all = await this.findAll();
    return all.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }
}

module.exports = new GalleryRepository();
