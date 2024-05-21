using CRUD_dotnet_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Data.SqlClient;

namespace CRUD_dotnet_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly UserRepository _userRepository;
    public UserController(UserRepository userRepository)
    {
      _userRepository = userRepository;
    }

   // [HttpPost]
    [HttpPost]
    public async Task<ActionResult> AddUser([FromBody] UserList model)
    {
      await _userRepository.AddUserAsync(model);
      return Ok();
    }
    [HttpGet]
    public async Task<ActionResult> GetAllUsersList()
    {
      var userList = await _userRepository.GetAllUsersAsync();
      return Ok(userList);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult> GetUserById([FromRoute] int id)
    {
      var user = await _userRepository.GetUserByIdAsync(id);
      return Ok(user);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser([FromRoute] int id)
    {
      await _userRepository.DeleteUserAsync(id);
      return Ok();
    }
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser([FromRoute] int id, [FromBody] UserList model)
    {
      await _userRepository.UpdateUser(id, model);
      return Ok();
    }

    [HttpGet("monikers")]
    public async Task<ActionResult<List<string>>> GetMonikers()
    {
      List<string> monikers = new List<string>();

      // Assuming connectionString is defined somewhere accessible
      string connectionString = "Server=localhost;Database=UserListDB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;";

      using (SqlConnection connection = new SqlConnection(connectionString))
      {
        string query = "SELECT name FROM monikerList3";
        SqlCommand command = new SqlCommand(query, connection);

        await connection.OpenAsync(); // Using asynchronous methods

        SqlDataReader reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
          string moniker = reader["name"].ToString();
          monikers.Add(moniker);
        }
      }

      return Ok(monikers);
    }
  }
}
