using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Traveler.Entities;

namespace Traveler.Dtos
{
    public class PlaceDTO
    {
        public string CityName { get; set; }
        public TravelType TravelType { get; set; }
        public PlaceType PlaceType { get; set; }
        public PriceType PriceType { get; set; }
        public string ImgUrl { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public int UserId { get; set; }
    }
}
