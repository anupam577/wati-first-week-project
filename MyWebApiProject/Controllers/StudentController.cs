using DnsClient;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Student.Data;
using Student.Models;
using System.Collections.Generic;
using System.Linq;

namespace Student.Controllers
{
    [ApiController]
    [Route("api")]
    public class StudentController : ControllerBase
    {
        private readonly MongoDbContext _mongoDbContext;

        public StudentController(MongoDbContext mongoDbContext)
        {
            _mongoDbContext = mongoDbContext;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] Register register)
        {
            // Check if the user already exists
            var existingUser = _mongoDbContext.Students.Find(b => b.Email == register.Email).FirstOrDefault();
            if (existingUser != null)
            {
                return BadRequest("User Already Exists");
            }

            register.Id = ObjectId.GenerateNewId().ToString();
            _mongoDbContext.Students.InsertOne(register);

            return Ok(register);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] Login login)
        {
            // Check if the user exists and the provided password is correct
            var user = _mongoDbContext.Students.Find(b => b.Email == login.Email && b.Password == login.Password).FirstOrDefault();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [Route("addFriend")]
        public IActionResult AddFriend([FromBody] Friend friend)
        {
            // Add the friend to the 'friends' collection
            friend.Id = ObjectId.GenerateNewId().ToString();
            _mongoDbContext.Friends.InsertOne(friend);

            return Ok(friend);
        }

        [HttpGet]
        [Route("showAllFriends")]
        public IActionResult ShowAllFriends()
        {
            // Retrieve all friend details from the 'friends' collection
            var allFriends = _mongoDbContext.Friends.Find(_ => true).ToList();
            // Console.WriteLine(allFriends);
            return Ok(allFriends);
        }

        
        [HttpPut]
        [Route("updateFriend/{friendId}")]
        public IActionResult UpdateFriend(string friendId, [FromBody] Friend updatedFriend)
        {    
            
           var user = _mongoDbContext.Friends.Find(f => f.Id == friendId).FirstOrDefault();
            if (user == null)
            {
                return NotFound("Friend not found");
            }

            // Set the _id field of the updatedFriend object to the friendId provided in the URL
            updatedFriend.Id = friendId;

            // Replace the friend document in the 'friends' collection
            var filter = Builders<Friend>.Filter.Eq("_id", new ObjectId(friendId));
            _mongoDbContext.Friends.ReplaceOne(filter, updatedFriend);

            return Ok(updatedFriend);
        }
        

        [HttpDelete]
        [Route("deleteFriend/{friendId}")]
        public IActionResult DeleteFriend( string friendId)
        {
            
            // Delete the friend from the 'friends' collection
            _mongoDbContext.Friends.DeleteOne(f => f.Id == friendId);
             Console.WriteLine(friendId);
            return Ok();
        }
    }
}
