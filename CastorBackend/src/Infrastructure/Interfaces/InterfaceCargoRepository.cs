using CastorBackend.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Infrastructure.Repositories
{
    public interface InterfaceCargoRepository
    {
        Task<IEnumerable<Cargo>> GetAllCargos();
        Task<Cargo> GetCargoById(int id);
        Task AddCargo(Cargo role);
        Task<bool> UpdateCargo(Cargo role);
        Task<bool> DeleteCargo(int id);
    }
}
