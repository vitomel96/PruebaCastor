using CastorBackend.Domain.Entities;
using CastorBackend.Infrastructure.Data;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Infrastructure.Repositories
{
    public class CargoRepository : InterfaceCargoRepository
    {
        private readonly MongoDbContext _context;

        public CargoRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cargo>> GetAllCargos()
        {
            return await _context.Cargos.Find(_ => true).ToListAsync();
        }

        public async Task<Cargo> GetCargoById(int id)
        {
            return await _context.Cargos.Find(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task AddCargo(Cargo role)
        {
            // Si la colección está vacía, asigna 1 como el primer Id
            var maxId = _context.Cargos.AsQueryable().Any() ?
                        _context.Cargos.AsQueryable().Max(e => e.Id) :
                        0;

            // Asigna el Id incrementado
            role.Id = maxId + 1;

            // Inserta el nuevo rol en la colección
            await _context.Cargos.InsertOneAsync(role);
        }

        public async Task<bool> UpdateCargo(Cargo role)
        {
            var result = await _context.Cargos.ReplaceOneAsync(e => e.Id == role.Id, role);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteCargo(int id)
        {
            var result = await _context.Cargos.DeleteOneAsync(e => e.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
