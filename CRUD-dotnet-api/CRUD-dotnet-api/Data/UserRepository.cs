using Microsoft.EntityFrameworkCore;

namespace CRUD_dotnet_api.Data
{
  public class UserRepository
  {
    public readonly AppDbContext _appDbContext;
    public UserRepository(AppDbContext appDbContext)
    {
      _appDbContext = appDbContext;
    }
    public async Task AddUserAsync(UserList user)
    {
      await _appDbContext.Set<UserList>().AddAsync(user); // <--->
      await _appDbContext.SaveChangesAsync();
    }
    public async Task<List<UserList>> GetAllUsersAsync()
    {
      return await _appDbContext.Users.ToListAsync();
      //return await _appDbContext.Set<UserList>().ToListAsync();
    }
    public async Task updateUserAsync(int id, UserList model)
    {
      var User = await _appDbContext.Users.FindAsync(id);
      if(User == null)
      {
        throw new Exception("User not found");
      }
      if (User != null)
      {
        User.Name = model.Name;
        User.Email = model.Email;
        User.Phone = model.Phone;
        User.Age = model.Age;
        User.Role = model.Role;
        User.salary = model.salary;
        await _appDbContext.SaveChangesAsync();
      }
    }
    public async Task DeleteUserAsync(int id)
    {
      var User = await _appDbContext.Users.FindAsync(id);
      if(User == null)
      {
        throw new Exception("User not found");
      }
      if (User != null)
      {
        _appDbContext.Users.Remove(User);
        //_appDbContext.Remove(User);
        await _appDbContext.SaveChangesAsync();
      }
    }
    public async Task<UserList> GetUserByIdAsync(int id)
    {
      return await  _appDbContext.Users.FindAsync(id);
    }
    public async Task UpdateUser(int id, UserList model)
    {
      var User = await _appDbContext.Users.FindAsync(id);
      if(User == null)
      {
        throw new Exception("User not found");
      }
      if (User != null)
      {
        User.Name = model.Name;
        //.Email = model.Email;
        User.Phone = model.Phone;
        User.Age = model.Age;
        User.Role = model.Role;
        User.salary = model.salary;
        await _appDbContext.SaveChangesAsync();
      }
    }
  }
}
