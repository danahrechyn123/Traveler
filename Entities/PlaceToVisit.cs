using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Traveler.Entities
{
    public class PlaceToVisit
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int CityId { get; set; }
        public virtual City City { get; set; }

        public string Name { get; set; }             

        public TravelType TravelType { get; set; }

        public PriceType PriceType { get; set; }

        public PlaceType PlaceType { get; set; }

        public string ImgUrl { get; set; }

        public int Like { get; set; }
        public string About { get; set; }

    }
}
