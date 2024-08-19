using CastorBackend.Domain.Entities;
using CastorBackend.Infrastructure.Data;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CastorBackend.Infrastructure.Repositories
{
    public class EmployeeRepository : InterfaceEmployeedRepository
    {
        private readonly IMongoCollection<Employee> _employees;
        private readonly IMongoCollection<Cargo> _cargos;

        public EmployeeRepository(MongoDbContext context)
        {
            _employees = context.Employees;
            _cargos = context.Cargos;

        }

        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {
            var pipeline = new BsonDocument[]
            {
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "Cargos" },
                { "localField", "CargoId" },
                { "foreignField", "_id" },
                { "as", "CargoInfo" }
            }),
        new BsonDocument("$unwind", "$CargoInfo"),
        new BsonDocument("$project",
            new BsonDocument
            {
                { "_id", 1 },
                { "Cedula", 1 },
                { "Nombre", 1 },
                { "Foto", 1 },
                { "FechaIngreso", 1 },
                { "CargoId", 1 },
                { "CargoInfo", 1 }
            })
            };

            var result = await _employees.Aggregate<Employee>(pipeline).ToListAsync();

            return result;
        }

     public async Task<Employee> GetEmployeeById(int id)
{
    var pipeline = new BsonDocument[]
    {
        new BsonDocument("$match",
            new BsonDocument
            {
                { "_id", id }
            }),
        new BsonDocument("$lookup",
            new BsonDocument
            {
                { "from", "Cargos" },
                { "localField", "CargoId" },
                { "foreignField", "_id" },
                { "as", "CargoInfo" }
            }),
        new BsonDocument("$unwind", "$CargoInfo"),
        new BsonDocument("$project",
            new BsonDocument
            {
                { "_id", 1 },
                { "Cedula", 1 },
                { "Nombre", 1 },
                { "Foto", 1 },
                { "FechaIngreso", 1 },
                { "CargoId", 1 },
                { "CargoInfo", 1 }
            })
    };

    // Ejecuta el pipeline de agregación y obtiene el primer resultado.
    var result = await _employees.Aggregate<Employee>(pipeline).FirstOrDefaultAsync();

    return result;
}

        public async Task AddEmployee(Employee employee)
        {
            // Si la colección está vacía, asigna 1 como el primer Id
            var maxId = _employees.AsQueryable().Any() ?
                        _employees.AsQueryable().Max(e => e.Id) :
                        0;

            // Asigna el Id incrementado 
            employee.Id = maxId + 1;

            // Inserta el nuevo empleado en la colección
            await _employees.InsertOneAsync(employee);
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            var result = await _employees.ReplaceOneAsync(e => e.Id == employee.Id, employee);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var result = await _employees.DeleteOneAsync(e => e.Id == id);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }
    }
}
