using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Traveler.Entities
{
    public class SavedPlace
    {
        public int Id { get; set; }
        public int TravelId { get; set; }
        public int PlaceId { get; set; }
    }
}
