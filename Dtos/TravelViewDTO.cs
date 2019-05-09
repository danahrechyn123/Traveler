using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Traveler.Entities;

namespace Traveler.Dtos
{
    public class TravelViewDTO
    {
        public int Id { get; set; }
        public string OwnerName { get; set; }
        public string CityName { get; set; }
        public int CityId { get; set; }
        public string CountryName { get; set; }
        public string Date { get; set; }
        public  PriceType PriceType{ get; set; }        
        public int RegistedAmount { get; set; }

    }
}
