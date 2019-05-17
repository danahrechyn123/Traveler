using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Traveler.Dtos
{
    public class TotalPriceDTO
    {
        public int TravelId { get; set; }
        public double TotalPrice { get; set; }
        public double Hotels { get; set; }
        public double Restaurants { get; set; }
        public double Museums { get; set; }
        public double Monuments { get; set; }
        public double Entertaiments { get; set; }
    }
}
