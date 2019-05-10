using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Traveler.Entities
{
    public class SavedPlaces
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PlaceId { get; set; }
    }
}
