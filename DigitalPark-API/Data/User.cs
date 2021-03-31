using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DigitalPark_API.Data
{
    public class User
    {
        public int Id { get; set; }

        public String username { get; set; }

        public String password { get; set; }

        public AccessProfile perfilAcesso { get; set; }


    }
}
