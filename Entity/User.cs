using digitalpark.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace digitalpark.Entity
{
    public class User : AbstractEntity
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }


        // public User createUser(UserModel model)
        //{
        //SHA256 sha256Hash = SHA256.Create();

        //User user = new User();
        //user.Email = model.Email;
        //user.Username = model.Username;
        //user.Password = SHA256.Create();

        //    }

    }
}
