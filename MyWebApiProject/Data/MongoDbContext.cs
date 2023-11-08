using MongoDB.Driver;
using Student.Models;
using MongoDB.Bson.Serialization.Conventions;

namespace Student.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDBConnection");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("StudentManagement");

            // Create the collections if they do not exist.
            CreateCollections();
        }

        // Expose the "students" collection as a property.
        public IMongoCollection<Register> Students => _database.GetCollection<Register>("students");

        // Expose the "friends" collection as a property.
        public IMongoCollection<Friend> Friends => _database.GetCollection<Friend>("friends");

        // Helper method to create collections if they do not exist.
        private void CreateCollections()
        {
            var collectionNames = _database.ListCollectionNames().ToList();

            if (!collectionNames.Contains("students"))
            {
                _database.CreateCollection("students");
            }

            if (!collectionNames.Contains("friends"))
            {
                _database.CreateCollection("friends");
            }
        }
    }
}
