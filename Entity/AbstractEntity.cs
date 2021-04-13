using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace digitalpark.Entity
{
    public abstract class AbstractEntity
    {

        public long ID { get; set; }

        public DateTime InclusionDate { get; set; }

    }
}
