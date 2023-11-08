using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Student.Models
{
    public class Friend
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        // Add any other fields you need to store for each friend
    }
}
