using Microsoft.OpenApi.Any;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Reflection.Metadata;

namespace CastorBackend.Domain.Entities
{
    public class Employee
    {
        [BsonId]
    [BsonRepresentation(BsonType.Int32)]
        
        public int Id { get; set; }

        public int Cedula { get; set; }

        public string Nombre { get; set; }

        public string Foto { get; set; }
        public DateTime FechaIngreso { get; set; }

        public int CargoId { get; set; }
        public Cargo? CargoInfo { get; set; } 
    }

    
}
