using CastorBackend.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Infrastructure.Repositories
{
    public interface InterfaceEmployeedRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        Task<Employee> GetEmployeeById(int id);
        Task AddEmployee(Employee employee);
        Task<bool> UpdateEmployee(Employee employee);
        Task<bool> DeleteEmployee(int id);
    }
}
