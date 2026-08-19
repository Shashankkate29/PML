const fs = require('fs');
const path = require('path');
const db = require('../config/db');

class BranchRepository {
  async getBranchGallery(branchId) {
    const folderName = branchId === 1 ? 'branch1' : branchId === 2 ? 'branch2' : '';
    if (!folderName) return [];
    
    const branchDir = path.join(process.cwd(), "photo's", folderName);
    if (!fs.existsSync(branchDir)) {
      return [];
    }
    
    const metadataMap = {
      'branch1': {
        '01.jpeg': { title: 'Leg Press Area', desc: 'Heavy leg press plate-loaded machine setup for lower body development.' },
        '02.jpeg': { title: 'Incline Bench Press & Cable Crossover', desc: 'Adjustable bench press and multi-pulley cable systems.' },
        '03.jpeg': { title: 'Flat Bench Station', desc: 'Flat barbell bench press station and free weights floor.' },
        '04.jpeg': { title: 'Squat Platform & Cardio', desc: 'Olympic power rack platform and cardio treadmills corridor.' },
        '05.jpeg': { title: 'Cardio Zone', desc: 'Cardiovascular training section with spin bike and Athlon treadmills.' },
        '06.jpeg': { title: 'Core & Hyperextension Station', desc: 'Back hyperextension bench, core stability plates, and stretching mat.' },
        '07.jpeg': { title: 'Reception Lobby', desc: 'Clean reception desk lobby entrance and club backdrop.' }
      },
      'branch2': {
        '0.1.jpeg': { title: 'Cardio Conditioning Treadmills', desc: 'Professional treadmills for cardiovascular endurance training.' },
        '0.2.jpeg': { title: 'Selectorized Strength Row', desc: 'Row of commercial resistance stack strength machines.' },
        '0.3.jpeg': { title: 'Upper Body Chest Press Machine', desc: 'Pin-selected chest press machine for upper body development.' },
        '0.4.jpeg': { title: 'Leg Conditioning Station', desc: 'Leg extension conditioning machine for quad isolate training.' },
        '0.5.jpeg': { title: 'Dumbbells & Cable Crossover Area', desc: 'Dumbbells station and multi-angle cable crossover pulley setup.' },
        '0.6.jpeg': { title: 'Heavy Squat Platform', desc: 'Power cage platform for strength compound squats.' },
        '0.7.jpeg': { title: 'Linear Plate-Loaded Leg Press', desc: 'Plate-loaded leg press sled for high-capacity lower body training.' },
        '0.8.jpeg': { title: 'Elite Free Weights Dumbbells Rack', desc: 'Multiple tiers of professional-grade training dumbbells.' },
        '0.9.jpeg': { title: 'Strength Benches', desc: 'Flat and incline bench press setups for strength training.' },
        '0.10.jpeg': { title: 'Flagship Squat Cage Setup', desc: 'Heavy-duty power squat cage cage setup.' }
      }
    };

    try {
      const files = fs.readdirSync(branchDir).filter(file => {
        const filePath = path.join(branchDir, file);
        const stat = fs.statSync(filePath);
        return stat.isFile() && /\.(jpe?g|png|gif|webp|svg)$/i.test(file);
      });
      
      return files.map((file, idx) => {
        const meta = (metadataMap[folderName] && metadataMap[folderName][file]) || {
          title: file.replace(/\.[^/.]+$/, "").replace(/[._-]/g, " "),
          desc: `Real Photograph from ${folderName === 'branch1' ? 'Barshi' : 'Shivaji Nagar'}`
        };
        return {
          id: idx + 1,
          title: meta.title,
          description: meta.desc,
          image_url: `/photos/${folderName}/${file}`
        };
      });
    } catch (err) {
      console.error(`[BranchRepository] Failed to read gallery directory for branch ${branchId}:`, err.message);
      return [];
    }
  }

  async findAll() {
    const branches = await db.query('SELECT * FROM branches ORDER BY id ASC');
    for (const branch of branches) {
      branch.branchNumber = branch.branch_number;
      branch.shortName = branch.short_name;
      branch.facilities = await db.query(
        `SELECT f.* FROM facilities f
         JOIN branch_facilities bf ON f.id = bf.facility_id
         WHERE bf.branch_id = ?`,
        [branch.id]
      );
      branch.gallery = await this.getBranchGallery(branch.id);
    }
    return branches;
  }

  async findById(id) {
    const results = await db.query('SELECT * FROM branches WHERE id = ?', [id]);
    const branch = results[0] || null;
    if (branch) {
      branch.branchNumber = branch.branch_number;
      branch.shortName = branch.short_name;
      branch.facilities = await db.query(
        `SELECT f.* FROM facilities f
         JOIN branch_facilities bf ON f.id = bf.facility_id
         WHERE bf.branch_id = ?`,
        [branch.id]
      );
      branch.gallery = await this.getBranchGallery(branch.id);
    }
    return branch;
  }

  async findBySlug(slug) {
    const results = await db.query('SELECT * FROM branches WHERE slug = ?', [slug]);
    const branch = results[0] || null;
    if (branch) {
      branch.branchNumber = branch.branch_number;
      branch.shortName = branch.short_name;
      branch.facilities = await db.query(
        `SELECT f.* FROM facilities f
         JOIN branch_facilities bf ON f.id = bf.facility_id
         WHERE bf.branch_id = ?`,
        [branch.id]
      );
      branch.gallery = await this.getBranchGallery(branch.id);
    }
    return branch;
  }
}

module.exports = new BranchRepository();
