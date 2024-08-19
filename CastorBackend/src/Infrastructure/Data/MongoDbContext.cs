using CastorBackend.Domain.Entities;
using MongoDB.Driver;
using System;

namespace CastorBackend.Infrastructure.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
   public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration.GetSection("MongoSettings:ConnectionString").Value;
        var databaseName = configuration.GetSection("MongoSettings:DatabaseName").Value;

        if (string.IsNullOrEmpty(connectionString))
            throw new ArgumentNullException(nameof(connectionString), "MongoDB connection string is missing.");
        
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

        public IMongoCollection<Employee> Employees =>
            _database.GetCollection<Employee>("Employees");

        public IMongoCollection<Cargo> Cargos =>
            _database.GetCollection<Cargo>("Cargos");
    }
}

public class MongoSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}
