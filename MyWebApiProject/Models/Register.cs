using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Student.Models
{
    public class Register
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        // Add any other fields you need to store for each user

        // public List<string> FriendIds { get; set; } // List of friend IDs for registered user
    }
}
