using System.ComponentModel.DataAnnotations.Schema;

namespace digitalpark.Entity
{
    public class User
    {
        public long ID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] SaltHash { get; set; }

    }
}
