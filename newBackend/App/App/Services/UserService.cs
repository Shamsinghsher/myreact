namespace WebApi.Services;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System;

public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User GetById(int id);
}

public class UserService : IUserService
{
    // users hardcoded for simplicity, store in a db with hashed passwords in production applications
    // private List<User> _users = new List<User>
    // {
    //     new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
    // };
  
    private readonly AppSettings _appSettings;
   private DataContext _context;
    public UserService(IOptions<AppSettings> appSettings,DataContext dBContext)
    {
        _appSettings = appSettings.Value;
        _context=dBContext;
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
      
              var user = _context.Logins.SingleOrDefault(x => x.UserName == model.Username && x.Password == model.Password);
        // var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);
          System.Console.WriteLine(user);
        // return null if user not found
        if (user == null) return null;

        // authentication successful so generate jwt token
        var token = generateJwtToken(user);

        return new AuthenticateResponse(user, token);
    }

    public IEnumerable<User> GetAll()
    {
       
        return _context.Users
                .Select(x => new User
                {FirstName=x.FirstName,LastName=x.LastName})
                .ToList();

      
    }

    public User GetById(int id)
    {
        Console.WriteLine(id);
     
        return  _context.Users.FirstOrDefault(x => x.ID == id);
    }

    // helper methods

    private string generateJwtToken(Login user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.LoginID.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}