using CastorBackend.Domain.Entities;
using CastorBackend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CargoController : ControllerBase
    {
        private readonly CargoService _roleService;

        public CargoController(CargoService roleService)
        {
            _roleService = roleService;
        }
        //EndPoint para obtener todos los roles
        [HttpGet]
        public Task<IEnumerable<Cargo>> Get()
        {
            return _roleService.GetAllEmployees();
        }
        //EndPoint para obtener un rol por su ID

        [HttpGet("{id}")]
        public Task<Cargo> Get(int id)
        {
            return _roleService.GetCargoById(id);
        }

        //EndPoint para añadir un rol

        [HttpPost]
        public Task Add(Cargo role)
        {
            return _roleService.AddCargo(role);
        }

        //EndPoint para actualizar un rol

        [HttpPut("{id}")]
        public Task<bool> Update(int id, Cargo role)
        {
            role.Id = id;
            return _roleService.UpdateCargo(role);
        }

        //EndPoint para eliminar un rol

        [HttpDelete("{id}")]
        public Task<bool> Delete(int id)
        {
            return _roleService.DeleteCargo(id);
        }
    }
}
