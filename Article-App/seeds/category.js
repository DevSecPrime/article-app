/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {id: 1, categoryName: 'Anitimicrobials', color: '#FDE1F2'},
    {id: 2, categoryName: 'Antibiotic Management of Periodontal Diseases ',color:'#C9FDFE'},
    {id: 3, categoryName: 'Gingival Augmentation and vestibular extension ', color: '#E5FEC0'}, 
    {id: 4, categoryName: 'GV, Curettage', color: '#FEF1A1'},
    {id: 5, categoryName: 'Longitudinal Studies of Periodonal Therapy', color: '#DAE2FD'},
    {id: 6, categoryName: 'Occlusion', color: '#FCC7E6'},
    {id: 7, categoryName: 'Osseous Grafts & Reconstructive Osseous Surgery ', color: '#D4EDFE'},
    {id: 8, categoryName: 'Periodontal Dressings; Root Sensitivity', color: '#FED7B5'},
    {id: 9, categoryName: 'Periodontal Flaps', color: '#E9DAFD'},
    {id: 10, categoryName: 'Reattachment and Regeneration', color: '#FDE1F2'},
    {id: 11, categoryName: 'Root Amputation and Hemisection', color: '#ACEFE8'},

  ]);
};
