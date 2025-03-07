using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGateway.Models
{
    public class FlaskTest
    {
        public Guid Id { get; set; } // UUID
        public string Name { get; set; } // String
        public double Value { get; set; } // Float
        public bool IsActive { get; set; } // Boolean
        public DateTime CreatedAt { get; set; } // Datetime
    }
}