using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CastorBackend.Domain.Entities
{
    public class Cargo
    {
        [BsonId]
    [BsonRepresentation(BsonType.Int32)]
        public int Id { get; set; }

        public string Nombre { get; set; }
    }
}
