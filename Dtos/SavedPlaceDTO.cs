using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Traveler.Dtos
{
    public class SavedPlaceDTO
    {
        public int Id { get; set; }
        public int TravelId { get; set; }
        public int PlaceId { get; set; }
    }
}
