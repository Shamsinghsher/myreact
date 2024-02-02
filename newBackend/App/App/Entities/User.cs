namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class User
{
    public int ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // public string Username { get; set; }

    // [JsonIgnore]
    // public string Password { get; set; }
}
public class Login
{

    public int LoginID { get; set; }
        public string UserName { get; set; }
     [JsonIgnore]
    public string Password { get; set; }
}