using CastorBackend.Domain.Entities;
using CastorBackend.Infrastructure.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Domain.Services
{
    public class CargoService
    {
        private readonly InterfaceCargoRepository _cargoRepository;

        public CargoService(InterfaceCargoRepository cargoRepository)
        {
            _cargoRepository = cargoRepository;
        }

        public Task<IEnumerable<Cargo>> GetAllEmployees()
        {
            return _cargoRepository.GetAllCargos();
        }

        public Task<Cargo> GetCargoById(int id)
        {
            return _cargoRepository.GetCargoById(id);
        }

        public Task AddCargo(Cargo role)
        {
            return _cargoRepository.AddCargo(role);
        }

        public Task<bool> UpdateCargo(Cargo role)
        {
            return _cargoRepository.UpdateCargo(role);
        }

        public Task<bool> DeleteCargo(int id)
        {
            return _cargoRepository.DeleteCargo(id);
        }
    }
}
