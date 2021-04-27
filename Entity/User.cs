using digitalpark.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace digitalpark.Entity
{

    public enum UserType
    {
        Normal = 10,
        Operator = 20,
        Admin = 50,
        Root = 99
    }
    public class User
    {
        public long ID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] SaltHash { get; set; }
        public UserType Type { get; set; }

    }
}
