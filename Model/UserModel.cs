using digitalpark.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace digitalpark.Model
{
    public class UserModel
    {
        public long ID { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public UserType Type { get; set; }
    }
}
