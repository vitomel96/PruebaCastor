using CastorBackend.Domain.Entities;
using CastorBackend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        //EndPoint para obtener todos los empleados
        [HttpGet]
        public Task<IEnumerable<Employee>> Get()
        {
            return _employeeService.GetAllEmployees();
        }
        //EndPoint para obtener un empleado por su ID

        [HttpGet("{id}")]
        public Task<Employee> Get(int id)
        {
            return _employeeService.GetEmployeeById(id);
        }

        //EndPoint para añadir un empleado

        [HttpPost]
        public Task Add(Employee employee)
        {
            return _employeeService.AddEmployee(employee);
        }

        //EndPoint para actualizar un empleado

        [HttpPut("{id}")]
        public Task<bool> Update(int id, Employee employee)
        {
            employee.Id = id;
            return _employeeService.UpdateEmployee(employee);
        }

        //EndPoint para eliminar un empleado

        [HttpDelete("{id}")]
        public Task<bool> Delete(int id)
        {
            return _employeeService.DeleteEmployee(id);
        }
    }
}
